import { Link } from 'react-router-dom';
import categoriesData from '../../data/categories.json';
import { BrandLogo } from '../common/BrandLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: 'var(--color-text-inverse)',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-xl)',
        borderTop: '1px solid var(--color-border-dark)',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-2xl)',
            marginBottom: 'var(--space-3xl)'
          }}
        >
          {/* Col 1: Brand & Overview */}
          <div>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <BrandLogo variant="light" height={52} href="/" />
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
              Premier corporate gifting partner and event production agency in India, delivering bespoke merchandise, curated executive sets, and turnkey event management for conferences, launches, and annual days.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', fontSize: '0.7rem' }}>
                STAINLESS STEEL
              </span>
              <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', fontSize: '0.7rem' }}>
                BPA FREE
              </span>
              <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', fontSize: '0.7rem' }}>
                NATURAL BAMBOO
              </span>
            </div>
          </div>

          {/* Col 2: Catalog Categories (Driven by categories.json) */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              Product Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categoriesData.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.85rem',
                      transition: 'color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
                  >
                    {cat.name} ({cat.itemCount})
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/products"
                  style={{
                    color: 'var(--color-accent)',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  View All 9 Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              Corporate Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Master Catalog (159 Products)', path: '/products' },
                { label: 'Corporate Events & Launches', path: '/events' },
                { label: 'Corporate Solutions & Gift Kits', path: '/solutions' },
                { label: 'Custom Branding Techniques', path: '/branding' },
                { label: 'About AV Corporate giftings & events', path: '/about' },
                { label: 'Request Corporate Quotation (RFQ)', path: '/contact' }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.85rem',
                      transition: 'color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: B2B Procurement Notice */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              B2B Quotations
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
              AV Corporate giftings & events operates exclusively on a business-to-business quotation model. All pricing is determined by order volume, branding specifications, and dispatch logistics.
            </p>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-sm)'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Catalog Edition</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                AV Corporate giftings & events 2024–2025
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div
          style={{
            paddingTop: 'var(--space-xl)',
            borderTop: '1px solid var(--color-border-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <div>
            © {currentYear} AV Corporate giftings & events. All rights reserved. B2B Corporate Gifting Catalog.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
            <Link
              to="/privacy"
              style={{ color: 'inherit', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={{ color: 'inherit', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
            >
              Terms of Supply
            </Link>
            <Link
              to="/admin"
              style={{
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)')}
              title="Restricted: Owner & Commercial Desk Access"
            >
              <span>🔒</span>
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
