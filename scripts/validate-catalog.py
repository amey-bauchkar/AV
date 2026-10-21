"""
Plastico Impex (PIX) - Catalog Validation System
Strictly validates products.json, categories.json, image referential integrity,
schema compliance, and data-quality warnings.
"""

import os
import sys
import json
import re

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_PATH = os.path.join(WORKSPACE, "src", "data", "products.json")
CATEGORIES_PATH = os.path.join(WORKSPACE, "src", "data", "categories.json")
PUBLIC_DIR = os.path.join(WORKSPACE, "public")
REPORT_PATH = os.path.join(WORKSPACE, "reports", "catalog-data-quality-report.json")

EXPECTED_CATEGORIES = [
    "Thermos Bottles",
    "Steel Bottles",
    "Thermos Mugs",
    "Travel Mugs",
    "Notebooks",
    "Pens",
    "Metal Keychains",
    "Card Holders",
    "Bamboo Desk Utility Products"
]

EXPECTED_CATEGORY_COUNTS = {
    "Thermos Bottles": 21,
    "Steel Bottles": 14,
    "Thermos Mugs": 21,
    "Travel Mugs": 10,
    "Notebooks": 25,
    "Pens": 26,
    "Metal Keychains": 15,
    "Card Holders": 5,
    "Bamboo Desk Utility Products": 22
}

def validate():
    print("Running Catalog Quality & Integrity Validation...")
    errors = []
    warnings = []

    # 1. Load products
    if not os.path.exists(PRODUCTS_PATH):
        print(f"BLOCKING ERROR: products.json not found at {PRODUCTS_PATH}")
        sys.exit(1)

    try:
        with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
            products = json.load(f)
    except Exception as e:
        print(f"BLOCKING ERROR: products.json failed to parse JSON: {e}")
        sys.exit(1)

    # 2. Load categories
    if not os.path.exists(CATEGORIES_PATH):
        print(f"BLOCKING ERROR: categories.json not found at {CATEGORIES_PATH}")
        sys.exit(1)

    try:
        with open(CATEGORIES_PATH, "r", encoding="utf-8") as f:
            categories = json.load(f)
    except Exception as e:
        print(f"BLOCKING ERROR: categories.json failed to parse JSON: {e}")
        sys.exit(1)

    total_products = len(products)
    print(f"Total products loaded: {total_products}")

    if total_products != 159:
        errors.append(f"Product count mismatch: expected 159 catalog entries, found {total_products}")

    # 3. Category coverage
    found_categories = {c["name"]: c for c in categories}
    category_counts = {}
    for p in products:
        cname = p.get("category", "")
        category_counts[cname] = category_counts.get(cname, 0) + 1

    for exp_cat, exp_count in EXPECTED_CATEGORY_COUNTS.items():
        act_count = category_counts.get(exp_cat, 0)
        if act_count != exp_count:
            errors.append(f"Category '{exp_cat}' count mismatch: expected {exp_count}, found {act_count}")

    # 4. ID and Slug Uniqueness
    seen_ids = set()
    seen_slugs = set()
    sku_occurrences = {}

    missing_fields_count = 0
    broken_image_paths = []
    products_with_warnings = []
    manual_review_needed = []

    for idx, p in enumerate(products):
        pid = p.get("id")
        sku = p.get("sku")
        slug = p.get("slug")
        name = p.get("name")
        page = p.get("sourcePage")

        # Required fields check
        for req in ["id", "sku", "name", "slug", "category", "categorySlug", "sourcePage", "material"]:
            if not p.get(req):
                errors.append(f"Product index {idx} ({sku or 'UNKNOWN'}) missing required field '{req}'")
                missing_fields_count += 1

        # Duplicate ID check
        if pid in seen_ids:
            errors.append(f"Duplicate product ID found: '{pid}'")
        seen_ids.add(pid)

        # Duplicate Slug check
        if slug in seen_slugs:
            errors.append(f"Duplicate product slug found: '{slug}'")
        seen_slugs.add(slug)

        # Base SKU tracking
        sku_occurrences.setdefault(sku, []).append(pid)

        # Verify no fabricated commercial data
        if p.get("price") is not None:
            warnings.append(f"Product '{sku}' contains non-null price ({p['price']}); source catalog contains no prices.")
        if p.get("moq") is not None:
            warnings.append(f"Product '{sku}' contains non-null MOQ ({p['moq']}); source catalog contains no authoritatively published MOQs.")

        # Data warnings check
        if p.get("dataWarnings"):
            products_with_warnings.append({
                "id": pid,
                "sku": sku,
                "page": page,
                "warnings": p["dataWarnings"]
            })

        # Image referential integrity
        img_info = p.get("images", {})
        hero = img_info.get("hero")
        if not hero:
            errors.append(f"Product '{sku}' missing hero image reference")
        else:
            # check disk existence
            clean_hero_rel = hero.lstrip("/")
            disk_path = os.path.join(PUBLIC_DIR, clean_hero_rel)
            if not os.path.exists(disk_path):
                broken_image_paths.append({
                    "sku": sku,
                    "field": "images.hero",
                    "path": hero,
                    "disk_path": disk_path
                })

        if img_info.get("requiresManualReview"):
            manual_review_needed.append({"sku": sku, "id": pid, "page": page})

    # Find SKU collisions
    sku_collisions = {s: pids for s, pids in sku_occurrences.items() if len(pids) > 1}

    # Prepare report
    report = {
        "status": "PASSED" if len(errors) == 0 else "FAILED",
        "summary": {
            "total_catalog_entries": total_products,
            "unique_base_skus": len(sku_occurrences),
            "sku_collisions_handled": len(sku_collisions),
            "total_categories": len(category_counts),
            "category_distribution": category_counts,
            "broken_image_paths_count": len(broken_image_paths),
            "products_with_warnings_count": len(products_with_warnings),
            "products_requiring_manual_review_count": len(manual_review_needed),
            "blocking_errors_count": len(errors),
            "warnings_count": len(warnings)
        },
        "sku_collisions": [
            {"sku": s, "internal_ids": pids, "count": len(pids)}
            for s, pids in sku_collisions.items()
        ],
        "broken_images": broken_image_paths,
        "products_with_data_warnings": products_with_warnings,
        "products_requiring_manual_review": manual_review_needed,
        "blocking_errors": errors,
        "warnings": warnings
    }

    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print(f"\nValidation Report Summary:")
    print(f"Status: {report['status']}")
    print(f"Total Catalog Entries: {total_products}")
    print(f"Unique Base SKUs: {len(sku_occurrences)}")
    print(f"SKU Collisions Differentiated: {len(sku_collisions)} ({list(sku_collisions.keys())})")
    print(f"Categories: {len(category_counts)}")
    print(f"Broken Image Paths: {len(broken_image_paths)}")
    print(f"Products with Source Warnings: {len(products_with_warnings)}")
    print(f"Products Requiring Image Review: {len(manual_review_needed)}")
    print(f"Blocking Errors: {len(errors)}")
    print(f"Report exported to: {REPORT_PATH}")

    if len(errors) > 0:
        print("\nBlocking Errors Detected:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("\nSUCCESS: All catalog data integrity checks passed with 0 blocking errors!")

if __name__ == "__main__":
    validate()
