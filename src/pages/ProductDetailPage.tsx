import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import type { Product, BrandingMethod } from '../types/product';
import { useRfqCart } from '../components/rfq/useRfqCart';
import { ProductImage } from '../components/products/ProductImage';
import { ProductCard } from '../components/products/ProductCard';
import { DownloadSpecSheetButton } from '../components/products/DownloadSpecSheetButton';

const allProducts = productsData as unknown as Product[];
const productSkuMap = new Map(allProducts.map((p) => [p.sku.toUpperCase(), p]));

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // 1. Resolve product by slug
  const product = useMemo(() => {
    return allProducts.find((p) => p.slug === slug);
  }, [slug]);

  // Gallery Active Image
  const [activeImage, setActiveImage] = useState<string>('');
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  // Variant & Customization Selection State
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedBranding, setSelectedBranding] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAddedToQuote, setJustAddedToQuote] = useState<boolean>(false);

  const { addItem, openCart } = useRfqCart();

  // Reset state on product slug change
  useEffect(() => {
    if (product) {
      setActiveImage(product.images.hero);
      setSelectedVariant(
        product.variants && product.variants.length > 0 ? product.variants[0].name : 'Standard'
      );
      setSelectedBranding(
        product.brandingMethods && product.brandingMethods.length > 0
          ? product.brandingMethods[0]
          : 'None / Standard'
      );
      setQuantity(1);
      setJustAddedToQuote(false);

      // SEO: Document Title
      document.title = `${product.name} | AV Corporate giftings & events`;
    } else {
      document.title = 'Product Not Found | AV Corporate giftings & events';
    }
  }, [product]);

  // Keyboard escape for zoom modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomOpen) {
        setIsZoomOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  // Related Products (Validate relatedSkus from dataset, fall back to same category)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const validExplicit: Product[] = [];

    if (product.relatedSkus && Array.isArray(product.relatedSkus)) {
      product.relatedSkus.forEach((sku) => {
        const found = productSkuMap.get(sku.toUpperCase());
        if (found && found.id !== product.id && !validExplicit.some((p) => p.id === found.id)) {
          validExplicit.push(found);
        }
      });
    }

    // Fall back to sibling products in same category if fewer than 3
    if (validExplicit.length < 4) {
      const siblings = allProducts.filter(
        (p) => p.categorySlug === product.categorySlug && p.id !== product.id && !validExplicit.some((e) => e.id === p.id)
      );
      validExplicit.push(...siblings.slice(0, 4 - validExplicit.length));
    }

    return validExplicit.slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container" style={{ paddingBlock: 'var(--space-4xl)', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
          <span className="badge badge-accent">404</span>
          <span className="badge badge-primary">PRODUCT NOT FOUND</span>
        </div>
        <h1 style={{ marginBottom: 'var(--space-sm)' }}>Product Not Found</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)', maxWidth: '480px', marginInline: 'auto' }}>
          The product slug &quot;{slug}&quot; could not be resolved against our 159 master catalog records.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
          <Link to="/products" className="btn btn-primary">
            Browse All Products
          </Link>
          <Link to="/" className="btn btn-outline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Handle Add to RFQ Cart
  const handleAddToQuote = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      image: product.images.hero,
      category: product.category,
      capacity: product.capacity,
      material: product.material,
      variant: selectedVariant,
      brandingMethod: selectedBranding as BrandingMethod,
      quantity
    });

    setJustAddedToQuote(true);
    setTimeout(() => setJustAddedToQuote(false), 2000);
  };

  // Compile Key Specifications table without empty or null values
  const specRows: { label: string; value: string }[] = [];
  if (product.sku) specRows.push({ label: 'Model Code / SKU', value: product.sku });
  if (product.category) specRows.push({ label: 'Product Category', value: product.category });
  if (product.material) specRows.push({ label: 'Material & Construction', value: product.material });
  if (product.capacity) specRows.push({ label: 'Capacity / Specifications', value: product.capacity });
  if (product.thermalPerformance) specRows.push({ label: 'Thermal Retention Rating', value: product.thermalPerformance });
  if (product.lidType) specRows.push({ label: 'Lid & Closure Mechanism', value: product.lidType });
  if (product.sourcePage) specRows.push({ label: 'Master Catalog Source', value: `Page ${product.sourcePage} (AV 2024–2025)` });

  if (product.specs && Array.isArray(product.specs)) {
    product.specs.forEach((s) => {
      if (s.label && s.value && !specRows.some((row) => row.label.toLowerCase() === s.label.toLowerCase())) {
        specRows.push(s);
      }
    });
  }

  // All gallery image candidates (filter out unmasked raw jpegs)
  const galleryImages = [
    product.images.hero,
    ...(product.images.gallery || []).filter((img) => !img.includes('/catalog-assets/raw/'))
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);

  // SEO JSON-LD Structured Data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: product.description,
    image: product.images.hero,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'AV Corporate giftings & events'
    }
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-xl)', fontSize: '0.85rem' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', flexWrap: 'wrap' }}>
          <li>
            <Link to="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
          </li>
          <li style={{ color: 'var(--color-text-muted)' }}>/</li>
          <li>
            <Link to="/products" style={{ color: 'var(--color-text-muted)' }}>Catalog</Link>
          </li>
          <li style={{ color: 'var(--color-text-muted)' }}>/</li>
          <li>
            <Link to={`/category/${product.categorySlug}`} style={{ color: 'var(--color-text-muted)' }}>
              {product.category}
            </Link>
          </li>
          <li style={{ color: 'var(--color-text-muted)' }}>/</li>
          <li style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{product.sku}</li>
        </ol>
      </nav>

      {/* Main PDP Grid (Images on Left, Buy/RFQ Box on Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(var(--space-xl), 4vw, var(--space-3xl))',
          marginBottom: 'var(--space-3xl)',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Product Gallery */}
        <div>
          {/* Main Hero Viewer */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'zoom-in',
              boxShadow: 'var(--shadow-sm)'
            }}
            onClick={() => setIsZoomOpen(true)}
            title="Click to view enlarged photograph"
          >
            <ProductImage
              src={activeImage || product.images.hero}
              alt={product.name}
              aspectRatio="4 / 3"
              style={{ maxHeight: '440px' }}
            />

            <span
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: 'var(--color-primary-dark, #0D2617)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              SKU: {product.sku}
            </span>

            <button
              type="button"
              aria-label="Enlarge image preview"
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '6px 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <span>Enlarge</span>
            </button>
          </div>

          {/* Thumbnails Row */}
          {galleryImages.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-xs)',
                marginTop: 'var(--space-md)',
                overflowX: 'auto',
                paddingBottom: '4px'
              }}
            >
              {galleryImages.map((img, idx) => {
                const isActive = img === (activeImage || product.images.hero);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    style={{
                      width: '72px',
                      height: '72px',
                      padding: '2px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid',
                      borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                      backgroundColor: '#f8fafc',
                      cursor: 'pointer',
                      flexShrink: 0,
                      overflow: 'hidden'
                    }}
                    aria-label={`Select gallery thumbnail ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Commercial Overview & RFQ Actions */}
        <div>
          {/* Metadata Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-xs)', flexWrap: 'wrap' }}>
            <span className="badge badge-accent">{product.sku}</span>
            <Link to={`/category/${product.categorySlug}`} className="badge badge-primary">
              {product.category}
            </Link>
            <span className="badge" style={{ backgroundColor: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              Catalog Page {product.sourcePage}
            </span>
            {product.thermalPerformance && (
              <span className="badge badge-eco">
                {product.thermalPerformance}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)', marginBottom: 'var(--space-sm)', lineHeight: 1.25 }}>
            {product.name}
          </h1>

          {/* Verified Description */}
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 'var(--space-lg)' }}>
            {product.description}
          </p>

          {/* Interactive RFQ Configuration Card */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-xl)',
              marginBottom: 'var(--space-xl)'
            }}
          >
            <form onSubmit={handleAddToQuote}>
              {/* Variant / Colorway Selector */}
              {product.variants && product.variants.length > 0 && (
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '6px' }}>
                    Available Colorways & Finishes:
                  </label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {product.variants.map((v, idx) => {
                      const isSelected = selectedVariant === v.name;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedVariant(v.name)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid',
                            borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: isSelected ? '#fff' : 'var(--color-text-main)',
                            fontSize: '0.82rem',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          {v.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Branding Customization Selector */}
              {product.brandingMethods && product.brandingMethods.length > 0 && (
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '6px' }}>
                    Preferred Custom Branding Method:
                  </label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {product.brandingMethods.map((bm, idx) => {
                      const isSelected = selectedBranding === bm;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedBranding(bm)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid',
                            borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: isSelected ? '#fff' : 'var(--color-text-main)',
                            fontSize: '0.82rem',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          {bm}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Quote Button */}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-md)',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: 'var(--space-lg)'
                }}
              >
                {/* Stepper with accessible 44px touch targets */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface)',
                    overflow: 'hidden',
                    height: '44px'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: '44px',
                      height: '44px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    style={{
                      width: '54px',
                      height: '44px',
                      border: 'none',
                      textAlign: 'center',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      backgroundColor: 'transparent',
                      MozAppearance: 'textfield'
                    }}
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      width: '44px',
                      height: '44px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add Button */}
                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{
                    flex: '1 1 200px',
                    minHeight: '44px',
                    padding: '12px 18px',
                    fontSize: '0.95rem'
                  }}
                >
                  {justAddedToQuote ? 'Added to Quote Basket ✓' : `Add ${quantity} to Quotation Basket`}
                </button>
              </div>
            </form>

            {/* Quick Link to Open RFQ Drawer */}
            <div style={{ marginTop: 'var(--space-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={openCart}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-accent)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                View Current Quote Basket →
              </button>

              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                B2B Pricing Based on Volume & Branding
              </span>
            </div>
          </div>

          {/* Action Row: PDF Spec Sheet Generator */}
          <div>
            <DownloadSpecSheetButton product={product} fullWidth />
          </div>
        </div>
      </div>

      {/* Two-Column Tabs / Information Sections (Specifications & Features) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-2xl)',
          marginBottom: 'var(--space-3xl)'
        }}
      >
        {/* Technical Specification Table */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-xl)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
            <span className="badge badge-accent">TECHNICAL SPECIFICATIONS</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-md)' }}>
            Product Engineering Attributes
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <tbody>
              {specRows.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? 'var(--color-surface-2)' : 'transparent',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                >
                  <td
                    style={{
                      padding: '10px 14px',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      width: '40%'
                    }}
                  >
                    {row.label}
                  </td>
                  <td
                    style={{
                      padding: '10px 14px',
                      color: 'var(--color-text-body)'
                    }}
                  >
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verified Features & Branding Guide */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)'
          }}
        >
          {/* Features Card */}
          {product.features && product.features.length > 0 && (
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-xl)'
              }}
            >
              <h3 style={{ fontSize: '1.15rem', marginBottom: 'var(--space-md)' }}>
                Verified Product Highlights
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {product.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Branding Card */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-xl)'
            }}
          >
            <h3 style={{ fontSize: '1.15rem', marginBottom: 'var(--space-xs)' }}>
              Commercial Branding & Imprinting
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: 'var(--space-md)' }}>
              This model is engineered for bespoke corporate logo personalization. Standard pre-production digital proofs are prepared prior to bulk execution.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(product.brandingMethods || ['Laser Engraving', 'Screen Printing']).map((bm, idx) => (
                <span key={idx} className="badge badge-accent" style={{ fontSize: '0.75rem' }}>
                  {bm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-2xl)', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                Catalog Cross-References
              </div>
              <h2 style={{ fontSize: '1.5rem' }}>Related & Complementary Products</h2>
            </div>
            <Link to={`/category/${product.categorySlug}`} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
              View All {product.category} →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-lg)'
          }}
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            style={{
              maxWidth: '900px',
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              padding: 'var(--space-lg)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>{product.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  SKU: {product.sku} | Authentic Catalog Photograph
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                aria-label="Close zoomed image"
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', maxHeight: '70vh' }}>
              <img
                src={activeImage || product.images.hero}
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
