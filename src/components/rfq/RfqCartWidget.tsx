import { useRfqCart } from './useRfqCart';
import { RfqCartDrawer } from './RfqCartDrawer';

export function RfqCartWidget() {
  const { totalUnitsCount, totalItemCount, openCart, isOpen } = useRfqCart();

  return (
    <>
      {/* Floating Trigger Button (Hidden when drawer is open) */}
      {!isOpen && totalItemCount > 0 && (
        <button
          type="button"
          onClick={openCart}
          aria-label={`View Quotation Basket (${totalItemCount} items, ${totalUnitsCount} units)`}
          style={{
            position: 'fixed',
            bottom: 'var(--space-xl)',
            right: 'var(--space-xl)',
            zIndex: 800,
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-surface)',
            border: '2px solid var(--color-accent)',
            borderRadius: 'var(--radius-full)',
            padding: 'var(--space-sm) var(--space-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            boxShadow: 'var(--shadow-xl)',
            cursor: 'pointer',
            transition: 'all var(--transition-normal)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>

          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Quote Basket</span>

          <span
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            {totalUnitsCount}
          </span>
        </button>
      )}

      {/* Slide-out Drawer */}
      <RfqCartDrawer />
    </>
  );
}
