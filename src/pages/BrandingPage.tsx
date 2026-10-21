import { Link } from 'react-router-dom';

export function BrandingPage() {
  const methods = [
    {
      name: 'Precision Fiber Laser Engraving',
      eyebrow: 'SUS 304 STAINLESS & NATURAL BAMBOO',
      bestFor: 'Double-wall vacuum flasks, thermal desk mugs, bamboo executive utilities, weighted rollerball pens',
      description: 'A permanent, high-precision subtractive marking process. Micro-focused fiber laser energy cleanly sublimates surface powder coatings or marks organic bamboo fibers, leaving an indelible, ultra-crisp brand mark that never fades, scratches, or washes off.',
      specs: [
        'Permanent, abrasion-proof & chemical-resistant',
        'Sub-millimeter detail resolution down to 0.1mm line weight',
        'Rich natural tone variation on organic bamboo grain',
        'Polished surgical steel exposure on matte-coated bottles'
      ]
    },
    {
      name: 'High-Opacity Silkscreen Printing',
      eyebrow: 'EXACT PANTONE MATCHING SYSTEM (PMS)',
      bestFor: 'Cylindrical bottle bodies, PU diary covers, presentation boxes, flat executive accessories',
      description: 'The industry benchmark for single and spot-color corporate brand marks. Specially formulated industrial polyurethane inks deliver unmatched color density, razor-sharp edge definition, and complete opacity matching your corporate brand guidelines.',
      specs: [
        'Strict Pantone Solid Coated (PMS) formulation match',
        'Optimized for large enterprise batch consistency',
        'High pigment opacity with zero show-through on dark surfaces',
        'Treated for high scratch and wash durability'
      ]
    },
    {
      name: 'UV Digital Flatbed Printing',
      eyebrow: 'FULL-SPECTRUM GRADIENTS & EMBOSS TEXTURE',
      bestFor: 'Multicolor logos, complex corporate crests, photo-realistic art, textured dimensional accents',
      description: 'Industrial ultraviolet LED curing inks bond instantly to metal, acrylic, and composite surfaces. Enables unlimited multi-color fidelity, smooth photographic gradients, and optional gloss clear-coat texture without screens or tooling delays.',
      specs: [
        'True 1200+ DPI photographic print fidelity',
        'Instant UV-LED cure prevents bleeding or dot gain',
        'Support for CMYK + White + Clear tactile varnish layers',
        'No setup charges for multi-color intricate designs'
      ]
    },
    {
      name: 'Blind Debossing & Hot Foil Stamping',
      eyebrow: 'PU LEATHER & EXECUTIVE STATIONERY',
      bestFor: '80 GSM hardbound notebooks, conference organizers, certificate folders, luxury gift boxes',
      description: 'Precision CNC-milled brass dies apply calibrated heat and tons of pressure into thermo-reactive PU leather. Produces a subtle, luxurious 3D tactile indentation that conveys boardroom elegance and executive prestige.',
      specs: [
        'Deep tactile 3D indentation into thermal PU leather',
        'Options for blind tone-on-tone burn or metallic foil stamping',
        'Permanent cover impression that will never wear off',
        'Executive standard for client appreciation and summit gifts'
      ]
    }
  ];

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-lg)', fontSize: '0.85rem' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none' }}>
          <li>
            <Link to="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
          </li>
          <li style={{ color: 'var(--color-text-muted)' }}>/</li>
          <li style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Branding & Imprint Mastery</li>
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
          <span className="badge badge-accent">CUSTOMIZATION EXCELLENCE</span>
          <span className="badge badge-primary">TECHNICAL SPECIFICATIONS</span>
        </div>
        <h1 style={{ marginBottom: 'var(--space-2xs)' }}>Commercial Branding & Imprint Mastery</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.02rem', maxWidth: '780px', lineHeight: 1.5 }}>
          Every corporate gift in our 159-model catalog is engineered with flat, unobstructed imprint zones. Discover our four benchmark branding processes, substrate compatibility standards, and digital proofing workflows.
        </p>
      </div>

      {/* Methods Showcase */}
      <section style={{ paddingTop: 'var(--space-md)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-3xl)'
          }}
        >
          {methods.map((method, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(24px, 3.5vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
              }}
            >
              <div style={{ color: 'var(--color-accent)', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                ● {method.eyebrow}
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '10px' }}>
                {method.name}
              </h2>

              <div style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '16px', lineHeight: 1.45 }}>
                <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>Ideal for: </span>
                {method.bestFor}
              </div>

              <p style={{ color: 'var(--color-text-body)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                {method.description}
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  backgroundColor: 'var(--color-warm-ivory)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(21, 61, 37, 0.08)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '10px', letterSpacing: '0.06em' }}>
                  Technical Capabilities:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {method.specs.map((spec, sIdx) => (
                    <li key={sIdx} style={{ fontSize: '0.82rem', color: 'var(--color-text-body)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: 'var(--color-accent)', fontWeight: 800, lineHeight: 1.2 }}>✓</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Artwork Standards Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(28px, 4vw, 48px)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ maxWidth: '780px', marginBottom: 'var(--space-xl)' }}>
            <div style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>
              ● PRODUCTION ASSURANCE
            </div>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '10px' }}>
              Artwork File Guidelines & Proofing SLA
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              We provide formal 2D scaled digital proofs within 4 business hours upon receiving your vector branding assets, guaranteeing zero discrepancies prior to mass production.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-lg)',
              marginBottom: 'var(--space-2xl)'
            }}
          >
            <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.95rem', marginBottom: '6px' }}>Vector File Formats</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                Please supply vector files: <strong>.AI, .EPS, .SVG, or vector .PDF</strong> with all fonts converted to outlines.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.95rem', marginBottom: '6px' }}>Pantone Spot Codes</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                Specify <strong>PMS Formula Guide Solid Coated</strong> numbers for precise screen print ink mixing.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.95rem', marginBottom: '6px' }}>Raster Resolution</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                High-resolution bitmap files for UV printing must be minimum <strong>300 DPI</strong> at 1:1 scale with transparency.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--color-warm-ivory)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.95rem', marginBottom: '6px' }}>Pre-Production Proof</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                A digital mock showing imprint dimensions and margin placements requires formal approval before stamping.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
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
                fontSize: '0.95rem'
              }}
            >
              <span>Explore Products For Branding</span>
              <span className="btn-pill-circle" aria-hidden="true" style={{ width: '30px', height: '30px', backgroundColor: 'var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                gap: '8px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--color-primary)',
                color: 'var(--color-primary)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}
            >
              Contact Branding Desk →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
