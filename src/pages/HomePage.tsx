import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import type { Product, Category } from '../types/product';
import { ProductCard } from '../components/products/ProductCard';
import { useRfqCart } from '../components/rfq/useRfqCart';
import { ScrollHero } from '../components/hero/ScrollHero';

const allProducts = productsData as unknown as Product[];
const allCategories = categoriesData as Category[];

// Featured editorial product selection across key categories
const FEATURED_SKUS = [
  'PIX-033',       // Thermos Vacuum Bottle (SUS 304)
  'PIX-5002',      // Thermal Desk Mug with Handle
  'PIX-BMB-01',    // Natural Bamboo Thermal Bottle
  'PIX-NB-102',    // Executive PU Hardbound Notebook
  'PIX-PN-1003',   // Metal Rollerball Pen
  'PIX-CH-1001',   // PU & Brushed Metal Card Holder
  'PIX-5006',      // Thermos Vacuum Bottle (500ml)
  'PIX-BMB-03'     // Natural Bamboo Multi-Pen Tumbler with Clock
];

export function HomePage() {
  const { openRequestModal } = useRfqCart();

  const featuredProducts = allProducts.filter((p) =>
    FEATURED_SKUS.includes(p.sku)
  );

  return (
    <div style={{ backgroundColor: 'var(--color-warm-ivory)' }}>
      {/* ========================================================
          1. MASTER SCROLL-CONTROLLED CINEMATIC HERO (AV Brand)
         ======================================================== */}
      <ScrollHero onOpenRfqModal={openRequestModal} />

      {/* ========================================================
          TRUST & QUALITY METRIC BAR
         ======================================================== */}
      <section
        style={{
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-lg) 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-lg)',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-primary)' }}>159</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Verified Catalog Models
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-primary)' }}>9</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Specialized Categories
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-primary)' }}>SUS 304</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Food-Grade Stainless Steel
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-primary)' }}>100%</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Commercial B2B Quotations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION A — SHOP BY CATEGORY (All 9 Categories)
         ======================================================== */}
      <section style={{ padding: 'clamp(48px, 6vw, 84px) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                Curated Merchandise Collections
              </div>
              <h2>Shop by Category</h2>
            </div>
            <Link
              to="/products"
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'underline'
              }}
            >
              Browse Complete Catalog ({allProducts.length} items) →
            </Link>
          </div>

          {/* Category Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {allCategories.map((cat) => {
              // Get sample product from this category for authentic thumbnail
              const sampleProduct = allProducts.find((p) => p.categorySlug === cat.slug);
              const heroImage = sampleProduct?.images.hero || '/products/placeholder-product.svg';

              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  <div
                    style={{
                      height: '180px',
                      backgroundColor: 'var(--color-warm-ivory)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-md)',
                      padding: 'var(--space-sm)'
                    }}
                  >
                    <img
                      src={heroImage}
                      alt={cat.name}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)' }}>
                      {cat.name}
                    </h3>
                    <span
                      style={{
                        backgroundColor: 'rgba(21, 61, 37, 0.08)',
                        color: 'var(--color-primary)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        fontWeight: 800
                      }}
                    >
                      {cat.itemCount} Models
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.45,
                      marginBottom: 'var(--space-md)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {cat.description}
                  </p>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                    <span>Explore Collection</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION B — CURATED FEATURED PRODUCTS
         ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: 'clamp(48px, 6vw, 84px) 0',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                Editorial Product Showcase
              </div>
              <h2>Featured Catalog Selections</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
                Handpicked benchmark models exemplifying our material standards and customization capabilities.
              </p>
            </div>
            <Link to="/products" className="btn btn-outline" style={{ fontSize: '0.88rem' }}>
              View All 159 Products →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION C — CORPORATE GIFTING SOLUTIONS & KIT BUILDER
         ======================================================== */}
      <section style={{ padding: 'clamp(48px, 6vw, 84px) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', marginInline: 'auto', marginBottom: 'var(--space-3xl)' }}>
            <span
              style={{
                backgroundColor: 'rgba(241, 45, 24, 0.1)',
                color: 'var(--color-accent)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}
            >
              TAILORED CORPORATE SOLUTIONS
            </span>
            <h2 style={{ marginTop: 'var(--space-xs)', marginBottom: 'var(--space-sm)' }}>
              Curated Gift Kits for Every Corporate Occasion
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Whether welcoming new team members, honoring clients, or preparing conference swag, build shortlists and request customized volume quotations in minutes.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-xl)'
            }}
          >
            {[
              {
                title: 'Employee Welcome & Onboarding',
                badge: 'NEW HIRE STARTER KITS',
                desc: 'Curated sets featuring insulated thermal bottles, 80 GSM hardbound diaries, and metal executive pens.',
                target: '/corporate-gifting?occasion=onboarding'
              },
              {
                title: 'Client Appreciation & Boardroom Gifts',
                badge: 'STRATEGIC RELATIONSHIPS',
                desc: 'Sophisticated executive gifts including temperature display flasks, PU card cases, and leatherette portfolios.',
                target: '/corporate-gifting?occasion=client'
              },
              {
                title: 'Annual Conferences & Trade Swag',
                badge: 'LARGE BATCH DISPATCH',
                desc: 'High-utility conference accessories that attendees retain and use daily, engineered for rapid brand imprinting.',
                target: '/corporate-gifting?occasion=events'
              },
              {
                title: 'Sustainable & Natural Bamboo Sets',
                badge: 'ORGANIC MATERIALS',
                desc: 'Desktop acoustic sound amplifiers, bamboo flask infusers, and desk clocks crafted from responsibly harvested bamboo.',
                target: '/corporate-gifting?occasion=eco'
              }
            ].map((sol, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ marginBottom: 'var(--space-xs)' }}>
                  <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>
                    {sol.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-xs)' }}>
                  {sol.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: 'var(--space-lg)' }}>
                  {sol.desc}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <Link
                    to={sol.target}
                    className="btn btn-outline"
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  >
                    Customize in Kit Builder →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Builder Banner Callout */}
          <div
            style={{
              marginTop: 'var(--space-2xl)',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-2xl)',
              padding: 'clamp(var(--space-xl), 4vw, var(--space-2xl))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-lg)'
            }}
          >
            <div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '4px' }}>
                Looking for an Interactive Kit Builder?
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.92rem' }}>
                Select multiple catalog models, set quantities, customize branding, and export a unified RFQ package.
              </p>
            </div>
            <Link to="/corporate-gifting" className="btn btn-accent" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
              Launch Gifting Kit Builder →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION D — BRANDING & CUSTOMIZATION TECHNIQUES
         ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: 'clamp(48px, 6vw, 84px) 0',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', marginInline: 'auto', marginBottom: 'var(--space-3xl)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2xs)' }}>
              <span className="badge badge-accent">INDUSTRIAL PRECISION</span>
              <span className="badge badge-primary">CUSTOM IMPRINT MASTERY</span>
            </div>
            <h2 style={{ marginTop: 'var(--space-2xs)', marginBottom: 'var(--space-sm)', letterSpacing: '-0.02em' }}>
              Commercial Branding & Logo Customization
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.55 }}>
              Every item in the master catalog is engineered for high-fidelity corporate brand integration.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {[
              {
                title: 'Laser Engraving',
                badge: 'STAINLESS STEEL & BAMBOO',
                desc: 'Subtractive fiber laser etching removing coatings or marking natural wood grain. Abrasion-proof and permanent.'
              },
              {
                title: 'Silkscreen Printing',
                badge: 'PANTONE SPOT COLORS',
                desc: 'High-opacity spot ink transfers matching exact Pantone Solid Coated corporate formulas on bottles and flat bodies.'
              },
              {
                title: 'UV Digital Flatbed Printing',
                badge: 'FULL-COLOR GRADIENTS',
                desc: 'Micro-drop ultraviolet cured printing supporting intricate crests, photographic graphics, and fine multi-color typography.'
              },
              {
                title: 'Blind Debossing',
                badge: 'PU LEATHER & DIARIES',
                desc: 'Heated precision metal dies creating deep tactile 3D impressions into 80 GSM notebook covers and portfolios.'
              }
            ].map((b, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-warm-ivory)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)'
                }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '6px' }}>
                  {b.badge}
                </div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: 'var(--space-2xs)' }}>
                  {b.title}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <Link to="/branding" className="btn btn-outline">
              Read Complete Branding & Artwork Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION E — HOW IT WORKS (B2B Enquiry Journey)
         ======================================================== */}
      <section style={{ padding: 'clamp(48px, 6vw, 84px) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', marginInline: 'auto', marginBottom: 'var(--space-3xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-xs)' }}>The Quotation & Fulfillment Journey</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Simple, transparent 4-step B2B process for corporate procurement teams.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {[
              { num: '01', title: 'Browse & Select', desc: 'Explore all 159 models and add required products and finishes to your quote basket.' },
              { num: '02', title: 'Specify Quantities', desc: 'Input batch volumes, delivery pin code, and preferred branding customization techniques.' },
              { num: '03', title: 'Commercial Quotation', desc: 'Our corporate sales desk reviews your inquiry and issues formal volume-tiered pricing.' },
              { num: '04', title: 'Digital Proof & Dispatch', desc: 'Review digital mockup proof before mass production, followed by secure pan-India dispatch.' }
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-accent)', marginBottom: 'var(--space-2xs)' }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: 'var(--space-2xs)' }}>
                  {step.title}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION F — MATERIAL STORY & QUALITY SPECIFICATIONS
         ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--color-surface-2)',
          padding: 'clamp(48px, 6vw, 84px) 0',
          borderTop: '1px solid var(--color-border)'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px', marginInline: 'auto', textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <h2>Verified Material Standards</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: 'var(--space-xs)', lineHeight: 1.6 }}>
              All product attributes in our catalog are grounded in verified production specifications.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '4px' }}>
                SUS 304 Steel
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                Food-grade austenitic stainless steel providing superior corrosion resistance, double-walled vacuum thermal retention up to 12 hours, and 100% BPA-free operation.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '4px' }}>
                Natural Bamboo
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                Responsibly harvested solid bamboo coated with protective satin sealants, featuring authentic wood grain variation and natural thermal insulation properties.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '4px' }}>
                80 GSM Paper
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                Premium bleed-resistant undated pages bound in thermo-PU leather covers, ensuring a smooth, tactile writing experience with gel, ballpoint, and rollerball pens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION G — HIGH-IMPACT FINAL CALL TO ACTION
         ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
          padding: 'clamp(56px, 8vw, 96px) 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '780px', marginInline: 'auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-md)' }}>
              <span className="badge badge-accent" style={{ color: 'var(--color-accent-light)' }}>
                COMMERCIAL INQUIRY DESK
              </span>
            </div>

            <h2
              style={{
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                marginBottom: 'var(--space-md)'
              }}
            >
              Let&apos;s Make Your Next Gift Memorable.
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.6,
                marginBottom: 'var(--space-2xl)'
              }}
            >
              Tell us about your team, event or gifting requirement. Build a product shortlist and request a tailored quotation directly from AV Corporate giftings & events.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/products"
                className="btn"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '1rem',
                  fontWeight: 800
                }}
              >
                Explore All Products →
              </Link>
              <button
                type="button"
                onClick={openRequestModal}
                className="btn"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
