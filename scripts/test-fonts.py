from playwright.sync_api import sync_playwright
import os

html_content = '''<!DOCTYPE html>
<html>
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Oswald:wght@700;800;900&family=Barlow+Condensed:wght@800;900&display=swap" rel="stylesheet">
<style>
body { background: #F4F5EB; padding: 40px; font-family: sans-serif; }
.card { margin-bottom: 30px; background: white; padding: 20px; border-radius: 8px; }
.label { font-size: 14px; font-weight: bold; color: #444; margin-bottom: 8px; }
.h { font-size: 54px; line-height: 1.05; text-transform: uppercase; margin: 0; }
.red { color: #F12D18; display: block; }
.green { color: #153D25; display: block; }
</style>
</head>
<body>

<div class="card">
  <div class="label">1. Impact with letter-spacing: 0.04em (Clean spacing matching reference)</div>
  <h1 class="h" style="font-family: Impact, sans-serif; letter-spacing: 0.04em;">
    <span class="red">GIFTS THAT</span>
    <span class="green">MAKE AN IMPACT</span>
  </h1>
</div>

<div class="card">
  <div class="label">2. Impact with letter-spacing: 0.02em</div>
  <h1 class="h" style="font-family: Impact, sans-serif; letter-spacing: 0.02em;">
    <span class="red">GIFTS THAT</span>
    <span class="green">MAKE AN IMPACT</span>
  </h1>
</div>

<div class="card">
  <div class="label">3. Anton (Google Font) with letter-spacing: 0.04em</div>
  <h1 class="h" style="font-family: 'Anton', sans-serif; letter-spacing: 0.04em;">
    <span class="red">GIFTS THAT</span>
    <span class="green">MAKE AN IMPACT</span>
  </h1>
</div>

<div class="card">
  <div class="label">4. Bebas Neue with letter-spacing: 0.04em</div>
  <h1 class="h" style="font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em;">
    <span class="red">GIFTS THAT</span>
    <span class="green">MAKE AN IMPACT</span>
  </h1>
</div>

<div class="card">
  <div class="label">5. Oswald 800 with letter-spacing: 0.02em</div>
  <h1 class="h" style="font-family: 'Oswald', sans-serif; font-weight: 800; letter-spacing: 0.02em;">
    <span class="red">GIFTS THAT</span>
    <span class="green">MAKE AN IMPACT</span>
  </h1>
</div>

<div class="card">
  <div class="label">6. Barlow Condensed 900 with letter-spacing: 0.02em</div>
  <h1 class="h" style="font-family: 'Barlow Condensed', sans-serif; font-weight: 900; letter-spacing: 0.02em;">
    <span class="red">GIFTS THAT</span>
    <span class="green">MAKE AN IMPACT</span>
  </h1>
</div>

</body>
</html>'''

with open('reports/font-test.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 850, 'height': 1500})
    file_url = 'file:///' + os.path.abspath('reports/font-test.html').replace('\\\\', '/')
    page.goto(file_url)
    page.wait_for_timeout(2500)
    page.screenshot(path='reports/font-comparison.png')
    browser.close()

print('Font comparison screenshot captured successfully!')
