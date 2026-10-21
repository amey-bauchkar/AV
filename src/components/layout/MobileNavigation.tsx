import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import categoriesData from '../../data/categories.json';

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
};

export function MobileNavigation({ isOpen, onClose, onOpenSearch }: MobileNavigationProps) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Close navigation only when route changes
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      onClose();
    }
  }, [location.pathname, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'All Products (159)', path: '/products' },
    { label: 'Corporate Gifting Kits', path: '/corporate-gifting' },
    { label: 'Corporate Solutions', path: '/solutions' },
    { label: 'Custom Branding Guide', path: '/branding' },
    { label: 'About AV Corporate giftings & events', path: '/about' },
    { label: 'Contact & Procurement', path: '/contact' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 900
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '320px',
          backgroundColor: 'var(--color-surface)',
          zIndex: 950,
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--space-lg)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-surface-2)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 900,
                color: 'var(--color-primary)',
                lineHeight: 0.9,
                letterSpacing: '0.02em'
              }}
            >
              AV
            </span>
            <span
              style={{
                fontSize: '0.52rem',
                fontWeight: 800,
                color: 'var(--color-primary)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '3px'
              }}
            >
              CORPORATE GIFTINGS & EVENTS
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: 'var(--space-2xs)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Search button in mobile nav */}
        <div style={{ padding: 'var(--space-md)' }}>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="btn btn-outline"
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              padding: '10px 14px',
              fontSize: '0.9rem',
              color: 'var(--color-text-muted)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search 159 products...</span>
          </button>
        </div>

        {/* Primary Links */}
        <div style={{ padding: '0 var(--space-md) var(--space-md)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-xs)' }}>
            Navigation
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? 'var(--color-accent-soft)' : 'transparent',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-main)'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Product Categories */}
        <div style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--color-border)', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-xs)' }}>
            Product Categories
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {categoriesData.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-body)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{cat.name}</span>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
                  {cat.itemCount}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: 'var(--space-md)',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface-2)',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <div>AV Corporate giftings & events</div>
          <div>B2B Master Catalog 2024–2025</div>
        </div>
      </div>
    </>
  );
}
