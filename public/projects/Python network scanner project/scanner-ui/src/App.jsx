import { useState, useEffect, useRef, useCallback } from "react";

const WS_URL = "ws://localhost:8000/ws/scan";

const riskColor = (r) =>
  r === "high" ? "#ff4d4d" : r === "medium" ? "#ffd700" : "#00e5c3";

const logColor = (t) =>
  ({ found: "#00e5ff", open: "#00e5c3", sys: "#556655", error: "#ff4d4d" }[t] ?? "#c8d8c8");

function Blink({ children, active }) {
  const [vis, setVis] = useState(true);
  useEffect(() => {
    if (!active) { setVis(true); return; }
    const t = setInterval(() => setVis((v) => !v), 500);
    return () => clearInterval(t);
  }, [active]);
  return <span style={{ opacity: active ? (vis ? 1 : 0) : 1 }}>{children}</span>;
}

export default function NetworkScanner() {
  const [target, setTarget]     = useState("192.168.1.0/24");
  const [ports, setPorts]       = useState("top");
  const [tout, setTout]         = useState(1.0);
  const [noBanner, setNoBanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [phase, setPhase]       = useState("idle");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs]         = useState([]);
  const [hosts, setHosts]       = useState({});
  const [portsByHost, setPortsByHost] = useState({});
  const [selectedIp, setSelected]    = useState(null);
  const [stats, setStats]       = useState(null);
  const [wsError, setWsError]   = useState(null);

  const wsRef   = useRef(null);
  const logsRef = useRef(null);
  const t0      = useRef(null);

  useEffect(() => {
    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [logs]);

  const addLog = useCallback((msg, level = "info") => {
    const ts = new Date().toLocaleTimeString();
    setLogs((l) => [...l.slice(-500), { msg, level, ts }]);
  }, []);

  const startScan = () => {
    if (wsRef.current) wsRef.current.close();
    setScanning(true); setPhase("connecting"); setProgress(0);
    setLogs([]); setHosts({}); setPortsByHost({});
    setSelected(null); setStats(null); setWsError(null);
    t0.current = Date.now();

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      addLog("WebSocket connected → backend", "sys");
      ws.send(JSON.stringify({ target, ports, timeout: tout, no_banner: noBanner }));
    };

    ws.onmessage = ({ data }) => {
      let e; try { e = JSON.parse(data); } catch { return; }

      if (e.type === "log")       addLog(e.msg, e.level);
      if (e.type === "phase")     setPhase(e.phase);
      if (e.type === "progress")  setProgress(e.value);

      if (e.type === "host_found")
        setHosts((h) => ({ ...h, [e.ip]: { ip: e.ip, ttl: e.ttl, os: e.os, done: false } }));

      if (e.type === "port_open")
        setPortsByHost((p) => ({
          ...p,
          [e.ip]: [...(p[e.ip] || []),
            { port: e.port, service: e.service, banner: e.banner, risk: e.risk }
          ].sort((a, b) => a.port - b.port),
        }));

      if (e.type === "host_done")
        setHosts((h) => ({ ...h, [e.ip]: { ...(h[e.ip] || { ip: e.ip }), done: true } }));

      if (e.type === "done") {
        const elapsed = ((Date.now() - t0.current) / 1000).toFixed(1);
        setStats({ hosts: e.hosts.length, ports: e.total_ports, time: `${elapsed}s` });
        setPhase("done"); setScanning(false);
      }

      if (e.type === "error") {
        setWsError(e.msg); addLog(`ERROR: ${e.msg}`, "error");
        setScanning(false); setPhase("idle");
      }
    };

    ws.onerror = () => {
      setWsError("Cannot connect to backend — run: python backend.py");
      addLog("WebSocket error — is backend.py running on :8000 ?", "error");
      setScanning(false); setPhase("idle");
    };

    ws.onclose = () => {
      if (scanning) { addLog("Connection closed", "sys"); setScanning(false); }
    };
  };

  const stopScan = () => {
    if (wsRef.current) wsRef.current.close();
    addLog("Scan cancelled", "sys");
    setScanning(false); setPhase("idle");
  };

  const hostList = Object.values(hosts);
  const selHost  = selectedIp ? hosts[selectedIp] : null;
  const selPorts = selectedIp ? (portsByHost[selectedIp] || []) : [];

  const phaseLabel = {
    idle: "IDLE", connecting: "CONNECTING…", discovery: "DISCOVERY",
    scanning: "SCANNING", done: "COMPLETE",
  }[phase] ?? phase.toUpperCase();

  // ─── styles ───────────────────────────────────
  const inputStyle = (disabled) => ({
    width: "100%", boxSizing: "border-box",
    background: "#0a1a13", border: "1px solid #0f3020",
    color: "#00e5c3", padding: "0.45rem 0.6rem",
    fontFamily: "monospace", fontSize: "0.82rem",
    outline: "none", borderRadius: "2px",
    opacity: disabled ? 0.45 : 1,
  });

  const label = (text) => (
    <div style={{ fontSize: "0.58rem", color: "#3a6a4a", letterSpacing: "0.2em", marginBottom: "0.35rem" }}>
      {text}
    </div>
  );

  return (
    <div style={{
      background: "#080c0f", minHeight: "100vh",
      fontFamily: "'Courier New', monospace", color: "#c8d8c8",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      {/* scanlines */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999,
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,229,199,.012) 2px,rgba(0,229,199,.012) 4px)",
      }} />

      {/* ── Header ── */}
      <div style={{
        padding: "0.85rem 1.6rem", borderBottom: "1px solid #0f2a1e",
        display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0,
        background: "linear-gradient(180deg,#0a1a13 0%,#080c0f 100%)",
      }}>
        <span style={{ fontSize: "1.4rem" }}>🛰</span>
        <div>
          <div style={{
            fontSize: "1.15rem", fontWeight: "bold", letterSpacing: "0.25em",
            color: "#00e5c3", textShadow: "0 0 16px rgba(0,229,195,.45)",
          }}>
            NETWORK SCANNER
          </div>
          <div style={{ fontSize: "0.58rem", color: "#3a6a4a", letterSpacing: "0.16em" }}>
            PORT SCANNING · SERVICE DETECTION · BANNER GRABBING · OS FINGERPRINTING
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#3a6a4a" }}>STATUS</div>
          <div style={{
            fontSize: "0.78rem", fontWeight: "bold", letterSpacing: "0.12em",
            color: phase === "done" ? "#00e5c3" : phase === "idle" ? "#2a4a3a" : "#ffd700",
          }}>
            {phaseLabel}{scanning && <Blink active> █</Blink>}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── LEFT PANEL ── */}
        <div style={{
          width: "265px", minWidth: "265px", borderRight: "1px solid #0f2a1e",
          padding: "1rem", display: "flex", flexDirection: "column", gap: "0.8rem",
          background: "#060a0d", overflowY: "auto",
        }}>

          {wsError && (
            <div style={{
              background: "#180808", border: "1px solid #4a1010",
              padding: "0.6rem 0.75rem", fontSize: "0.7rem",
              color: "#ff7777", borderRadius: "2px", lineHeight: 1.5,
            }}>
              ⚠ {wsError}
            </div>
          )}

          <div>{label("TARGET")}
            <input value={target} onChange={(e) => setTarget(e.target.value)}
              disabled={scanning} placeholder="IP, CIDR, hostname"
              style={inputStyle(scanning)} />
          </div>

          <div>{label("PORT PROFILE")}
            <select value={ports} onChange={(e) => setPorts(e.target.value)}
              disabled={scanning} style={inputStyle(scanning)}>
              <option value="top">Common services (top)</option>
              <option value="1-1024">1 – 1024</option>
              <option value="22,80,443,3306,5432,6379,27017">Quick critical</option>
              <option value="1-65535">Full (1–65535)</option>
            </select>
          </div>

          <div>{label("TIMEOUT (sec)")}
            <input type="number" min="0.2" max="5" step="0.1" value={tout}
              onChange={(e) => setTout(parseFloat(e.target.value))}
              disabled={scanning} style={inputStyle(scanning)} />
          </div>

          <label style={{ display: "flex", gap: "0.5rem", alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" checked={noBanner}
              onChange={(e) => setNoBanner(e.target.checked)}
              disabled={scanning} style={{ accentColor: "#00e5c3" }} />
            <span style={{ fontSize: "0.7rem", color: "#3a6a4a" }}>Skip banner grabbing</span>
          </label>

          <button
            onClick={scanning ? stopScan : startScan}
            style={{
              background: scanning
                ? "linear-gradient(135deg,#3a0a0a,#200808)"
                : "linear-gradient(135deg,#00e5c3,#009980)",
              border: "none",
              color: scanning ? "#ff6666" : "#000",
              padding: "0.68rem", fontFamily: "monospace",
              fontWeight: "bold", fontSize: "0.8rem",
              letterSpacing: "0.15em", cursor: "pointer",
              borderRadius: "2px",
              boxShadow: scanning
                ? "0 0 14px rgba(255,77,77,.2)"
                : "0 0 18px rgba(0,229,195,.28)",
              transition: "all .2s",
            }}
          >
            {scanning ? "■ STOP SCAN" : "▶ LAUNCH SCAN"}
          </button>

          {/* Progress */}
          <div>
            <div style={{ background: "#0a1a13", height: "3px", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progress}%`,
                background: "linear-gradient(90deg,#009980,#00e5c3)",
                transition: "width .3s",
                boxShadow: progress > 0 ? "0 0 8px rgba(0,229,195,.55)" : "none",
              }} />
            </div>
            <div style={{ fontSize: "0.58rem", color: "#3a6a4a", textAlign: "right", marginTop: "0.2rem" }}>
              {progress}%
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div style={{
              background: "#0a1a13", border: "1px solid #0f3020",
              padding: "0.7rem", borderRadius: "2px",
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.4rem", textAlign: "center",
            }}>
              {[["HOSTS", stats.hosts], ["PORTS", stats.ports], ["TIME", stats.time]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: "1.1rem", color: "#00e5c3", fontWeight: "bold" }}>{v}</div>
                  <div style={{ fontSize: "0.54rem", color: "#3a6a4a", letterSpacing: "0.14em" }}>{k}</div>
                </div>
              ))}
            </div>
          )}

          {/* Host list */}
          {hostList.length > 0 && (
            <div>
              {label(`LIVE HOSTS (${hostList.length})`)}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.22rem" }}>
                {hostList.map((h) => {
                  const n = (portsByHost[h.ip] || []).length;
                  const sel = selectedIp === h.ip;
                  return (
                    <div key={h.ip} onClick={() => setSelected(h.ip)}
                      style={{
                        padding: "0.42rem 0.65rem",
                        background: sel ? "#0f3020" : "#0a1a13",
                        border: `1px solid ${sel ? "#00e5c3" : "#0f2a1e"}`,
                        cursor: "pointer", borderRadius: "2px",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        transition: "all .12s",
                      }}>
                      <div>
                        <div style={{ fontSize: "0.76rem", color: "#00e5c3" }}>{h.ip}</div>
                        <div style={{ fontSize: "0.56rem", color: "#3a6a4a" }}>{h.os}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{
                          fontSize: "0.82rem", fontWeight: "bold",
                          color: n > 0 ? "#ffd700" : "#3a6a4a",
                        }}>
                          {h.done ? n : <Blink active>…</Blink>}
                        </div>
                        {n > 0 && <div style={{ fontSize: "0.52rem", color: "#3a6a4a" }}>open</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: details + log ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Port table */}
          <div style={{ flex: 1, overflow: "auto", padding: "1rem 1.2rem" }}>
            {selHost ? (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.8rem", marginBottom: "0.85rem" }}>
                  <div style={{
                    fontSize: "1rem", color: "#00e5c3", fontWeight: "bold",
                    textShadow: "0 0 10px rgba(0,229,195,.4)",
                  }}>{selHost.ip}</div>
                  <div style={{ fontSize: "0.65rem", color: "#3a6a4a" }}>
                    OS≈ {selHost.os || "Unknown"} · TTL={selHost.ttl || "?"}
                  </div>
                  <div style={{
                    marginLeft: "auto", fontSize: "0.65rem", letterSpacing: "0.1em",
                    color: selPorts.length > 0 ? "#ffd700" : "#3a6a4a",
                  }}>
                    {selPorts.length} OPEN PORT{selPorts.length !== 1 ? "S" : ""}
                    {!selHost.done && <Blink active> …</Blink>}
                  </div>
                </div>

                {selPorts.length > 0 ? (
                  <div style={{ border: "1px solid #0f2a1e", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{
                      display: "grid", gridTemplateColumns: "68px 88px 130px 1fr 72px",
                      background: "#0a1a13", padding: "0.42rem 0.9rem",
                      fontSize: "0.56rem", letterSpacing: "0.18em", color: "#3a6a4a",
                      borderBottom: "1px solid #0f2a1e",
                    }}>
                      {["PORT","STATE","SERVICE","BANNER","RISK"].map((h) => <span key={h}>{h}</span>)}
                    </div>
                    {selPorts.map((p, i) => (
                      <div key={p.port} style={{
                        display: "grid", gridTemplateColumns: "68px 88px 130px 1fr 72px",
                        padding: "0.52rem 0.9rem", fontSize: "0.79rem",
                        background: i % 2 === 0 ? "#060a0d" : "#080c10",
                        borderBottom: "1px solid #0a1a13", alignItems: "center",
                      }}>
                        <span style={{ color: "#00e5c3", fontWeight: "bold" }}>{p.port}</span>
                        <span style={{ color: "#00e5c3", fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "4px" }}>
                          <span style={{ display: "inline-block", width: 6, height: 6, background: "#00e5c3", borderRadius: "50%", boxShadow: "0 0 4px #00e5c3" }} />
                          open
                        </span>
                        <span style={{ color: "#c8d8c8" }}>{p.service}</span>
                        <span style={{ color: "#3a6a4a", fontSize: "0.7rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.banner || "—"}
                        </span>
                        <span style={{
                          fontSize: "0.6rem", fontWeight: "bold", letterSpacing: "0.1em",
                          color: riskColor(p.risk), textShadow: `0 0 6px ${riskColor(p.risk)}55`,
                        }}>
                          {(p.risk || "low").toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: "#1a3a28", fontSize: "0.75rem", paddingTop: "1.5rem" }}>
                    {selHost.done ? "No open ports." : <Blink active>Scanning…</Blink>}
                  </div>
                )}

                {/* Legend */}
                <div style={{ marginTop: "0.8rem", display: "flex", gap: "1.2rem", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                  {[["LOW","#00e5c3"],["MEDIUM","#ffd700"],["HIGH","#ff4d4d"]].map(([l,c]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#3a6a4a" }}>
                      <div style={{ width:7, height:7, background:c, borderRadius:"50%", boxShadow:`0 0 5px ${c}` }} />
                      {l}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{
                height: "100%", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                color: "#1a3a28", gap: "0.5rem",
              }}>
                <div style={{ fontSize: "2.6rem", opacity: 0.35 }}>◉</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}>
                  {hostList.length > 0 ? "SELECT A HOST" : "CONFIGURE TARGET AND LAUNCH SCAN"}
                </div>
              </div>
            )}
          </div>

          {/* ── Log terminal ── */}
          <div style={{
            height: "190px", borderTop: "1px solid #0f2a1e",
            background: "#050809", flexShrink: 0,
          }}>
            <div style={{
              padding: "0.35rem 1rem 0.2rem",
              fontSize: "0.56rem", letterSpacing: "0.18em", color: "#3a6a4a",
              borderBottom: "1px solid #0a140a",
              display: "flex", justifyContent: "space-between",
            }}>
              <span>SYSTEM LOG</span>
              <span style={{ opacity: 0.5 }}>{WS_URL}</span>
            </div>
            <div ref={logsRef} style={{
              height: "calc(100% - 26px)", overflowY: "auto",
              padding: "0.4rem 1rem",
            }}>
              {logs.length === 0 && (
                <div style={{ color: "#1a3a28", fontSize: "0.7rem" }}>
                  Awaiting command<Blink active={phase === "idle"}>_</Blink>
                </div>
              )}
              {logs.map((l, i) => (
                <div key={i} style={{
                  fontSize: "0.7rem", lineHeight: 1.65,
                  color: logColor(l.level), fontFamily: "monospace",
                }}>
                  <span style={{ color: "#1a4a2a", marginRight: "0.8rem" }}>{l.ts}</span>
                  {l.msg}
                </div>
              ))}
              {scanning && <Blink active><span style={{ color: "#00e5c3" }}>█</span></Blink>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
