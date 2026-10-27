import os
import re

# 1. BrandingHeroShowcase.tsx
b_path = r'c:\Users\SEBIN\Desktop\AV\src\components\branding\BrandingHeroShowcase.tsx'
if os.path.exists(b_path):
    with open(b_path, 'r', encoding='utf-8') as f:
        content = f.read()

    old_headline = """          <h2
            style={{
              fontSize: 'clamp(28px, 3.8cqw, 48px)',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: '0 0 10px 0'
            }}
          >
            <span style={{ color: '#153D25', display: 'block' }}>Your Brand,</span>
            <span style={{ color: '#E01E10', display: 'block' }}>Precision Imprinted.</span>
          </h2>"""

    new_headline = """          <h2
            style={{
              fontSize: 'clamp(28px, 3.8cqw, 48px)',
              fontWeight: 500,
              letterSpacing: '-0.055em',
              lineHeight: 1.05,
              margin: '0 0 10px 0'
            }}
          >
            <span style={{ color: '#292923', display: 'block' }}>Your Brand,</span>
            <em style={{ color: '#A34D33', display: 'block', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.035em' }}>Precision Imprinted.</em>
          </h2>"""

    content = content.replace(old_headline, new_headline)
    content = content.replace("#153D25", "#292923")
    content = content.replace("#3A483D", "#66645A")
    content = content.replace("#2B382D", "#292923")
    content = content.replace("#E01E10", "#D53B3B")

    with open(b_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated BrandingHeroShowcase.tsx")

# 2. productSpecSheet.ts
p_path = r'c:\Users\SEBIN\Desktop\AV\src\lib\productSpecSheet.ts'
if os.path.exists(p_path):
    with open(p_path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("const colorPrimary = [21, 61, 37];     // #153D25 Deep Forest Green", "const colorPrimary = [41, 41, 35];     // #292923 PNZ Archival Ink")
    content = content.replace("const colorAccent = [241, 45, 24];     // #F12D18 Vivid Vermilion Red", "const colorAccent = [163, 77, 51];     // #A34D33 PNZ Burnt Copper")
    with open(p_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated productSpecSheet.ts")

# 3. AdminPage.tsx
a_path = r'c:\Users\SEBIN\Desktop\AV\src\pages\AdminPage.tsx'
if os.path.exists(a_path):
    with open(a_path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("#153D25", "#292923")
    content = content.replace("#0D2617", "#191916")
    content = content.replace("#F12D18", "#D53B3B")
    with open(a_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated AdminPage.tsx")
