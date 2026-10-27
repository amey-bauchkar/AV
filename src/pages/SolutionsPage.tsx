import { Link } from 'react-router-dom';
import { useRfqCart } from '../components/rfq/useRfqCart';

export function SolutionsPage() {
  const { openCart } = useRfqCart();

  const solutions = [
    {
      title: 'Executive Welcome & Onboarding Packs',
      badge: 'EMPLOYEE ONBOARDING',
      description: 'Create memorable first impressions for new hires with curated kits comprising customized thermal flasks, 80 GSM hardbound notebooks, metal executive pens, and accessories.',
      includes: ['Vacuum Insulated Thermal Flask', 'Debossed PU Executive Notebook', 'Heavy-Weight Metal Rollerball Pen', 'Matching Card Case or Keyring'],
      accentColor: 'var(--color-primary)'
    },
    {
      title: 'Annual Conferences, Seminars & Trade Swag',
      badge: 'EVENT MERCHANDISE',
      description: 'High-utility promotional products that attendees actually keep and use daily. Engineered for rapid branding turnaround and large batch distribution.',
      includes: ['High-Capacity Sipper or Bottle', 'Lightweight Presentation Diary', 'Smooth-Glide Stylus Pen', 'Desktop Card or Mobile Stand'],
      accentColor: 'var(--color-accent)'
    },
    {
      title: 'Sustainable & Eco-Conscious Corporate Gifts',
      badge: 'NATURAL BAMBOO & WHEAT',
      description: 'Align corporate values with environmental stewardship. Products crafted from sustainably harvested bamboo, wheat straw composites, and food-grade stainless steel.',
      includes: ['Bamboo Exterior Flask with Tea Infuser', 'Bamboo Desk Organizer with Clock', 'Natural Wood Cased Roller Pen', 'Bamboo Mobile Dock Station'],
      accentColor: 'var(--color-eco)'
    },
    {
      title: 'Client Appreciation & Festive Hamper Bundles',
      badge: 'CLIENT RELATIONSHIPS',
      description: 'Express gratitude to strategic partners and premium clients with sophisticated gift box sets delivered in coordinated luxury gift packaging.',
      includes: ['Temperature Display Smart Flask', 'Gilded Executive Diary with Lock Clip', 'Refillable Metal Ballpoint Pen', 'Custom Debossed Outer Gift Box'],
      accentColor: 'var(--color-accent-light)'
    }
  ];

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      {/* Hero Header */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(var(--space-xl), 4vw, var(--space-3xl))',
          marginBottom: 'var(--space-2xl)',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-sm)' }}>
          <span className="badge badge-accent">B2B CORPORATE SOLUTIONS</span>
          <span className="badge badge-primary">BULK CUSTOMIZATION</span>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.75rem, 5.6vw, 4.75rem)',
            fontWeight: 400,
            lineHeight: 1.04,
            letterSpacing: '-0.04em',
            color: 'var(--color-primary-dark, #292923)',
            margin: '0 0 var(--space-md) 0'
          }}
        >
          Tailored Corporate Gifting<br />
          <em
            style={{
              fontFamily: 'var(--font-display, "Instrument Serif", Georgia, serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--color-accent, #A34D33)',
              letterSpacing: '-0.025em'
            }}
          >
            & Merchandise Kits.
          </em>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-muted, #66645A)',
            fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
            maxWidth: '740px',
            marginInline: 'auto',
            lineHeight: 1.55,
            margin: 0
          }}
        >
          From premium new-hire starter kits to large-scale festive hampers, AV Corporate giftings &amp; events provides complete kit curation, customized branding, and direct dispatch for businesses across India.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', marginTop: 'var(--space-xl)', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn btn-primary">
            Explore 159 Master Products
          </Link>
          <button type="button" onClick={openCart} className="btn btn-outline">
            Review RFQ Draft
          </button>
        </div>
      </div>

      {/* Solution Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-xl)',
          marginBottom: 'var(--space-3xl)'
        }}
      >
        {solutions.map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <span
                className="badge"
                style={{
                  backgroundColor: 'var(--color-surface-2)',
                  color: 'var(--color-text-main)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.72rem'
                }}
              >
                {item.badge}
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>
              {item.title}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 'var(--space-lg)' }}>
              {item.description}
            </p>

            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 'var(--space-xs)', letterSpacing: '0.04em' }}>
                Typical Bundle Elements:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {item.includes.map((inc, i) => (
                  <li key={i} style={{ fontSize: '0.85rem', color: 'var(--color-text-body)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>✓</span>
                    {inc}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)' }}>
                <Link
                  to="/products"
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Browse compatible items in catalog →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Process Section */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-2xl)'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          The AV Corporate giftings & events Quotation & Fulfillment Process
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-lg)'
          }}
        >
          {[
            { step: '01', title: 'Product Selection', desc: 'Select desired SKUs, colors, and quantities from our 159 master models into your Quote Basket.' },
            { step: '02', title: 'Branding Specification', desc: 'Specify logo engraving, screen printing, debossing, or UV printing options with line-item notes.' },
            { step: '03', title: 'Formal B2B Quotation', desc: 'Our team processes your inquiry and issues a competitive volume-tier quotation with delivery schedules.' },
            { step: '04', title: 'Proof Approval & Dispatch', desc: 'Digital mockups approved prior to bulk branding, followed by quality inspection and secure packaging.' }
          ].map((s) => (
            <div key={s.step} style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: 'var(--space-2xs)' }}>
                {s.step}
              </div>
              <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-2xs)' }}>{s.title}</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
