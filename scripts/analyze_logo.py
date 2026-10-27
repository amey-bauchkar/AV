import os
import math
from PIL import Image

src_path = r'C:\Users\SEBIN\.gemini\antigravity-ide\brain\57981abb-e2e3-4248-a266-b1baad1b8019\.user_uploaded\media_1793116963788.png'
im = Image.open(src_path).convert('RGBA')
w, h = im.size

# Estimate background color from corners
corners = [
    im.getpixel((0, 0)),
    im.getpixel((w - 1, 0)),
    im.getpixel((0, h - 1)),
    im.getpixel((w - 1, h - 1)),
    im.getpixel((w // 2, 0)),
    im.getpixel((w // 2, h - 1)),
]
bg_r = sum(c[0] for c in corners) / len(corners)
bg_g = sum(c[1] for c in corners) / len(corners)
bg_b = sum(c[2] for c in corners) / len(corners)
print(f"Detected BG: ({bg_r:.1f}, {bg_g:.1f}, {bg_b:.1f})")

def color_dist(r, g, b):
    # Euclidean distance from background
    return math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)

# Find bounding box of actual logo content
min_x, max_x = w, 0
min_y, max_y = h, 0

for y in range(h):
    for x in range(w):
        r, g, b, a = im.getpixel((x, y))
        dist = color_dist(r, g, b)
        if dist > 20: # clearly not background
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

print(f"Content bbox: left={min_x}, top={min_y}, right={max_x}, bottom={max_y}")
print(f"Content size: {max_x - min_x + 1} x {max_y - min_y + 1}")

# Also find bbox of just the AV monogram mark (excluding the bottom text)
# The text "CORPORATE GIFTINGS & EVENTS" starts below the monogram.
# Let's inspect where the gap is between the mark and text.
row_counts = []
for y in range(min_y, max_y + 1):
    cnt = sum(1 for x in range(min_x, max_x + 1) if color_dist(*im.getpixel((x, y))[:3]) > 20)
    row_counts.append((y, cnt))

for y, cnt in row_counts:
    if cnt < 5:
        print(f"Row {y} has very few content pixels: {cnt}")
