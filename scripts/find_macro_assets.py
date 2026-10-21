import json
import os

with open('public/catalog-assets/manifest.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('=== Unique assets on pages 3 to 8 ===')
for item in data.get('unique_assets', []):
    pages = item.get('pages', [])
    relevant = [p for p in pages if 3 <= p <= 8]
    if relevant:
        print(f"{item['filename']} | Pages: {pages} | Dims: {item['width']}x{item['height']} | Class: {item['classification']}")

print('\n=== Placements on page 4 (where PIX-033 is located) ===')
for p in data.get('placements', []):
    if p.get('page') in [3, 4, 5, 6, 7, 8]:
        print(f"Page {p.get('page')}: {p.get('filename')} (type: {p.get('type')})")
