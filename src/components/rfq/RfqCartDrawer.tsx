import { useEffect } from 'react';
import { useRfqCart } from './useRfqCart';
import { RfqRequestModal } from './RfqRequestModal';
import type { BrandingMethod } from '../../types/product';

const AVAILABLE_BRANDING_OPTIONS: (BrandingMethod | 'None / Standard')[] = [
  'None / Standard',
  'Laser Engraving',
  'Debossing',
  'Screen Printing',
  'UV Full Color Printing'
];

export function RfqCartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    updateItemOptions,
    clearCart,
    totalUnitsCount,
    totalItemCount,
    isRequestModalOpen,
    openRequestModal,
    closeRequestModal
  } = useRfqCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isRequestModalOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart, isRequestModalOpen]);

  // Lock body scroll when drawer is open
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

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all items from your quotation basket?')) {
      clearCart();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 900,
          transition: 'opacity var(--transition-normal)'
        }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby="rfq-drawer-title"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--color-surface)',
          zIndex: 950,
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform var(--transition-normal)'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: 'var(--space-lg) var(--space-xl)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-surface-2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <h2 id="rfq-drawer-title" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              Quotation Basket
            </h2>
            <span className="badge badge-accent">
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close Quotation Basket"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: 'var(--space-xs)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-lg)' }}>
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                paddingBlock: 'var(--space-4xl)',
                color: 'var(--color-text-muted)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-surface-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginInline: 'auto',
                  marginBottom: 'var(--space-md)',
                  color: 'var(--color-text-muted)'
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-xs)', color: 'var(--color-text-main)' }}>
                Your Quotation Basket is Empty
              </h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-xl)' }}>
                Browse our verified catalog of 159 corporate gifting products and add items to request a custom quote.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="btn btn-primary"
                style={{ fontSize: '0.9rem' }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {items.map((item, idx) => (
                <div
                  key={`${item.productId}-${idx}`}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-sm)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '72px',
                        height: '72px',
                        objectFit: 'contain',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-surface-2)',
                        border: '1px solid var(--color-border)'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/products/placeholder-product.svg';
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                          {item.sku}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(idx)}
                          aria-label={`Remove ${item.sku} from basket`}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            cursor: 'pointer',
                            padding: '2px 4px'
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>

                      <h4
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          marginTop: '2px',
                          marginBottom: '4px',
                          color: 'var(--color-text-main)'
                        }}
                      >
                        {item.name}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {item.category} {item.capacity ? `• ${item.capacity}` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Options & Customization row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 'var(--space-xs)',
                      paddingTop: 'var(--space-xs)',
                      borderTop: '1px dashed var(--color-border)'
                    }}
                  >
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>
                        Branding Method
                      </label>
                      <select
                        value={item.brandingMethod}
                        onChange={(e) =>
                          updateItemOptions(idx, {
                            brandingMethod: e.target.value as BrandingMethod | 'None / Standard'
                          })
                        }
                        style={{
                          width: '100%',
                          fontSize: '0.75rem',
                          padding: '4px 6px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-surface-2)'
                        }}
                      >
                        {AVAILABLE_BRANDING_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>
                        Quantity (Units)
                      </label>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, Math.max(1, item.quantity - 1))}
                          style={{
                            padding: '3px 8px',
                            background: 'var(--color-surface-2)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val)) updateQuantity(idx, val);
                          }}
                          style={{
                            width: '44px',
                            textAlign: 'center',
                            border: 'none',
                            fontSize: '0.85rem',
                            padding: '3px 0'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          style={{
                            padding: '3px 8px',
                            background: 'var(--color-surface-2)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: 'var(--space-lg) var(--space-xl)',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-2)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-md)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block' }}>
                  Total Requested Volume
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {totalUnitsCount} Units
                </span>
              </div>

              <button
                type="button"
                onClick={handleClearAll}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Clear Basket
              </button>
            </div>

            <button
              type="button"
              onClick={openRequestModal}
              className="btn btn-accent"
              style={{ width: '100%', fontSize: '1rem', paddingBlock: 'var(--space-md)' }}
            >
              Request Quotation ({items.length} {items.length === 1 ? 'item' : 'items'}) →
            </button>
          </div>
        )}
      </aside>

      {/* Two-step RFQ Request Modal */}
      <RfqRequestModal
        isOpen={isRequestModalOpen}
        onClose={closeRequestModal}
      />
    </>
  );
}
