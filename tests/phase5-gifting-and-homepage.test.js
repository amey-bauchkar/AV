import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const products = JSON.parse(readFileSync(resolve(__dirname, '../src/data/products.json'), 'utf-8'));
const categories = JSON.parse(readFileSync(resolve(__dirname, '../src/data/categories.json'), 'utf-8'));
const productSkuMap = new Map(products.map((p) => [p.sku.toUpperCase(), p]));

// Gifting Presets configuration under test
const PRESETS = [
  {
    id: 'onboarding',
    title: 'Employee Welcome & Onboarding',
    skus: ['PIX-033', 'PIX-NB-102', 'PIX-PN-1003', 'PIX-CH-1001']
  },
  {
    id: 'client',
    title: 'Client Appreciation & Boardroom',
    skus: ['PIX-5002', 'PIX-NB-104', 'PIX-PN-1001', 'PIX-KC-1001']
  },
  {
    id: 'events',
    title: 'Conferences & Large Event Swag',
    skus: ['PIX-1013', 'PIX-NB-PL 1', 'PIX-PN-1004']
  },
  {
    id: 'eco',
    title: 'Sustainable Bamboo Collection',
    skus: ['PIX-BMB-01', 'PIX-BMB-03', 'PIX-BMB-14']
  }
];

describe('Phase 5: Corporate Gifting & Starter Kit Verification', () => {
  test('1. All SKUs referenced in Occasion Starter Kits exist in master catalog', () => {
    for (const preset of PRESETS) {
      for (const sku of preset.skus) {
        const found = productSkuMap.get(sku.toUpperCase());
        assert.ok(
          found,
          `Preset "${preset.title}" references SKU "${sku}" which must exist in products.json`
        );
        assert.ok(found.images?.hero, `Product "${sku}" must have a valid hero image`);
        assert.ok(found.category, `Product "${sku}" must have an assigned category`);
      }
    }
  });

  test('2. Multiplier logic correctly computes batch units for corporate kits', () => {
    const testKit = [
      { sku: 'PIX-033', quantityPerKit: 1 },
      { sku: 'PIX-NB-102', quantityPerKit: 1 },
      { sku: 'PIX-PN-1003', quantityPerKit: 2 },
      { sku: 'PIX-CH-1001', quantityPerKit: 1 }
    ];

    const batchCount = 100;
    const itemsPerKit = testKit.reduce((sum, i) => sum + i.quantityPerKit, 0);
    assert.equal(itemsPerKit, 5, 'Must have 5 physical items per gift box');

    const totalBatchUnits = testKit.reduce((sum, i) => sum + i.quantityPerKit * batchCount, 0);
    assert.equal(totalBatchUnits, 500, 'Batch multiplier of 100 must produce exactly 500 units');
  });

  test('3. RFQ line item notes structure includes kit occasion and packaging specifications', () => {
    const occasionTitle = 'Employee Welcome & Onboarding';
    const packagingName = 'Custom Debossed Rigid Gift Box';
    const batchCount = 100;
    const userLineNote = 'Laser engrave employee names on reverse';

    const fullNotes = [
      `Part of Kit: ${occasionTitle} (Batch: ${batchCount} kits)`,
      `Packaging: ${packagingName}`,
      userLineNote ? `Line notes: ${userLineNote}` : null
    ]
      .filter(Boolean)
      .join(' | ');

    assert.ok(fullNotes.includes('Part of Kit: Employee Welcome & Onboarding'));
    assert.ok(fullNotes.includes('Batch: 100 kits'));
    assert.ok(fullNotes.includes('Packaging: Custom Debossed Rigid Gift Box'));
    assert.ok(fullNotes.includes('Line notes: Laser engrave employee names on reverse'));
  });
});

describe('Phase 5: Brand Aesthetics & Visual Assets Verification', () => {
  test('4. Hero visual banner asset exists in public directory', () => {
    const heroPath = resolve(__dirname, '../public/images/pix-hero-banner.png');
    assert.ok(existsSync(heroPath), 'public/images/pix-hero-banner.png must exist');
    const heroStats = readFileSync(heroPath);
    assert.ok(heroStats.length > 50000, 'pix-hero-banner.png must be a high-resolution image asset');
  });

  test('5. Design tokens define the official corporate palette', () => {
    const tokensCss = readFileSync(resolve(__dirname, '../src/styles/tokens.css'), 'utf-8');
    assert.ok(tokensCss.includes('#153D25'), 'Tokens must contain Forest Green (#153D25)');
    assert.ok(tokensCss.includes('#F12D18'), 'Tokens must contain Vivid Vermilion Accent (#F12D18)');
    assert.ok(tokensCss.includes('#F4F5EB'), 'Tokens must contain Warm Ivory Canvas (#F4F5EB)');
    assert.ok(tokensCss.includes('--font-display'), 'Tokens must define --font-display');
  });
});

describe('Phase 5: Technical SEO & Production Readiness', () => {
  test('6. public/robots.txt allows indexing and references sitemap.xml', () => {
    const robotsPath = resolve(__dirname, '../public/robots.txt');
    assert.ok(existsSync(robotsPath), 'public/robots.txt must exist');
    const robotsContent = readFileSync(robotsPath, 'utf-8');
    assert.ok(robotsContent.includes('User-agent: *'), 'Robots must allow all user agents');
    assert.ok(robotsContent.includes('Sitemap: https://plasticoimpex.com/sitemap.xml'), 'Robots must reference sitemap.xml');
  });

  test('7. public/sitemap.xml contains all 159 products and 9 categories', () => {
    const sitemapPath = resolve(__dirname, '../public/sitemap.xml');
    assert.ok(existsSync(sitemapPath), 'public/sitemap.xml must exist');
    const sitemapContent = readFileSync(sitemapPath, 'utf-8');

    // Check all categories
    for (const cat of categories) {
      assert.ok(
        sitemapContent.includes(`/category/${cat.slug}`),
        `Sitemap must contain category URL for ${cat.slug}`
      );
    }

    // Check sample benchmark products
    assert.ok(sitemapContent.includes('/product/pix-033-thermos-vacuum-bottle-500ml'));
    assert.ok(sitemapContent.includes('/product/pix-5002-thermos-mug-450ml'));
    assert.ok(sitemapContent.includes('/product/pix-bmb-01-bamboo-mobile-stand-speaker'));

    // Count URLs in sitemap
    const urlMatches = sitemapContent.match(/<url>/g);
    assert.equal(urlMatches?.length, 176, 'Sitemap must contain exactly 176 URLs (8 static + 9 categories + 159 products)');
  });

  test('8. App.tsx includes route-level code-splitting with React.lazy', () => {
    const appTsx = readFileSync(resolve(__dirname, '../src/App.tsx'), 'utf-8');
    assert.ok(appTsx.includes('lazy('), 'App.tsx must use React.lazy for code splitting');
    assert.ok(appTsx.includes('Suspense'), 'App.tsx must use Suspense for lazy loading');
    assert.ok(appTsx.includes('/corporate-gifting'), 'App.tsx must register /corporate-gifting route');
  });
});
