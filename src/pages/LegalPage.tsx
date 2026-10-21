import { Link, useLocation } from 'react-router-dom';

export function LegalPage() {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)', maxWidth: '840px' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-xs)' }}>
          <span className="badge badge-accent">LEGAL DOCUMENTATION</span>
          <span className="badge badge-primary">AV CORPORATE GIFTINGS & EVENTS</span>
        </div>
        <h1>{isPrivacy ? 'Privacy Policy' : 'Terms of Commercial Supply'}</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: 'var(--space-xs)' }}>
          Last Updated: 2024–2025 Catalog Cycle
        </p>
      </div>

      {isPrivacy ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', lineHeight: 1.7, color: 'var(--color-text-body)' }}>
          <section>
            <h3 style={{ marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>1. Scope & Purpose</h3>
            <p>
              This Privacy Policy explains how AV Corporate giftings & events collects, utilizes, and safeguards information provided by institutional corporate buyers, procurement representatives, and business clients when using our online catalog and Request for Quote (RFQ) system.
            </p>
          </section>

          <section>
            <h3 style={{ marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>2. Information Collected for Quotation Processing</h3>
            <p>
              When you submit a quotation request, we collect relevant business contact information including your full name, official corporate email address, organization name, phone or WhatsApp number, target delivery location, and specific project customization notes. We do not collect or store credit card details or payment credentials on this website.
            </p>
          </section>

          <section>
            <h3 style={{ marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>3. Use of Information</h3>
            <p>
              Submitted details are exclusively utilized to:
            </p>
            <ul style={{ paddingLeft: 'var(--space-lg)', marginTop: 'var(--space-xs)' }}>
              <li>Generate accurate, volume-tiered commercial price estimates.</li>
              <li>Evaluate branding feasibility and prepare digital mockups.</li>
              <li>Coordinate logistics schedules and freight estimations.</li>
              <li>Communicate directly with your procurement team regarding your RFQ.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>4. Local Storage Drafts</h3>
            <p>
              To improve your user experience, the website maintains an active quotation draft in your browser's local storage (localStorage under key <code>pix-rfq-cart:v1</code>). This enables you to review and adjust line items across browser sessions without losing your selections.
            </p>
          </section>

          <section>
            <h3 style={{ marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>5. Non-Disclosure & Security</h3>
            <p>
              We treat corporate artwork, logo files, and client lists with strict confidentiality. Commercial inquiries and project details are never sold, rented, or distributed to third-party marketing brokers.
            </p>
          </section>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', lineHeight: 1.7, color: 'var(--color-text-body)' }}>
          <section>
            <h3 style={{ marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>1. B2B Commercial Quotations</h3>
            <p>
              All product listings on this portal represent commercial catalog items available for wholesale corporate gifting and institutional procurement. All price quotations provided through our RFQ desk are customized according to required batch quantity, customization techniques, and dispatch parameters.
            </p>
          </section>

          <section>
            <h3 style={{ marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>2. Pre-Production Proofing & Artwork</h3>
            <p>
              Prior to initiating mass branding (laser engraving, screen printing, UV printing, or debossing), a digital placement proof will be provided for client review. Production commences only after written authorization or digital approval of the formal proof.
            </p>
          </section>

          <section>
            <h3 style={{ marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>3. Catalog Specifications & Natural Variations</h3>
            <p>
              Product dimensions, capacities, and weights listed are verified against master production lots. For items manufactured from natural materials (e.g. bamboo desk utilities or wooden pen casings), natural grain and color tone variations are inherent to the organic material and are not considered manufacturing defects.
            </p>
          </section>

          <section>
            <h3 style={{ marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>4. Packaging & Dispatch</h3>
            <p>
              Unless customized presentation packaging is explicitly quoted, products are supplied in standard master cartons or manufacturer gift boxes as specified in the catalog. Dispatch schedules are confirmed upon final proof sign-off and receipt of commercial purchase order.
            </p>
          </section>
        </div>
      )}

      <div style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
        <Link to="/products" className="btn btn-outline">
          Return to Product Catalog
        </Link>
      </div>
    </div>
  );
}
