import urllib.request
import re
from collections import Counter
import json

base_url = "https://www.pnzfas.com/edition/"
index_url = base_url + "index.html"

req = urllib.request.Request(index_url, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req).read().decode("utf-8")

# Extract stylesheets
css_links = re.findall(r'href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', html)
print(f"Found {len(css_links)} CSS links:")
for c in css_links:
    print(" -", c)

# Download and analyze all CSS
all_css = {}
for link in css_links:
    css_url = urllib.parse.urljoin(base_url, link)
    try:
        r = urllib.request.Request(css_url, headers={"User-Agent": "Mozilla/5.0"})
        content = urllib.request.urlopen(r).read().decode("utf-8", errors="ignore")
        all_css[link] = content
    except Exception as e:
        print(f"Error fetching {link}: {e}")

combined_css = "\n".join(all_css.values())

# 1. Fonts analysis
font_faces = re.findall(r'@font-face\s*\{([^}]+)\}', combined_css)
print("\n=== @font-face declarations ===")
for ff in font_faces:
    family = re.search(r'font-family\s*:\s*([^;]+)', ff)
    style = re.search(r'font-style\s*:\s*([^;]+)', ff)
    weight = re.search(r'font-weight\s*:\s*([^;]+)', ff)
    src = re.search(r'src\s*:\s*([^;]+)', ff)
    print(f"Family: {family.group(1) if family else '?'}, Style: {style.group(1) if style else '?'}, Weight: {weight.group(1) if weight else '?'}, Src: {src.group(1)[:50] if src else '?'}")

# 2. Font family rules
print("\n=== Font family rules across site ===")
font_families = re.findall(r'font-family\s*:\s*([^;\}]+)', combined_css)
for f, count in Counter([x.strip() for x in font_families]).most_common(15):
    print(f"{count}x: {f}")

# 3. CSS Variables
print("\n=== CSS Custom Properties (:root) ===")
css_vars = re.findall(r'(--[a-zA-Z0-9_-]+)\s*:\s*([^;\}]+)', combined_css)
var_dict = {}
for k, v in css_vars:
    var_dict[k.strip()] = v.strip()
for k, v in sorted(var_dict.items()):
    print(f"{k}: {v}")

# 4. Heading styles (h1, h2, h3, h4)
print("\n=== Headings and em styling ===")
for selector in ['h1', 'h2', 'h3', 'h4', 'em', r'\.eyebrow', r'\.intro-location', r'\.intro-reach']:
    pattern = r'(?:^|\})([^{}]*' + selector + r'[^{}]*)\{([^}]+)\}'
    matches = re.findall(pattern, combined_css)
    print(f"\n--- Selector: {selector} ({len(matches)} rules found) ---")
    for sel_match, body in matches[:5]:
        print("  ", sel_match.strip(), "->", re.sub(r'\s+', ' ', body).strip())

# 5. Buttons and Links
print("\n=== Button & Link styles ===")
btn_rules = re.findall(r'([^{}]*(?:button|\.btn|\.contact|\.intro-contact|\.primary)[^{]*\{[^}]+\})', combined_css)
for b in btn_rules[:10]:
    clean = re.sub(r'\s+', ' ', b).strip()
    if any(k in clean for k in ['background', 'color', 'border', 'padding', 'border-radius', 'font']):
        print("  ", clean)

# 6. Colors extracted
print("\n=== Color Palette Breakdown ===")
hexes = re.findall(r'#[0-9a-fA-F]{3,8}\b', combined_css)
for h, count in Counter([x.lower() for x in hexes]).most_common(20):
    print(f"{count}x: {h}")
