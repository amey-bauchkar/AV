from PIL import Image

src_path = r'C:\Users\SEBIN\.gemini\antigravity-ide\brain\57981abb-e2e3-4248-a266-b1baad1b8019\.user_uploaded\media_1793116963788.png'
im = Image.open(src_path).convert('RGBA')
w, h = im.size

print(f"Dimensions: {w}x{h}")
print("Corners:")
print(" (0,0):", im.getpixel((0, 0)))
print(" (w-1, 0):", im.getpixel((w - 1, 0)))
print(" (0, h-1):", im.getpixel((0, h - 1)))
print(" (w-1, h-1):", im.getpixel((w - 1, h - 1)))

# Sample top 20 pixels
bg_samples = [im.getpixel((x, y)) for x in range(20) for y in range(20)]
avg_r = sum(p[0] for p in bg_samples) // len(bg_samples)
avg_g = sum(p[1] for p in bg_samples) // len(bg_samples)
avg_b = sum(p[2] for p in bg_samples) // len(bg_samples)
print(f"Average BG RGB: ({avg_r}, {avg_g}, {avg_b})")
