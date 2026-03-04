"""
╔══════════════════════════════════════════╗
║     NETWORK SCANNER — FastAPI Backend    ║
║  WebSocket streaming · Real scan engine  ║
╚══════════════════════════════════════════╝

Usage:
    pip install fastapi uvicorn websockets
    python backend.py
"""

import asyncio
import json
import socket
import ipaddress
import platform
import subprocess
import time
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Network Scanner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────
# Service / risk data
# ─────────────────────────────────────────
KNOWN_SERVICES = {
    21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP", 53: "DNS",
    67: "DHCP", 69: "TFTP", 80: "HTTP", 110: "POP3", 111: "RPCbind",
    119: "NNTP", 123: "NTP", 135: "MSRPC", 139: "NetBIOS", 143: "IMAP",
    161: "SNMP", 389: "LDAP", 443: "HTTPS", 445: "SMB", 465: "SMTPS",
    514: "Syslog", 587: "SMTP-Sub", 631: "IPP", 636: "LDAPS",
    993: "IMAPS", 995: "POP3S", 1433: "MSSQL", 1521: "Oracle",
    1723: "PPTP", 2049: "NFS", 2375: "Docker", 3306: "MySQL",
    3389: "RDP", 4444: "Metasploit", 5000: "Flask/UPnP",
    5432: "PostgreSQL", 5900: "VNC", 5985: "WinRM", 6379: "Redis",
    6443: "K8s-API", 8080: "HTTP-Alt", 8443: "HTTPS-Alt",
    8888: "Jupyter", 9200: "Elasticsearch", 27017: "MongoDB",
}

RISK_MAP = {
    23: "high", 21: "medium", 22: "medium", 3389: "high",
    5900: "high", 3306: "high", 27017: "high", 6379: "high",
    4444: "high", 2375: "high", 445: "high", 135: "medium",
    139: "medium", 1433: "high", 5432: "medium",
}

TOP_PORTS = sorted(KNOWN_SERVICES.keys())


# ─────────────────────────────────────────
# Scanner engine (sync, runs in threadpool)
# ─────────────────────────────────────────
def guess_os_ttl(ttl: int) -> str:
    if ttl is None:
        return "Unknown"
    if ttl <= 64:
        return "Linux / macOS"
    if ttl <= 128:
        return "Windows"
    return "Solaris / Network device"


def ping_host(ip: str, timeout: float = 1.0):
    system = platform.system().lower()
    cmd = (["ping", "-n", "1", "-w", str(int(timeout * 1000)), ip]
           if system == "windows"
           else ["ping", "-c", "1", "-W", str(int(timeout)), ip])
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout + 1)
        alive = r.returncode == 0
        ttl = None
        if alive:
            for tok in r.stdout.split():
                if "ttl=" in tok.lower():
                    try:
                        ttl = int(tok.split("=")[1])
                    except Exception:
                        pass
        return ip, alive, ttl
    except Exception:
        return ip, False, None


def grab_banner(ip: str, port: int, timeout: float = 2.0) -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(timeout)
            s.connect((ip, port))
            if port in (80, 8080, 8000):
                s.send(b"HEAD / HTTP/1.0\r\nHost: " + ip.encode() + b"\r\n\r\n")
            elif port in (443, 8443):
                return "HTTPS / TLS"
            else:
                s.send(b"\r\n")
            data = s.recv(1024)
            banner = data.decode(errors="ignore").strip()
            return banner.split("\n")[0][:80] if banner else ""
    except Exception:
        return ""


def scan_port(ip: str, port: int, timeout: float = 1.0):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(timeout)
            if s.connect_ex((ip, port)) == 0:
                service = KNOWN_SERVICES.get(port, "unknown")
                try:
                    if service == "unknown":
                        service = socket.getservbyport(port, "tcp")
                except Exception:
                    pass
                return port, service
    except Exception:
        pass
    return None


def parse_ports(port_arg: str) -> list:
    if port_arg in ("top", "common"):
        return TOP_PORTS
    ports = set()
    for part in port_arg.split(","):
        part = part.strip()
        if "-" in part:
            a, b = part.split("-", 1)
            ports.update(range(int(a), int(b) + 1))
        else:
            ports.add(int(part))
    return sorted(ports)


# ─────────────────────────────────────────
# WebSocket scan endpoint
# ─────────────────────────────────────────
async def send(ws: WebSocket, type_: str, **kwargs):
    """Helper to push a JSON event to the client."""
    await ws.send_text(json.dumps({"type": type_, **kwargs}))


@app.websocket("/ws/scan")
async def websocket_scan(ws: WebSocket):
    await ws.accept()

    try:
        # ── Receive config ──
        raw = await ws.receive_text()
        config = json.loads(raw)
        target      = config.get("target", "127.0.0.1")
        port_arg    = config.get("ports", "top")
        timeout     = float(config.get("timeout", 1.0))
        workers     = int(config.get("workers", 150))
        no_banner   = bool(config.get("no_banner", False))
        no_discover = bool(config.get("no_discover", False))

        ports = parse_ports(port_arg)

        await send(ws, "log", msg=f"Scan engine ready", level="sys")
        await send(ws, "log", msg=f"Target  : {target}", level="sys")
        await send(ws, "log", msg=f"Ports   : {len(ports)} ({port_arg})", level="sys")
        await send(ws, "log", msg=f"Timeout : {timeout}s  Threads: {workers}", level="sys")

        loop = asyncio.get_event_loop()
        executor = ThreadPoolExecutor(max_workers=workers)

        # ── Host discovery ──────────────────────
        await send(ws, "phase", phase="discovery")
        await send(ws, "log", msg="Starting host discovery...", level="sys")

        live_hosts = []

        # Resolve single host or CIDR
        try:
            net = ipaddress.ip_network(target, strict=False)
            ips_to_ping = [str(ip) for ip in net.hosts()]
        except ValueError:
            try:
                resolved = socket.gethostbyname(target)
            except Exception:
                resolved = target
            ips_to_ping = [resolved]

        total_ips = len(ips_to_ping)

        if no_discover:
            for ip in ips_to_ping:
                live_hosts.append({"ip": ip, "ttl": None, "os": "Unknown"})
        else:
            discovered = 0
            futures = {
                loop.run_in_executor(executor, ping_host, ip, timeout): ip
                for ip in ips_to_ping
            }
            for fut in asyncio.as_completed(futures.keys()):
                ip, alive, ttl = await fut
                discovered += 1
                progress = int((discovered / total_ips) * 30)
                await send(ws, "progress", value=progress)

                if alive:
                    os_guess = guess_os_ttl(ttl)
                    live_hosts.append({"ip": ip, "ttl": ttl, "os": os_guess})
                    await send(ws, "log",
                               msg=f"PING {ip}  alive  TTL={ttl or '?'}  OS≈ {os_guess}",
                               level="found")
                    await send(ws, "host_found",
                               ip=ip, ttl=ttl, os=os_guess)

        await send(ws, "log",
                   msg=f"Discovery complete: {len(live_hosts)} host(s) found",
                   level="sys")

        if not live_hosts:
            await send(ws, "done", hosts=[], total_ports=0)
            return

        # ── Port scanning ───────────────────────
        await send(ws, "phase", phase="scanning")
        await send(ws, "log",
                   msg=f"Port scanning {len(live_hosts)} host(s) on {len(ports)} ports...",
                   level="sys")

        all_results = []
        progress_base = 30
        progress_step = 70 / len(live_hosts)

        for h_idx, host in enumerate(live_hosts):
            ip = host["ip"]
            await send(ws, "log",
                       msg=f"Scanning {ip}  ({len(ports)} ports)...",
                       level="info")

            open_ports = []

            # Run port scans in thread pool, batch to keep async responsive
            port_futures = [
                loop.run_in_executor(executor, scan_port, ip, p, timeout)
                for p in ports
            ]

            done_count = 0
            for fut in asyncio.as_completed(port_futures):
                result = await fut
                done_count += 1

                if result:
                    port, service = result
                    banner = ""
                    if not no_banner:
                        banner = await loop.run_in_executor(executor, grab_banner, ip, port, timeout)
                    risk = RISK_MAP.get(port, "low")

                    port_info = {
                        "port": port, "service": service,
                        "banner": banner, "risk": risk,
                    }
                    open_ports.append(port_info)

                    await send(ws, "log",
                               msg=f"  {ip}:{port}  open  {service}",
                               level="open")
                    await send(ws, "port_open", ip=ip, **port_info)

                # Update progress
                p_val = int(
                    progress_base
                    + (h_idx * progress_step)
                    + (done_count / len(ports)) * progress_step
                )
                await send(ws, "progress", value=min(p_val, 99))

            open_ports.sort(key=lambda x: x["port"])
            host_result = {**host, "open_ports": open_ports}
            all_results.append(host_result)

            await send(ws, "host_done", ip=ip, open_ports=open_ports)

        # ── Done ────────────────────────────────
        total_open = sum(len(h["open_ports"]) for h in all_results)
        await send(ws, "log",
                   msg=f"Scan complete — {len(live_hosts)} hosts, {total_open} open ports",
                   level="sys")
        await send(ws, "progress", value=100)
        await send(ws, "done", hosts=all_results, total_ports=total_open)

    except WebSocketDisconnect:
        print("[WS] Client disconnected")
    except Exception as e:
        await send(ws, "error", msg=str(e))
    finally:
        executor.shutdown(wait=False)


# ─────────────────────────────────────────
# Health check
# ─────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "ok", "service": "network-scanner-api"}


if __name__ == "__main__":
    print("""
  ╔══════════════════════════════════════╗
  ║   Network Scanner — Backend Ready   ║
  ║   ws://localhost:8000/ws/scan        ║
  ╚══════════════════════════════════════╝
""")
    uvicorn.run("backend:app", host="0.0.0.0", port=8000, reload=False)
