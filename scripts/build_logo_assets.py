import os
import math
from PIL import Image

src_path = r'C:\Users\SEBIN\.gemini\antigravity-ide\brain\57981abb-e2e3-4248-a266-b1baad1b8019\.user_uploaded\media_1793116963788.png'
out_dir = r'c:\Users\SEBIN\Desktop\AV\public\images\logo'
os.makedirs(out_dir, exist_ok=True)

im = Image.open(src_path).convert('RGBA')
w, h = im.size

# Background color
bg_r, bg_g, bg_b = 253.0, 250.0, 242.0

# 1. First, create transparent version of full image
# Content bbox: left=102, top=52, right=841, bottom=318
# Add padding of 8px
pad_x = 10
pad_y = 10
crop_x0 = max(0, 102 - pad_x)
crop_y0 = max(0, 52 - pad_y)
crop_x1 = min(w, 841 + pad_x + 1)
crop_y1 = min(h, 318 + pad_y + 1)

cropped = im.crop((crop_x0, crop_y0, crop_x1, crop_y1))
cw, ch = cropped.size

# Matting function
def process_to_transparent(pil_img, is_dark_bg_variant=False):
    width, height = pil_img.size
    result = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    # Relative y threshold for text vs mark:
    # in original coords, text starts around y=294
    # in cropped coords: text_y_start = 294 - crop_y0
    text_y_start = 294 - crop_y0
    
    for y in range(height):
        is_text_row = (y >= text_y_start)
        for x in range(width):
            r, g, b, a = pil_img.getpixel((x, y))
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            # Matting threshold
            if dist < 8:
                # pure background
                alpha = 0.0
            elif dist > 35:
                alpha = 1.0
            else:
                alpha = (dist - 8) / (35 - 8)
                
            if alpha <= 0.01:
                result.putpixel((x, y), (0, 0, 0, 0))
            else:
                # Un-premultiply foreground color
                fg_r = (r - (1.0 - alpha) * bg_r) / alpha
                fg_g = (g - (1.0 - alpha) * bg_g) / alpha
                fg_b = (b - (1.0 - alpha) * bg_b) / alpha
                
                fg_r = max(0, min(255, int(round(fg_r))))
                fg_g = max(0, min(255, int(round(fg_g))))
                fg_b = max(0, min(255, int(round(fg_b))))
                
                final_a = int(round(alpha * 255))
                
                if is_dark_bg_variant and is_text_row:
                    # In dark bg variant, turn dark text into warm ivory/white #FAF9F5
                    # so text is crisp and legible on dark forest green/obsidian backgrounds
                    result.putpixel((x, y), (250, 249, 245, final_a))
                else:
                    result.putpixel((x, y), (fg_r, fg_g, fg_b, final_a))
                    
    return result

print("Generating full transparent logo...")
trans_full = process_to_transparent(cropped, is_dark_bg_variant=False)
trans_full.save(os.path.join(out_dir, 'logo-full.png'), 'PNG')
trans_full.save(r'c:\Users\SEBIN\Desktop\AV\public\logo.png', 'PNG')

print("Generating dark background variant (ivory text)...")
trans_light = process_to_transparent(cropped, is_dark_bg_variant=True)
trans_light.save(os.path.join(out_dir, 'logo-light.png'), 'PNG')

# 2. Extract just the AV monogram mark (with bow)
# Monogram rows: 52 to 269
# Let's find x bbox of mark rows specifically
mark_min_x, mark_max_x = w, 0
for y in range(52, 270):
    for x in range(w):
        r, g, b, a = im.getpixel((x, y))
        dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
        if dist > 20:
            if x < mark_min_x: mark_min_x = x
            if x > mark_max_x: mark_max_x = x

print(f"Monogram mark bbox: x={mark_min_x}..{mark_max_x}, y=52..269 (size: {mark_max_x-mark_min_x+1}x{269-52+1})")
mark_crop = im.crop((mark_min_x - 6, 52 - 6, mark_max_x + 7, 270 + 6))
trans_mark = process_to_transparent(mark_crop, is_dark_bg_variant=False)
trans_mark.save(os.path.join(out_dir, 'logo-mark.png'), 'PNG')

# 3. Create square favicon with comfortable padding
mw, mh = trans_mark.size
sq_dim = max(mw, mh) + int(max(mw, mh) * 0.15) # 15% breathing room
favicon_sq = Image.new('RGBA', (sq_dim, sq_dim), (0, 0, 0, 0))
off_x = (sq_dim - mw) // 2
off_y = (sq_dim - mh) // 2
favicon_sq.paste(trans_mark, (off_x, off_y), trans_mark)

# Save high-res square mark
favicon_sq.save(os.path.join(out_dir, 'logo-square.png'), 'PNG')

# Save multi-size favicon formats
favicon_sq.resize((192, 192), Image.Resampling.LANCZOS).save(r'c:\Users\SEBIN\Desktop\AV\public\favicon-192.png', 'PNG')
favicon_sq.resize((512, 512), Image.Resampling.LANCZOS).save(r'c:\Users\SEBIN\Desktop\AV\public\favicon-512.png', 'PNG')
favicon_sq.resize((180, 180), Image.Resampling.LANCZOS).save(r'c:\Users\SEBIN\Desktop\AV\public\apple-touch-icon.png', 'PNG')
favicon_sq.resize((32, 32), Image.Resampling.LANCZOS).save(r'c:\Users\SEBIN\Desktop\AV\public\favicon.png', 'PNG')
favicon_sq.resize((64, 64), Image.Resampling.LANCZOS).save(r'c:\Users\SEBIN\Desktop\AV\public\favicon-64.png', 'PNG')

# Generate .ico with standard 16, 32, 48, 64 sizes
favicon_sq.save(r'c:\Users\SEBIN\Desktop\AV\public\favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

print("All logo assets successfully generated!")
