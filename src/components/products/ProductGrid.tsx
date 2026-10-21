import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  products: Product[];
  viewMode?: 'grid' | 'list';
  onResetFilters?: () => void;
};

export function ProductGrid({
  products,
  viewMode = 'grid',
  onResetFilters
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-3xl) var(--space-xl)',
          textAlign: 'center',
          maxWidth: '560px',
          marginInline: 'auto',
          marginTop: 'var(--space-xl)'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginInline: 'auto',
            marginBottom: 'var(--space-md)',
            color: 'var(--color-text-muted)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-xs)' }}>
          No Matching Products Found
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 'var(--space-lg)' }}>
          We couldn't find any products matching your specific combination of filters and search keywords.
          Try clearing some filters or searching by a broader term.
        </p>

        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="btn btn-primary"
            style={{ fontSize: '0.88rem' }}
          >
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          viewMode === 'grid'
            ? 'repeat(auto-fill, minmax(280px, 1fr))'
            : '1fr',
        gap: 'var(--space-lg)'
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}
