import { Link } from 'react-router-dom';
import { BrandingHeroShowcase } from '../components/branding/BrandingHeroShowcase';
import { ImprintBenchmarkWheel } from '../components/branding/ImprintBenchmarkWheel';

export function BrandingPage() {
  const artworkSteps = [
    {
      step: '01',
      title: 'Vector Master Assets',
      desc: '.AI, .EPS, .SVG or vector .PDF format with all typography converted to outlines for sub-millimeter fidelity.',
      chip: 'Vector Only'
    },
    {
      step: '02',
      title: 'Pantone Calibration',
      desc: 'Specify Pantone Matching System (PMS) solid coated codes for exact chemical ink batch formulation.',
      chip: 'PMS Solid Coated'
    },
    {
      step: '03',
      title: 'Scaled 2D Digital Proof',
      desc: 'Engineered digital mockup illustrating exact millimeter placement, substrate bleed margins, and scale.',
      chip: '4-Hour Fast Proof'
    },
    {
      step: '04',
      title: 'Pre-Flight Imprint Run',
      desc: 'Optical verification against signed proofs before bulk manufacturing run, cure testing, and automated dispatch.',
      chip: 'Zero Tolerance'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: 'var(--space-lg)', paddingBottom: 'var(--space-3xl)' }}>
      {/* ========================================================
          HERO SHOWCASE BANNER — INFOGRAPHIC SHOWCASE MATCHING SPEC
         ======================================================== */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <BrandingHeroShowcase showCta={false} />
      </div>

      {/* ========================================================
          TECHNIQUES SHOWCASE — BENCHMARK WHEEL INFOGRAPHIC ARCHITECTURE
         ======================================================== */}
      <section style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
        <div style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-2xl) auto' }}>
          <span className="eyebrow" style={{ marginBottom: '8px' }}>
            Substrate Capabilities
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', color: 'var(--ink, #292923)', margin: '0 0 10px 0', fontWeight: 500, letterSpacing: '-0.055em' }}>
            Four Benchmark <em>Imprint Methods.</em>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem', margin: 0, lineHeight: 1.6 }}>
            Every technique is calibrated to material chemistry for lasting tactile permanence.
          </p>
        </div>

        <ImprintBenchmarkWheel />
      </section>

      {/* ========================================================
          PRODUCTION ASSURANCE — ARCHITECTURAL EDITORIAL SPECIFICATION
          (Clean, Professional Corporate Grid with Hairlines — No Box Bloat)
         ======================================================== */}
      <section className="production-assurance-section" aria-labelledby="production-assurance-title">
        {/* Section Header: 2-Column Corporate Split */}
        <div className="assurance-header-grid">
          <div className="assurance-header-left">
            <span className="eyebrow">Production Assurance</span>
            <h2 id="production-assurance-title" className="assurance-title">
              Artwork guidelines &amp;<br />
              <em>4-hour proofing turnaround.</em>
            </h2>
          </div>

          <div className="assurance-header-right">
            <p className="assurance-lead">
              Submit your vector assets and receive scaled digital proof mockups before production begins.
              Every batch is calibrated to substrate chemistry and verified for stroke tolerance, Pantone accuracy, and adhesion permanence.
            </p>
            <div className="assurance-meta-row">
              <span className="assurance-meta-item">
                <span className="meta-dot"></span>
                <strong>Turnaround:</strong> Within 4 business hours
              </span>
              <span className="assurance-meta-divider">·</span>
              <span className="assurance-meta-item">
                <strong>Proof Standard:</strong> 1:1 Scale CAD Mockup
              </span>
              <span className="assurance-meta-divider">·</span>
              <span className="assurance-meta-item">
                <strong>Color Calibration:</strong> Pantone Solid Coated
              </span>
            </div>
          </div>
        </div>

        {/* 4-Step Technical Specification Linear Grid (Hairline Divided) */}
        <div className="assurance-timeline-grid">
          {artworkSteps.map((step) => (
            <div key={step.step} className="assurance-step-column">
              <div className="assurance-step-header">
                <span className="assurance-step-number">{step.step}</span>
                <span className="assurance-step-tag">{step.chip}</span>
              </div>
              <h3 className="assurance-step-heading">{step.title}</h3>
              <p className="assurance-step-description">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Integrated Corporate Action Strip (Hairline Divider & Clean Dual CTAs) */}
        <div className="assurance-action-strip">
          <div className="assurance-action-copy">
            <h3 className="assurance-action-headline">
              Ready to see your logo on our executive gifts?
            </h3>
            <p className="assurance-action-subline">
              Configure corporate gift kits online or connect directly with our specialized branding desk for proof mockups.
            </p>
          </div>

          <div className="assurance-action-links">
            <Link
              to="/corporate-gifting"
              className="btn-pill-primary"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'var(--brand-surface, #D53B3B)',
                color: '#FFFFFF',
                padding: '10px 16px 10px 22px',
                borderRadius: 'var(--radius-full, 9999px)',
                fontWeight: 500,
                fontSize: '0.92rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>Interactive Kit Builder</span>
              <span
                className="btn-pill-circle"
                aria-hidden="true"
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--brand-surface, #D53B3B)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem'
                }}
              >
                ↗
              </span>
            </Link>

            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: 'var(--ink, #292923)',
                padding: '11px 22px',
                borderRadius: 'var(--radius-full, 9999px)',
                border: '1px solid var(--line, #D6D3C8)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: '0.92rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--paper, #FAF9F5)';
                e.currentTarget.style.borderColor = 'var(--ink, #292923)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'var(--line, #D6D3C8)';
              }}
            >
              <span>Contact Branding Desk</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        /* Production Assurance Section (PNZ FAS Architectural Editorial Style) */
        .production-assurance-section {
          width: 100%;
          border-top: 1px solid var(--line, #D6D3C8);
          margin-top: clamp(64px, 8vw, 100px);
          padding-top: clamp(48px, 6vw, 72px);
          scroll-margin-top: 100px;
        }

        /* 2-Column Header Grid */
        .assurance-header-grid {
          display: grid;
          grid-template-columns: 1.22fr 1fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
          margin-bottom: clamp(36px, 4.5vw, 54px);
        }

        .assurance-header-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .assurance-title {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 4.4vw, 3.65rem);
          font-weight: 500;
          line-height: 1.04;
          letter-spacing: -0.055em;
          color: var(--ink, #292923);
          margin: 0;
        }

        .assurance-title em {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.035em;
          color: var(--copper, #A34D33);
        }

        .assurance-header-right {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding-top: 6px;
        }

        .assurance-lead {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          line-height: 1.65;
          color: var(--muted, #66645A);
          margin: 0;
        }

        .assurance-meta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          font-size: 0.82rem;
          color: var(--muted, #66645A);
          padding-top: 6px;
          border-top: 1px solid var(--line-light, #EEEBE3);
        }

        .assurance-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .assurance-meta-item strong {
          color: var(--ink, #292923);
          font-weight: 600;
        }

        .meta-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--copper, #A34D33);
          display: inline-block;
        }

        .assurance-meta-divider {
          opacity: 0.4;
        }

        /* 4-Step Technical Specification Linear Grid (Clean hairline divided columns) */
        .assurance-timeline-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--line, #D6D3C8);
          border-bottom: 1px solid var(--line, #D6D3C8);
          margin-bottom: clamp(32px, 4vw, 48px);
        }

        .assurance-step-column {
          padding: 28px 24px 32px 24px;
          border-right: 1px solid var(--line, #D6D3C8);
          display: flex;
          flex-direction: column;
          background: transparent;
          transition: background-color 0.25s ease;
        }

        .assurance-step-column:first-child {
          padding-left: 0;
        }

        .assurance-step-column:last-child {
          border-right: none;
          padding-right: 0;
        }

        .assurance-step-column:hover {
          background-color: rgba(250, 249, 245, 0.6);
        }

        .assurance-step-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 14px;
        }

        .assurance-step-number {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--copper, #A34D33);
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }

        .assurance-step-tag {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted, #66645A);
        }

        .assurance-step-heading {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--ink, #292923);
          letter-spacing: -0.03em;
          line-height: 1.25;
          margin: 0 0 10px 0;
        }

        .assurance-step-description {
          font-family: var(--font-body);
          font-size: 0.86rem;
          line-height: 1.6;
          color: var(--muted, #66645A);
          margin: 0;
        }

        /* Integrated Corporate Action Strip */
        .assurance-action-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          padding: 24px 28px;
          background: var(--paper, #FAF9F5);
          border: 1px solid var(--line, #D6D3C8);
          border-radius: var(--radius-md, 6px);
        }

        .assurance-action-copy {
          max-width: 620px;
        }

        .assurance-action-headline {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 500;
          letter-spacing: -0.03em;
          color: var(--ink, #292923);
          margin: 0 0 4px 0;
        }

        .assurance-action-subline {
          font-family: var(--font-body);
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--muted, #66645A);
          margin: 0;
        }

        .assurance-action-links {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Responsive Breakpoints */
        @media (max-width: 980px) {
          .assurance-header-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .assurance-timeline-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .assurance-step-column {
            padding: 22px 18px;
          }

          .assurance-step-column:first-child {
            padding-left: 18px;
          }

          .assurance-step-column:nth-child(2) {
            border-right: none;
            padding-right: 18px;
          }

          .assurance-step-column:nth-child(3),
          .assurance-step-column:nth-child(4) {
            border-top: 1px solid var(--line, #D6D3C8);
          }

          .assurance-step-column:nth-child(3) {
            padding-left: 18px;
          }
        }

        @media (max-width: 680px) {
          .assurance-timeline-grid {
            grid-template-columns: 1fr;
          }

          .assurance-step-column {
            padding: 20px 0 !important;
            border-right: none !important;
            border-bottom: 1px solid var(--line-light, #EEEBE3);
          }

          .assurance-step-column:last-child {
            border-bottom: none;
          }

          .assurance-action-strip {
            padding: 20px;
            flex-direction: column;
            align-items: flex-start;
          }

          .assurance-action-links {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
