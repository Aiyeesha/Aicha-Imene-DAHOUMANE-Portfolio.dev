#!/usr/bin/env python3
# scripts/privacy/redact-certifications.py
# --------------------------------
# Produces the publishable versions of the diplomas (public/certifications/)
# by irreversibly blurring personal data: date and place of birth, title
# numbers and diploma ids, QR code, signatures, email address (Linguaskill).
#
# Each area is first shrunk to a few pixels (the information is destroyed),
# then enlarged and smoothed: it looks blurred, but unlike a plain Gaussian
# blur no character can be recovered.
#
# The ORIGINALS must never be committed: keep them outside the repository.
#
# Usage:
#   pip install pypdfium2 pillow
#   python3 scripts/privacy/redact-certifications.py <originals-folder> public/certifications
#
# The originals folder must contain:
#   tssr-greta-diploma.pdf, tai-greta-diploma.pdf, openclassrooms-dcl-diploma.pdf,
#   Certification_LINGUASKILL_Page_1.png
# Outputs: <name>.png / .webp / .pdf (image-only PDF, no text layer),
#   Certification_LINGUASKILL_Page_1.png / .webp, and the *-badge.png
#   thumbnails shown on the Certifications page.
#
# Areas are given in pixels on a reference render (ref), then converted to
# fractions, so they hold at any render resolution.
import sys, pypdfium2 as pdfium
from PIL import Image, ImageFilter

CERT = sys.argv[1]   # originals folder
OUT  = sys.argv[2]   # output folder (public/certifications)

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

# Areas measured on the review renders (pixels) → fractions
DOCS = {
  "tssr-greta-diploma": dict(src="pdf", page=0, ref=(735, 511), boxes=[
      (222, 158, 441, 181),   # date and place of birth
      (16, 394, 92, 416),     # title number
      (0, 482, 30, 511),      # QR code
      (648, 392, 700, 434),   # signature
  ]),
  "tai-greta-diploma": dict(src="pdf", page=0, ref=(735, 561), boxes=[
      (313, 178, 582, 200),   # date and place of birth
      (80, 459, 148, 481),    # title number
      (540, 476, 596, 517),   # signature
  ]),
  "openclassrooms-dcl-diploma": dict(src="pdf", page=0, ref=(1011, 715), boxes=[
      (26, 645, 176, 670),    # diploma id
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
    # Image-only PDF: no text layer, no original metadata
    w2 = im.copy(); w2.thumbnail((2400, 2400))
    w2.save(f"{OUT}/{name}.pdf", "PDF", resolution=200.0)

# Linguaskill: high-resolution PNG source (only page 1 holds personal data)
ling = Image.open(f"{CERT}/Certification_LINGUASKILL_Page_1.png").convert("RGB")
for b in [(468, 47, 698, 86),    # login id and reference (email address)
          (74, 230, 222, 258)]:  # date of birth
    ling = blur(ling, frac(b, (778, 1100)))
ling.save(f"{OUT}/Certification_LINGUASKILL_Page_1.png", optimize=True)
w = ling.copy(); w.thumbnail((2716, 2716)); w.save(f"{OUT}/Certification_LINGUASKILL_Page_1.webp", quality=88)
# Certifications page thumbnails (shown at 40px, object-contain): derived
# from the blurred versions, never from the originals.
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

