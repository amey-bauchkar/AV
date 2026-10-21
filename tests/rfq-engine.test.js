import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load real catalog dataset
const productsPath = resolve(__dirname, '../src/data/products.json');
const products = JSON.parse(readFileSync(productsPath, 'utf-8'));
const validProductIds = new Set(products.map((p) => p.id));

// Helper: RFQ Cart State Simulator mirroring RfqCartProvider logic
class RfqCartEngine {
  constructor(initialItems = []) {
    this.STORAGE_KEY = 'pix-rfq-cart:v1';
    this.storage = new Map();
    this.items = this.sanitizeAndValidate(initialItems);
  }

  sanitizeAndValidate(rawItems) {
    if (!Array.isArray(rawItems)) return [];
    return rawItems
      .filter((item) => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof item.productId === 'string' &&
          validProductIds.has(item.productId) &&
          typeof item.sku === 'string' &&
          typeof item.name === 'string' &&
          typeof item.quantity === 'number' &&
          item.quantity >= 1
        );
      })
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Math.floor(item.quantity)),
        variant: item.variant || 'Standard',
        brandingMethod: item.brandingMethod || 'None / Standard'
      }));
  }

  addItem(newItemInput) {
    const addQty = Math.max(1, Math.floor(newItemInput.quantity ?? 1));
    const targetVariant = newItemInput.variant || 'Standard';
    const targetBranding = newItemInput.brandingMethod || 'None / Standard';

    const existingIndex = this.items.findIndex(
      (i) =>
        i.productId === newItemInput.productId &&
        (i.variant || 'Standard') === targetVariant &&
        (i.brandingMethod || 'None / Standard') === targetBranding
    );

    if (existingIndex >= 0) {
      this.items[existingIndex] = {
        ...this.items[existingIndex],
        quantity: this.items[existingIndex].quantity + addQty
      };
    } else {
      this.items.push({
        productId: newItemInput.productId,
        sku: newItemInput.sku,
        name: newItemInput.name,
        slug: newItemInput.slug,
        image: newItemInput.image,
        category: newItemInput.category,
        capacity: newItemInput.capacity,
        material: newItemInput.material,
        variant: targetVariant,
        brandingMethod: targetBranding,
        quantity: addQty,
        notes: newItemInput.notes || ''
      });
    }
    this.persist();
  }

  removeItem(index) {
    this.items = this.items.filter((_, idx) => idx !== index);
    this.persist();
  }

  updateQuantity(index, quantity) {
    if (index < 0 || index >= this.items.length) return;
    const validQty = Math.max(1, Math.floor(quantity));
    this.items[index] = { ...this.items[index], quantity: validQty };
    this.persist();
  }

  updateItemOptions(index, options) {
    if (index < 0 || index >= this.items.length) return;
    this.items[index] = { ...this.items[index], ...options };
    this.persist();
  }

  clearCart() {
    this.items = [];
    this.persist();
  }

  get totalItemCount() {
    return this.items.length;
  }

  get totalUnitsCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  persist() {
    this.storage.set(this.STORAGE_KEY, JSON.stringify(this.items));
  }

  loadFromStorage(rawJson) {
    try {
      const parsed = JSON.parse(rawJson);
      this.items = this.sanitizeAndValidate(parsed);
    } catch {
      this.items = [];
    }
  }
}

// Buyer info validator mirroring src/lib/leadCapture.ts
function validateBuyerInfo(info) {
  const errors = {};
  if (!info.fullName || info.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required (minimum 2 characters)';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!info.email || !emailRegex.test(info.email.trim())) {
    errors.email = 'Valid corporate or business email is required';
  }
  if (!info.company || info.company.trim().length < 2) {
    errors.company = 'Company / Organization name is required';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Format quote summary mirroring src/lib/leadCapture.ts
function formatQuoteSummaryText(buyerInfo, items, refId) {
  const lines = [
    '==================================================',
    'AV CORPORATE GIFTINGS & EVENTS - B2B QUOTATION REQUEST',
    '==================================================',
    `Reference Number: ${refId}`,
    `Date: ${new Date().toISOString()}`,
    '',
    '--- BUYER DETAILS ---',
    `Contact Name: ${buyerInfo.fullName}`,
    `Company: ${buyerInfo.company}`,
    `Email: ${buyerInfo.email}`,
    `Phone / WhatsApp: ${buyerInfo.phone || 'Not specified'}`,
    `Delivery City / PIN: ${buyerInfo.deliveryCity || 'Not specified'}`,
    `Target Date: ${buyerInfo.targetDeliveryDate || 'Flexible'}`,
    buyerInfo.notes ? `Project Notes: ${buyerInfo.notes}` : '',
    '',
    '--- REQUESTED PRODUCTS & SPECIFICATIONS ---'
  ];

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. SKU: ${item.sku} | ${item.name}`,
      `   Category: ${item.category}`,
      `   Selected Variant / Finish: ${item.variant || 'Standard'}`,
      `   Branding Method: ${item.brandingMethod || 'Standard'}`,
      `   Requested Quantity: ${item.quantity} units`,
      item.notes ? `   Line Notes: ${item.notes}` : ''
    );
  });

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  lines.push(
    '',
    `Total Distinct Items: ${items.length}`,
    `Total Units Requested: ${totalUnits} units`,
    '==================================================',
    'Please forward this summary to sales@avcorporategifting.com if submitting offline.'
  );

  return lines.filter(Boolean).join('\n');
}

describe('AV Corporate giftings & events RFQ State Engine & Cart Operations', () => {
  const sampleP1 = products[0]; // e.g. PIX-033
  const sampleP2 = products[1]; // e.g. PIX-034 or PIX-5006

  test('1. Adding real catalog item creates a valid line item', () => {
    const engine = new RfqCartEngine();
    engine.addItem({
      productId: sampleP1.id,
      sku: sampleP1.sku,
      name: sampleP1.name,
      slug: sampleP1.slug,
      image: sampleP1.images.hero,
      category: sampleP1.category,
      variant: 'Matte Black',
      brandingMethod: 'Laser Engraving',
      quantity: 50
    });

    assert.equal(engine.totalItemCount, 1);
    assert.equal(engine.totalUnitsCount, 50);
    assert.equal(engine.items[0].sku, sampleP1.sku);
    assert.equal(engine.items[0].variant, 'Matte Black');
  });

  test('2. Adding identical product with same variant & branding merges quantities', () => {
    const engine = new RfqCartEngine();
    engine.addItem({
      productId: sampleP1.id,
      sku: sampleP1.sku,
      name: sampleP1.name,
      variant: 'Matte Black',
      brandingMethod: 'Laser Engraving',
      quantity: 25
    });
    engine.addItem({
      productId: sampleP1.id,
      sku: sampleP1.sku,
      name: sampleP1.name,
      variant: 'Matte Black',
      brandingMethod: 'Laser Engraving',
      quantity: 75
    });

    assert.equal(engine.totalItemCount, 1, 'Should NOT create duplicate line items');
    assert.equal(engine.totalUnitsCount, 100, 'Quantities should be summed');
    assert.equal(engine.items[0].quantity, 100);
  });

  test('3. Adding same product with different variant creates distinct line items', () => {
    const engine = new RfqCartEngine();
    engine.addItem({
      productId: sampleP1.id,
      sku: sampleP1.sku,
      name: sampleP1.name,
      variant: 'Matte Black',
      brandingMethod: 'Laser Engraving',
      quantity: 50
    });
    engine.addItem({
      productId: sampleP1.id,
      sku: sampleP1.sku,
      name: sampleP1.name,
      variant: 'Brushed Steel',
      brandingMethod: 'Laser Engraving',
      quantity: 50
    });

    assert.equal(engine.totalItemCount, 2, 'Distinct variants must remain separate');
    assert.equal(engine.totalUnitsCount, 100);
  });

  test('4. Adding same product with different branding method creates distinct line items', () => {
    const engine = new RfqCartEngine();
    engine.addItem({
      productId: sampleP1.id,
      sku: sampleP1.sku,
      name: sampleP1.name,
      variant: 'Matte Black',
      brandingMethod: 'Laser Engraving',
      quantity: 30
    });
    engine.addItem({
      productId: sampleP1.id,
      sku: sampleP1.sku,
      name: sampleP1.name,
      variant: 'Matte Black',
      brandingMethod: 'UV Full Color Printing',
      quantity: 40
    });

    assert.equal(engine.totalItemCount, 2, 'Distinct branding options must remain separate');
    assert.equal(engine.totalUnitsCount, 70);
  });

  test('5. Quantity updates enforce positive integers (minimum 1, floor decimals)', () => {
    const engine = new RfqCartEngine();
    engine.addItem({
      productId: sampleP1.id,
      sku: sampleP1.sku,
      name: sampleP1.name,
      quantity: 10
    });

    engine.updateQuantity(0, 15.8);
    assert.equal(engine.items[0].quantity, 15, 'Floats should be floored');

    engine.updateQuantity(0, 0);
    assert.equal(engine.items[0].quantity, 1, 'Zero quantity should default to minimum 1');

    engine.updateQuantity(0, -50);
    assert.equal(engine.items[0].quantity, 1, 'Negative quantity should default to minimum 1');
  });

  test('6. Removing items and clearing cart works accurately', () => {
    const engine = new RfqCartEngine();
    engine.addItem({ productId: sampleP1.id, sku: sampleP1.sku, name: sampleP1.name, quantity: 10 });
    engine.addItem({ productId: sampleP2.id, sku: sampleP2.sku, name: sampleP2.name, quantity: 20 });

    assert.equal(engine.totalItemCount, 2);
    engine.removeItem(0);
    assert.equal(engine.totalItemCount, 1);
    assert.equal(engine.items[0].sku, sampleP2.sku);

    engine.clearCart();
    assert.equal(engine.totalItemCount, 0);
    assert.equal(engine.totalUnitsCount, 0);
  });

  test('7. LocalStorage persistence & revalidation against products.json', () => {
    const engine = new RfqCartEngine();
    // Simulate loading a stored cart with one valid item, one fake item, and one corrupted item
    const mockStorage = JSON.stringify([
      {
        productId: sampleP1.id,
        sku: sampleP1.sku,
        name: sampleP1.name,
        quantity: 25,
        variant: 'Standard'
      },
      {
        productId: 'fake-deleted-product-999',
        sku: 'FAKE-999',
        name: 'Fake Product',
        quantity: 10
      },
      {
        notEvenAnItem: true
      }
    ]);

    engine.loadFromStorage(mockStorage);
    assert.equal(engine.totalItemCount, 1, 'Only valid catalog products should be restored');
    assert.equal(engine.items[0].productId, sampleP1.id);
    assert.equal(engine.items[0].quantity, 25);
  });

  test('8. Malformed or corrupted storage is handled gracefully without crash', () => {
    const engine = new RfqCartEngine();
    engine.loadFromStorage('{{not-json-corrupted--');
    assert.equal(engine.totalItemCount, 0);
    assert.equal(engine.totalUnitsCount, 0);
  });
});

describe('Buyer Information Validation & Lead Capture', () => {
  test('1. Valid buyer payload passes validation', () => {
    const validBuyer = {
      fullName: 'Rahul Sharma',
      email: 'rahul.s@tata-enterprises.com',
      company: 'Tata Enterprises',
      phone: '+91 98765 43210',
      deliveryCity: 'Mumbai 400001',
      targetDeliveryDate: '2026-11-15',
      notes: 'Please include logo laser engraving on stainless steel flasks.'
    };

    const res = validateBuyerInfo(validBuyer);
    assert.equal(res.isValid, true);
    assert.equal(Object.keys(res.errors).length, 0);
  });

  test('2. Missing required fields fail validation with exact keys', () => {
    const invalidBuyer = {
      fullName: '',
      email: 'invalid-email-address',
      company: ''
    };

    const res = validateBuyerInfo(invalidBuyer);
    assert.equal(res.isValid, false);
    assert.ok(res.errors.fullName);
    assert.ok(res.errors.email);
    assert.ok(res.errors.company);
  });

  test('3. Quote summary plain-text format generates clean structured text', () => {
    const buyer = {
      fullName: 'Anita Desai',
      email: 'anita@acme-corp.in',
      company: 'Acme Corporation',
      phone: '9876500000',
      deliveryCity: 'Bengaluru',
      targetDeliveryDate: '2026-12-01',
      notes: 'Packaging in executive black gift boxes required.'
    };

    const items = [
      {
        productId: products[0].id,
        sku: products[0].sku,
        name: products[0].name,
        category: products[0].category,
        variant: 'Matte Blue',
        brandingMethod: 'Screen Printing',
        quantity: 150,
        notes: 'White Pantone imprint'
      }
    ];

    const summary = formatQuoteSummaryText(buyer, items, 'PIX-TEST-2026');
    assert.ok(summary.includes('AV CORPORATE GIFTINGS & EVENTS - B2B QUOTATION REQUEST'));
    assert.ok(summary.includes('Reference Number: PIX-TEST-2026'));
    assert.ok(summary.includes('Contact Name: Anita Desai'));
    assert.ok(summary.includes('Company: Acme Corporation'));
    assert.ok(summary.includes(products[0].sku));
    assert.ok(summary.includes('150 units'));
    assert.ok(summary.includes('Total Units Requested: 150 units'));
  });
});
