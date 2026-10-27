import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRfqCart } from '../rfq/useRfqCart';
import { BrandLogo } from '../common/BrandLogo';

type HeaderProps = {
  onOpenSearch: () => void;
  onOpenMobileNav: () => void;
};

export function Header({ onOpenSearch, onOpenMobileNav }: HeaderProps) {
  const { totalUnitsCount, totalItemCount, openCart } = useRfqCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener (/ or Ctrl+K opens search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) ||
        ((e.metaKey || e.ctrlKey) && e.key === 'k')
      ) {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const navLinks = [
    { label: 'Products', path: '/products' },
    { label: 'Corporate Gifts', path: '/corporate-gifting' },
    { label: 'Branding', path: '/branding' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 500,
        backgroundColor: isScrolled
          ? 'rgba(250, 249, 245, 0.96)'
          : 'var(--paper, #FAF9F5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line, #D6D3C8)',
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: isScrolled ? '0 2px 10px rgba(41, 41, 35, 0.04)' : 'none'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'clamp(62px, 8vw, 76px)'
        }}
      >
        {/* Left: Official Brand Identity Logo */}
        <div className="header-brand-logo">
          <BrandLogo href="/" height={46} priority={true} />
        </div>

        {/* Center: Elegant Pill Navigation Menu */}
        <nav
          aria-label="Main Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-primary)',
                  backgroundColor: 'transparent',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(21, 61, 37, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Quote Basket, Pill CTA, Mobile Hamburger) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Open live product search"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              minWidth: '44px',
              height: '44px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(21, 61, 37, 0.15)',
              backgroundColor: 'transparent',
              color: 'var(--color-primary)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(21, 61, 37, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="search-text-label">
              Search
            </span>
            <kbd
              className="search-kbd-shortcut"
              style={{
                backgroundColor: 'rgba(21, 61, 37, 0.06)',
                border: '1px solid rgba(21, 61, 37, 0.12)',
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-sm)',
                padding: '1px 5px',
                fontSize: '0.68rem',
                fontFamily: 'inherit'
              }}
            >
              /
            </kbd>
          </button>

          {/* Quotation Cart Button */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open quotation basket with ${totalItemCount} items`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              minWidth: '44px',
              height: '44px',
              padding: totalUnitsCount > 0 ? '6px 14px' : '8px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: totalUnitsCount > 0 ? 'var(--color-primary)' : 'transparent',
              color: totalUnitsCount > 0 ? '#FFFFFF' : 'var(--color-primary)',
              border: totalUnitsCount > 0 ? '1px solid var(--color-primary)' : '1px solid rgba(21, 61, 37, 0.15)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => {
              if (totalItemCount === 0) {
                e.currentTarget.style.backgroundColor = 'rgba(21, 61, 37, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (totalItemCount === 0) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="quote-basket-label">
              Quote
            </span>
            {totalUnitsCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                  borderRadius: 'var(--radius-full)',
                  padding: '1px 7px',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}
              >
                {totalUnitsCount}
              </span>
            )}
          </button>

          {/* Primary Pill CTA matching reference design */}
          <Link
            to="/products"
            className="btn-pill-primary desktop-nav"
            style={{ textDecoration: 'none' }}
          >
            <span>Explore Catalog</span>
            <span className="btn-pill-circle" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={onOpenMobileNav}
            aria-label="Open mobile navigation menu"
            className="mobile-menu-trigger"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              padding: '8px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(21, 61, 37, 0.15)',
              backgroundColor: 'transparent',
              color: 'var(--color-primary)',
              cursor: 'pointer'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .header-brand-logo img {
            height: 38px !important;
          }
        }
      `}</style>
    </header>
  );
}
