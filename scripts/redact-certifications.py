#!/usr/bin/env python3
# scripts/redact-certifications.py
# --------------------------------
# Produit les versions publiables des diplômes (public/certifications/) en
# floutant de façon irréversible les données personnelles : date et lieu de
# naissance, numéros de titre et identifiants de diplôme, QR code, signatures,
# adresse e-mail (Linguaskill).
#
# Chaque zone est d'abord réduite à quelques pixels (l'information est
# détruite), puis agrandie et adoucie : l'effet est un flou, mais aucun
# caractère n'est récupérable — contrairement à un simple flou gaussien.
#
# Les ORIGINAUX ne doivent jamais être versionnés : les garder hors du dépôt.
#
# Usage :
#   pip install pypdfium2 pillow
#   python3 scripts/redact-certifications.py <dossier-des-originaux> public/certifications
#
# Le dossier des originaux doit contenir :
#   tssr-greta-diploma.pdf, tai-greta-diploma.pdf, openclassrooms-dcl-diploma.pdf,
#   Certification_LINGUASKILL_Page_1.png
# Sorties : <nom>.png / .webp / .pdf (PDF image seule, sans couche texte),
#   Certification_LINGUASKILL_Page_1.png / .webp, et les vignettes *-badge.png
#   affichées sur la page Certifications.
#
# Les zones sont exprimées en pixels sur un rendu de référence (ref), puis
# converties en fractions : elles restent valables quelle que soit la
# résolution du rendu.
import sys, pypdfium2 as pdfium
from PIL import Image, ImageFilter

CERT = sys.argv[1]   # dossier des originaux
OUT  = sys.argv[2]   # dossier de sortie (public/certifications)

def blur(im, box_frac):
    W, H = im.size
    x0, y0, x1, y1 = [int(round(v)) for v in (box_frac[0]*W, box_frac[1]*H, box_frac[2]*W, box_frac[3]*H)]
    region = im.crop((x0, y0, x1, y1))
    w, h = region.size
    tiny = region.resize((max(1, w // 40), max(1, h // 40)), Image.BILINEAR)
    region = tiny.resize((w, h), Image.BILINEAR).filter(ImageFilter.GaussianBlur(radius=max(4, h // 6)))
    im.paste(region, (x0, y0))
    return im

def frac(box, size):
    W, H = size
    return (box[0]/W, box[1]/H, box[2]/W, box[3]/H)

# Zones mesurées sur les rendus de relecture (pixels) → fractions
DOCS = {
  "tssr-greta-diploma": dict(src="pdf", page=0, ref=(735, 511), boxes=[
      (222, 158, 441, 181),   # date et lieu de naissance
      (16, 394, 92, 416),     # numéro du titre
      (0, 482, 30, 511),      # QR code
      (648, 392, 700, 434),   # signature
  ]),
  "tai-greta-diploma": dict(src="pdf", page=0, ref=(735, 561), boxes=[
      (313, 178, 582, 200),   # date et lieu de naissance
      (80, 459, 148, 481),    # numéro du titre
      (540, 476, 596, 517),   # signature
  ]),
  "openclassrooms-dcl-diploma": dict(src="pdf", page=0, ref=(1011, 715), boxes=[
      (26, 645, 176, 670),    # identifiant du diplôme
      (422, 535, 592, 594),   # signature
  ]),
}

for name, d in DOCS.items():
    pdf = pdfium.PdfDocument(f"{CERT}/{name}.pdf")
    im = pdf[d["page"]].render(scale=3.5).to_pil().convert("RGB")
    for b in d["boxes"]:
        im = blur(im, frac(b, d["ref"]))
    im.save(f"{OUT}/{name}.png", optimize=True)
    w = im.copy(); w.thumbnail((1920, 1920)); w.save(f"{OUT}/{name}.webp", quality=88)
    # PDF image seule : aucune couche texte, aucune métadonnée d'origine
    w2 = im.copy(); w2.thumbnail((2400, 2400))
    w2.save(f"{OUT}/{name}.pdf", "PDF", resolution=200.0)

# Linguaskill : source PNG haute définition (page 1 seulement contient des données personnelles)
ling = Image.open(f"{CERT}/Certification_LINGUASKILL_Page_1.png").convert("RGB")
for b in [(468, 47, 698, 86),    # identifiant de connexion et référence (adresse e-mail)
          (74, 230, 222, 258)]:  # date de naissance
    ling = blur(ling, frac(b, (778, 1100)))
ling.save(f"{OUT}/Certification_LINGUASKILL_Page_1.png", optimize=True)
w = ling.copy(); w.thumbnail((2716, 2716)); w.save(f"{OUT}/Certification_LINGUASKILL_Page_1.webp", quality=88)
# Vignettes de la page Certifications (affichées en 40 px, object-contain) :
# dérivées des versions floutées, jamais des originaux.
BADGES = {
  "dev-concepteur-badge": "openclassrooms-dcl-diploma.png",
  "systems-networks-badge": "tssr-greta-diploma.png",
  "tai-badge": "tai-greta-diploma.png",
  "linguaskill-badge": "Certification_LINGUASKILL_Page_1.png",
}
for badge, src in BADGES.items():
    im = Image.open(f"{OUT}/{src}").convert("RGB")
    im.thumbnail((1060, 780))
    canvas = Image.new("RGB", (1100, 820), "white")
    canvas.paste(im, ((1100 - im.width) // 2, (820 - im.height) // 2))
    canvas.save(f"{OUT}/{badge}.png", optimize=True)

print("ok")

