import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-lg)', fontSize: '0.85rem' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none' }}>
          <li>
            <Link to="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
          </li>
          <li style={{ color: 'var(--color-text-muted)' }}>/</li>
          <li style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>About Us</li>
        </ol>
      </nav>

      {/* Header Banner - Matching Product Section Style */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(var(--space-xl), 3vw, var(--space-2xl))',
          marginBottom: 'var(--space-xl)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-2xs)' }}>
          <span className="badge badge-accent">CORPORATE PROFILE</span>
          <span className="badge badge-primary">MASTER CATALOG 2024–2025</span>
        </div>
        <h1 style={{ marginBottom: 'var(--space-2xs)' }}>About AV Corporate giftings & events</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.02rem', maxWidth: '780px', lineHeight: 1.5 }}>
          AV Corporate giftings & events is a dedicated business-to-business manufacturer and direct enterprise supplier specializing in certified SUS 304 thermal drinkware, 80 GSM executive stationery, precision-engineered metal pens, and curated corporate gift sets.
        </p>
      </div>

      {/* Core Principles Grid */}
      <section style={{ paddingTop: 'var(--space-md)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-3xl)'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(24px, 3.5vw, 36px)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '8px', color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              159
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '10px' }}>
              Curated Master Models
            </h2>
            <p style={{ color: 'var(--color-text-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Our 2024–2025 master collection spans 159 certified product models across 9 specialized categories, engineered to fulfill every corporate gifting requirement from enterprise trade events to executive boardroom onboarding.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(24px, 3.5vw, 36px)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '8px', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              SUS 304
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '10px' }}>
              Certified Material Standards
            </h2>
            <p style={{ color: 'var(--color-text-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              We enforce strict metallurgical standards: food-grade SUS 304 stainless steel with double-wall vacuum copper lining, 80 GSM bleed-resistant executive paper, and sustainably harvested bamboo desk accessories.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(24px, 3.5vw, 36px)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '8px', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              DIRECT B2B
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '10px' }}>
              Institutional Quotation Model
            </h2>
            <p style={{ color: 'var(--color-text-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Built specifically for HR teams, procurement officers, brand managers, and corporate gift distributors. Receive transparent tiered volume pricing, certified batch testing, and guaranteed dispatch schedules.
            </p>
          </div>
        </div>

        {/* Quality Benchmarks Grid */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(28px, 4vw, 48px)',
            marginBottom: 'var(--space-3xl)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ maxWidth: '780px', marginBottom: 'var(--space-xl)' }}>
            <div style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>
              ● RIGID QUALITY PROTOCOLS
            </div>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '10px' }}>
              Our Four Manufacturing Benchmarks
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Every product batch undergoes 100% QA inspection before custom branding and final packing.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1rem', marginBottom: '8px' }}>
                Thermal Drinkware Retention
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.86rem', lineHeight: 1.5, margin: 0 }}>
                12-hour hot and 24-hour cold temperature retention guaranteed by vacuum-sealed double-wall 18/8 stainless steel chambers.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1rem', marginBottom: '8px' }}>
                Executive Binding & Paper
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.86rem', lineHeight: 1.5, margin: 0 }}>
                80 GSM acid-free ivory sheets bound in flexible thermal PU covers with magnetic metal clasp plates engineered for debossing.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1rem', marginBottom: '8px' }}>
                Renewable Natural Bamboo
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.86rem', lineHeight: 1.5, margin: 0 }}>
                Organic grain selected bamboo finished with eco-friendly protective coats, combining natural aesthetics with high durability.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1rem', marginBottom: '8px' }}>
                Uniform Logo Adhesion
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.86rem', lineHeight: 1.5, margin: 0 }}>
                Cross-hatch tape adhesion tested across fiber laser engraving, silkscreen inks, and UV flatbed curing for lifelong wear resistance.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ textAlign: 'center', padding: 'var(--space-2xl) 0' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '12px' }}>
            Ready to Assemble Your Corporate Order?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '620px', marginInline: 'auto', marginBottom: '24px' }}>
            Explore our complete 159-product master catalog and build your custom Quotation Request online in minutes.
          </p>
          <Link
            to="/products"
            className="btn-pill-primary"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              padding: '12px 18px 12px 28px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '1rem'
            }}
          >
            <span>View Master Product Catalog</span>
            <span className="btn-pill-circle" aria-hidden="true" style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
