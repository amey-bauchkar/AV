"""
Plastico Impex (PIX) - PDF Image Extraction Pipeline
Extracts, deduplicates, catalogs, and generates contact sheets for all embedded images in PIX-CATALOG 24-25 - 2.pdf.
"""

import os
import sys
import json
import hashlib
import fitz  # PyMuPDF
from PIL import Image, ImageDraw, ImageFont

PDF_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "PIX-CATALOG 24-25 - 2.pdf")
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "catalog-assets")
RAW_IMG_DIR = os.path.join(OUTPUT_DIR, "raw")
CONTACT_DIR = os.path.join(OUTPUT_DIR, "contact-sheets")
REPORT_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "reports", "catalog-extraction-report.json")
MANIFEST_PATH = os.path.join(OUTPUT_DIR, "manifest.json")

def sha256_hash(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def classify_asset(width: int, height: int, page_num: int, occurrence_count: int) -> str:
    # Page 1 or 60 full-page background
    if page_num in (1, 60) and width > 2000 and height > 1400:
        return "cover_artwork"
    # Repeated small icons/badges across multiple pages
    if occurrence_count >= 5 and width < 250 and height < 250:
        return "certification_badge_or_icon"
    # Index thumbnails on page 2
    if page_num == 2 and width < 150 and height < 150:
        return "index_thumbnail"
    # Small decoration or color swatches
    if width <= 60 or height <= 60:
        return "decorative_or_swatch"
    # Likely product photograph
    if width >= 150 and height >= 150:
        return "product_photograph"
    return "general_graphic"

def run_extraction():
    print(f"Opening catalog: {PDF_PATH}")
    if not os.path.exists(PDF_PATH):
        print(f"Error: PDF not found at {PDF_PATH}")
        sys.exit(1)

    os.makedirs(RAW_IMG_DIR, exist_ok=True)
    os.makedirs(CONTACT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(REPORT_PATH), exist_ok=True)

    doc = fitz.open(PDF_PATH)
    total_pages = len(doc)
    print(f"Total catalog pages: {total_pages}")

    # Pass 1: Scan all image occurrences and calculate binary hashes
    all_occurrences = []
    unique_binaries = {}  # sha256 -> { data, ext, width, height, colorspace, xrefs: set(), pages: set(), sample_filename }

    for page_idx in range(total_pages):
        page_num = page_idx + 1
        page = doc[page_idx]
        image_list = page.get_images(full=True)

        for img_idx, img_info in enumerate(image_list):
            xref = img_info[0]
            try:
                base_img = doc.extract_image(xref)
            except Exception as e:
                print(f"Warning: Failed to extract xref {xref} on page {page_num}: {e}")
                continue

            img_bytes = base_img["image"]
            ext = base_img["ext"]
            width = base_img["width"]
            height = base_img["height"]
            colorspace = base_img.get("colorspace", "unknown")
            h = sha256_hash(img_bytes)

            occurrence = {
                "page": page_num,
                "image_index_on_page": img_idx + 1,
                "xref": xref,
                "width": width,
                "height": height,
                "colorspace": colorspace,
                "format": ext,
                "sha256": h,
            }
            all_occurrences.append(occurrence)

            if h not in unique_binaries:
                unique_binaries[h] = {
                    "sha256": h,
                    "format": ext,
                    "width": width,
                    "height": height,
                    "colorspace": colorspace,
                    "data": img_bytes,
                    "xrefs": {xref},
                    "pages": {page_num},
                    "occurrences": 1,
                    "first_page": page_num,
                    "first_index": img_idx + 1,
                    "first_xref": xref
                }
            else:
                unique_binaries[h]["xrefs"].add(xref)
                unique_binaries[h]["pages"].add(page_num)
                unique_binaries[h]["occurrences"] += 1

    print(f"Total image placements scanned: {len(all_occurrences)}")
    print(f"Total unique binary assets found: {len(unique_binaries)}")

    # Pass 2: Save unique raw assets with deterministic names
    # Name pattern: asset_{first_page:02d}_{first_xref}_{sha256[:8]}.{ext}
    saved_assets = {}  # sha256 -> filename
    for h, binfo in unique_binaries.items():
        fname = f"asset_p{binfo['first_page']:02d}_xref{binfo['first_xref']}_{h[:8]}.{binfo['format']}"
        filepath = os.path.join(RAW_IMG_DIR, fname)
        if not os.path.exists(filepath):
            with open(filepath, "wb") as f:
                f.write(binfo["data"])
        saved_assets[h] = fname

    # Pass 3: Classify each occurrence and unique asset
    manifest_records = []
    category_map = {
        range(1, 2): "Cover",
        range(2, 3): "Index",
        range(3, 11): "Thermos Bottles",
        range(11, 17): "Steel Bottles",
        range(17, 25): "Thermos Mugs",
        range(25, 30): "Travel Mugs",
        range(30, 40): "Notebooks",
        range(40, 46): "Pens",
        range(46, 49): "Metal Keychains",
        range(49, 51): "Card Holders",
        range(51, 60): "Bamboo Desk Utility",
        range(60, 61): "Back Cover",
    }

    def get_category(p):
        for r, name in category_map.items():
            if p in r:
                return name
        return "Other"

    classified_occurrences = []
    classification_counts = {}

    for occ in all_occurrences:
        h = occ["sha256"]
        u = unique_binaries[h]
        asset_file = saved_assets[h]
        classification = classify_asset(occ["width"], occ["height"], occ["page"], u["occurrences"])
        classification_counts[classification] = classification_counts.get(classification, 0) + 1

        rec = {
            "page": occ["page"],
            "category": get_category(occ["page"]),
            "image_index": occ["image_index_on_page"],
            "xref": occ["xref"],
            "filename": asset_file,
            "relative_path": f"/catalog-assets/raw/{asset_file}",
            "width": occ["width"],
            "height": occ["height"],
            "format": occ["format"],
            "colorspace": occ["colorspace"],
            "sha256": h,
            "total_catalog_occurrences": u["occurrences"],
            "classification": classification
        }
        classified_occurrences.append(rec)

    # Pass 4: Build manifest & report
    unique_summary = []
    for h, binfo in unique_binaries.items():
        fname = saved_assets[h]
        cls = classify_asset(binfo["width"], binfo["height"], binfo["first_page"], binfo["occurrences"])
        unique_summary.append({
            "filename": fname,
            "sha256": h,
            "format": binfo["format"],
            "width": binfo["width"],
            "height": binfo["height"],
            "occurrences": binfo["occurrences"],
            "pages": sorted(list(binfo["pages"])),
            "classification": cls,
            "relative_path": f"/catalog-assets/raw/{fname}"
        })

    manifest_data = {
        "source_pdf": "PIX-CATALOG 24-25 - 2.pdf",
        "total_pages": total_pages,
        "total_placements": len(classified_occurrences),
        "total_unique_binaries": len(unique_binaries),
        "classification_summary": classification_counts,
        "unique_assets": unique_summary,
        "placements": classified_occurrences
    }

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, indent=2)
    print(f"Manifest saved to: {MANIFEST_PATH}")

    # Pass 5: Generate Visual Contact Sheets by Category
    # Group unique images by category of first appearance
    category_images = {}
    for item in unique_summary:
        first_page = item["pages"][0]
        cat = get_category(first_page)
        category_images.setdefault(cat, []).append(item)

    print("Generating visual contact sheets for each category...")
    contact_sheet_files = []
    thumb_w, thumb_h = 160, 160
    cols = 6
    padding = 10
    label_h = 30

    for cat_name, items in category_images.items():
        if not items:
            continue
        num_items = len(items)
        rows = (num_items + cols - 1) // cols
        sheet_w = cols * (thumb_w + padding) + padding
        sheet_h = rows * (thumb_h + label_h + padding) + padding + 40  # +40 for header

        sheet = Image.new("RGB", (sheet_w, sheet_h), color=(245, 247, 250))
        draw = ImageDraw.Draw(sheet)

        # Header title
        draw.text((padding, 12), f"Plastico Impex - {cat_name} ({num_items} unique assets)", fill=(15, 23, 42))

        for idx, item in enumerate(items):
            r = idx // cols
            c = idx % cols
            x = padding + c * (thumb_w + padding)
            y = 45 + r * (thumb_h + label_h + padding)

            img_file = os.path.join(RAW_IMG_DIR, item["filename"])
            try:
                with Image.open(img_file) as im:
                    im_copy = im.copy()
                    if im_copy.mode in ("RGBA", "LA", "P"):
                        # Convert to RGB with white background
                        bg = Image.new("RGB", im_copy.size, (255, 255, 255))
                        if im_copy.mode == "P":
                            im_copy = im_copy.convert("RGBA")
                        bg.paste(im_copy, mask=im_copy.split()[-1] if "A" in im_copy.mode else None)
                        im_copy = bg
                    elif im_copy.mode != "RGB":
                        im_copy = im_copy.convert("RGB")

                    im_copy.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
                    # Center in thumb box
                    offset_x = x + (thumb_w - im_copy.width) // 2
                    offset_y = y + (thumb_h - im_copy.height) // 2
                    sheet.paste(im_copy, (offset_x, offset_y))
            except Exception as e:
                draw.rectangle([x, y, x + thumb_w, y + thumb_h], fill=(230, 230, 230))
                draw.text((x + 10, y + 10), "Error", fill=(200, 0, 0))

            # Border around thumb box
            draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=(220, 226, 235), width=1)

            # Label text
            short_label = f"P{item['pages'][0]}:{item['filename'][:16]}..\n{item['width']}x{item['height']} ({item['classification'][:10]})"
            draw.text((x, y + thumb_h + 2), short_label, fill=(70, 80, 95))

        clean_cat_name = cat_name.lower().replace(" ", "_")
        sheet_filename = f"contact_sheet_{clean_cat_name}.jpg"
        sheet_path = os.path.join(CONTACT_DIR, sheet_filename)
        sheet.save(sheet_path, "JPEG", quality=90)
        contact_sheet_files.append(f"/catalog-assets/contact-sheets/{sheet_filename}")

    # Generate extraction report
    report_data = {
        "status": "COMPLETED",
        "source_file": PDF_PATH,
        "total_catalog_pages": total_pages,
        "total_image_placements": len(classified_occurrences),
        "total_unique_binary_assets": len(unique_binaries),
        "classifications": classification_counts,
        "raw_assets_directory": "public/catalog-assets/raw",
        "contact_sheets_directory": "public/catalog-assets/contact-sheets",
        "contact_sheets": contact_sheet_files,
        "manifest_path": "public/catalog-assets/manifest.json"
    }

    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report_data, f, indent=2)
    print(f"Extraction report saved to: {REPORT_PATH}")
    print("--- Extraction pipeline successfully completed! ---")

if __name__ == "__main__":
    run_extraction()
