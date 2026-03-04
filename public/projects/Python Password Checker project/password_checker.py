#!/usr/bin/env python3
"""
╔═══════════════════════════════════╗
║        🔑 PASSWORD CHECKER        ║
║  Python • Regex • APIs • Security ║
╚═══════════════════════════════════╝

Analyse la force d'un mot de passe :
  - Longueur, complexité, patterns
  - Mots du dictionnaire (regex)
  - Vérification HaveIBeenPwned (k-anonymity)
"""

import re
import sys
import math
import hashlib
import getpass

try:
    import requests
    REQUESTS_OK = True
except ImportError:
    REQUESTS_OK = False

# ─────────────────────────────────────────
#  COULEURS ANSI
# ─────────────────────────────────────────
class C:
    RESET  = "\033[0m"
    BOLD   = "\033[1m"
    RED    = "\033[91m"
    ORANGE = "\033[93m"
    YELLOW = "\033[33m"
    GREEN  = "\033[92m"
    CYAN   = "\033[96m"
    DIM    = "\033[2m"
    WHITE  = "\033[97m"

def color(text, *codes):
    return "".join(codes) + text + C.RESET


# ─────────────────────────────────────────
#  DICTIONNAIRE DE MOTS COMMUNS
# ─────────────────────────────────────────
COMMON_WORDS = [
    "password", "passwd", "pass", "secret", "azerty", "qwerty",
    "admin", "root", "user", "login", "welcome", "letmein",
    "monkey", "dragon", "master", "shadow", "sunshine",
    "princess", "football", "charlie", "michael", "batman",
    "superman", "iloveyou", "trustno1", "abc123", "abcdef",
    "bonjour", "motdepasse", "soleil", "amour",
]

# Regex compilés pour la performance
RE_LOWER    = re.compile(r'[a-z]')
RE_UPPER    = re.compile(r'[A-Z]')
RE_DIGIT    = re.compile(r'\d')
RE_SPECIAL  = re.compile(r'[^a-zA-Z0-9]')
RE_REPEAT   = re.compile(r'(.)\1{2,}')          # 3+ caractères identiques consécutifs
RE_SEQ_NUM  = re.compile(r'(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)')
RE_SEQ_ALF  = re.compile(r'(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)', re.IGNORECASE)
RE_KEYBOARD = re.compile(r'(qwerty|azerty|qwertz|asdfgh|zxcvbn|123456|654321)', re.IGNORECASE)
RE_DATE     = re.compile(r'(19|20)\d{2}')        # années type 1990-2029
RE_PHONE    = re.compile(r'\d{7,}')              # longue séquence numérique


# ─────────────────────────────────────────
#  ANALYSE DU MOT DE PASSE
# ─────────────────────────────────────────
def analyze_password(password: str) -> dict:
    """Retourne un dictionnaire complet d'analyse."""
    length = len(password)
    pw_lower = password.lower()

    # --- Composition ---
    has_lower   = bool(RE_LOWER.search(password))
    has_upper   = bool(RE_UPPER.search(password))
    has_digit   = bool(RE_DIGIT.search(password))
    has_special = bool(RE_SPECIAL.search(password))

    # Pool de caractères pour l'entropie
    pool = 0
    if has_lower:   pool += 26
    if has_upper:   pool += 26
    if has_digit:   pool += 10
    if has_special: pool += 32

    entropy = math.floor(length * math.log2(pool)) if pool > 0 else 0

    # --- Patterns dangereux (regex) ---
    patterns = {
        "Répétitions (aaa, 111...)":      bool(RE_REPEAT.search(password)),
        "Séquence numérique (123, 987...)": bool(RE_SEQ_NUM.search(password)),
        "Séquence alphabétique (abc...)":  bool(RE_SEQ_ALF.search(password)),
        "Pattern clavier (qwerty, azerty)": bool(RE_KEYBOARD.search(password)),
        "Année incluse (ex: 1990)":        bool(RE_DATE.search(password)),
        "Longue séquence numérique":       bool(RE_PHONE.search(password)),
    }

    # --- Mots du dictionnaire ---
    dict_match = next((w for w in COMMON_WORDS if w in pw_lower), None)

    # --- Score sur 100 ---
    score = 0

    # Longueur (max 30 pts)
    if length >= 20: score += 30
    elif length >= 16: score += 25
    elif length >= 12: score += 20
    elif length >= 10: score += 14
    elif length >= 8:  score += 8
    else:              score += 2

    # Complexité (max 40 pts)
    if has_lower:   score += 8
    if has_upper:   score += 8
    if has_digit:   score += 8
    if has_special: score += 16

    # Entropie bonus (max 20 pts)
    if entropy >= 80:   score += 20
    elif entropy >= 60: score += 14
    elif entropy >= 40: score += 8
    elif entropy >= 25: score += 4

    # Pénalités
    if dict_match:           score -= 30
    if any(patterns.values()): score -= 5 * sum(patterns.values())

    score = max(0, min(100, score))

    # --- Temps de crack (brute-force, moitié de l'espace de recherche) ---
    total_combinations = pool ** length if pool > 0 else 1

    def crack_time(attempts_per_sec):
        seconds = total_combinations / (2 * attempts_per_sec)
        if seconds < 1:         return "< 1 seconde ⚡"
        if seconds < 60:        return f"{seconds:.0f} secondes"
        if seconds < 3600:      return f"{seconds/60:.0f} minutes"
        if seconds < 86400:     return f"{seconds/3600:.1f} heures"
        if seconds < 31_536_000:return f"{seconds/86400:.0f} jours"
        years = seconds / 31_536_000
        if years < 1_000:       return f"{years:.0f} ans"
        if years < 1_000_000:   return f"{years/1000:.1f}k ans"
        return f"{years:.2e} ans 🌌"

    return {
        "length":      length,
        "has_lower":   has_lower,
        "has_upper":   has_upper,
        "has_digit":   has_digit,
        "has_special": has_special,
        "entropy":     entropy,
        "patterns":    patterns,
        "dict_match":  dict_match,
        "score":       score,
        "crack_10k":   crack_time(10_000),
        "crack_1m":    crack_time(1_000_000),
        "crack_1b":    crack_time(1_000_000_000),
    }


# ─────────────────────────────────────────
#  VÉRIFICATION HAVEIBEENPWNED (k-anonymity)
# ─────────────────────────────────────────
def check_hibp(password: str) -> tuple[bool, int, str]:
    """
    Envoie uniquement les 5 premiers caractères du hash SHA-1.
    Le mot de passe complet ne quitte JAMAIS la machine.
    Retourne (found: bool, count: int, error: str)
    """
    if not REQUESTS_OK:
        return False, 0, "Module 'requests' non installé (pip install requests)"

    sha1_hash = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    prefix, suffix = sha1_hash[:5], sha1_hash[5:]

    try:
        resp = requests.get(
            f"https://api.pwnedpasswords.com/range/{prefix}",
            headers={"Add-Padding": "true"},
            timeout=8
        )
        resp.raise_for_status()
    except requests.exceptions.Timeout:
        return False, 0, "Timeout — API HaveIBeenPwned inaccessible"
    except requests.exceptions.ConnectionError:
        return False, 0, "Pas de connexion internet"
    except Exception as e:
        return False, 0, f"Erreur API : {e}"

    for line in resp.text.splitlines():
        line_suffix, _, count = line.partition(':')
        if line_suffix.upper() == suffix:
            return True, int(count.strip()), ""

    return False, 0, ""


# ─────────────────────────────────────────
#  AFFICHAGE
# ─────────────────────────────────────────
def strength_label(score: int) -> tuple[str, str]:
    if score < 20:  return "CRITIQUE",  C.RED
    if score < 40:  return "FAIBLE",    C.ORANGE
    if score < 60:  return "MOYEN",     C.YELLOW
    if score < 80:  return "FORT",      C.GREEN
    return              "EXCELLENT", C.CYAN

def progress_bar(score: int, width: int = 30) -> str:
    _, col = strength_label(score)
    filled = int(score / 100 * width)
    bar = "█" * filled + "░" * (width - filled)
    return color(bar, col)

def check_line(label: str, passed: bool) -> str:
    icon = color("✓", C.GREEN) if passed else color("✗", C.RED)
    state = color(label, C.WHITE) if passed else color(label, C.DIM)
    return f"  {icon}  {state}"

def print_report(pw: str, a: dict):
    label, col = strength_label(a["score"])

    print()
    print(color("━" * 50, C.DIM))
    print(color("  🔑  RÉSULTATS D'ANALYSE", C.BOLD + C.WHITE))
    print(color("━" * 50, C.DIM))

    # Score
    print(f"\n  Force  :  {progress_bar(a['score'])}  {color(label, C.BOLD + col)}  ({a['score']}/100)")
    print(f"  Entropie :  {color(str(a['entropy']) + ' bits', C.CYAN)}")
    print(f"  Longueur :  {color(str(a['length']) + ' caractères', C.WHITE)}")

    # Critères
    print(f"\n{color('  CRITÈRES', C.BOLD + C.WHITE)}")
    print(check_line("Minuscules (a-z)",        a["has_lower"]))
    print(check_line("Majuscules (A-Z)",        a["has_upper"]))
    print(check_line("Chiffres (0-9)",          a["has_digit"]))
    print(check_line("Caractères spéciaux",     a["has_special"]))
    print(check_line("Longueur ≥ 8",            a["length"] >= 8))
    print(check_line("Longueur ≥ 12",           a["length"] >= 12))
    print(check_line("Longueur ≥ 16",           a["length"] >= 16))
    print(check_line("Pas de mot commun",       a["dict_match"] is None))
    print(check_line("Pas de pattern séquentiel", not any(a["patterns"].values())))

    # Patterns détectés
    detected = [k for k, v in a["patterns"].items() if v]
    if detected:
        print(f"\n{color('  ⚠  PATTERNS DÉTECTÉS (regex)', C.BOLD + C.ORANGE)}")
        for p in detected:
            print(f"     {color('→', C.ORANGE)} {p}")

    if a["dict_match"]:
        print(f"\n  {color('⚠', C.RED + C.BOLD)}  Contient le mot courant : {color(repr(a['dict_match']), C.RED + C.BOLD)}")

    # Temps de crack
    print(f"\n{color('  TEMPS DE CRACK ESTIMÉ (brute-force)', C.BOLD + C.WHITE)}")
    print(f"  PC standard   (10 000/s)  :  {color(a['crack_10k'], C.YELLOW)}")
    print(f"  GPU           (1 000 000/s):  {color(a['crack_1m'], C.YELLOW)}")
    print(f"  Cluster       (1 milliard/s): {color(a['crack_1b'], C.YELLOW)}")

    # Suggestions
    suggestions = []
    if a["length"] < 12:       suggestions.append("Augmentez la longueur à 12+ caractères")
    if not a["has_upper"]:     suggestions.append("Ajoutez des lettres majuscules")
    if not a["has_digit"]:     suggestions.append("Intégrez des chiffres")
    if not a["has_special"]:   suggestions.append("Utilisez des symboles (@, #, !, $...)")
    if detected:               suggestions.append("Évitez les séquences prévisibles")
    if a["dict_match"]:        suggestions.append("Remplacez ou masquez les mots du dictionnaire")

    if suggestions:
        print(f"\n{color('  SUGGESTIONS', C.BOLD + C.WHITE)}")
        for s in suggestions:
            print(f"  {color('▸', C.GREEN)} {s}")

    print(f"\n{color('━' * 50, C.DIM)}\n")


def print_hibp_result(found: bool, count: int, error: str):
    print(color("  HAVEIBEENPWNED  (k-anonymity — votre mot de passe ne quitte pas votre machine)", C.BOLD + C.WHITE))
    print(color("  ─────────────────────────────────────────────────────────", C.DIM))

    if error:
        print(f"  {color('⚠', C.ORANGE)}  {color(error, C.ORANGE)}")
    elif found:
        print(f"  {color('🚨 COMPROMIS', C.RED + C.BOLD)}  Ce mot de passe est apparu {color(str(count), C.RED + C.BOLD)} fois dans des fuites de données.")
        print(f"  {color('→', C.RED)}  Changez-le immédiatement et n'utilisez pas ce mot de passe.")
    else:
        print(f"  {color('✓ NON TROUVÉ', C.GREEN + C.BOLD)}  Aucune fuite connue pour ce mot de passe.")
        print(f"  {color('→', C.DIM)}  Cela ne garantit pas une sécurité absolue.")

    print(color("\n  ─────────────────────────────────────────────────────────", C.DIM))


# ─────────────────────────────────────────
#  POINT D'ENTRÉE
# ─────────────────────────────────────────
def main():
    print()
    print(color("╔════════════════════════════════════╗", C.YELLOW))
    print(color("║       🔑  PASSWORD  CHECKER        ║", C.YELLOW + C.BOLD))
    print(color("║   Python • Regex • APIs • Security ║", C.YELLOW))
    print(color("╚════════════════════════════════════╝", C.YELLOW))
    print()
    print(color("  Votre mot de passe n'est PAS affiché à la saisie.", C.DIM))
    print(color("  Pour l'API HaveIBeenPwned, seul un préfixe du hash SHA-1 est envoyé.", C.DIM))
    print()

    while True:
        try:
            # Saisie masquée
            if sys.stdin.isatty():
                password = getpass.getpass(color("  Entrez votre mot de passe : ", C.CYAN))
            else:
                # Mode non-interactif (pipe)
                password = input().strip()
        except (KeyboardInterrupt, EOFError):
            print(color("\n\n  Au revoir.\n", C.DIM))
            sys.exit(0)

        if not password:
            print(color("  ⚠  Aucun mot de passe saisi.\n", C.ORANGE))
            continue

        # Analyse
        analysis = analyze_password(password)
        print_report(password, analysis)

        # HIBP
        print(color("  Vérification HaveIBeenPwned...\n", C.DIM))
        found, count, error = check_hibp(password)
        print_hibp_result(found, count, error)

        # Nouveau test ?
        print()
        try:
            again = input(color("  Tester un autre mot de passe ? [O/n] : ", C.DIM)).strip().lower()
        except (KeyboardInterrupt, EOFError):
            print()
            break

        if again in ("n", "non", "no", "q", "quit"):
            break
        print()

    print(color("\n  Session terminée.\n", C.DIM))


if __name__ == "__main__":
    main()
