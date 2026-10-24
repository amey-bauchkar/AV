import React from 'react';
import { Link } from 'react-router-dom';

interface AboutShowcaseSectionProps {
  isHomePage?: boolean;
}

export const AboutShowcaseSection: React.FC<AboutShowcaseSectionProps> = ({ isHomePage = false }) => {
  return (
    <section className="about-showcase-section" aria-label="About AV Corporate giftings & events">
      <div className="about-frame-wrapper">
        {/* Top Story & Consultation Grid */}
        <div className="about-top-grid">
          <div className="about-top-content">
            <div className="about-badge-pill">About us</div>
            
            <h2 className="about-main-title">
              COMMITTED TO<br />
              YOUR BRAND AND<br />
              EXCELLENCE
            </h2>

            <p className="about-desc-p">
              We strive to be a trusted leader in enterprise merchandise, providing precision-crafted corporate gift solutions that promote lasting executive relationships and empower teams to celebrate milestones.
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
                CURATED<br />CATALOG
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
                PRECISION<br />IMPRINTING
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
                DIRECT B2B<br />DISPATCH
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

        /* Master Framed Container Matching Reference */
        .about-frame-wrapper {
          background: #FAF9F5;
          border: 10px solid #153D25;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 24px 60px -15px rgba(21, 61, 37, 0.22);
          display: flex;
          flex-direction: column;
        }

        /* Top Grid */
        .about-top-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 40px;
          padding: 44px 44px 36px 44px;
          align-items: center;
          background: #FAF9F5;
        }

        .about-top-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .about-badge-pill {
          display: inline-block;
          border: 1.5px solid rgba(21, 61, 37, 0.4);
          border-radius: 9999px;
          padding: 5px 16px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #153D25;
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }

        .about-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.4vw, 3.1rem);
          font-weight: 900;
          line-height: 1.08;
          color: #153D25;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          margin: 0 0 20px 0;
        }

        .about-desc-p {
          font-family: var(--font-body);
          color: #526155;
          font-size: clamp(0.92rem, 1.1vw, 1rem);
          line-height: 1.6;
          margin: 0 0 32px 0;
          max-width: 500px;
        }

        .about-btn-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .about-pill-btn {
          background: #8DB37B;
          color: #0E2918;
          border: none;
          border-radius: 12px;
          padding: 13px 26px;
          font-size: 0.95rem;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
          letter-spacing: -0.01em;
          display: inline-flex;
          align-items: center;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .about-pill-btn:hover {
          background: #7DA869;
          transform: translateY(-2px);
        }

        .about-arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #8DB37B;
          color: #0E2918;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .about-arrow-btn:hover {
          background: #7DA869;
          transform: translateY(-2px);
        }

        .about-photo-wrap {
          width: 100%;
          height: 100%;
          min-height: 380px;
          max-height: 430px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 12px 28px -6px rgba(21, 61, 37, 0.14);
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
          transform: scale(1.03);
        }

        /* Bottom 3-Card Row */
        .about-bottom-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: #153D25;
          gap: 10px;
          border-top: 10px solid #153D25;
        }

        .about-card {
          padding: 36px 32px 28px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 250px;
          box-sizing: border-box;
          transition: transform 0.25s ease;
        }
        .about-card:hover {
          filter: brightness(1.03);
        }

        /* Card 1 & Card 3: Brand Sage Green */
        .card-sage {
          background: #8DB37B;
          color: #0E2918;
        }

        /* Card 2: Brand Warm Terracotta */
        .card-terracotta {
          background: #E07A52;
          color: #1A0D08;
        }

        .card-body-wrap {
          margin-bottom: 24px;
        }

        .card-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 2.2vw, 2.1rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          margin: 0 0 14px 0;
          color: inherit;
        }

        .card-description {
          font-family: var(--font-body);
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
          opacity: 0.9;
          font-weight: 500;
          color: inherit;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-view-link {
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: underline;
          color: inherit;
          cursor: pointer;
        }

        .card-arrow-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #FFFFFF;
          color: #0E2918;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .card-arrow-box:hover {
          transform: scale(1.1);
          background: #FAF9F5;
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
            gap: 8px;
            border-top: 8px solid #153D25;
          }
          .about-card {
            padding: 28px 24px;
            min-height: auto;
          }
          .card-headline {
            font-size: 1.7rem;
          }
        }

        @media (max-width: 640px) {
          .about-frame-wrapper {
            border-width: 7px;
            border-radius: 28px;
          }
          .about-top-grid {
            padding: 24px 18px 20px 18px;
          }
          .about-main-title {
            font-size: 1.9rem;
          }
          .about-card {
            padding: 24px 18px;
          }
        }
      `}</style>
    </section>
  );
};
