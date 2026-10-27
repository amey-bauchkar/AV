/**
 * src/components/about/AboutShowcaseSection.tsx
 * Master Brand & About Section matching the PNZ FAS editorial fine art aesthetic.
 * DM Sans, Instrument Serif em italics, hairline borders, and archival paper palette.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AboutShowcaseSectionProps {
  isHomePage?: boolean;
}

export const AboutShowcaseSection: React.FC<AboutShowcaseSectionProps> = ({ isHomePage: propIsHomePage }) => {
  const location = useLocation();
  const isHomePage = propIsHomePage !== undefined ? propIsHomePage : location.pathname === '/';

  return (
    <section className="about-showcase-section" aria-label="About AV Corporate giftings & events">
      <div className="about-frame-wrapper">
        {/* Top Story & Consultation Grid */}
        <div className="about-top-grid">
          <div className="about-top-content">
            <div className="about-badge-pill">About our practice</div>
            
            <h1 className="about-main-title">
              Committed to your brand<br />
              and <em>every detail.</em>
            </h1>

            <p className="about-desc-p">
              We provide precision-crafted corporate gifts and custom merchandise designed around your brand identity, material integrity, and lasting executive relationships.
            </p>

            <div className="about-btn-group">
              <Link
                to={isHomePage ? '/about' : '/products'}
                className="about-pill-btn"
                title={isHomePage ? 'Learn more about AV Corporate' : 'Explore All Products'}
              >
                {isHomePage ? 'More About Us' : 'Explore Catalog'}
              </Link>
              <Link
                to={isHomePage ? '/about' : '/products'}
                className="about-arrow-btn"
                aria-label="Navigate"
              >
                ↗
              </Link>
            </div>
          </div>

          <div className="about-photo-wrap">
            <img
              src="/images/about-consultation.jpg"
              alt="AV Corporate gifting consultation with client"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom 3-Card Row */}
        <div className="about-bottom-row">
          {/* Card 1: Curated Catalog */}
          <div className="about-card card-sage">
            <div className="card-body-wrap">
              <h3 className="card-headline">
                Curated<br /><em>Catalog</em>
              </h3>
              <p className="card-description">
                Over 159 certified product models across 9 specialized categories, engineered for corporate utility and retention.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/products" className="card-view-link">
                View all
              </Link>
              <Link to="/products" className="card-arrow-box" aria-label="View curated catalog">
                ↗
              </Link>
            </div>
          </div>

          {/* Card 2: Precision Imprinting (Terracotta Warm Accent) */}
          <div className="about-card card-terracotta">
            <div className="card-body-wrap">
              <h3 className="card-headline">
                Precision<br /><em>Imprinting</em>
              </h3>
              <p className="card-description">
                Sub-millimeter fiber laser etch, 100% Pantone silkscreen, and photographic UV flatbed calibrated for every substrate.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/branding" className="card-view-link">
                View all
              </Link>
              <Link to="/branding" className="card-arrow-box" aria-label="View branding techniques">
                ↗
              </Link>
            </div>
          </div>

          {/* Card 3: Direct B2B Dispatch */}
          <div className="about-card card-sage">
            <div className="card-body-wrap">
              <h3 className="card-headline">
                Direct B2B<br /><em>Dispatch</em>
              </h3>
              <p className="card-description">
                Volume-tiered institutional quotes, digital mockup proofs, certified batch testing, and guaranteed pan-India dispatch.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/corporate-gifting" className="card-view-link">
                View all
              </Link>
              <Link to="/corporate-gifting" className="card-arrow-box" aria-label="View corporate gifting solutions">
                ↗
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-showcase-section {
          width: 100%;
          box-sizing: border-box;
        }

        /* Master Framed Container Matching PNZ FAS Gallery Border */
        .about-frame-wrapper {
          background: var(--paper, #FAF9F5);
          border: 1px solid var(--line, #D6D3C8);
          border-radius: var(--radius-lg, 12px);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
        }

        /* Top Grid */
        .about-top-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 40px;
          padding: 48px 48px 40px 48px;
          align-items: center;
          background: var(--paper, #FAF9F5);
        }

        .about-top-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .about-badge-pill {
          display: inline-block;
          border: 1px solid var(--line, #D6D3C8);
          border-radius: var(--radius-full, 9999px);
          padding: 4px 14px;
          font-size: 11px;
          font-weight: 600;
          color: var(--copper, #A34D33);
          margin-bottom: 20px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--paper-light, #FCFBF8);
        }

        .about-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2.75rem, 5.6vw, 4.75rem);
          font-weight: 400;
          line-height: 1.04;
          color: var(--ink, #292923);
          letter-spacing: -0.04em;
          margin: 0 0 20px 0;
        }

        .about-main-title em {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          color: var(--copper, #A34D33);
          letter-spacing: -0.025em;
        }

        .about-desc-p {
          font-family: var(--font-body);
          color: var(--muted, #66645A);
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          line-height: 1.55;
          margin: 0 0 32px 0;
          max-width: 580px;
        }

        .about-btn-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .about-pill-btn {
          background: var(--ink, #292923);
          color: #FFFFFF;
          border: 1px solid transparent;
          border-radius: var(--radius-sm, 4px);
          padding: 12px 24px;
          font-size: 0.92rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          letter-spacing: -0.01em;
          display: inline-flex;
          align-items: center;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .about-pill-btn:hover {
          background: var(--brand-surface, #D53B3B);
          transform: translateY(-1px);
        }

        .about-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm, 4px);
          background: var(--ink, #292923);
          color: #FFFFFF;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .about-arrow-btn:hover {
          background: var(--brand-surface, #D53B3B);
          transform: translateY(-1px);
        }

        .about-photo-wrap {
          width: 100%;
          height: 100%;
          min-height: 380px;
          max-height: 430px;
          border-radius: var(--radius-md, 6px);
          overflow: hidden;
          border: 1px solid var(--line, #D6D3C8);
        }

        .about-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
          display: block;
          transition: transform 0.5s ease;
        }
        .about-photo-wrap:hover img {
          transform: scale(1.02);
        }

        /* Bottom 3-Card Row with PNZ Hairline Grid Layout */
        .about-bottom-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: var(--line, #D6D3C8);
          gap: 1px;
          border-top: 1px solid var(--line, #D6D3C8);
        }

        .about-card {
          padding: 36px 32px 28px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 250px;
          box-sizing: border-box;
          transition: background-color 0.2s ease;
        }

        /* Card 1 & Card 3: Light Archival Paper */
        .card-sage {
          background: var(--paper-light, #FCFBF8);
          color: var(--ink, #292923);
        }
        .card-sage:hover {
          background: #FFFFFF;
        }

        /* Card 2: Warm Subtle Terracotta/Linen */
        .card-terracotta {
          background: #F7F3EC;
          color: var(--ink, #292923);
        }
        .card-terracotta:hover {
          background: #FAF6EF;
        }

        .card-body-wrap {
          margin-bottom: 24px;
        }

        .card-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 2vw, 1.95rem);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.04em;
          margin: 0 0 14px 0;
          color: var(--ink, #292923);
        }

        .card-headline em {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.03em;
          color: var(--copper, #A34D33);
        }

        .card-description {
          font-family: var(--font-body);
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0;
          color: var(--muted, #66645A);
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--line-light, #EEEBE3);
        }

        .card-view-link {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--ink, #292923);
          cursor: pointer;
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
        }
        .card-view-link:hover {
          color: var(--copper, #A34D33);
        }

        .card-arrow-box {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm, 4px);
          background: var(--paper, #FAF9F5);
          border: 1px solid var(--line, #D6D3C8);
          color: var(--ink, #292923);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .card-arrow-box:hover {
          background: var(--ink, #292923);
          color: #FFFFFF;
          border-color: var(--ink, #292923);
        }

        /* Responsive */
        @media (max-width: 980px) {
          .about-top-grid {
            grid-template-columns: 1fr;
            padding: 32px 24px 24px 24px;
            gap: 28px;
          }
          .about-photo-wrap {
            min-height: 280px;
            max-height: 340px;
          }
          .about-bottom-row {
            grid-template-columns: 1fr;
            gap: 1px;
          }
          .about-card {
            padding: 28px 24px;
            min-height: auto;
          }
        }

        @media (max-width: 640px) {
          .about-frame-wrapper {
            border-radius: var(--radius-md, 6px);
          }
          .about-top-grid {
            padding: 24px 18px 20px 18px;
          }
          .about-main-title {
            font-size: clamp(2.2rem, 7vw, 3.2rem);
          }
          .about-card {
            padding: 24px 18px;
          }
        }
      `}</style>
    </section>
  );
};
