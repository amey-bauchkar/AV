import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import categoriesData from '../../data/categories.json';
import { BrandLogo } from '../common/BrandLogo';

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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
        className="mobile-drawer-backdrop"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
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
        className="mobile-drawer-pane"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'min(88vw, 360px)',
          backgroundColor: 'var(--color-surface, #FFFFFF)',
          zIndex: 950,
          boxShadow: 'var(--shadow-xl, 0 20px 40px rgba(0,0,0,0.18))',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
      >
        {/* Header with 44px+ touch targets */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border, #E5E2D9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-surface-2, #FAF9F5)'
          }}
        >
          <BrandLogo href="/" height={38} />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted, #66645A)',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background-color 0.2s ease'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Live Search Trigger (Thumb Zone) */}
        <div style={{ padding: '14px 18px 10px 18px' }}>
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
              minHeight: '46px',
              padding: '10px 14px',
              fontSize: '0.92rem',
              color: 'var(--color-text-muted, #66645A)',
              borderRadius: 'var(--radius-md, 8px)'
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search 159 master models...</span>
          </button>
        </div>

        {/* Primary Editorial Links (Min 46px touch target each) */}
        <div style={{ padding: '10px 14px 16px 14px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-text-muted, #66645A)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px 8px 8px' }}>
            Main Directory
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '12px 14px',
                    minHeight: '46px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '8px',
                    fontSize: '0.96rem',
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? 'rgba(163, 77, 51, 0.08)' : 'transparent',
                    color: isActive ? 'var(--color-accent, #A34D33)' : 'var(--color-primary-dark, #292923)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent, #A34D33)' }} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Product Categories (Min 42px touch target) */}
        <div style={{ padding: '16px 14px', borderTop: '1px solid var(--color-border, #E5E2D9)', flex: 1 }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-text-muted, #66645A)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px 8px 8px' }}>
            Explore Categories (9)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {categoriesData.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                style={{
                  padding: '10px 14px',
                  minHeight: '42px',
                  borderRadius: '6px',
                  fontSize: '0.88rem',
                  color: 'var(--color-text-body, #42423A)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent, #A34D33)', backgroundColor: 'rgba(163, 77, 51, 0.08)', padding: '2px 8px', borderRadius: '9999px' }}>
                  {cat.itemCount}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Quick Action Footer & Direct Support */}
        <div
          style={{
            padding: '16px 18px',
            paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
            borderTop: '1px solid var(--color-border, #E5E2D9)',
            backgroundColor: 'var(--color-surface-2, #FAF9F5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              to="/contact"
              onClick={onClose}
              className="btn btn-primary"
              style={{
                flex: 1,
                minHeight: '44px',
                fontSize: '0.88rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              Request Quote
            </Link>
            <a
              href="tel:+919820000000"
              className="btn btn-outline"
              style={{
                minHeight: '44px',
                padding: '0 16px',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call</span>
            </a>
          </div>

          <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted, #66645A)', textAlign: 'center' }}>
            AV Corporate giftings &amp; events • Direct B2B Fulfillment
          </div>
        </div>
      </div>

      <style>{`
        .mobile-drawer-pane {
          animation: slideInDrawer 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideInDrawer {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
