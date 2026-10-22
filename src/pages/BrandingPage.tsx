import { Link } from 'react-router-dom';

export function BrandingPage() {
  const methods = [
    {
      id: 'laser',
      name: 'Fiber Laser Engraving',
      eyebrow: 'SUS 304 STEEL & NATURAL BAMBOO',
      badge: 'Permanent',
      summary: 'High-precision micro-laser sublimes coatings to reveal polished steel or rich charred bamboo grain.',
      specs: [
        'Permanent, scratch-proof & wash-safe',
        '0.1mm sub-millimeter line resolution',
        'Natural wood tone grain contrast'
      ],
      idealFor: 'Thermal flasks, desk mugs, bamboo utilities & metal pens'
    },
    {
      id: 'silkscreen',
      name: 'High-Opacity Silkscreen',
      eyebrow: 'PANTONE MATCHING SYSTEM (PMS)',
      badge: 'Exact PMS',
      summary: 'Industrial polyurethane inks deliver dense, razor-sharp solid color matching corporate identity.',
      specs: [
        'Strict Pantone Solid Coated match',
        '100% opacity on dark surfaces',
        'High abrasion & chemical durability'
      ],
      idealFor: 'Bottles, presentation gift boxes & flat executive accessories'
    },
    {
      id: 'uv',
      name: 'UV Digital Flatbed',
      eyebrow: 'FULL-SPECTRUM & TACTILE CLEAR-COAT',
      badge: 'Full Color',
      summary: 'Ultraviolet LED curing bonds instant CMYK + White layers for photographic crests and textures.',
      specs: [
        '1200+ DPI photographic resolution',
        'Instant UV cure with zero dot-gain',
        'Optional raised clear-coat varnish'
      ],
      idealFor: 'Multicolor logos, corporate emblems & textured accents'
    },
    {
      id: 'debossing',
      name: 'Blind Debossing & Foil',
      eyebrow: 'THERMO-REACTIVE PU LEATHER',
      badge: 'Luxury 3D',
      summary: 'Calibrated CNC brass dies press deep, tactile 3D impressions into thermal executive leather.',
      specs: [
        'Tactile boardroom elegance',
        'Blind tone-on-tone or metallic gold foil',
        'Never wears down or peels'
      ],
      idealFor: '80 GSM hardbound diaries, folders & luxury gift boxes'
    }
  ];

  const artworkSteps = [
    {
      step: '01',
      title: 'Vector Artwork',
      desc: '.AI, .EPS, .SVG or vector .PDF with all fonts converted to outlines.',
      chip: 'Vector Only'
    },
    {
      step: '02',
      title: 'Pantone Codes',
      desc: 'Specify PMS Solid Coated formulas for exact ink batch formulation.',
      chip: 'PMS Solid Coated'
    },
    {
      step: '03',
      title: 'Scaled 2D Proof',
      desc: 'Formal digital mockup with dimensions and placement within 4 hours.',
      chip: '4-Hour SLA'
    },
    {
      step: '04',
      title: 'Batch Imprint',
      desc: 'Precision pre-flight inspection and quality control before dispatch.',
      chip: 'Zero Tolerance'
    }
  ];

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-lg)', fontSize: '0.85rem' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
          </li>
          <li style={{ color: 'var(--color-text-muted)' }}>/</li>
          <li style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Branding &amp; Imprint Studio</li>
        </ol>
      </nav>

      {/* ========================================================
          HERO SHOWCASE BANNER — LOW TEXT, HIGH-IMPACT STUDIO CARD
         ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'clamp(28px, 4vw, 48px)',
          marginBottom: 'var(--space-2xl)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(28px, 4vw, 56px)',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Headline & Scannable Highlights */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2xs)' }}>
              <span className="badge badge-accent">BRANDING STUDIO</span>
              <span className="badge badge-primary">IMPRINT MASTERY</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: 'var(--color-primary)',
                lineHeight: 1.15,
                marginTop: 'var(--space-2xs)',
                marginBottom: 'var(--space-xs)'
              }}
            >
              Your Brand, Precision Imprinted.
            </h1>

            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '1rem',
                lineHeight: 1.55,
                marginBottom: 'var(--space-lg)',
                maxWidth: '520px'
              }}
            >
              Every catalog model is engineered with flat, unobstructed imprint zones. Sub-millimeter precision across food-grade stainless steel, natural bamboo, and executive PU leather.
            </p>

            {/* Scannable Metric Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
                marginBottom: 'var(--space-xl)'
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.2 }}>
                  4
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  Imprint Technologies
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent)', lineHeight: 1.2 }}>
                  4 Hrs
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  Scaled 2D Proof SLA
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.2 }}>
                  100%
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  PMS Spot Match
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
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
                  padding: '10px 14px 10px 22px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.92rem'
                }}
              >
                <span>Browse Products For Branding</span>
                <span
                  className="btn-pill-circle"
                  aria-hidden="true"
                  style={{
                    width: '28px',
                    height: '28px',
                    backgroundColor: 'var(--color-accent)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>

              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.88rem'
                }}
              >
                Request Digital Proof →
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Gift Set Showcase Image */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(20px, 3.5vw, 36px)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {/* Soft ambient green radial glow */}
            <div
              style={{
                position: 'absolute',
                inset: '5%',
                background: 'radial-gradient(circle, rgba(169, 200, 117, 0.32) 0%, rgba(21, 61, 37, 0.08) 65%, transparent 80%)',
                filter: 'blur(35px)',
                pointerEvents: 'none'
              }}
            />

            {/* Top Floating Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '5px 14px',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: 'var(--color-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-sm)',
                zIndex: 2
              }}
            >
              <span style={{ color: 'var(--color-accent)' }}>●</span> Green Eco-Friendly Suite
            </div>

            {/* Hero Showcase Image */}
            <img
              src="/images/green-eco-friendly-corporate-gift-set.png"
              alt="AV Corporate giftings & events Green Eco-Friendly Corporate Gift Set with Custom Imprint"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxHeight: '380px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 16px 28px rgba(21, 61, 37, 0.12))',
                transition: 'transform var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.025)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {/* Bottom Floating Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                backgroundColor: 'rgba(21, 61, 37, 0.94)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-full)',
                padding: '5px 14px',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-md)',
                zIndex: 2
              }}
            >
              <span>SUS 304 • Natural Bamboo • 80 GSM PU</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          TECHNIQUES SHOWCASE — TEXT-REDUCED 4-CARD GRID
         ======================================================== */}
      <section style={{ marginBottom: 'var(--space-3xl)' }}>
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
            ● SUBSTRATE CAPABILITIES
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: 'var(--color-primary)' }}>
            Four Benchmark Imprint Methods
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.94rem', margin: 0 }}>
            Every technique is matched to optimal material chemistry for lasting tactile permanence.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-lg)'
          }}
        >
          {methods.map((method) => (
            <div
              key={method.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(20px, 3vw, 28px)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: 'var(--color-accent)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {method.eyebrow}
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(21, 61, 37, 0.08)',
                    color: 'var(--color-primary)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.7rem',
                    fontWeight: 800
                  }}
                >
                  {method.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                {method.name}
              </h3>

              <p style={{ color: 'var(--color-text-body)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px' }}>
                {method.summary}
              </p>

              <div
                style={{
                  backgroundColor: 'var(--color-warm-ivory)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(21, 61, 37, 0.08)',
                  marginBottom: '16px'
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {method.specs.map((spec, sIdx) => (
                    <li key={sIdx} style={{ fontSize: '0.8rem', color: 'var(--color-text-body)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'auto', fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                <strong style={{ color: 'var(--color-primary)' }}>Best For: </strong>
                {method.idealFor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          ARTWORK & PROOFING WORKFLOW — 4 CRISP STEPS
         ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'clamp(28px, 4vw, 44px)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ maxWidth: '780px', marginBottom: 'var(--space-xl)' }}>
          <div style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
            ● PRODUCTION ASSURANCE
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Artwork Guidelines &amp; 4-Hour Proofing SLA
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.94rem', margin: 0 }}>
            Submit your vector logo assets and receive scaled digital proof mockups before production begins.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-2xl)'
          }}
        >
          {artworkSteps.map((step) => (
            <div
              key={step.step}
              style={{
                backgroundColor: 'var(--color-warm-ivory)',
                padding: '18px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-accent)' }}>
                  {step.step}
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(21, 61, 37, 0.08)',
                    color: 'var(--color-primary)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}
                >
                  {step.chip}
                </span>
              </div>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.92rem', marginBottom: '4px' }}>
                {step.title}
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: 1.45, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner Actions */}
        <div
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(20px, 3vw, 28px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-md)'
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', marginBottom: '4px' }}>
              Ready to See Your Logo on Our Executive Gifts?
            </div>
            <div style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              Configure corporate gift kits or talk with our specialized branding desk today.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              to="/corporate-gifting"
              className="btn btn-accent"
              style={{ fontSize: '0.88rem', padding: '10px 20px', textDecoration: 'none' }}
            >
              Interactive Kit Builder →
            </Link>
            <Link
              to="/contact"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-full)',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              Contact Branding Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
