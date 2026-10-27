import re
import sys

with open(r'c:\Users\SEBIN\Desktop\AV\src\pages\GiftingKitBuilderPage.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    emojis = re.findall(r'[\U00010000-\U0010ffff]', line)
    if emojis:
        clean_line = line.strip().encode('ascii', 'replace').decode('ascii')
        print(f"Line {i+1}: count={len(emojis)}: {clean_line}")
