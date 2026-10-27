import React from 'react';
import { Link } from 'react-router-dom';

interface ProfessionalHeroProps {
  onOpenRfqModal: () => void;
}

export const ProfessionalHero: React.FC<ProfessionalHeroProps> = ({ onOpenRfqModal }) => {
  return (
    <section className="professional-hero-section" aria-label="AV Corporate giftings & events Hero">
      <div className="hero-bg-scrim" aria-hidden="true" />
      <div className="container hero-content-container">
        <div className="hero-content-col">
          {/* Eyebrow Micro-Badges */}
          <div className="hero-eyebrow-row">
            <span className="hero-badge hero-badge-accent">
              ● Direct Factory B2B
            </span>
            <span className="hero-badge hero-badge-neutral">
              159 Verified Models
            </span>
          </div>

          {/* Signature Unified Hero Headline */}
          <h1 className="hero-main-headline">
            Precision Corporate Gifts<br />
            and <em className="hero-headline-italic">Bespoke Merch.</em>
          </h1>

          {/* Editorial Lead Paragraph */}
          <p className="hero-lead-text">
            Direct factory source for curated executive welcome sets, food-grade SUS 304 vacuum insulated drinkware, 80 GSM hardbound journals, and laser-imprinted desk essentials for enterprises and conferences across India.
          </p>

          {/* Action CTAs Row */}
          <div className="hero-cta-group">
            <Link
              to="/products"
              className="hero-btn-primary"
              title="Browse 159 Catalog Products"
            >
              <span>Explore Master Catalog</span>
              <span className="hero-btn-arrow-circle" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>

            <Link
              to="/corporate-gifting"
              className="hero-btn-secondary"
              title="Assemble Custom Hampers"
            >
              Build Custom Kit
            </Link>

            <button
              type="button"
              onClick={onOpenRfqModal}
              className="hero-btn-quote"
              title="Submit Commercial Inquiry"
            >
              Request Quote
            </button>
          </div>

          {/* Trust SLA Row */}
          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <span className="trust-check">✓</span>
              <span><strong>4-Hour</strong> Proofing SLA</span>
            </div>
            <div className="hero-trust-item">
              <span className="trust-check">✓</span>
              <span><strong>Zero Setup Fee</strong> on Direct Orders</span>
            </div>
            <div className="hero-trust-item">
              <span className="trust-check">✓</span>
              <span><strong>Pan-India</strong> Multi-Branch Drops</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .professional-hero-section {
          position: relative;
          background-color: #FAF8F5;
          background-image: url('/hero-frames/clip-04-final-frame.png');
          background-size: cover;
          background-position: right center;
          background-repeat: no-repeat;
          border-bottom: 1px solid var(--color-border, #E5E2D9);
          padding-top: clamp(56px, 8vw, 108px);
          padding-bottom: clamp(56px, 8vw, 108px);
          min-height: clamp(540px, 74vh, 740px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-bg-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(250, 248, 245, 0.97) 0%,
            rgba(250, 248, 245, 0.94) 42%,
            rgba(250, 248, 245, 0.72) 58%,
            rgba(250, 248, 245, 0.20) 76%,
            rgba(250, 248, 245, 0) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .hero-content-container {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-content-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 660px;
        }

        /* Eyebrows */
        .hero-eyebrow-row {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: var(--space-md, 16px);
        }

        .hero-badge {
          font-family: var(--font-heading);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: var(--radius-full, 9999px);
          white-space: nowrap;
        }

        .hero-badge-accent {
          color: var(--color-accent, #A34D33);
          background-color: rgba(163, 77, 51, 0.08);
          border: 1px solid rgba(163, 77, 51, 0.22);
        }

        .hero-badge-neutral {
          color: var(--color-primary-dark, #292923);
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid var(--color-border, #E5E2D9);
        }

        /* Headline: Exactly matches established hero typography */
        .hero-main-headline {
          font-family: var(--font-heading);
          font-size: clamp(2.75rem, 5.6vw, 4.75rem);
          font-weight: 400;
          line-height: 1.04;
          letter-spacing: -0.04em;
          color: var(--color-primary-dark, #292923);
          margin: 0 0 var(--space-md, 16px) 0;
        }

        .hero-headline-italic {
          font-family: var(--font-display, 'Instrument Serif', Georgia, serif);
          font-style: italic;
          font-weight: 400;
          color: var(--color-accent, #A34D33);
          letter-spacing: -0.025em;
        }

        /* Subtitle */
        .hero-lead-text {
          font-family: var(--font-body);
          color: var(--color-text-muted, #55534A);
          font-size: clamp(1.05rem, 1.35vw, 1.25rem);
          line-height: 1.6;
          max-width: 580px;
          margin: 0 0 clamp(24px, 3.2vw, 36px) 0;
        }

        /* CTA Row */
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: clamp(24px, 3.2vw, 36px);
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background-color: var(--color-primary-dark, #292923);
          color: #FFFFFF;
          padding: 12px 16px 12px 24px;
          border-radius: var(--radius-full, 9999px);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(41, 41, 35, 0.12);
        }
        .hero-btn-primary:hover {
          background-color: var(--color-accent, #A34D33);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(163, 77, 51, 0.22);
        }

        .hero-btn-arrow-circle {
          width: 32px;
          height: 32px;
          background-color: var(--color-accent, #A34D33);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          transition: background-color 0.2s ease;
        }
        .hero-btn-primary:hover .hero-btn-arrow-circle {
          background-color: #292923;
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          color: var(--color-primary-dark, #292923);
          padding: 13px 22px;
          border-radius: var(--radius-full, 9999px);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border: 1px solid var(--color-border, #D6D3C8);
          transition: all 0.2s ease;
        }
        .hero-btn-secondary:hover {
          background-color: #FFFFFF;
          border-color: var(--color-primary-dark, #292923);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(41, 41, 35, 0.08);
        }

        .hero-btn-quote {
          background: none;
          border: none;
          color: var(--color-accent, #A34D33);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.94rem;
          cursor: pointer;
          padding: 10px 14px;
          letter-spacing: -0.01em;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s ease;
        }
        .hero-btn-quote:hover {
          color: var(--color-primary-dark, #292923);
        }

        /* Trust Row */
        .hero-trust-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          padding-top: 20px;
          border-top: 1px solid rgba(41, 41, 35, 0.12);
          width: 100%;
        }

        .hero-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          color: var(--color-primary-dark, #292923);
        }

        .trust-check {
          color: var(--color-accent, #A34D33);
          font-weight: 800;
          font-size: 0.92rem;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .hero-bg-scrim {
            background: linear-gradient(
              180deg,
              rgba(250, 248, 245, 0.96) 0%,
              rgba(250, 248, 245, 0.92) 60%,
              rgba(250, 248, 245, 0.82) 100%
            );
          }
          .professional-hero-section {
            background-position: 70% center;
            min-height: auto;
          }
          .hero-content-col {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .professional-hero-section {
            padding-top: 36px;
            padding-bottom: 40px;
            background-position: 78% center;
          }
          .hero-main-headline {
            font-size: clamp(2.25rem, 8.2vw, 3.2rem);
            line-height: 1.08;
          }
          .hero-lead-text {
            font-size: 0.98rem;
            line-height: 1.55;
            margin-bottom: 22px;
          }
          .hero-cta-group {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            width: 100%;
          }
          .hero-btn-primary, .hero-btn-secondary {
            justify-content: center;
            width: 100%;
            min-height: 48px;
            font-size: 0.95rem;
          }
          .hero-btn-quote {
            text-align: center;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
          .hero-trust-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding-top: 18px;
            border-top: 1px solid rgba(41, 41, 35, 0.12);
            width: 100%;
          }
          .hero-trust-item {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </section>
  );
};
