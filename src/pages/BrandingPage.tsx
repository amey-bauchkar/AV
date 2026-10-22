import { Link } from 'react-router-dom';
import { BrandingHeroShowcase } from '../components/branding/BrandingHeroShowcase';

export function BrandingPage() {
  const methods = [
    {
      id: 'laser',
      name: 'Fiber Laser Engraving',
      metric: '0.1mm Detail',
      eyebrow: 'PERMANENT MICRO-ETCH',
      theme: 'dark',
      colSpanDesktop: 7,
      summary: 'Focused laser removes surface coating to reveal lustrous steel or natural charred bamboo grain without inks or fading.',
      highlight: 'Scratch-proof & wash-safe',
      tags: ['Thermal Flasks', 'SUS 304 Steel', 'Natural Bamboo', 'Metal Pens']
    },
    {
      id: 'silkscreen',
      name: 'High-Opacity Silkscreen',
      metric: '100% PMS Match',
      eyebrow: 'PANTONE MATCHED',
      theme: 'light',
      colSpanDesktop: 5,
      summary: 'Industrial polyurethane inks deliver maximum pigment opacity and sharp corporate color on curved surfaces.',
      highlight: 'Strict PMS Solid Coated match',
      tags: ['Curved Drinkware', 'Water Bottles', 'Gift Boxes']
    },
    {
      id: 'uv',
      name: 'UV Digital Flatbed',
      metric: '1200+ DPI Fidelity',
      eyebrow: 'FULL-SPECTRUM CMYK',
      theme: 'light',
      colSpanDesktop: 5,
      summary: 'Instant ultraviolet LED curing for photographic color gradients and tactile embossed clear-coat gloss.',
      highlight: 'Photographic resolution & gloss',
      tags: ['Corporate Crests', 'Emblems', 'Clear Gloss Accents']
    },
    {
      id: 'debossing',
      name: 'Blind Debossing & Foil',
      metric: '3D Brass Die Relief',
      eyebrow: 'THERMAL PU LEATHER',
      theme: 'luxury',
      colSpanDesktop: 7,
      summary: 'CNC brass dies stamp deep tactile impressions and metallic foil into thermal PU leather and executive folios.',
      highlight: 'Timeless boardroom elegance',
      tags: ['Hardbound Diaries', 'Executive Folders', 'VIP Gift Sets']
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
    <div className="container" style={{ paddingTop: 'var(--space-lg)', paddingBottom: 'var(--space-2xl)' }}>
      {/* ========================================================
          HERO SHOWCASE BANNER — INFOGRAPHIC SHOWCASE MATCHING SPEC
         ======================================================== */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <BrandingHeroShowcase showCta={false} />
      </div>

      {/* ========================================================
          TECHNIQUES SHOWCASE — BENTO GRID ARCHITECTURE
         ======================================================== */}
      <section style={{ marginBottom: 'var(--space-3xl)' }}>
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
            ● SUBSTRATE CAPABILITIES
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: 'var(--color-primary)', margin: '0 0 6px 0' }}>
            Four Benchmark Imprint Methods
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.94rem', margin: 0 }}>
            Every technique is calibrated to material chemistry for lasting tactile permanence.
          </p>
        </div>

        <div className="branding-bento-grid">
          {methods.map((method) => {
            const isDark = method.theme === 'dark';
            const isLuxury = method.theme === 'luxury';

            return (
              <div
                key={method.id}
                className={`branding-bento-card branding-bento-${method.id}`}
                style={{
                  gridColumn: `span ${method.colSpanDesktop}`,
                  backgroundColor: isDark
                    ? '#153D25'
                    : isLuxury
                    ? '#FCFAF7'
                    : 'var(--color-surface)',
                  backgroundImage: isDark
                    ? 'radial-gradient(circle at 92% 12%, rgba(224, 30, 16, 0.22), transparent 55%), linear-gradient(135deg, #153D25 0%, #0E2919 100%)'
                    : isLuxury
                    ? 'linear-gradient(135deg, #FCFAF7 0%, #F5EFEB 100%)'
                    : 'none',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.14)'
                    : isLuxury
                    ? '1px solid rgba(194, 142, 0, 0.28)'
                    : '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'clamp(22px, 2.8vw, 30px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Card Header: Eyebrow + Metric Chip */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    <span
                      style={{
                        color: isDark ? '#FF7A70' : isLuxury ? '#A66E00' : 'var(--color-accent)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      ● {method.eyebrow}
                    </span>

                    {/* Metric / Stat Chip */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: isDark
                          ? 'rgba(224, 30, 16, 0.25)'
                          : isLuxury
                          ? 'rgba(194, 142, 0, 0.12)'
                          : 'rgba(21, 61, 37, 0.08)',
                        color: isDark ? '#FFFFFF' : isLuxury ? '#8A5A00' : 'var(--color-primary)',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        border: isDark
                          ? '1px solid rgba(224, 30, 16, 0.45)'
                          : isLuxury
                          ? '1px solid rgba(194, 142, 0, 0.3)'
                          : '1px solid rgba(21, 61, 37, 0.12)'
                      }}
                    >
                      {/* Visual Swatch for Silkscreen */}
                      {method.id === 'silkscreen' && (
                        <span style={{ display: 'flex', gap: '3px' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#153D25' }} />
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#E01E10' }} />
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#D4A017' }} />
                        </span>
                      )}

                      {/* Visual CMYK for UV */}
                      {method.id === 'uv' && (
                        <span style={{ display: 'flex', gap: '3px' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00A3E0' }} />
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#EC008C' }} />
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#FFD100' }} />
                        </span>
                      )}

                      <span>{method.metric}</span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : 'var(--color-primary)',
                      marginBottom: '8px'
                    }}
                  >
                    {method.name}
                  </h3>

                  <p
                    style={{
                      color: isDark ? 'rgba(255, 255, 255, 0.82)' : 'var(--color-text-body)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      margin: 0
                    }}
                  >
                    {method.summary}
                  </p>
                </div>

                {/* Card Footer: Highlight + Substrate Tags */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: isDark ? '#5EE28A' : isLuxury ? '#8A5A00' : 'var(--color-primary)',
                      marginBottom: '12px'
                    }}
                  >
                    <span>✓</span>
                    <span>{method.highlight}</span>
                  </div>

                  {/* Substrate Pill Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {method.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          padding: '3px 9px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isDark
                            ? 'rgba(255, 255, 255, 0.1)'
                            : isLuxury
                            ? 'rgba(194, 142, 0, 0.08)'
                            : 'var(--color-warm-ivory)',
                          color: isDark ? '#FFFFFF' : isLuxury ? '#704800' : 'var(--color-text-body)',
                          border: isDark
                            ? '1px solid rgba(255, 255, 255, 0.14)'
                            : isLuxury
                            ? '1px solid rgba(194, 142, 0, 0.18)'
                            : '1px solid rgba(21, 61, 37, 0.08)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bento Grid Media Queries */}
        <style>{`
          .branding-bento-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 20px;
          }
          @media (max-width: 1023px) {
            .branding-bento-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .branding-bento-card {
              grid-column: span 1 !important;
            }
          }
          @media (max-width: 640px) {
            .branding-bento-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
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
