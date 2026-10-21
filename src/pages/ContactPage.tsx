import { Link } from 'react-router-dom';
import { useRfqCart } from '../components/rfq/useRfqCart';

export function ContactPage() {
  const { totalItemCount, openCart, openRequestModal } = useRfqCart();

  return (
    <div style={{ backgroundColor: 'var(--color-warm-ivory)', minHeight: '100vh', paddingBottom: 'var(--space-3xl)' }}>
      {/* Editorial Header */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 88px) 0 clamp(32px, 5vw, 48px)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '840px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-sm)' }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                ● COMMERCIAL INQUIRY
              </span>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                B2B QUOTATION DESK
              </span>
            </div>

            <h1
              className="display-headline"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                lineHeight: 1.05,
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-md)'
              }}
            >
              CONTACT & RFQ SUBMISSION
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.18rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                fontWeight: 500
              }}
            >
              AV Corporate giftings & events operates exclusively on a direct business-to-business model. Submit your custom quotation draft online or connect with our corporate commercial desk for volume discounts, customized branding proofs, and sample dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-3xl)'
          }}
        >
          {/* Card 1: Online RFQ Engine */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--color-primary)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(24px, 3.5vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ color: 'var(--color-accent)', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              ● RECOMMENDED METHOD
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '10px' }}>
              Digital Request for Quote (RFQ)
            </h2>

            <p style={{ color: 'var(--color-text-body)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
              The fastest way to receive tailored volume pricing. Select models from our 159-product master catalog, specify branding methods, and submit with your target delivery schedule.
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-warm-ivory)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                marginBottom: '24px',
                border: '1px solid rgba(21, 61, 37, 0.08)'
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>
                Your Quotation Basket:
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
                {totalItemCount > 0 ? `${totalItemCount} catalog model(s) selected` : '0 items currently added'}
              </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {totalItemCount > 0 ? (
                <button
                  type="button"
                  onClick={openRequestModal}
                  className="btn-pill-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span>Submit Quotation Request ({totalItemCount} Items)</span>
                  <span className="btn-pill-circle" aria-hidden="true" style={{ width: '28px', height: '28px', backgroundColor: 'var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </button>
              ) : (
                <Link
                  to="/products"
                  className="btn-pill-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span>Browse Catalog & Add Items</span>
                  <span className="btn-pill-circle" aria-hidden="true" style={{ width: '28px', height: '28px', backgroundColor: 'var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              )}

              <button
                type="button"
                onClick={openCart}
                style={{
                  width: '100%',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--color-border)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                View / Edit Quotation Drawer
              </button>
            </div>
          </div>

          {/* Card 2: Enterprise Procurement Policy */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(24px, 3.5vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ color: 'var(--color-primary)', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              ● ENTERPRISE SUPPLY STANDARDS
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '10px' }}>
              Procurement & Fulfillment Policy
            </h2>

            <p style={{ color: 'var(--color-text-body)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Our dedicated corporate desks guarantee fast turnaround times and strict compliance with enterprise vendor onboarding requirements.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <li style={{ fontSize: '0.86rem', color: 'var(--color-text-body)', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>•</span>
                <div>
                  <strong>Turnaround SLA:</strong> Structured quotations and digital branding mockups are returned within <strong>4 business hours</strong>.
                </div>
              </li>
              <li style={{ fontSize: '0.86rem', color: 'var(--color-text-body)', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>•</span>
                <div>
                  <strong>Sample Dispatch:</strong> Unbranded physical evaluation samples or pre-production branded units dispatched upon RFQ review.
                </div>
              </li>
              <li style={{ fontSize: '0.86rem', color: 'var(--color-text-body)', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>•</span>
                <div>
                  <strong>Pan-India Multi-Branch Fulfillment:</strong> Single bulk consignment or split multi-location drops for nationwide corporate networks.
                </div>
              </li>
            </ul>

            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                Official Catalog Source: <strong>AV Corporate giftings & events (159 Models)</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
