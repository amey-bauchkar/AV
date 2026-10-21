import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import type { Product, Category, BrandingMethod } from '../types/product';
import { useRfqCart } from '../components/rfq/useRfqCart';

const allProducts = productsData as unknown as Product[];
const allCategories = categoriesData as Category[];

// Safe lookup helper
function findProductBySku(sku: string): Product | undefined {
  return allProducts.find(
    (p) => p.sku.toLowerCase() === sku.toLowerCase() || p.id.toLowerCase() === sku.toLowerCase()
  );
}

export type KitItem = {
  productId: string;
  sku: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  capacity?: string | null;
  material?: string;
  variant: string;
  brandingMethod: BrandingMethod | 'None / Standard';
  quantityPerKit: number;
  itemNotes: string;
};

type OccasionPreset = {
  id: string;
  title: string;
  badge: string;
  icon: string;
  tagline: string;
  description: string;
  skus: string[];
};

const OCCASION_PRESETS: OccasionPreset[] = [
  {
    id: 'onboarding',
    title: 'Employee Welcome & Onboarding',
    badge: 'NEW HIRE STARTER KIT',
    icon: '🎓',
    tagline: 'Make an unforgettable first impression on day one.',
    description:
      'Curated executive gear designed to welcome new hires with durable hydration, 80 GSM bound note-taking, precision pens, and desk accessories.',
    skus: ['PIX-033', 'PIX-NB-102', 'PIX-PN-1003', 'PIX-CH-1001']
  },
  {
    id: 'client',
    title: 'Client Appreciation & Boardroom',
    badge: 'STRATEGIC RELATIONSHIPS',
    icon: '💼',
    tagline: 'Prestige corporate gifts for strategic partners and leadership.',
    description:
      'Executive drinkware, leatherette accessories, and metal writing instruments engineered for high perceived value and prolonged desk presence.',
    skus: ['PIX-5002', 'PIX-NB-104', 'PIX-PN-1001', 'PIX-KC-1001']
  },
  {
    id: 'events',
    title: 'Conferences & Large Event Swag',
    badge: 'BULK EVENT MERCHANDISE',
    icon: '🎪',
    tagline: 'High-utility conference merch that attendees keep and use daily.',
    description:
      'Functional sports bottles, lightweight presentation notebooks, and stylus roller pens optimized for rapid branding and large batch logistics.',
    skus: ['PIX-1013', 'PIX-NB-PL 1', 'PIX-PN-1004']
  },
  {
    id: 'eco',
    title: 'Sustainable Bamboo Collection',
    badge: 'NATURAL & ECO-CONSCIOUS',
    icon: '🌿',
    tagline: 'Align your corporate brand with natural, sustainable materials.',
    description:
      'Crafted from responsibly harvested natural bamboo, wheat straw composites, and certified food-grade SUS 304 stainless steel.',
    skus: ['PIX-BMB-01', 'PIX-BMB-03', 'PIX-BMB-14']
  },
  {
    id: 'custom',
    title: 'Custom Bespoke Kit',
    badge: 'BUILD YOUR OWN',
    icon: '🛠️',
    tagline: 'Create your unique corporate gift box from all 159 catalog items.',
    description:
      'Select any combination of thermal bottles, mugs, notebooks, card cases, and pens tailored to your specific campaign requirements.',
    skus: []
  }
];

const PACKAGING_OPTIONS = [
  {
    id: 'rigid-box',
    name: 'Custom Debossed Rigid Gift Box',
    desc: 'Premium matte-finished rigid box with custom die-cut EVA foam insert and magnetic closure. Outer logo debossing included.'
  },
  {
    id: 'kraft-eco',
    name: 'Eco Kraft Presentation Hamper',
    desc: 'Unbleached biodegradable kraft paperboard with natural shredded crinkle filler. Perfect for bamboo and sustainable themes.'
  },
  {
    id: 'bulk-dispatch',
    name: 'Standard Individual Protective Packaging',
    desc: 'Individual factory tuck-boxes packed into heavy-duty 5-ply corrugated export master shippers. Best for bulk distribution.'
  }
];

export function GiftingKitBuilderPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOccasion = searchParams.get('occasion') || 'onboarding';

  const [activeOccasionId, setActiveOccasionId] = useState<string>(initialOccasion);
  const [kitItems, setKitItems] = useState<KitItem[]>([]);
  const [batchCount, setBatchCount] = useState<number>(100);
  const [packagingId, setPackagingId] = useState<string>('rigid-box');
  const [packagingNotes, setPackagingNotes] = useState<string>('');

  // Catalog search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedAlert, setAddedAlert] = useState<string | null>(null);

  const { addItem, openCart, openRequestModal } = useRfqCart();

  // Update document title for SEO
  useEffect(() => {
    document.title = 'Corporate Gifting Kit Builder | AV Corporate giftings & events';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Configure custom corporate gifting kits and bulk employee welcome sets. Pick from 159 certified products, select branding methods, and request instant B2B quotes.'
      );
    }
  }, []);

  // Sync state if URL query param changes
  useEffect(() => {
    const qOccasion = searchParams.get('occasion');
    if (qOccasion && qOccasion !== activeOccasionId) {
      setActiveOccasionId(qOccasion);
    }
  }, [searchParams]);

  // Load starter kit helper
  const loadPreset = (presetId: string) => {
    setActiveOccasionId(presetId);
    setSearchParams({ occasion: presetId }, { replace: true });

    const preset = OCCASION_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    if (preset.skus.length === 0) {
      setKitItems([]);
      return;
    }

    const items: KitItem[] = [];
    preset.skus.forEach((sku) => {
      const prod = findProductBySku(sku);
      if (prod) {
        const rawVariant = prod.variants?.[0];
        const initialVariant = rawVariant ? (typeof rawVariant === 'string' ? rawVariant : (rawVariant as { name: string }).name) : 'Standard';
        const initialImage = prod.images?.thumbnail || prod.images?.hero || '/products/placeholder.webp';

        items.push({
          productId: prod.id,
          sku: prod.sku,
          name: prod.name,
          slug: prod.slug,
          image: initialImage,
          category: prod.category,
          capacity: prod.capacity || null,
          material: prod.material,
          variant: initialVariant,
          brandingMethod: prod.brandingMethods?.[0] || 'Screen Printing',
          quantityPerKit: 1,
          itemNotes: ''
        });
      }
    });

    setKitItems(items);
    setAddedAlert(`Loaded the "${preset.title}" starter pack with ${items.length} items.`);
    setTimeout(() => setAddedAlert(null), 3500);
  };

  // Initial preset load on first mount
  useEffect(() => {
    loadPreset(initialOccasion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter catalog items
  const filteredCatalog = useMemo(() => {
    return allProducts.filter((product) => {
      const matchCategory =
        selectedCategory === 'all' || product.categorySlug === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        (product.material && product.material.toLowerCase().includes(q)) ||
        product.category.toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  // Add a product from catalog to kit
  const handleAddProductToKit = (product: Product) => {
    const existingIndex = kitItems.findIndex((item) => item.sku === product.sku);

    if (existingIndex >= 0) {
      // Increase quantity per kit
      const updated = [...kitItems];
      updated[existingIndex].quantityPerKit += 1;
      setKitItems(updated);
      setAddedAlert(`Updated ${product.sku} quantity to ${updated[existingIndex].quantityPerKit} per kit.`);
    } else {
      const rawVariant = product.variants?.[0];
      const initialVariant = rawVariant ? (typeof rawVariant === 'string' ? rawVariant : (rawVariant as { name: string }).name) : 'Standard';
      const initialImage = product.images?.thumbnail || product.images?.hero || '/products/placeholder.webp';

      const newItem: KitItem = {
        productId: product.id,
        sku: product.sku,
        name: product.name,
        slug: product.slug,
        image: initialImage,
        category: product.category,
        capacity: product.capacity || null,
        material: product.material,
        variant: initialVariant,
        brandingMethod: product.brandingMethods?.[0] || 'Screen Printing',
        quantityPerKit: 1,
        itemNotes: ''
      };
      setKitItems((prev) => [...prev, newItem]);
      setAddedAlert(`Added ${product.sku} to your kit tray.`);
    }

    setTimeout(() => setAddedAlert(null), 3500);
  };

  // Remove item from kit
  const handleRemoveItem = (index: number) => {
    const item = kitItems[index];
    setKitItems((prev) => prev.filter((_, i) => i !== index));
    setAddedAlert(`Removed ${item?.sku} from kit.`);
    setTimeout(() => setAddedAlert(null), 3000);
  };

  // Update item field
  const handleUpdateItem = (index: number, updates: Partial<KitItem>) => {
    setKitItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      return updated;
    });
  };

  // Clear kit
  const handleClearKit = () => {
    if (window.confirm('Clear all items currently in this kit tray?')) {
      setKitItems([]);
    }
  };

  // Calculate totals
  const totalItemsCount = kitItems.length;
  const totalUnitsInProduction = kitItems.reduce(
    (sum, item) => sum + item.quantityPerKit * batchCount,
    0
  );

  // Push entire kit to RFQ cart
  const handleAddKitToRfqCart = (autoOpenCart = true) => {
    if (kitItems.length === 0) {
      alert('Please add at least one product to your kit tray before adding to quote basket.');
      return;
    }

    const currentOccasion = OCCASION_PRESETS.find((p) => p.id === activeOccasionId);
    const occasionTitle = currentOccasion ? currentOccasion.title : 'Corporate Gift Set';
    const packaging = PACKAGING_OPTIONS.find((p) => p.id === packagingId);

    kitItems.forEach((item) => {
      const totalItemQuantity = item.quantityPerKit * batchCount;
      const fullNotes = [
        `Part of Kit: ${occasionTitle} (Batch: ${batchCount} kits)`,
        `Packaging: ${packaging?.name || 'Standard'}`,
        item.itemNotes ? `Line notes: ${item.itemNotes}` : null,
        packagingNotes ? `Box notes: ${packagingNotes}` : null
      ]
        .filter(Boolean)
        .join(' | ');

      addItem({
        productId: item.productId,
        sku: item.sku,
        name: item.name,
        slug: item.slug,
        image: item.image,
        category: item.category,
        capacity: item.capacity,
        material: item.material,
        variant: item.variant,
        brandingMethod: item.brandingMethod,
        quantity: totalItemQuantity,
        notes: fullNotes
      });
    });

    setAddedAlert(`✓ Added ${kitItems.length} kit items (${totalUnitsInProduction} total units) to your RFQ Basket!`);
    setTimeout(() => setAddedAlert(null), 4000);

    if (autoOpenCart) {
      openCart();
    }
  };

  // Add and open modal directly
  const handleProceedToFormalQuote = () => {
    handleAddKitToRfqCart(false);
    openRequestModal();
  };

  const currentOccasion = OCCASION_PRESETS.find((p) => p.id === activeOccasionId);

  return (
    <div style={{ backgroundColor: 'var(--color-warm-ivory)', minHeight: '100vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* ========================================================
          PAGE HEADER
         ======================================================== */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          paddingTop: 'clamp(24px, 4vw, 44px)',
          paddingBottom: 'clamp(24px, 4vw, 40px)'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-xs)' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              Home
            </Link>
            <span style={{ color: 'var(--color-border)' }}>/</span>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 700 }}>
              Corporate Gifting Kit Builder
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span className="badge badge-accent">Interactive Kit Builder</span>
                <span className="badge badge-primary">Direct Factory B2B</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.75rem)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                Custom Corporate Gifting & Welcome Kits
              </h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.5 }}>
                Curate custom hampers and welcome sets from our 159 master catalog products. Select branding methods, customize quantities, and receive formal volume tier quotes.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', alignSelf: 'center' }}>
              <button
                type="button"
                onClick={() => handleAddKitToRfqCart(true)}
                className="btn btn-outline"
                style={{ fontSize: '0.9rem' }}
                disabled={kitItems.length === 0}
              >
                Add Kit to RFQ Basket
              </button>
              <button
                type="button"
                onClick={handleProceedToFormalQuote}
                className="btn btn-primary"
                style={{ fontSize: '0.9rem' }}
                disabled={kitItems.length === 0}
              >
                Request Formal Quote →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating / Toast Alert */}
      {addedAlert && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            padding: '14px 22px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.95rem',
            fontWeight: 600,
            maxWidth: '420px',
            animation: 'fadeInUp 0.25s ease'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>✨</span>
          <span>{addedAlert}</span>
        </div>
      )}

      <div className="container" style={{ marginTop: 'var(--space-2xl)' }}>
        {/* ========================================================
            STEP 1: OCCASION PRESET TABS
           ======================================================== */}
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)' }}>
                Step 1 of 3
              </span>
              <h2 style={{ fontSize: '1.35rem', marginTop: '2px' }}>
                Select Your Gifting Occasion or Theme
              </h2>
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Loads curated starter selections from verified catalog models
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-md)'
            }}
          >
            {OCCASION_PRESETS.map((preset) => {
              const isActive = preset.id === activeOccasionId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => loadPreset(preset.id)}
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: isActive ? '#FFFFFF' : 'var(--color-text-main)',
                    border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-lg)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                    transition: 'all var(--transition-normal)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '140px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                      <span style={{ fontSize: '1.5rem' }}>{preset.icon}</span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(21, 61, 37, 0.08)',
                          color: isActive ? '#FFFFFF' : 'var(--color-primary)'
                        }}
                      >
                        {preset.badge}
                      </span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.02rem', lineHeight: 1.25, marginBottom: '4px' }}>
                      {preset.title}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: isActive ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-text-muted)',
                      marginTop: 'var(--space-xs)'
                    }}
                  >
                    {preset.skus.length > 0 ? `${preset.skus.length} Items Preset` : 'Blank Workspace'}
                  </div>
                </button>
              );
            })}
          </div>

          {currentOccasion && (
            <div
              style={{
                marginTop: 'var(--space-md)',
                padding: 'var(--space-md) var(--space-lg)',
                backgroundColor: 'rgba(21, 61, 37, 0.04)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-md)'
              }}
            >
              <div>
                <strong style={{ color: 'var(--color-primary)', fontSize: '0.92rem' }}>
                  {currentOccasion.tagline}
                </strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, marginTop: '2px' }}>
                  {currentOccasion.description}
                </p>
              </div>
              {currentOccasion.skus.length > 0 && (
                <button
                  type="button"
                  onClick={() => loadPreset(currentOccasion.id)}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Reload Original Preset Items ↺
                </button>
              )}
            </div>
          )}
        </div>

        {/* ========================================================
            MAIN WORKSPACE: 2-COLUMN LAYOUT
            Left Column: Kit Tray (Active Items, Customization)
            Right Column: Catalog Browser & Quick Add
           ======================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 'var(--space-2xl)',
            alignItems: 'start'
          }}
          className="kit-builder-grid"
        >
          {/* ========================================================
              LEFT COLUMN: ACTIVE KIT TRAY
             ======================================================== */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'clamp(var(--space-md), 3vw, var(--space-xl))',
                boxShadow: 'var(--shadow-md)',
                marginBottom: 'var(--space-xl)'
              }}
            >
              {/* Tray Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: 'var(--space-md)',
                  borderBottom: '1px solid var(--color-border)',
                  marginBottom: 'var(--space-lg)',
                  flexWrap: 'wrap',
                  gap: 'var(--space-sm)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)' }}>
                    Step 2 of 3
                  </span>
                  <h2 style={{ fontSize: '1.4rem', marginTop: '2px' }}>
                    Active Kit Box Tray
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(21, 61, 37, 0.08)',
                      color: 'var(--color-primary)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {totalItemsCount} Products in Box
                  </span>

                  {kitItems.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearKit}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-accent)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '4px 8px'
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Kit Items List */}
              {kitItems.length === 0 ? (
                <div
                  style={{
                    padding: 'var(--space-3xl) var(--space-lg)',
                    textAlign: 'center',
                    border: '2px dashed var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'var(--color-surface-2)'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)' }}>📦</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-xs)' }}>
                    Your Kit Tray is Currently Empty
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '400px', marginInline: 'auto', marginBottom: 'var(--space-lg)' }}>
                    Select an occasion above to load a recommended preset, or click <strong>+ Add to Kit</strong> on any product from the catalog on the right.
                  </p>
                  <button
                    type="button"
                    onClick={() => loadPreset('onboarding')}
                    className="btn btn-outline"
                    style={{ fontSize: '0.88rem' }}
                  >
                    Load Executive Welcome Pack
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  {kitItems.map((item, index) => {
                    const originalProduct = findProductBySku(item.sku);
                    const availableVariants = originalProduct?.variants?.length
                      ? originalProduct.variants.map((v) => (typeof v === 'string' ? v : (v as { name: string }).name))
                      : [item.variant];
                    const availableBranding = originalProduct?.brandingMethods || [
                      'Laser Engraving',
                      'Screen Printing',
                      'UV Printing',
                      'None / Standard'
                    ];

                    return (
                      <div
                        key={`${item.sku}-${index}`}
                        style={{
                          backgroundColor: 'var(--color-surface-2)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-lg)',
                          padding: 'var(--space-md)',
                          display: 'grid',
                          gridTemplateColumns: '76px 1fr auto',
                          gap: 'var(--space-md)',
                          alignItems: 'start'
                        }}
                      >
                        {/* Thumbnail */}
                        <div
                          style={{
                            width: '76px',
                            height: '76px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              padding: '4px'
                            }}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/products/placeholder.webp';
                            }}
                          />
                        </div>

                        {/* Details & Controls */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                            <span
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                color: 'var(--color-accent)'
                              }}
                            >
                              {item.sku}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>•</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                              {item.category}
                            </span>
                          </div>

                          <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--color-text-main)', marginBottom: '8px' }}>
                            <Link to={`/product/${item.slug}`} style={{ color: 'inherit' }} target="_blank">
                              {item.name} ↗
                            </Link>
                          </div>

                          {/* Quick selectors for Variant and Branding */}
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                              gap: '8px',
                              marginBottom: '8px'
                            }}
                          >
                            {/* Variant */}
                            <div>
                              <label style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>
                                Color / Finish:
                              </label>
                              <select
                                value={item.variant}
                                onChange={(e) => handleUpdateItem(index, { variant: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '5px 8px',
                                  fontSize: '0.8rem',
                                  borderRadius: 'var(--radius-sm)',
                                  border: '1px solid var(--color-border)',
                                  backgroundColor: '#FFFFFF',
                                  color: 'var(--color-text-body)'
                                }}
                              >
                                {availableVariants.map((v) => (
                                  <option key={v} value={v}>
                                    {v}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Branding Method */}
                            <div>
                              <label style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>
                                Imprint Technique:
                              </label>
                              <select
                                value={item.brandingMethod}
                                onChange={(e) =>
                                  handleUpdateItem(index, {
                                    brandingMethod: e.target.value as BrandingMethod | 'None / Standard'
                                  })
                                }
                                style={{
                                  width: '100%',
                                  padding: '5px 8px',
                                  fontSize: '0.8rem',
                                  borderRadius: 'var(--radius-sm)',
                                  border: '1px solid var(--color-border)',
                                  backgroundColor: '#FFFFFF',
                                  color: 'var(--color-text-body)'
                                }}
                              >
                                {availableBranding.map((b) => (
                                  <option key={b} value={b}>
                                    {b}
                                  </option>
                                ))}
                                <option value="None / Standard">None / Standard (Blank)</option>
                              </select>
                            </div>

                            {/* Units per Kit */}
                            <div>
                              <label style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>
                                Qty Per Box:
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateItem(index, {
                                      quantityPerKit: Math.max(1, item.quantityPerKit - 1)
                                    })
                                  }
                                  style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: '#FFFFFF',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    lineHeight: 1
                                  }}
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    width: '28px',
                                    textAlign: 'center'
                                  }}
                                >
                                  {item.quantityPerKit}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateItem(index, {
                                      quantityPerKit: item.quantityPerKit + 1
                                    })
                                  }
                                  style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: '#FFFFFF',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    lineHeight: 1
                                  }}
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Item Customization Notes */}
                          <input
                            type="text"
                            placeholder="Optional notes: e.g., Logo positioned 20mm from top rim"
                            value={item.itemNotes}
                            onChange={(e) => handleUpdateItem(index, { itemNotes: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '4px 8px',
                              fontSize: '0.76rem',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--color-border)',
                              backgroundColor: '#FFFFFF',
                              color: 'var(--color-text-body)'
                            }}
                          />
                        </div>

                        {/* Remove Action */}
                        <div>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--color-text-muted)',
                              cursor: 'pointer',
                              padding: '4px',
                              fontSize: '1.1rem',
                              lineHeight: 1
                            }}
                            title="Remove from kit"
                            aria-label={`Remove ${item.name} from kit`}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ========================================================
                PACKAGING & PRESENTATION
               ======================================================== */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'clamp(var(--space-md), 3vw, var(--space-xl))',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: 'var(--space-xl)'
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)' }}>
                Step 3 of 3
              </span>
              <h2 style={{ fontSize: '1.35rem', marginTop: '2px', marginBottom: 'var(--space-md)' }}>
                Select Gift Box Packaging Style
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                {PACKAGING_OPTIONS.map((pkg) => {
                  const isChecked = pkg.id === packagingId;
                  return (
                    <label
                      key={pkg.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: 'var(--space-md)',
                        borderRadius: 'var(--radius-lg)',
                        border: isChecked ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        backgroundColor: isChecked ? 'rgba(21, 61, 37, 0.03)' : 'var(--color-surface-2)',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="packaging"
                        value={pkg.id}
                        checked={isChecked}
                        onChange={() => setPackagingId(pkg.id)}
                        style={{ marginTop: '3px' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-main)' }}>
                          {pkg.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4, marginTop: '2px' }}>
                          {pkg.desc}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-main)', display: 'block', marginBottom: '4px' }}>
                  Custom Packaging Instructions (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g., Include corporate welcome letter insert, gold foil ribbon wrap..."
                  value={packagingNotes}
                  onChange={(e) => setPackagingNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-2)',
                    color: 'var(--color-text-body)'
                  }}
                />
              </div>
            </div>

            {/* ========================================================
                BATCH MULTIPLIER & CONVERSION CTA
               ======================================================== */}
            <div
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-2xl)',
                padding: 'clamp(var(--space-md), 4vw, var(--space-xl))',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                <div>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '2px' }}>
                    Production Run Multiplier
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.82rem' }}>
                    Scale all items to your expected recipient headcount.
                  </p>
                </div>

                {/* Batch Count Stepper */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {[50, 100, 250, 500].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setBatchCount(count)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        backgroundColor: batchCount === count ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      {count} Kits
                    </button>
                  ))}
                </div>
              </div>

              {/* Number Input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-lg)' }}>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                  Number of Kits to Produce:
                </span>
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={batchCount}
                  onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    width: '100px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '1rem'
                  }}
                />
              </div>

              {/* Summary Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--space-sm)',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)',
                  textAlign: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Items / Kit
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {totalItemsCount}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Total Kits
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {batchCount}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Total Units
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-leaf)' }}>
                    {totalUnitsInProduction}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleAddKitToRfqCart(true)}
                  disabled={kitItems.length === 0}
                  className="btn btn-outline"
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    borderColor: '#FFFFFF'
                  }}
                >
                  <span>Add Kit to Quote Basket</span>
                  <span>({kitItems.length} items)</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToFormalQuote}
                  disabled={kitItems.length === 0}
                  className="btn btn-accent"
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    padding: '12px 20px',
                    fontSize: '0.95rem'
                  }}
                >
                  <span>Request Formal RFQ Now →</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: CATALOG BROWSER & QUICK ADD DRAWER
             ======================================================== */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'clamp(var(--space-md), 3vw, var(--space-xl))',
              boxShadow: 'var(--shadow-sm)',
              position: 'sticky',
              top: '90px'
            }}
          >
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)' }}>
                Catalog Discovery
              </div>
              <h2 style={{ fontSize: '1.3rem', marginTop: '2px', marginBottom: '4px' }}>
                Browse & Add Products
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
                Pick from all 159 master models to complement your gift hamper.
              </p>
            </div>

            {/* Search Input */}
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <input
                type="text"
                placeholder="Search by SKU, model, or material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface-2)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            {/* Category Filter Pills */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                overflowX: 'auto',
                paddingBottom: '8px',
                marginBottom: 'var(--space-md)',
                scrollbarWidth: 'none'
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                style={{
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  border: '1px solid var(--color-border)',
                  backgroundColor: selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--color-surface-2)',
                  color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--color-text-main)',
                  cursor: 'pointer'
                }}
              >
                All ({allProducts.length})
              </button>
              {allCategories.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setSelectedCategory(c.slug)}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    border: '1px solid var(--color-border)',
                    backgroundColor: selectedCategory === c.slug ? 'var(--color-primary)' : 'var(--color-surface-2)',
                    color: selectedCategory === c.slug ? '#FFFFFF' : 'var(--color-text-main)',
                    cursor: 'pointer'
                  }}
                >
                  {c.name} ({c.itemCount})
                </button>
              ))}
            </div>

            {/* Product Scrollable List */}
            <div
              style={{
                maxHeight: '560px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                paddingRight: '4px'
              }}
            >
              {filteredCatalog.length === 0 ? (
                <div style={{ padding: 'var(--space-xl) 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  No models match your search criteria.
                </div>
              ) : (
                filteredCatalog.slice(0, 30).map((product) => {
                  const inKit = kitItems.some((item) => item.sku === product.sku);

                  return (
                    <div
                      key={product.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: inKit ? 'rgba(21, 61, 37, 0.04)' : 'var(--color-surface-2)',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid var(--color-border)',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={product.images?.thumbnail || product.images?.hero || '/products/placeholder.webp'}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/products/placeholder.webp';
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              color: 'var(--color-accent)'
                            }}
                          >
                            {product.sku}
                          </span>
                          {product.capacity && (
                            <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                              • {product.capacity}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: 'var(--color-text-main)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {product.name}
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={() => handleAddProductToKit(product)}
                        style={{
                          padding: '4px 10px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          borderRadius: 'var(--radius-full)',
                          border: 'none',
                          backgroundColor: inKit ? 'var(--color-primary)' : 'var(--color-accent)',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                        aria-label={`Add ${product.name} to kit`}
                      >
                        {inKit ? '+ Add More' : '+ Add'}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {filteredCatalog.length > 30 && (
              <div style={{ marginTop: 'var(--space-xs)', textAlign: 'center', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                Showing 30 of {filteredCatalog.length} matches. Type to refine.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
