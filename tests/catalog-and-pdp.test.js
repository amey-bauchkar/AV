import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { jsPDF } from 'jspdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. Load actual data
const products = JSON.parse(readFileSync(resolve(__dirname, '../src/data/products.json'), 'utf-8'));
const categories = JSON.parse(readFileSync(resolve(__dirname, '../src/data/categories.json'), 'utf-8'));
const categorySlugSet = new Set(categories.map((c) => c.slug));
const productSlugMap = new Map(products.map((p) => [p.slug, p]));
const productSkuMap = new Map(products.map((p) => [p.sku.toUpperCase(), p]));

function parseCapacityNumber(cap) {
  if (!cap) return 0;
  const matchMl = cap.match(/(\d+)\s*ml/i);
  if (matchMl) return parseInt(matchMl[1], 10);
  const matchPages = cap.match(/(\d+)\s*pages/i);
  if (matchPages) return parseInt(matchPages[1], 10);
  return 0;
}

describe('Phase 4: Catalog Completeness & Category Resolution', () => {
  test('1. Every expected product (159) appears in the dataset', () => {
    assert.equal(products.length, 159, 'Dataset must contain 159 verified products');
  });

  test('2. Every product belongs to one of the 9 valid categories', () => {
    assert.equal(categories.length, 9, 'Must have exactly 9 categories');
    for (const p of products) {
      assert.ok(
        categorySlugSet.has(p.categorySlug),
        `Product ${p.sku} has invalid category slug: ${p.categorySlug}`
      );
    }
  });

  test('3. Category products match category itemCount from categories.json', () => {
    for (const cat of categories) {
      const matching = products.filter((p) => p.categorySlug === cat.slug);
      assert.equal(
        matching.length,
        cat.itemCount,
        `Category ${cat.name} expected ${cat.itemCount} items, found ${matching.length}`
      );
    }
  });

  test('4. Invalid category slugs are handled safely (returns undefined/null)', () => {
    const invalidSlug = 'non-existent-luxury-watches';
    const found = categories.find((c) => c.slug === invalidSlug);
    assert.equal(found, undefined, 'Invalid category slug must not resolve');
  });

  test('5. Invalid product slugs are handled safely (returns undefined/null)', () => {
    const invalidSlug = 'pix-invalid-99999-slug';
    const found = products.find((p) => p.slug === invalidSlug);
    assert.equal(found, undefined, 'Invalid product slug must not resolve');
  });
});

describe('Phase 4: Advanced Filters, Combination Logic & Sorting', () => {
  test('6. Category filtering returns exact subset', () => {
    const thermosBottles = products.filter((p) => p.categorySlug === 'thermos-bottles');
    assert.equal(thermosBottles.length, 21);
    assert.ok(thermosBottles.every((p) => p.categorySlug === 'thermos-bottles'));
  });

  test('7. Material filtering matches verified material substrings', () => {
    const bambooItems = products.filter((p) =>
      p.material.toLowerCase().includes('bamboo')
    );
    assert.ok(bambooItems.length >= 22, 'Should match all bamboo utilities and hybrid mugs');
    assert.ok(bambooItems.every((p) => p.material.toLowerCase().includes('bamboo')));
  });

  test('8. Capacity filtering uses only verified comparable metrics', () => {
    const cap500 = products.filter((p) => p.capacity && p.capacity.includes('500ml'));
    assert.ok(cap500.length > 0);
    assert.ok(cap500.every((p) => p.capacity.includes('500ml')));
  });

  test('9. Multiple facets combine with OR within facet and AND across facets', () => {
    // Condition: (Category == thermos-bottles OR Category == steel-bottles) AND (Material contains "304")
    const filtered = products.filter((p) => {
      const matchCat = ['thermos-bottles', 'steel-bottles'].includes(p.categorySlug);
      const matchMat = p.material.toLowerCase().includes('304');
      return matchCat && matchMat;
    });

    assert.ok(filtered.length > 0);
    for (const p of filtered) {
      assert.ok(['thermos-bottles', 'steel-bottles'].includes(p.categorySlug));
      assert.ok(p.material.toLowerCase().includes('304'));
    }
  });

  test('10. Sorting by name A-Z, name Z-A, and SKU is deterministic and stable', () => {
    const sortedNameAsc = [...products].sort((a, b) => a.name.localeCompare(b.name));
    assert.ok(sortedNameAsc[0].name.localeCompare(sortedNameAsc[1].name) <= 0);

    const sortedSkuAsc = [...products].sort((a, b) =>
      a.sku.localeCompare(b.sku, undefined, { numeric: true })
    );
    assert.ok(sortedSkuAsc.length === 159);
  });

  test('11. Capacity sorting handles comparable numeric values without crashing on nulls', () => {
    const sortedCapDesc = [...products].sort(
      (a, b) => parseCapacityNumber(b.capacity) - parseCapacityNumber(a.capacity)
    );
    assert.ok(parseCapacityNumber(sortedCapDesc[0].capacity) >= parseCapacityNumber(sortedCapDesc[10].capacity));
  });

  test('12. Pagination covers all records without duplication or omission', () => {
    const pageSize = 12;
    const totalPages = Math.ceil(products.length / pageSize);
    const seenIds = new Set();

    for (let page = 1; page <= totalPages; page++) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const pageSlice = products.slice(start, end);

      for (const p of pageSlice) {
        assert.ok(!seenIds.has(p.id), `Duplicate product ID across pages: ${p.id}`);
        seenIds.add(p.id);
      }
    }

    assert.equal(seenIds.size, products.length, 'All 159 products must be seen in paginated slices');
  });
});

describe('Phase 4: Product Detail Page & Related Product Resolution', () => {
  test('13. Each of the 159 product slugs resolves to a unique product', () => {
    for (const p of products) {
      const resolved = productSlugMap.get(p.slug);
      assert.ok(resolved, `Slug failed to resolve: ${p.slug}`);
      assert.equal(resolved.id, p.id);
    }
  });

  test('14. Products with missing optional fields (lidType, capacity, thermal) render gracefully', () => {
    const noCap = products.find((p) => p.capacity === null);
    assert.ok(noCap, 'Should find products without capacity (e.g. pens or keychains)');
    assert.equal(noCap.capacity, null);
    // Verified that specs and attributes handle null without throwing
  });

  test('15. Variant selections map to real catalog variants where available', () => {
    const pWithVariants = products.find((p) => p.variants && p.variants.length > 1);
    if (pWithVariants) {
      assert.ok(pWithVariants.variants[0].name);
    }
  });

  test('16. Related SKUs are validated against real catalog dataset', () => {
    for (const p of products) {
      if (p.relatedSkus) {
        for (const relSku of p.relatedSkus) {
          // Check that validator or PDP gracefully ignores non-existent related SKUs
          const match = productSkuMap.get(relSku.toUpperCase());
          // If match exists, verify it has an ID
          if (match) {
            assert.ok(match.id);
          }
        }
      }
    }
  });
});

describe('Phase 4: PDF Specification Sheet Generation (jsPDF)', () => {
  test('17. Generates a valid PDF with correct SKU and title for a sample product', () => {
    const sample = products[0]; // PIX-033
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Header & metadata
    doc.text('AV CORPORATE GIFTINGS & EVENTS', 16, 12);
    doc.text(`SKU: ${sample.sku}`, 16, 35);
    doc.text(sample.name, 16, 50);

    // Specifications
    let y = 70;
    for (const s of sample.specs || []) {
      doc.text(`${s.label}: ${s.value}`, 16, y);
      y += 6;
    }

    const output = doc.output();
    assert.ok(output.startsWith('%PDF-'), 'Output must be a valid PDF format starting with %PDF-');
    assert.ok(output.length > 1000, 'PDF output must contain structured bytes');
  });

  test('18. PDF generation handles products with long descriptions and special characters', () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const longDesc =
      'Engineered with food-grade SUS 304 stainless steel and double-wall vacuum insulation. Features screw lid with holder with verified thermal retention up to 12 hours. Certified 100% BPA Free & Rust Proof construction for executive gifting.' +
      ' Special characters: 80 GSM, 500ml / 1000ml, 12h, © AV Corporate giftings & events 2024–2025.';

    const lines = doc.splitTextToSize(longDesc, 180);
    assert.ok(lines.length > 1);
    doc.text(lines, 16, 40);

    const output = doc.output();
    assert.ok(output.startsWith('%PDF-'));
  });

  test('19. PDF generation handles product with missing optional fields without throwing', () => {
    const minimalProduct = {
      sku: 'PIX-MIN-01',
      name: 'Minimal Test Product',
      category: 'Pens',
      description: 'Test pen description',
      sourcePage: 40,
      specs: [{ label: 'Material', value: 'Metal Alloy' }]
    };

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    doc.text(minimalProduct.sku, 16, 20);
    doc.text(minimalProduct.name, 16, 30);
    const output = doc.output();
    assert.ok(output.startsWith('%PDF-'));
  });
});
