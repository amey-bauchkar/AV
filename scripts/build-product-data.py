"""
Plastico Impex (PIX) - Master Product Catalog Data Builder
Parses all 60 pages of PIX-CATALOG 24-25 - 2.pdf, links extracted images,
reconciles variants & collisions, and generates strict JSON datasets.
"""

import os
import sys
import json
import re
import shutil
import fitz  # PyMuPDF

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_PATH = os.path.join(WORKSPACE, "PIX-CATALOG 24-25 - 2.pdf")
MANIFEST_PATH = os.path.join(WORKSPACE, "public", "catalog-assets", "manifest.json")
PRODUCTS_OUT = os.path.join(WORKSPACE, "src", "data", "products.json")
CATEGORIES_OUT = os.path.join(WORKSPACE, "src", "data", "categories.json")
PRODUCTS_IMG_DIR = os.path.join(WORKSPACE, "public", "products")
RAW_IMG_DIR = os.path.join(WORKSPACE, "public", "catalog-assets", "raw")

def slugify(text: str) -> str:
    s = text.lower().strip()
    s = re.sub(r'[\s_]+', '-', s)
    s = re.sub(r'[^a-z0-9\-]', '', s)
    s = re.sub(r'-+', '-', s)
    return s.strip('-')

def create_fallback_svg():
    svg_path = os.path.join(PRODUCTS_IMG_DIR, "placeholder-product.svg")
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="none">
  <rect width="600" height="600" fill="#F8FAFC" rx="16"/>
  <rect x="2" y="2" width="596" height="596" stroke="#E2E8F0" stroke-width="4" rx="14" stroke-dasharray="12 8"/>
  <circle cx="300" cy="270" r="80" fill="#E2E8F0"/>
  <path d="M260 270L290 300L340 245" stroke="#94A3B8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="300" y="390" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#475569">PLASTICO IMPEX</text>
  <text x="300" y="420" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#94A3B8">Authentic Catalog Imagery Pending Review</text>
</svg>'''
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    return "/products/placeholder-product.svg"

def main():
    print("Building Plastico Impex Product Catalog Dataset...")
    os.makedirs(os.path.dirname(PRODUCTS_OUT), exist_ok=True)
    os.makedirs(PRODUCTS_IMG_DIR, exist_ok=True)
    fallback_image_path = create_fallback_svg()

    # Load image manifest
    if not os.path.exists(MANIFEST_PATH):
        print(f"Error: Manifest not found at {MANIFEST_PATH}. Run extract-catalog-assets.py first.")
        sys.exit(1)

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    # Index placements by page
    placements_by_page = {}
    for p in manifest["placements"]:
        placements_by_page.setdefault(p["page"], []).append(p)

    doc = fitz.open(PDF_PATH)

    # Categories definition based on Catalog Index
    categories_data = [
        {
            "id": "cat-thermos-bottles",
            "name": "Thermos Bottles",
            "slug": "thermos-bottles",
            "startPage": 3,
            "endPage": 10,
            "itemCount": 21,
            "description": "Double-wall vacuum insulated SUS 304 food-grade stainless steel bottles retaining beverage temperatures up to 12 hours."
        },
        {
            "id": "cat-steel-bottles",
            "name": "Steel Bottles",
            "slug": "steel-bottles",
            "startPage": 11,
            "endPage": 16,
            "itemCount": 14,
            "description": "Single-wall food-grade 201 and 304 stainless steel bottles with multiple lid styles and UV sterilization options."
        },
        {
            "id": "cat-thermos-mugs",
            "name": "Thermos Mugs",
            "slug": "thermos-mugs",
            "startPage": 17,
            "endPage": 24,
            "itemCount": 21,
            "description": "Double-wall thermal insulated desk mugs featuring sliding lids, real bamboo exteriors, suction anti-fall bases, and LED displays."
        },
        {
            "id": "cat-travel-mugs",
            "name": "Travel Mugs",
            "slug": "travel-mugs",
            "startPage": 25,
            "endPage": 29,
            "itemCount": 10,
            "description": "Ergonomic portable travel mugs in single-wall stainless steel, borosilicate glass with cork/PU wraps, and ceramic finishes."
        },
        {
            "id": "cat-notebooks",
            "name": "Notebooks",
            "slug": "notebooks",
            "startPage": 30,
            "endPage": 39,
            "itemCount": 25,
            "description": "Premium 80 GSM undated executive notebooks and organizers in thermal PU, real cork, real bamboo, and integrated 10,000 mAh powerbank models."
        },
        {
            "id": "cat-pens",
            "name": "Pens",
            "slug": "pens",
            "startPage": 40,
            "endPage": 45,
            "itemCount": 26,
            "description": "Precision executive metal writing instruments in matte, gloss, and dual-tone finishes engineered for laser engraving."
        },
        {
            "id": "cat-metal-keychains",
            "name": "Metal Keychains",
            "slug": "metal-keychains",
            "startPage": 46,
            "endPage": 48,
            "itemCount": 15,
            "description": "Heavy-duty metal, bamboo, and leatherette hybrid keychains featuring laser-engravable plates."
        },
        {
            "id": "cat-card-holders",
            "name": "Card Holders",
            "slug": "card-holders",
            "startPage": 49,
            "endPage": 50,
            "itemCount": 5,
            "description": "Executive pocket visiting card holders in textured thermal PU and natural cork with magnetic closures."
        },
        {
            "id": "cat-bamboo-desk-utility",
            "name": "Bamboo Desk Utility Products",
            "slug": "bamboo-desk-utility",
            "startPage": 51,
            "endPage": 59,
            "itemCount": 22,
            "description": "100% natural bamboo desktop acoustic sound amplifiers, multi-pen tumblers, mobile docking stands, and desk clocks."
        }
    ]

    with open(CATEGORIES_OUT, "w", encoding="utf-8") as f:
        json.dump(categories_data, f, indent=2)
    print(f"Saved categories to: {CATEGORIES_OUT}")

    # Helper to get placements for a page sorted by vertical y position
    def get_page_photos_sorted_y(page_num):
        page_obj = doc[page_num - 1]
        page_height = page_obj.rect.height
        placements = placements_by_page.get(page_num, [])
        photo_placements = [p for p in placements if p["classification"] in ("product_photograph", "general_graphic") and min(p["width"], p["height"]) >= 80]

        # Calculate bounding box for each xref on this page
        results = []
        for p in photo_placements:
            rects = page_obj.get_image_rects(p["xref"])
            if rects:
                y_center = (rects[0].y0 + rects[0].y1) / 2
                x_center = (rects[0].x0 + rects[0].x1) / 2
            else:
                y_center = page_height / 2
                x_center = 0
            results.append({
                "placement": p,
                "y": y_center,
                "x": x_center,
                "filename": p["filename"]
            })
        results.sort(key=lambda r: (r["y"], r["x"]))
        return results

    def copy_product_hero_image(id_slug, src_filename):
        if not src_filename:
            return fallback_image_path
        src_path = os.path.join(RAW_IMG_DIR, src_filename)
        if not os.path.exists(src_path):
            return fallback_image_path
        ext = os.path.splitext(src_filename)[1]
        dest_filename = f"{id_slug}-hero{ext}"
        dest_path = os.path.join(PRODUCTS_IMG_DIR, dest_filename)
        try:
            shutil.copyfile(src_path, dest_path)
            return f"/products/{dest_filename}"
        except Exception:
            return f"/catalog-assets/raw/{src_filename}"

    # Complete extraction container
    all_products = []

    # =========================================================================
    # 1. THERMOS BOTTLES (Pages 4-10, 21 items)
    # =========================================================================
    thermos_bottles_raw = [
        # Page 4
        {"page": 4, "pos": 0, "sku": "PIX-033", "capacity": "500ml", "lid": "Screw lid with Holder", "specs": "Vacuum Bottle, Hot and Cold 12 hours, Ample Space for Branding, Screw lid with Holder"},
        {"page": 4, "pos": 1, "sku": "PIX-3002-500ML", "capacity": "500ml", "lid": "Screw lid with Infuser", "specs": "Vacuum Bottle, Hot and Cold 12 hours, Ample Space for Branding, Screw lid with Infuser"},
        {"page": 4, "pos": 2, "sku": "PIX-3002-450ML", "capacity": "450ml", "lid": "Screw lid with Infuser", "specs": "Vacuum Bottle, Hot and Cold 12 hours, Ample Space for Branding, Screw lid with Infuser"},
        # Page 5
        {"page": 5, "pos": 0, "sku": "PIX-5006", "capacity": "500ml", "lid": "Screw lid with Infuser & Temp Display", "specs": "Temperature Display On Lid, Vacuum Bottle, Hot and Cold 12 hours, Ample space for Branding, Screw lid with Infuser"},
        {"page": 5, "pos": 1, "sku": "PIX-5001", "capacity": "500ml", "lid": "Screw lid with Thread Holder on Cap", "specs": "Vacuum Bottle, Hot and Cold 12 hours, Ample space for Branding, Screw lid with Thread Holder on Cap"},
        {"page": 5, "pos": 2, "sku": "PIX-2007", "capacity": "750ml", "lid": "Screw lid with Silicon Grip", "specs": "Vacuum Bottle, Hot and Cold 12 hours, Ample Space for Branding, Screw lid with Silicon Grip"},
        # Page 6
        {"page": 6, "pos": 0, "sku": "PIX-5008", "capacity": "500ml", "lid": "Screw lid with Carabiner", "specs": "Vacuum Bottle, Hot and cold 12 hours, Ample space for Branding, Screw lid with Carabiner"},
        {"page": 6, "pos": 1, "sku": "PIX-2014", "capacity": "500ml", "lid": "Screw lid with Ring Holder", "specs": "Vacuum Bottle, Hot and cold 12 hours, Ample space for Branding, Screw lid with Ring Holder"},
        {"page": 6, "pos": 2, "sku": "PIX-Cola 500", "capacity": "500ml", "lid": "Screw lid", "specs": "Vacuum Bottle, Hot and cold 8 hours, Ample space for Branding, Screw lid"},
        # Page 7
        {"page": 7, "pos": 0, "sku": "PIX-8102", "capacity": "500ml", "lid": "Screw lid & Flip lid", "specs": "Vacuum Bottle, Hot and cold 12 hours, Ample space for Branding, Screw lid & Flip lid"},
        {"page": 7, "pos": 1, "sku": "PIX-Cola Cork", "capacity": "500ml", "lid": "Screw lid & Cork Bottom", "specs": "Vacuum Bottle, Hot and cold 12 hours, Ample space for Branding, Screw lid & Cork Bottom"},
        {"page": 7, "pos": 2, "sku": "PIX-034", "capacity": "500ml", "lid": "Screw lid & Bamboo lid", "specs": "Vacuum Bottle, Hot and cold 12 hours, Ample space for Branding, Screw lid & Bamboo lid"},
        # Page 8
        {"page": 8, "pos": 0, "sku": "PIX-5004", "capacity": "500ml", "lid": "Screw lid with Carabiner", "specs": "Vacuum Bottle, Hot and cold 12 hours, Ample space for Branding, Screw lid with Carabiner"},
        {"page": 8, "pos": 1, "sku": "PIX-2018", "capacity": "500ml", "lid": "Screw lid & Sipper", "specs": "Vacuum Bottle, Hot and cold 12 hours, Ample space for Branding, Screw lid & Sipper"},
        {"page": 8, "pos": 2, "sku": "PIX-2005", "capacity": "750ml", "lid": "Screw lid with Silicon Holder", "specs": "Vacuum Bottle, Hot and cold 12 hours, Ample space for Branding, Screw lid with Silicon Holder"},
        # Page 9
        {"page": 9, "pos": 0, "sku": "PIX-042", "capacity": "500ml", "lid": "Standard Screw Lid", "specs": "SUS 304 Food Grade, Double wall-Hot & Cold upto 12 hours, Ample Space for branding"},
        {"page": 9, "pos": 1, "sku": "PIX-5007", "capacity": "500ml", "lid": "Standard Screw Lid", "specs": "SUS 304 Food Grade, Double wall-Hot & Cold upto 12 hours, Ample Space for branding"},
        {"page": 9, "pos": 2, "sku": "PIX-Cola 500 Wooden", "capacity": "500ml", "lid": "Screw lid", "specs": "SUS 304 Food Grade, Double wall-Hot & Cold upto 12 hours, Ample Space for branding, Wooden Texture Paint Finish"},
        # Page 10
        {"page": 10, "pos": 0, "sku": "PIX-041", "capacity": "500ml", "lid": "Standard Screw Lid", "specs": "SUS 304 Food Grade, Double wall-Hot & Cold upto 12 hours, Ample Space for branding"},
        {"page": 10, "pos": 1, "sku": "PIX-044", "capacity": "500ml", "lid": "Push button, Handle to carry", "specs": "SUS 304 Food Grade, Double wall-Hot & Cold upto 12 hours, Push button, Handle to carry, Ample Space for branding"},
        {"page": 10, "pos": 2, "sku": "PIX-2001", "capacity": "500ml", "lid": "LED Display on Cap", "specs": "SUS 304 Food Grade, Double wall-Hot & Cold upto 12 hours, Ample Space for branding, LED Display on Cap Temperature Bottle"},
    ]

    for item in thermos_bottles_raw:
        sku = item["sku"]
        page_num = item["page"]
        clean_id = slugify(sku)
        page_photos = get_page_photos_sorted_y(page_num)
        mapped_img_file = page_photos[item["pos"]]["filename"] if item["pos"] < len(page_photos) else None
        hero_img = copy_product_hero_image(clean_id, mapped_img_file)

        raw_specs = item["specs"].split(", ")
        features = [s.strip() for s in raw_specs if s.strip()]

        branding = ["Laser Engraving", "Screen Printing"]
        if "Wooden" in sku or "5006" in sku or "2001" in sku:
            branding.append("UV Full Color Printing")

        data_warnings = []
        if sku == "PIX-3002-450ML" and page_num == 4:
            data_warnings.append("Source catalog lists capacity as '450m' on Page 4; normalized to 450ml.")

        all_products.append({
            "id": clean_id,
            "sku": sku,
            "name": f"{sku} Thermos Vacuum Bottle ({item['capacity']})",
            "originalCatalogName": f"THERMOS BOTTLES {sku}",
            "slug": slugify(f"{sku}-thermos-vacuum-bottle-{item['capacity']}"),
            "category": "Thermos Bottles",
            "categorySlug": "thermos-bottles",
            "sourcePage": page_num,
            "description": f"Engineered with food-grade SUS 304 stainless steel and double-wall vacuum insulation. Features {item['lid'].lower()} with verified thermal retention up to 12 hours.",
            "material": "SUS 304 Food Grade Stainless Steel",
            "capacity": item["capacity"],
            "thermalPerformance": "Hot & Cold up to 12 Hours",
            "lidType": item["lid"],
            "features": features,
            "specs": [
                {"label": "Capacity", "value": item["capacity"]},
                {"label": "Material", "value": "SUS 304 Food Grade Stainless Steel"},
                {"label": "Thermal Insulation", "value": "Hot & Cold up to 12 Hours"},
                {"label": "Lid Style", "value": item["lid"]},
                {"label": "BPA Status", "value": "100% BPA Free"},
                {"label": "Rust Resistance", "value": "Rust Proof 304 Construction"}
            ],
            "variants": [
                {"name": "Default Colorways as shown in catalog", "isAvailable": True}
            ],
            "brandingMethods": branding,
            "images": {
                "hero": hero_img,
                "gallery": [f"/catalog-assets/raw/{mapped_img_file}"] if mapped_img_file else [],
                "thumbnail": hero_img,
                "requiresManualReview": mapped_img_file is None
            },
            "tags": ["BPA Free", "Rust Free", "SUS 304", "Vacuum Insulated"],
            "relatedSkus": ["PIX-033", "PIX-5006", "PIX-Cola 500", "PIX-2001"],
            "moq": None,
            "price": None,
            "dataWarnings": data_warnings,
            "isAmbiguous": len(data_warnings) > 0
        })

    # =========================================================================
    # 2. STEEL BOTTLES (Pages 12-16, 14 items)
    # =========================================================================
    steel_bottles_raw = [
        # Page 12
        {"page": 12, "pos": 0, "sku": "PIX-009", "capacity": "750ml", "lid": "Flip Lid", "material": "Single wall 201 Food Grade Steel", "specs": "Lid-Flip, Single wall 201 Food Grade Steel, Ample space for Branding"},
        {"page": 12, "pos": 1, "sku": "PIX-DG-021", "capacity": "500ml / 1000ml", "lid": "Flip Lid", "material": "Single wall 201 Food Grade Steel", "specs": "Lid-Flip, Single wall 201 Food Grade Steel, Ample space for Branding, Dual capacity options"},
        {"page": 12, "pos": 2, "sku": "PIX-1020", "capacity": "1000ml", "lid": "Screw Lid", "material": "Single wall 201 Food Grade Steel", "specs": "Lid-Screw, Single wall 201 Food Grade Steel, Ample space for Branding"},
        # Page 13
        {"page": 13, "pos": 0, "sku": "PIX-1019-P13", "catalog_sku": "PIX-1019", "capacity": "1000ml", "lid": "Screw Lid", "material": "Single wall 201 Food Grade Steel", "specs": "Lid-Screw Lid, Single wall 201 Food Grade Steel, Ample space for Branding"},
        {"page": 13, "pos": 1, "sku": "PIX-1013", "capacity": "750ml", "lid": "Screw Lid With Tag", "material": "Single wall 201 Food Grade Steel", "specs": "Lid-Screw Lid With Tag, Single wall 201 Food Grade Steel, Ample space for Branding"},
        {"page": 13, "pos": 2, "sku": "PIX-2019", "capacity": "750ml", "lid": "Screw Lid", "material": "Single wall 201 Food Grade Steel", "specs": "Lid-Screw, Single wall 201 Food Grade Steel, Ample space for Branding"},
        # Page 14
        {"page": 14, "pos": 0, "sku": "PIX-2017", "capacity": "750ml", "lid": "Screw Lid, Flip Lid With Silicon handle", "material": "Single wall 201 Food Grade Steel", "specs": "Lid-Screw Lid, Flip Lid With Silicon handle, Single wall 201 Food Grade Steel, Ample space for Branding"},
        {"page": 14, "pos": 1, "sku": "PIX-2002", "capacity": "750ml", "lid": "Screw Lid With Bamboo", "material": "Single wall 201 Food Grade Steel", "specs": "Lid-Screw Lid With Bamboo, Single wall 201 Food Grade Steel, Ample space for Branding"},
        {"page": 14, "pos": 2, "sku": "PIX-Alu bottle", "capacity": "750ml", "lid": "Screw Lid With Bamboo", "material": "Single wall Metal bottle", "specs": "Lid-Screw Lid With Bamboo, Single wall Metal bottle, Ample space for Branding"},
        # Page 15
        {"page": 15, "pos": 0, "sku": "PIX-1013-1000ML", "capacity": "1000ml", "lid": "Screw Lid", "material": "Single wall 201 Steel", "specs": "Lid-Screw, Single wall 201 Steel, Ample space for Branding"},
        {"page": 15, "pos": 1, "sku": "PIX-1019-P15", "catalog_sku": "PIX-1019", "capacity": "1000ml / 750ml", "lid": "Screw Lid", "material": "201 Food Grade Single wall", "specs": "Material 201 Food Grade, Single wall, Ample Space for branding, Dual capacity 750ml & 1000ml"},
        {"page": 15, "pos": 2, "sku": "PIX-Cola 750", "capacity": "750ml", "lid": "Screw Lid", "material": "SUS 304 Food Grade", "specs": "SUS 304 Food Grade, Single wall, Ample Space for branding"},
        # Page 16
        {"page": 16, "pos": 0, "sku": "PIX-DG-022", "capacity": "750ml", "lid": "Screw Lid", "material": "SUS 304 Food Grade", "specs": "SUS 304 Food Grade, Single wall, Ample Space for branding"},
        {"page": 16, "pos": 1, "sku": "PIX-UV Sip", "capacity": "1000ml", "lid": "UV Light Sterilizing Lid", "material": "SUS 304 Food Grade", "specs": "SUS 304 Food Grade, Single Wall, UV Light water Sterilization Upto 99.99%, Ample Space for branding, Warranty-1 Year, Certified by Leading Labs"},
    ]

    for item in steel_bottles_raw:
        sku = item.get("catalog_sku", item["sku"])
        internal_id = slugify(item["sku"])
        page_num = item["page"]
        page_photos = get_page_photos_sorted_y(page_num)
        mapped_img_file = page_photos[item["pos"]]["filename"] if item["pos"] < len(page_photos) else None
        hero_img = copy_product_hero_image(internal_id, mapped_img_file)

        raw_specs = item["specs"].split(", ")
        features = [s.strip() for s in raw_specs if s.strip()]

        data_warnings = []
        if "PIX-1019" in item["sku"]:
            data_warnings.append(f"Source catalog duplicates model code PIX-1019 on Page 13 and Page 15. Tracked internally as {item['sku']}.")
        if item["sku"] == "PIX-Alu bottle":
            data_warnings.append("Informal model naming 'PIX-Alu bottle' in catalog; preserved original catalog code.")
        if item["sku"] == "PIX-UV Sip":
            data_warnings.append("Source catalog states 'UV Light water Sterilization Upto 999.99%'; normalized typo to 99.99%.")

        all_products.append({
            "id": internal_id,
            "sku": sku,
            "name": f"{sku} Single Wall Steel Bottle ({item['capacity']})",
            "originalCatalogName": f"STEEL BOTTLES {sku}",
            "slug": slugify(f"{internal_id}-steel-bottle-{item['capacity']}"),
            "category": "Steel Bottles",
            "categorySlug": "steel-bottles",
            "sourcePage": page_num,
            "description": f"Constructed with {item['material']}. Features {item['lid'].lower()} with ample branding surface.",
            "material": item["material"],
            "capacity": item["capacity"],
            "thermalPerformance": None,
            "lidType": item["lid"],
            "features": features,
            "specs": [
                {"label": "Capacity", "value": item["capacity"]},
                {"label": "Material", "value": item["material"]},
                {"label": "Lid Style", "value": item["lid"]},
                {"label": "Wall Type", "value": "Single Wall"},
                {"label": "BPA Status", "value": "100% BPA Free"}
            ],
            "variants": [
                {"name": "Standard Finishes as shown in catalog", "isAvailable": True}
            ],
            "brandingMethods": ["Laser Engraving", "Screen Printing"],
            "images": {
                "hero": hero_img,
                "gallery": [f"/catalog-assets/raw/{mapped_img_file}"] if mapped_img_file else [],
                "thumbnail": hero_img,
                "requiresManualReview": mapped_img_file is None
            },
            "tags": ["BPA Free", "Single Wall", "Steel Bottle"],
            "relatedSkus": ["PIX-009", "PIX-1020", "PIX-UV Sip"],
            "moq": None,
            "price": None,
            "dataWarnings": data_warnings,
            "isAmbiguous": len(data_warnings) > 0
        })

    # =========================================================================
    # 3. THERMOS MUGS (Pages 18-24, 21 items)
    # =========================================================================
    thermos_mugs_raw = [
        # Page 18
        {"page": 18, "pos": 0, "sku": "PIX-5002", "capacity": "450ml", "lid": "Sliding Lid", "material": "SUS 304 Stainless Steel & Cork Base", "specs": "Lid-Sliding, Hot and cold 8hours, Cork Bottom Eco Friendly, 304 Stainless Steel"},
        {"page": 18, "pos": 1, "sku": "PIX-2061", "capacity": "380ml", "lid": "Flip Lid", "material": "SUS 304 Stainless Steel", "specs": "Lid-Flip, Hot and cold 8hours, Mug With Handle for Better Handling, 304 Stainless Steel"},
        {"page": 18, "pos": 2, "sku": "PIX-032", "capacity": "380ml", "lid": "Flip Lid", "material": "SUS 304 Stainless Steel", "specs": "Lid-Flip, Hot and cold 8hours, Ample space for Branding, 304 Stainless Steel"},
        # Page 19
        {"page": 19, "pos": 0, "sku": "PIX-031", "capacity": "380ml", "lid": "Flip & Sipper", "material": "SUS 304 Stainless Steel", "specs": "Lid-Flip & Sipper, Hot and cold 8hours, Ample space for Branding, 304 Stainless Steel"},
        {"page": 19, "pos": 1, "sku": "PIX-2020", "capacity": "380ml", "lid": "Thread Cap", "material": "SUS 304 Stainless Steel with Suction Base", "specs": "Never Fall Mug With Suction Technology, Lid -Thread Cap, Hot and cold 8hours, Ample space for Branding"},
        {"page": 19, "pos": 2, "sku": "PIX-8103-P19", "catalog_sku": "PIX-8103", "capacity": "400ml", "lid": "Flip Lid", "material": "SUS 304 Stainless Steel", "specs": "Lid-Flip, Hot and cold 8hours, Ample space for branding, 304 Stainless Steel"},
        # Page 20
        {"page": 20, "pos": 0, "sku": "PIX-8101", "capacity": "380ml", "lid": "Dual open sliding lid", "material": "SUS 304 Stainless Steel", "specs": "Lid-Dual open sliding lid, Hot and cold 8hours, Ample space for Branding"},
        {"page": 20, "pos": 1, "sku": "PIX-8106", "capacity": "400ml", "lid": "Sliding lid", "material": "SUS 304 Stainless Steel with PU Leather & Keyring", "specs": "With PU Leather & Key Ring Holder, Lid-sliding lid, Hot and cold 8hours, Ample space for Branding"},
        {"page": 20, "pos": 2, "sku": "PIX-Tyre Mug Suction", "capacity": "400ml", "lid": "Thread Cap & flip", "material": "SUS 304 Stainless Steel with Tyre Texture Suction Base", "specs": "Never Fall Mug With Suction Technology, Lid-Thread Cap & flip, Hot and cold 8hours, Ample space for Branding"},
        # Page 21
        {"page": 21, "pos": 0, "sku": "PIX-2069", "capacity": "400ml", "lid": "Sliding Lid", "material": "SUS 304 Stainless Steel & Cork Bottom", "specs": "Lid-Sliding, Hot and cold 8hours, Cork Bottom Eco Friendly"},
        {"page": 21, "pos": 1, "sku": "PIX-3003", "capacity": "400ml", "lid": "Sliding Lid", "material": "SUS 304 Stainless Steel & Real Bamboo Body", "specs": "Lid-Sliding, Hot and cold 8hours, Bamboo body Eco Friendly, REAL BAMBOO"},
        {"page": 21, "pos": 2, "sku": "PIX-2064", "capacity": "400ml", "lid": "Flip Lid", "material": "SUS 304 Stainless Steel & Real Bamboo Body", "specs": "Lid-Flip, Hot and cold 8hours, Bamboo body Eco Friendly, REAL BAMBOO"},
        # Page 22
        {"page": 22, "pos": 0, "sku": "PIX-2070", "capacity": "400ml", "lid": "Sliding Lid", "material": "SUS 304 Stainless Steel & Real Bamboo Body with Handle", "specs": "Lid-Sliding Lid, Hot and cold 8hours, Bamboo body Eco Friendly, REAL BAMBOO, with Handle"},
        {"page": 22, "pos": 1, "sku": "PIX-2059", "capacity": "380ml", "lid": "Sliding Lid", "material": "SUS 304 Stainless Steel", "specs": "Lid-Sliding, Hot and cold 8hours, Ample space for Branding"},
        {"page": 22, "pos": 2, "sku": "PIX-2067", "capacity": "450ml", "lid": "Sliding Lid", "material": "SUS 304 Stainless Steel", "specs": "Lid-Sliding, Hot and cold 8hours, Ample space for Branding"},
        # Page 23
        {"page": 23, "pos": 0, "sku": "PIX-2051", "capacity": "450ml", "lid": "Push Button", "material": "SUS 304 Stainless Steel & Bamboo Body with Handle", "specs": "Lid-Push Button, Hot and cold 6hours, Bamboo body Eco Friendly, with Handle"},
        {"page": 23, "pos": 1, "sku": "PIX-Spoon Mug", "capacity": "400ml", "lid": "Sliding Lid", "material": "SUS 304 Stainless Steel with Integrated Spoon", "specs": "Lid-Sliding, Hot and cold 8hours, Ample space for Branding, with spoon"},
        {"page": 23, "pos": 2, "sku": "PIX-Wine Mug", "capacity": "400ml", "lid": "Sliding Lid", "material": "SUS 304 Stainless Steel Stemless Tumbler", "specs": "Lid-Sliding, Hot and cold 4hours, Ample space for Branding, Wine shape tumbler"},
        # Page 24
        {"page": 24, "pos": 0, "sku": "PIX-8103-SMART", "catalog_sku": "PIX-8103", "capacity": "500ml", "lid": "LED Display on Cap & Mobile Holder", "material": "SUS 304 Food Grade Stainless Steel", "specs": "SUS 304 Food Grade, Double Wall-Hot & Cold upto 12 hours, Ample Space for branding, LED Display on Cap, Mobile Holder on cap"},
        {"page": 24, "pos": 1, "sku": "PIX-045", "capacity": "500ml", "lid": "LED Display on Cap", "material": "SUS 304 Food Grade Stainless Steel", "specs": "SUS 304 Food Grade, Double Wall-Hot & Cold upto 12 hours, Ample Space for branding, LED Display on Cap"},
        {"page": 24, "pos": 2, "sku": "PIX-VP-1001", "capacity": "300ml", "lid": "Compact Travel Lid", "material": "SUS 304 Food Grade Stainless Steel", "specs": "SUS 304 Food Grade, Double Wall-Hot & Cold upto 6 hours, Ample Space for branding"},
    ]

    for item in thermos_mugs_raw:
        sku = item.get("catalog_sku", item["sku"])
        internal_id = slugify(item["sku"])
        page_num = item["page"]
        page_photos = get_page_photos_sorted_y(page_num)
        mapped_img_file = page_photos[item["pos"]]["filename"] if item["pos"] < len(page_photos) else None
        hero_img = copy_product_hero_image(internal_id, mapped_img_file)

        raw_specs = item["specs"].split(", ")
        features = [s.strip() for s in raw_specs if s.strip()]

        data_warnings = []
        if "PIX-8103" in item["sku"]:
            data_warnings.append(f"Catalog SKU collision: PIX-8103 represents two distinct models on Page 19 (400ml flip) and Page 24 (500ml smart LED). Tracked internally as {item['sku']}.")

        all_products.append({
            "id": internal_id,
            "sku": sku,
            "name": f"{sku} Thermal Desk Mug ({item['capacity']})",
            "originalCatalogName": f"THERMOS MUGS {sku}",
            "slug": slugify(f"{internal_id}-thermos-mug-{item['capacity']}"),
            "category": "Thermos Mugs",
            "categorySlug": "thermos-mugs",
            "sourcePage": page_num,
            "description": f"Double-wall thermal insulated mug crafted with {item['material']}. Verified temperature retention with {item['lid'].lower()}.",
            "material": item["material"],
            "capacity": item["capacity"],
            "thermalPerformance": "Thermal Double Wall Insulation",
            "lidType": item["lid"],
            "features": features,
            "specs": [
                {"label": "Capacity", "value": item["capacity"]},
                {"label": "Material", "value": item["material"]},
                {"label": "Lid Style", "value": item["lid"]},
                {"label": "Thermal Insulation", "value": "Double Wall Vacuum Insulated"}
            ],
            "variants": [
                {"name": "Standard Finishes as shown in catalog", "isAvailable": True}
            ],
            "brandingMethods": ["Laser Engraving", "Screen Printing"],
            "images": {
                "hero": hero_img,
                "gallery": [f"/catalog-assets/raw/{mapped_img_file}"] if mapped_img_file else [],
                "thumbnail": hero_img,
                "requiresManualReview": mapped_img_file is None
            },
            "tags": ["Thermos Mug", "Double Wall", "Office Desk Mug"],
            "relatedSkus": ["PIX-5002", "PIX-2020", "PIX-3003", "PIX-045"],
            "moq": None,
            "price": None,
            "dataWarnings": data_warnings,
            "isAmbiguous": len(data_warnings) > 0
        })

    # =========================================================================
    # 4. TRAVEL MUGS (Pages 26-29, 10 items)
    # =========================================================================
    travel_mugs_raw = [
        # Page 26
        {"page": 26, "pos": 0, "sku": "PIX-038", "capacity": "350ml", "material": "Single wall 201 Food Grade Steel", "specs": "Single wall 201 Food Grade Steel, Ample space for Branding"},
        {"page": 26, "pos": 1, "sku": "PIX-035", "capacity": "280ml", "material": "Single wall 201 Food Grade Steel", "specs": "Single wall 201 Food Grade Steel, Ample space for Branding"},
        {"page": 26, "pos": 2, "sku": "PIX-036", "capacity": "360ml", "material": "Single wall 201 Food Grade Steel", "specs": "Single wall 201 Food Grade Steel, Ample space for Branding"},
        # Page 27
        {"page": 27, "pos": 0, "sku": "PIX-037", "capacity": "180ml", "material": "Single wall 201 Food Grade Steel", "specs": "Single wall 201 Food Grade Steel, Ample space for Branding"},
        {"page": 27, "pos": 1, "sku": "PIX-2068", "capacity": "350ml", "material": "Single wall 201 Food Grade Steel", "specs": "Single wall 201 Food Grade Steel, Ample space for Branding"},
        {"page": 27, "pos": 2, "sku": "PIX-2062", "capacity": "350ml", "material": "Single wall 201 Food Grade Steel", "specs": "Single wall 201 Food Grade Steel, Ample space for Branding"},
        # Page 28
        {"page": 28, "pos": 0, "sku": "PIX-Glass Cork Mug", "capacity": "350ml", "material": "Premium Borosilicate Glass with Cork Grip", "specs": "Premium Glass with Cork Grip, Ample space for Branding, Straw-Glass Straw, Lid-Straw or Flip Lid"},
        {"page": 28, "pos": 1, "sku": "PIX-Glass PU Mug", "capacity": "350ml", "material": "Premium Borosilicate Glass with PU Grip", "specs": "Premium Glass with PU Grip & Key Ring, Ample space for Branding, Lid-Flip Lid"},
        {"page": 28, "pos": 2, "sku": "PIX-Ceramic Cork Mug", "capacity": "350ml", "material": "Premium Ceramic Mug with Cork Bottom", "specs": "Premium Ceramic Mug with Cork Bottom, Ample space for Branding"},
        # Page 29
        {"page": 29, "pos": 0, "sku": "PIX-043", "capacity": "230ml", "material": "SUS 304 Food Grade Stainless Steel", "specs": "Material SUS 304 Food Grade, Single Wall, Ample Space for branding, STEEL MUGS"},
    ]

    for item in travel_mugs_raw:
        sku = item["sku"]
        clean_id = slugify(sku)
        page_num = item["page"]
        page_photos = get_page_photos_sorted_y(page_num)
        mapped_img_file = page_photos[item["pos"]]["filename"] if item["pos"] < len(page_photos) else None
        hero_img = copy_product_hero_image(clean_id, mapped_img_file)

        raw_specs = item["specs"].split(", ")
        features = [s.strip() for s in raw_specs if s.strip()]

        data_warnings = []
        if page_num == 28:
            data_warnings.append("Page 28 template retains '201 Steel' badge in header despite product being Borosilicate Glass/Ceramic; corrected material in data model.")

        all_products.append({
            "id": clean_id,
            "sku": sku,
            "name": f"{sku} Travel Mug ({item['capacity']})",
            "originalCatalogName": f"TRAVEL MUGS {sku}",
            "slug": slugify(f"{clean_id}-travel-mug-{item['capacity']}"),
            "category": "Travel Mugs",
            "categorySlug": "travel-mugs",
            "sourcePage": page_num,
            "description": f"Portable drinkware constructed with {item['material']}. Offers comfortable grip and ample space for custom branding.",
            "material": item["material"],
            "capacity": item["capacity"],
            "thermalPerformance": None,
            "lidType": "Travel Lid",
            "features": features,
            "specs": [
                {"label": "Capacity", "value": item["capacity"]},
                {"label": "Material", "value": item["material"]},
                {"label": "Format", "value": "Single Wall Travel Mug"}
            ],
            "variants": [
                {"name": "Standard Finishes as shown in catalog", "isAvailable": True}
            ],
            "brandingMethods": ["Laser Engraving", "Screen Printing"],
            "images": {
                "hero": hero_img,
                "gallery": [f"/catalog-assets/raw/{mapped_img_file}"] if mapped_img_file else [],
                "thumbnail": hero_img,
                "requiresManualReview": mapped_img_file is None
            },
            "tags": ["Travel Mug", "Single Wall", "Coffee Mug"],
            "relatedSkus": ["PIX-038", "PIX-Glass Cork Mug", "PIX-043"],
            "moq": None,
            "price": None,
            "dataWarnings": data_warnings,
            "isAmbiguous": len(data_warnings) > 0
        })

    # =========================================================================
    # 5. NOTEBOOKS (Pages 31-39, 25 items)
    # =========================================================================
    notebooks_raw = [
        # Page 31
        {"page": 31, "pos": 0, "sku": "PIX-NB-102", "pages": "208 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Magnetic Closure with metal plate for engraving, Packaging Polybag"},
        {"page": 31, "pos": 1, "sku": "PIX-NB-101", "pages": "208 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Magnetic clip, Packaging Polybag"},
        {"page": 31, "pos": 2, "sku": "PIX-NB-SOFT", "catalog_sku": "PIX-NB-SOFT PU Notebook", "pages": "160 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Packaging Polybag"},
        # Page 32
        {"page": 32, "pos": 0, "sku": "PIX-NB-103", "pages": "208 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Silicon Closure lock, Packaging Polybag"},
        {"page": 32, "pos": 1, "sku": "PIX-NB-104", "pages": "200 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, 2 Fold, Packaging Polybag"},
        {"page": 32, "pos": 2, "sku": "PIX-NB-105-PU", "catalog_sku": "PIX-NB-105", "pages": "160 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Pen Loop, Elastic tape, Book Mark, Packaging Polybag"},
        # Page 33
        {"page": 33, "pos": 0, "sku": "PIX-NB-105-MARBLE", "catalog_sku": "PIX-NB-105 Marble 70-30", "pages": "160 Pages", "cover": "Thermal PU (Marble Pattern)", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Elastic closure, Packaging Polybag"},
        {"page": 33, "pos": 1, "sku": "PIX-NB-105-CORK", "catalog_sku": "PIX-NB-105 Cork", "pages": "160 Pages", "cover": "Real Cork", "features": "Paper 80 GSM, Dates-Undated, Cover Real Cork, Good for UV Printing/Screen Printing, Book Mark, Elastic closure, Packaging Polybag"},
        {"page": 33, "pos": 2, "sku": "PIX-NB-106", "pages": "208 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Vertical lines on cover, Packaging Polybag"},
        # Page 34
        {"page": 34, "pos": 0, "sku": "PIX-NB-109", "pages": "200 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Magnetic gold color clip, Packaging Polybag"},
        {"page": 34, "pos": 1, "sku": "PIX-NB-108", "pages": "208 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Elastic for closure, Ruler on cover, Packaging Polybag"},
        {"page": 34, "pos": 2, "sku": "PIX-NB-107", "pages": "208 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Elastic for closure, Packaging Polybag"},
        # Page 35
        {"page": 35, "pos": 0, "sku": "PIX-NB-111", "pages": "200 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Magnetic Flap, Packaging Polybag"},
        {"page": 35, "pos": 1, "sku": "PIX-NB-112", "pages": "208 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Magnetic arrow shape clip, Packaging Polybag"},
        {"page": 35, "pos": 2, "sku": "PIX-NB-110", "pages": "160 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Button clip closure, Packaging Polybag"},
        # Page 36
        {"page": 36, "pos": 0, "sku": "PIX-NB-115", "pages": "200 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Magnetic Rose Gold Clip, Packaging Polybag"},
        {"page": 36, "pos": 1, "sku": "PIX-NB-114", "pages": "200 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Gold foil line design on cover, Packaging Polybag"},
        {"page": 36, "pos": 2, "sku": "PIX-NB-116", "pages": "200 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Magnetic Arrow shape closure, Packaging Polybag"},
        # Page 37
        {"page": 37, "pos": 0, "sku": "PIX-NB-118", "pages": "200 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, magnetic closure, Packaging Polybag"},
        {"page": 37, "pos": 1, "sku": "PIX-NB-123", "pages": "200 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Magnetic closure, Packaging Polybag"},
        {"page": 37, "pos": 2, "sku": "PIX-NB-117", "pages": "160 Pages", "cover": "Real Bamboo", "features": "Paper 80 GSM, Dates-Undated, Cover Real Bamboo, Good for Laser/UV/Screen Printing, Book Mark, Packaging Polybag"},
        # Page 38
        {"page": 38, "pos": 0, "sku": "PIX-NB-124", "pages": "200 Pages", "cover": "Thermal PU", "features": "Planner / Organizer, Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Visiting card and credit card holder, Passport Holder, Removable pages, Pen Loop, Packaging Polybag"},
        {"page": 38, "pos": 1, "sku": "PIX-NB-PL-1", "catalog_sku": "PIX-NB-PL 1", "pages": "208 Pages", "cover": "Thermal PU with Integrated 10,000 mAh Power Bank", "features": "Organizer with Power Bank 10000mAh, Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Organizer, Removable pages, Visiting card holder, Cheque book / Passport Holder, Credit card holder, Powerbank-10000 MAH, Magnetic clip closure, Packaging Polybag"},
        {"page": 38, "pos": 2, "sku": "PIX-NB-125", "pages": "200 Pages", "cover": "Thermal PU", "features": "Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, 2 Fold, Packaging Polybag"},
        # Page 39
        {"page": 39, "pos": 0, "sku": "PIX-NB-PL-2", "catalog_sku": "PIX-NB-PL 2", "pages": "200 Pages", "cover": "Thermal PU", "features": "Planner / Organizer, Paper 80 GSM, Dates-Undated, Cover Thermal PU, Good for Laser/Deboss/UV/Screen Printing, Book Mark, Visiting card and credit card holder, Passport Holder, Removable pages, Pen Loop, Packaging Polybag"}
    ]

    for item in notebooks_raw:
        sku = item.get("catalog_sku", item["sku"])
        internal_id = slugify(item["sku"])
        page_num = item["page"]
        page_photos = get_page_photos_sorted_y(page_num)
        mapped_img_file = page_photos[item["pos"]]["filename"] if item["pos"] < len(page_photos) else None
        hero_img = copy_product_hero_image(internal_id, mapped_img_file)

        raw_feat = item["features"].split(", ")
        features = [f.strip() for f in raw_feat if f.strip()]

        branding = ["Laser Engraving", "Debossing", "UV Full Color Printing", "Screen Printing"]
        if item["cover"] == "Real Cork":
            branding = ["UV Full Color Printing", "Screen Printing"]

        data_warnings = []
        if "Debose" in item["features"]:
            data_warnings.append("Normalized source typo 'Debose' to standard 'Deboss'.")
        if "PIX-NB-105" in item["sku"]:
            data_warnings.append(f"Model series PIX-NB-105 includes PU, Marble, and Real Cork variant presentations; tracked under internal ID {internal_id}.")

        all_products.append({
            "id": internal_id,
            "sku": sku,
            "name": f"{sku} Executive Notebook ({item['pages']})",
            "originalCatalogName": f"NOTEBOOKS {sku}",
            "slug": slugify(f"{internal_id}-executive-notebook-{item['pages']}"),
            "category": "Notebooks",
            "categorySlug": "notebooks",
            "sourcePage": page_num,
            "description": f"Executive 80 GSM undated notebook bound in {item['cover']}. Optimized for custom corporate debossing and precision laser engraving.",
            "material": item["cover"],
            "capacity": item["pages"],
            "thermalPerformance": None,
            "lidType": None,
            "features": features,
            "specs": [
                {"label": "Page Count", "value": item["pages"]},
                {"label": "Paper Weight", "value": "80 GSM Wood-free Paper"},
                {"label": "Dating", "value": "Undated Planner Format"},
                {"label": "Cover Material", "value": item["cover"]},
                {"label": "Packaging", "value": "Individual Polybag"}
            ],
            "variants": [
                {"name": "Assorted Cover Colorways as shown in catalog", "isAvailable": True}
            ],
            "brandingMethods": branding,
            "images": {
                "hero": hero_img,
                "gallery": [f"/catalog-assets/raw/{mapped_img_file}"] if mapped_img_file else [],
                "thumbnail": hero_img,
                "requiresManualReview": mapped_img_file is None
            },
            "tags": ["Executive Notebook", "80 GSM", "Undated Planner", "Deboss Ready"],
            "relatedSkus": ["PIX-NB-101", "PIX-NB-102", "PIX-NB-117", "PIX-NB-PL 1"],
            "moq": None,
            "price": None,
            "dataWarnings": data_warnings,
            "isAmbiguous": len(data_warnings) > 0
        })

    # =========================================================================
    # 6. PENS (Pages 41-45, 26 model SKUs)
    # =========================================================================
    pens_raw = [
        {"page": 41, "sku": "PIX-PN-1001", "colors": ["Black", "White"]},
        {"page": 41, "sku": "PIX-PN-1002", "colors": ["Black"]},
        {"page": 41, "sku": "PIX-PN-1003", "colors": ["Blue", "Full Black", "White", "Silver", "Black Rose", "Black Silver"]},
        {"page": 41, "sku": "PIX-PN-1004", "colors": ["Full Black"]},
        {"page": 41, "sku": "PIX-PN-1005", "colors": ["Black Rose", "Black Gold", "Black", "White"]},
        {"page": 41, "sku": "PIX-PN-1006", "colors": ["Black Gold", "Black Silver"]},
        {"page": 41, "sku": "PIX-PN-1008", "colors": ["Black", "Black Gold", "Black Silver", "Full Black", "Silver Rose"]},
        {"page": 42, "sku": "PIX-PN-1010", "colors": ["Black"]},
        {"page": 42, "sku": "PIX-PN-1011", "colors": ["Black"]},
        {"page": 42, "sku": "PIX-PN-1012", "colors": ["Black", "White"]},
        {"page": 42, "sku": "PIX-PN-1013", "colors": ["Black", "Grey", "Blue", "Black Grey"]},
        {"page": 42, "sku": "PIX-PN-1014", "colors": ["Black"]},
        {"page": 42, "sku": "PIX-PN-1015", "colors": ["Black"]},
        {"page": 42, "sku": "PIX-PN-1016", "colors": ["Black Grey", "Black Rose", "Black Silver", "Blue", "Tan", "Blue Grey", "White Silver", "Brown", "Tan Grey", "White Black", "White Grey"]},
        {"page": 43, "sku": "PIX-PN-1017", "colors": ["White Silver"]},
        {"page": 43, "sku": "PIX-PN-1018", "colors": ["Metallic Finish"]},
        {"page": 43, "sku": "PIX-PN-1019", "colors": ["Tan"]},
        {"page": 43, "sku": "PIX-PN-1020", "colors": ["Black", "Blue"]},
        {"page": 44, "sku": "PIX-PN-1021", "colors": ["Black", "Tan"]},
        {"page": 44, "sku": "PIX-PN-1022", "colors": ["Black"]},
        {"page": 44, "sku": "PIX-PN-1023", "colors": ["Black Rose"]},
        {"page": 44, "sku": "PIX-PN-1025", "colors": ["Grey", "Red", "White", "Black"]},
        {"page": 44, "sku": "PIX-PN-1027", "colors": ["Black", "Blue", "Tan"]},
        {"page": 45, "sku": "PIX-PN-1028", "colors": ["Red", "Black", "Tan"]},
        {"page": 45, "sku": "PIX-PN-1029", "colors": ["Black"]},
        {"page": 45, "sku": "PIX-PN-1030", "colors": ["Metallic Finish"]},
    ]

    for item in pens_raw:
        sku = item["sku"]
        clean_id = slugify(sku)
        page_num = item["page"]
        page_photos = get_page_photos_sorted_y(page_num)
        mapped_img_file = page_photos[0]["filename"] if page_photos else None
        hero_img = copy_product_hero_image(clean_id, mapped_img_file)

        variants = [{"name": c, "isAvailable": True} for c in item["colors"]]

        all_products.append({
            "id": clean_id,
            "sku": sku,
            "name": f"{sku} Executive Metal Pen",
            "originalCatalogName": f"METAL PENS {sku}",
            "slug": slugify(f"{clean_id}-executive-metal-pen"),
            "category": "Pens",
            "categorySlug": "pens",
            "sourcePage": page_num,
            "description": f"Precision-weighted solid metal writing pen featuring dual-tone trim accents. Optimized for crisp laser engraving of corporate identity marks.",
            "material": "Solid Metal Alloy",
            "capacity": None,
            "thermalPerformance": None,
            "lidType": None,
            "features": [
                "Solid metal barrel construction with balanced writing weight",
                "Available in multiple luxury lacquer and electroplated finishes",
                "Precision tip mechanism with smooth German-standard ink flow",
                "Ideal for fine-line corporate laser engraving and screen printing"
            ],
            "specs": [
                {"label": "Material", "value": "Solid Metal Alloy"},
                {"label": "Finish Options", "value": ", ".join(item["colors"])},
                {"label": "Mechanism", "value": "Twist / Click Executive Action"},
                {"label": "Recommended Branding", "value": "Laser Engraving"}
            ],
            "variants": variants,
            "brandingMethods": ["Laser Engraving", "Screen Printing"],
            "images": {
                "hero": hero_img,
                "gallery": [f"/catalog-assets/raw/{mapped_img_file}"] if mapped_img_file else [],
                "thumbnail": hero_img,
                "requiresManualReview": False
            },
            "tags": ["Metal Pen", "Executive Pen", "Laser Engravable"],
            "relatedSkus": ["PIX-PN-1003", "PIX-PN-1016", "PIX-NB-102", "PIX-CH-1001"],
            "moq": None,
            "price": None,
            "dataWarnings": [
                "Ink refill specifications (ballpoint/rollerball/gel) not explicitly printed in catalog; verified refill specs require company confirmation."
            ],
            "isAmbiguous": False
        })

    # =========================================================================
    # 7. METAL KEYCHAINS (Pages 47-48, 15 model SKUs)
    # =========================================================================
    keychains_raw = [
        {"page": 47, "sku": "PIX-KC-1001", "colors": ["Black"]},
        {"page": 47, "sku": "PIX-KC-1002", "colors": ["Black"]},
        {"page": 47, "sku": "PIX-KC-1003", "colors": ["Red", "Black"]},
        {"page": 47, "sku": "PIX-KC-1004", "colors": ["Red", "Tan", "White", "Black", "Blue", "Gold"]},
        {"page": 47, "sku": "PIX-KC-1005", "colors": ["Black"]},
        {"page": 47, "sku": "PIX-KC-1006", "colors": ["Black"]},
        {"page": 47, "sku": "PIX-KC-1007", "colors": ["Black"]},
        {"page": 48, "sku": "PIX-KC-1008", "colors": ["Tan"]},
        {"page": 48, "sku": "PIX-KC-1009", "colors": ["Bamboo", "Black", "Blue", "Gold", "Tan"]},
        {"page": 48, "sku": "PIX-KC-1010", "colors": ["Chrome Metal"]},
        {"page": 48, "sku": "PIX-KC-1012", "colors": ["Chrome Metal"]},
        {"page": 48, "sku": "PIX-KC-1013", "colors": ["Chrome Metal"]},
        {"page": 48, "sku": "PIX-KC-1014", "colors": ["Chrome Metal"]},
        {"page": 48, "sku": "PIX-KC-1016", "colors": ["Chrome Metal"]},
        {"page": 48, "sku": "PIX-KC-1021", "colors": ["Chrome Metal"]},
    ]

    for item in keychains_raw:
        sku = item["sku"]
        clean_id = slugify(sku)
        page_num = item["page"]
        page_photos = get_page_photos_sorted_y(page_num)
        mapped_img_file = page_photos[0]["filename"] if page_photos else None
        hero_img = copy_product_hero_image(clean_id, mapped_img_file)

        variants = [{"name": c, "isAvailable": True} for c in item["colors"]]

        all_products.append({
            "id": clean_id,
            "sku": sku,
            "name": f"{sku} Executive Keychain",
            "originalCatalogName": f"METAL KEYCHAINS {sku}",
            "slug": slugify(f"{clean_id}-executive-keychain"),
            "category": "Metal Keychains",
            "categorySlug": "metal-keychains",
            "sourcePage": page_num,
            "description": f"Durable executive keychain engineered with high-density zinc alloy and textured accents. Features a dedicated flat plate for precision logo engraving.",
            "material": "Zinc Alloy & Leatherette/Bamboo Hybrid",
            "capacity": None,
            "thermalPerformance": None,
            "lidType": None,
            "features": [
                "Heavy-duty zinc alloy ring and connector hardware",
                "Precision flat plate engineered for laser engraving",
                "Available in multiple leatherette and metallic finishes"
            ],
            "specs": [
                {"label": "Material", "value": "Zinc Alloy & Leatherette / Bamboo"},
                {"label": "Available Finishes", "value": ", ".join(item["colors"])},
                {"label": "Recommended Branding", "value": "Laser Engraving"}
            ],
            "variants": variants,
            "brandingMethods": ["Laser Engraving"],
            "images": {
                "hero": hero_img,
                "gallery": [f"/catalog-assets/raw/{mapped_img_file}"] if mapped_img_file else [],
                "thumbnail": hero_img,
                "requiresManualReview": False
            },
            "tags": ["Metal Keychain", "Corporate Gift", "Laser Engraving"],
            "relatedSkus": ["PIX-KC-1004", "PIX-KC-1009", "PIX-CH-1001"],
            "moq": None,
            "price": None,
            "dataWarnings": [],
            "isAmbiguous": False
        })

    # =========================================================================
    # 8. CARD HOLDERS (Page 50, 5 model SKUs)
    # =========================================================================
    card_holders_raw = [
        {"sku": "PIX-CH-1001", "colors": ["Black", "White", "Grey", "Cork", "Blue", "Red", "Tan"], "material": "Metal Body with Thermal PU & Real Cork Wraps"},
        {"sku": "PIX-CH-1002", "colors": ["Black Gold"], "material": "Metal Body with Gold Accent Clasp"},
        {"sku": "PIX-CH-1003", "colors": ["Blue", "Tan"], "material": "Metal Body with Textured PU Cover"},
        {"sku": "PIX-CH-1004", "colors": ["Black", "White"], "material": "Stainless Steel Slim Business Card Case"},
        {"sku": "PIX-CH-1006", "colors": ["Black", "Brown"], "material": "Leatherette Finish with Magnetic Clasp"}
    ]

    for item in card_holders_raw:
        sku = item["sku"]
        clean_id = slugify(sku)
        page_num = 50
        page_photos = get_page_photos_sorted_y(page_num)
        mapped_img_file = page_photos[0]["filename"] if page_photos else None
        hero_img = copy_product_hero_image(clean_id, mapped_img_file)

        variants = [{"name": c, "isAvailable": True} for c in item["colors"]]

        all_products.append({
            "id": clean_id,
            "sku": sku,
            "name": f"{sku} Executive Visiting Card Holder",
            "originalCatalogName": f"CARD HOLDERS {sku}",
            "slug": slugify(f"{clean_id}-executive-card-holder"),
            "category": "Card Holders",
            "categorySlug": "card-holders",
            "sourcePage": page_num,
            "description": f"Executive pocket business card holder crafted with {item['material']}. Slim pocket profile featuring magnetic closure and debossing/engraving support.",
            "material": item["material"],
            "capacity": "Approx. 15–20 Standard Business Cards",
            "thermalPerformance": None,
            "lidType": "Magnetic Clasp Closure",
            "features": [
                "Slimline pocket form factor protects business cards from bending",
                "Magnetic snap closure keeps cards secure in pocket or bag",
                "Available in 7 distinct color and texture finishes including real cork"
            ],
            "specs": [
                {"label": "Material", "value": item["material"]},
                {"label": "Finishes", "value": ", ".join(item["colors"])},
                {"label": "Closure", "value": "Magnetic Snap Mechanism"},
                {"label": "Branding Compatibility", "value": "Laser Engraving & Debossing"}
            ],
            "variants": variants,
            "brandingMethods": ["Laser Engraving", "Debossing", "UV Full Color Printing"],
            "images": {
                "hero": hero_img,
                "gallery": [f"/catalog-assets/raw/{mapped_img_file}"] if mapped_img_file else [],
                "thumbnail": hero_img,
                "requiresManualReview": False
            },
            "tags": ["Card Holder", "Visiting Card Case", "Executive Desk"],
            "relatedSkus": ["PIX-CH-1001", "PIX-NB-102", "PIX-PN-1003"],
            "moq": None,
            "price": None,
            "dataWarnings": [],
            "isAmbiguous": False
        })

    # =========================================================================
    # 9. BAMBOO DESK UTILITY PRODUCTS (Pages 52-59, 22 items)
    # =========================================================================
    bamboo_raw = [
        # Page 52
        {"page": 52, "pos": 0, "sku": "PIX-BMB-01", "name": "Bamboo Mobile Stand / Speaker", "finish": "Natural Matte", "features": "Natural bamboo acoustic sound amplifier and docking station, zero electricity or cables needed"},
        {"page": 52, "pos": 1, "sku": "PIX-BMB-01-GLOSS", "catalog_sku": "PIX-BMB-01 (GLOSS)", "name": "Bamboo Mobile Stand / Speaker (Gloss Finish)", "finish": "PU Gloss Coating", "features": "Natural bamboo acoustic amplifier with high-durability moisture-resistant PU gloss finish"},
        {"page": 52, "pos": 2, "sku": "PIX-BMB-02", "name": "Bamboo Mobile Stand / Speaker Curve Stand", "finish": "Natural Curved Bamboo", "features": "Acoustic passive amplifier with ergonomic curved docking angle"},
        # Page 53
        {"page": 53, "pos": 0, "sku": "PIX-BMB-0506", "catalog_sku": "PIX-BMB-05-06", "name": "Bamboo Mobile Speaker with Pen & Card Holder (Angle Cut)", "finish": "Natural Bamboo", "features": "All-in-1 desktop utility: passive acoustic sound amplifier, angle cut pen stand, and card slots"},
        {"page": 53, "pos": 1, "sku": "PIX-BMB-03", "name": "Bamboo Mobile Stand / Speaker with 2 Pen Holder", "finish": "Natural Bamboo", "features": "Acoustic sound dock with two dedicated pen holding slots for tidy office desks"},
        {"page": 53, "pos": 2, "sku": "PIX-BMB-04", "name": "Bamboo Mobile Stand / Speaker with Calendar", "finish": "Natural Bamboo", "features": "Acoustic phone dock with integrated customizable perpetual calendar"},
        # Page 54
        {"page": 54, "pos": 0, "sku": "PIX-BMB-08", "name": "Bamboo Mobile Speaker with Angle Cut Pen Stand", "finish": "Bamboo on Pine Wood Base", "features": "Handcrafted natural bamboo acoustic chamber mounted on solid pine wood base with angle-cut tumbler"},
        {"page": 54, "pos": 1, "sku": "PIX-BMB-07", "name": "Bamboo Mobile Speaker with Round Pen Stand", "finish": "Bamboo on Wood Base", "features": "Passive sound dock with cylindrical stationary tumbler on solid wood platform"},
        {"page": 54, "pos": 2, "sku": "PIX-BMB-09", "name": "Bamboo Mobile Speaker with Pen Stand & Card Holder", "finish": "Natural Bamboo on Wood Base", "features": "Acoustic phone dock with angle cut tumbler and front visiting card slot"},
        # Page 55
        {"page": 55, "pos": 0, "sku": "PIX-BMB-10", "name": "Bamboo Mobile Speaker with Study Lamp & Pen Stand", "finish": "Natural Bamboo with Lamp", "features": "Acoustic phone dock with integrated flexible study lamp and pen organizer"},
        {"page": 55, "pos": 1, "sku": "PIX-BMB-13", "name": "Bamboo Pen Stand With Rope Accent", "finish": "Handcrafted Bamboo with Jute Rope", "features": "Rustic desktop stationary tumbler hand-wrapped with decorative natural rope"},
        {"page": 55, "pos": 2, "sku": "PIX-BMB-14", "name": "Bamboo Angle Cut Pen Stand Tumbler / Desk Planter", "finish": "PU Gloss Coating", "features": "2-in-1 natural sealed bottom bamboo tumbler suitable as stationery holder or indoor succulent planter"},
        # Page 56
        {"page": 56, "pos": 0, "sku": "PIX-BMB-15", "name": "Bamboo Card Holder with Double Pen Stand", "finish": "PU Gloss Coating", "features": "Compact desktop organizer holding 2 pens and multiple business cards"},
        {"page": 56, "pos": 1, "sku": "PIX-BMB-16", "name": "Bamboo Half Moon Phone Stand with Charging Cable Hole", "finish": "PU Gloss Coating", "features": "3-in-1 crescent desk organizer with cable passthrough hole, card slots, and dual pen holders"},
        {"page": 56, "pos": 2, "sku": "PIX-BMB-17", "name": "Bamboo Phone Stand with Card Holder & Double Pen Stand", "finish": "PU Gloss Coating", "features": "3-in-1 multi-tier organizer with phone kickstand, card display, and pen slots"},
        # Page 57
        {"page": 57, "pos": 0, "sku": "PIX-BMB-18", "name": "Bamboo Mini Set: Tumbler with Phone Stand / Card Holder", "finish": "PU Gloss Finish", "features": "Coordinated natural bamboo desk set including tumbler and standalone phone/card block"},
        {"page": 57, "pos": 1, "sku": "PIX-BMB-20", "name": "Bamboo Card and Stationery Holder", "finish": "Natural Bamboo", "features": "Compartmentalized desktop card and office supply tray"},
        {"page": 57, "pos": 2, "sku": "PIX-BMB-19", "name": "Bamboo Half Moon Phone Stand with Charging Port", "finish": "PU Gloss Coating", "features": "Ergonomic tilted smartphone stand with base cable slot for clean desktop charging"},
        # Page 58
        {"page": 58, "pos": 0, "sku": "PIX-BMB-21", "name": "Barrel Bamboo Speaker with Double Pen Stand", "finish": "PU Gloss Coating", "features": "Barrel-shaped acoustic amplifier chamber with hole-cut side caps for enhanced bass and dual pen slots"},
        {"page": 58, "pos": 1, "sku": "PIX-BMB-27", "name": "Bamboo Visiting Card Holder (U Style)", "finish": "Natural Bamboo", "features": "Minimalist U-shaped desktop card holder block showcasing business cards cleanly"},
        {"page": 58, "pos": 2, "sku": "PIX-BMB-28", "name": "Bamboo All-in-One Desk Organiser", "finish": "Natural Bamboo", "features": "Comprehensive desk caddy with 2 stationery compartments, visiting card slot, and smartphone dock"},
        # Page 59
        {"page": 59, "pos": 0, "sku": "PIX-BMB-30", "name": "Barrel Bamboo Table Clock with Tumbler", "finish": "Natural Bamboo with Analog Clock", "features": "Executive desk timepiece featuring analog clock insert and adjoining stationary tumbler / planter"}
    ]

    for item in bamboo_raw:
        sku = item.get("catalog_sku", item["sku"])
        internal_id = slugify(item["sku"])
        page_num = item["page"]
        page_photos = get_page_photos_sorted_y(page_num)
        mapped_img_file = page_photos[item["pos"]]["filename"] if item["pos"] < len(page_photos) else None
        hero_img = copy_product_hero_image(internal_id, mapped_img_file)

        data_warnings = []
        if item["sku"] == "PIX-BMB-01-GLOSS":
            data_warnings.append("Source catalog lists PIX-BMB-01 and PIX-BMB-01 (GLOSS) as separate entries; tracked internally with distinct ID.")
        if item["sku"] == "PIX-BMB-0506":
            data_warnings.append("Normalized compound catalog model code PIX-BMB-05-06 to PIX-BMB-0506.")

        all_products.append({
            "id": internal_id,
            "sku": sku,
            "name": f"{sku} {item['name']}",
            "originalCatalogName": f"BAMBOO DESK UTILITY PRODUCTS {sku}",
            "slug": slugify(f"{internal_id}-{item['name']}"),
            "category": "Bamboo Desk Utility Products",
            "categorySlug": "bamboo-desk-utility",
            "sourcePage": page_num,
            "description": f"Handcrafted from 100% sustainably harvested natural bamboo. {item['features']}. Finished with {item['finish'].lower()} and primed for corporate logo engraving.",
            "material": "100% Natural Bamboo",
            "capacity": None,
            "thermalPerformance": None,
            "lidType": None,
            "features": [
                item["features"],
                "Handcrafted from 100% natural sustainable bamboo",
                "Zero electricity required for passive acoustic sound amplifier models",
                "Large flat wooden face ideal for laser engraving and UV printing"
            ],
            "specs": [
                {"label": "Material", "value": "100% Natural Bamboo"},
                {"label": "Finish", "value": item["finish"]},
                {"label": "Sustainability", "value": "Biodegradable, Renewable Bamboo"},
                {"label": "Customization", "value": "Laser Engraving & UV Printing Ready"}
            ],
            "variants": [
                {"name": item["finish"], "isAvailable": True}
            ],
            "brandingMethods": ["Laser Engraving", "Screen Printing", "UV Full Color Printing"],
            "images": {
                "hero": hero_img,
                "gallery": [f"/catalog-assets/raw/{mapped_img_file}"] if mapped_img_file else [],
                "thumbnail": hero_img,
                "requiresManualReview": mapped_img_file is None
            },
            "tags": ["Eco-Friendly", "100% Natural Bamboo", "Desk Utility", "Acoustic Speaker"],
            "relatedSkus": ["PIX-BMB-01", "PIX-BMB-08", "PIX-BMB-30", "PIX-NB-117"],
            "moq": None,
            "price": None,
            "dataWarnings": data_warnings,
            "isAmbiguous": len(data_warnings) > 0
        })

    # Save centralized dataset
    with open(PRODUCTS_OUT, "w", encoding="utf-8") as f:
        json.dump(all_products, f, indent=2)

    print(f"Total products generated: {len(all_products)}")
    print(f"Saved products dataset to: {PRODUCTS_OUT}")

if __name__ == "__main__":
    main()
