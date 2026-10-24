import { Link } from 'react-router-dom';
import { BrandingHeroShowcase } from '../components/branding/BrandingHeroShowcase';
import { ImprintBenchmarkWheel } from '../components/branding/ImprintBenchmarkWheel';

export function BrandingPage() {
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
    <div className="container" style={{ paddingTop: 'var(--space-lg)', paddingBottom: 'var(--space-2xl)' }}>
      {/* ========================================================
          HERO SHOWCASE BANNER — INFOGRAPHIC SHOWCASE MATCHING SPEC
         ======================================================== */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <BrandingHeroShowcase showCta={false} />
      </div>

      {/* ========================================================
          TECHNIQUES SHOWCASE — BENCHMARK WHEEL INFOGRAPHIC ARCHITECTURE
         ======================================================== */}
      <section style={{ marginBottom: 'var(--space-3xl)' }}>
        <div style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-2xl) auto' }}>
          <div style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            ● SUBSTRATE CAPABILITIES
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--color-primary)', margin: '0 0 10px 0', fontWeight: 800 }}>
            Four Benchmark Imprint Methods
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem', margin: 0, lineHeight: 1.6 }}>
            Every technique is calibrated to material chemistry for lasting tactile permanence.
          </p>
        </div>

        <ImprintBenchmarkWheel />
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
