import { Link } from 'react-router-dom';
import { useRfqCart } from '../components/rfq/useRfqCart';

export function ContactPage() {
  const { totalItemCount, openCart, openRequestModal } = useRfqCart();

  return (
    <div className="container" style={{ paddingBlock: 'clamp(40px, 5.5vw, 72px)' }}>
      {/* ========================================================
          MASTER CONTACT SHOWCASE CARD (Matching About Page Layout)
          Spacious, Minimal Content, Fine-Art Editorial Architecture
         ======================================================== */}
      <section className="contact-showcase-section" aria-label="AV Corporate Commercial Inquiries & Contact">
        <div className="contact-frame-wrapper">
          {/* Top Story & Consultation Grid */}
          <div className="contact-top-grid">
            <div className="contact-top-content">
              <div className="contact-badge-pill">Direct Commercial Desk</div>
              
              <h1 className="contact-main-title">
                Direct Corporate Contact<br />
                and <em>RFQ Desk.</em>
              </h1>

              <p className="contact-desc-p">
                Submit your product shortlist for volume-tiered pricing, or connect directly with our corporate team for tailored hampers, custom branding proofs, and sample dispatch.
              </p>

              <div className="contact-btn-group">
                {totalItemCount > 0 ? (
                  <button
                    type="button"
                    onClick={openRequestModal}
                    className="contact-pill-btn"
                    title="Submit Quotation Request"
                  >
                    Submit RFQ ({totalItemCount} Items)
                  </button>
                ) : (
                  <Link
                    to="/products"
                    className="contact-pill-btn"
                    title="Explore All Products"
                  >
                    Explore Master Catalog
                  </Link>
                )}

                <button
                  type="button"
                  onClick={totalItemCount > 0 ? openRequestModal : () => openCart()}
                  className="contact-arrow-btn"
                  aria-label="Open Quotation Request"
                >
                  ↗
                </button>
              </div>
            </div>

            <div className="contact-photo-wrap">
              <img
                src="/images/about-consultation.jpg"
                alt="AV Corporate gifting consultation with corporate client"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bottom 3-Card Row (Hairline Grid, Minimal Content, Generous Free Space) */}
          <div className="contact-bottom-row">
            {/* Card 1: Online RFQ Engine */}
            <div className="contact-card card-sage">
              <div className="card-body-wrap">
                <h3 className="card-headline">
                  Digital<br /><em>RFQ Draft</em>
                </h3>
                <p className="card-description">
                  {totalItemCount > 0
                    ? `${totalItemCount} catalog model(s) selected. Review quantities and submit directly for institutional quotation.`
                    : 'Compile your custom shortlist from our 159 certified models and submit for tailored volume pricing.'}
                </p>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  onClick={openCart}
                  className="card-view-btn"
                >
                  {totalItemCount > 0 ? 'Review Draft' : 'Open RFQ Drawer'}
                </button>
                <button
                  type="button"
                  onClick={openCart}
                  className="card-arrow-box"
                  aria-label="Open RFQ Drawer"
                >
                  ↗
                </button>
              </div>
            </div>

            {/* Card 2: Dedicated WhatsApp Desk (Terracotta Accent) */}
            <div className="contact-card card-terracotta">
              <div className="card-body-wrap">
                <h3 className="card-headline">
                  Instant<br /><em>WhatsApp Desk</em>
                </h3>
                <p className="card-description">
                  Connect immediately with a procurement executive for stock verification, urgent event timelines, and custom hamper assembly.
                </p>
              </div>
              <div className="card-footer">
                <a
                  href="https://wa.me/919920015555?text=Hello%20AV%20Corporate%20Gifting%2C%20I%20would%20like%20to%20inquire%20about%20corporate%20merchandise."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-view-link"
                >
                  Chat with Desk
                </a>
                <a
                  href="https://wa.me/919920015555?text=Hello%20AV%20Corporate%20Gifting%2C%20I%20would%20like%20to%20inquire%20about%20corporate%20merchandise."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-arrow-box"
                  aria-label="Open WhatsApp conversation"
                >
                  ↗
                </a>
              </div>
            </div>

            {/* Card 3: 4-Hour Turnaround & Dispatch */}
            <div className="contact-card card-sage">
              <div className="card-body-wrap">
                <h3 className="card-headline">
                  Production<br /><em>&amp; Fast Turnaround</em>
                </h3>
                <p className="card-description">
                  Digital proof mockups returned within 4 business hours. Quick physical samples and pan-India multi-location dispatch.
                </p>
              </div>
              <div className="card-footer">
                <Link to="/branding" className="card-view-link">
                  Branding Guide
                </Link>
                <Link to="/branding" className="card-arrow-box" aria-label="View branding techniques">
                  ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .contact-showcase-section {
            width: 100%;
            box-sizing: border-box;
          }

          /* Master Framed Container Matching About Page Gallery Border */
          .contact-frame-wrapper {
            background: var(--paper, #FAF9F5);
            border: 1px solid var(--line, #D6D3C8);
            border-radius: var(--radius-lg, 12px);
            overflow: hidden;
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-direction: column;
          }

          /* Top Grid: Generous Whitespace, 2-Column Split */
          .contact-top-grid {
            display: grid;
            grid-template-columns: 1.15fr 1fr;
            gap: clamp(36px, 5vw, 60px);
            padding: clamp(44px, 5.5vw, 68px) clamp(36px, 4.5vw, 60px);
            align-items: center;
            background: var(--paper, #FAF9F5);
          }

          .contact-top-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .contact-badge-pill {
            display: inline-block;
            border: 1px solid var(--line, #D6D3C8);
            border-radius: var(--radius-full, 9999px);
            padding: 4px 14px;
            font-size: 11px;
            font-weight: 600;
            color: var(--copper, #A34D33);
            margin-bottom: 22px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            background: var(--paper-light, #FCFBF8);
          }

          .contact-main-title {
            font-family: var(--font-heading);
            font-size: clamp(2.75rem, 5.6vw, 4.75rem);
            font-weight: 400;
            line-height: 1.04;
            color: var(--ink, #292923);
            letter-spacing: -0.04em;
            margin: 0 0 22px 0;
          }

          .contact-main-title em {
            font-family: var(--font-serif);
            font-style: italic;
            font-weight: 400;
            color: var(--copper, #A34D33);
            letter-spacing: -0.025em;
          }

          .contact-desc-p {
            font-family: var(--font-body);
            color: var(--muted, #66645A);
            font-size: clamp(1.05rem, 1.4vw, 1.25rem);
            line-height: 1.6;
            margin: 0 0 36px 0;
            max-width: 560px;
          }

          .contact-btn-group {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .contact-pill-btn {
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
          .contact-pill-btn:hover {
            background: var(--brand-surface, #D53B3B);
            transform: translateY(-1px);
          }

          .contact-arrow-btn {
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
          .contact-arrow-btn:hover {
            background: var(--brand-surface, #D53B3B);
            transform: translateY(-1px);
          }

          .contact-photo-wrap {
            width: 100%;
            height: 100%;
            min-height: 380px;
            max-height: 430px;
            border-radius: var(--radius-md, 6px);
            overflow: hidden;
            border: 1px solid var(--line, #D6D3C8);
          }

          .contact-photo-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 25%;
            display: block;
            transition: transform 0.5s ease;
          }
          .contact-photo-wrap:hover img {
            transform: scale(1.02);
          }

          /* Bottom 3-Card Row with PNZ Hairline Grid Layout */
          .contact-bottom-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            background: var(--line, #D6D3C8);
            gap: 1px;
            border-top: 1px solid var(--line, #D6D3C8);
          }

          .contact-card {
            padding: clamp(32px, 3.5vw, 42px) clamp(24px, 2.8vw, 36px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 240px;
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

          .card-view-btn, .card-view-link {
            font-family: var(--font-body);
            font-size: 0.88rem;
            font-weight: 500;
            color: var(--ink, #292923);
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            letter-spacing: -0.01em;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .card-view-btn:hover, .card-view-link:hover {
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

          /* Responsive Breakpoints */
          @media (max-width: 980px) {
            .contact-top-grid {
              grid-template-columns: 1fr;
              padding: 32px 24px 24px 24px;
              gap: 28px;
            }
            .contact-photo-wrap {
              min-height: 280px;
              max-height: 340px;
            }
            .contact-bottom-row {
              grid-template-columns: 1fr;
              gap: 1px;
            }
            .contact-card {
              padding: 28px 24px;
              min-height: auto;
            }
          }

          @media (max-width: 640px) {
            .contact-frame-wrapper {
              border-radius: var(--radius-md, 6px);
            }
            .contact-top-grid {
              padding: 24px 18px 20px 18px;
            }
            .contact-main-title {
              font-size: clamp(2.2rem, 7vw, 3.2rem);
            }
            .contact-card {
              padding: 24px 18px;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
