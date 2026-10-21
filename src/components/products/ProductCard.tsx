import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { ProductImage } from './ProductImage';
import { RfqAddButton } from '../rfq/RfqAddButton';

type ProductCardProps = {
  product: Product;
  viewMode?: 'grid' | 'list';
};

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const isList = viewMode === 'list';

  return (
    <article
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isList ? 'row' : 'column',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
        position: 'relative',
        boxShadow: 'var(--shadow-sm)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = 'var(--color-accent-soft)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Product Image Container */}
      <Link
        to={`/product/${product.slug}`}
        aria-label={`View details for ${product.name}`}
        style={{
          width: isList ? '220px' : '100%',
          flexShrink: 0,
          position: 'relative',
          display: 'block'
        }}
      >
        <ProductImage
          src={product.images.hero}
          alt={product.name}
          aspectRatio={isList ? '1 / 1' : '4 / 3'}
        />

        {/* SKU Badge Overlay */}
        <span
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            color: '#fff',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            backdropFilter: 'blur(4px)'
          }}
        >
          {product.sku}
        </span>

        {/* Capacity / Thermal Indicator Tag */}
        {product.capacity && (
          <span
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              color: 'var(--color-text-main)',
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            {product.capacity}
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div
        style={{
          padding: 'var(--space-md)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          {/* Category & Material Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-2xs)',
              marginBottom: '4px'
            }}
          >
            <Link
              to={`/category/${product.categorySlug}`}
              style={{
                fontSize: '0.72rem',
                color: 'var(--color-accent)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              {product.category}
            </Link>

            {product.thermalPerformance && (
              <span
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--color-text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
                title={product.thermalPerformance}
              >
                🔥❄️ 12h
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            style={{
              fontSize: '0.98rem',
              fontWeight: 700,
              lineHeight: 1.35,
              marginBottom: 'var(--space-xs)'
            }}
          >
            <Link
              to={`/product/${product.slug}`}
              style={{
                color: 'var(--color-text-main)',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-main)')}
            >
              {product.name}
            </Link>
          </h3>

          {/* Material / Build description */}
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.45,
              marginBottom: 'var(--space-sm)',
              display: '-webkit-box',
              WebkitLineClamp: isList ? 3 : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.description}
          </p>

          {/* Available Verified Variants (if any) */}
          {product.variants && product.variants.length > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: 'var(--space-sm)',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Variants:
              </span>
              {product.variants.slice(0, 4).map((variant, vIdx) => (
                <span
                  key={vIdx}
                  style={{
                    fontSize: '0.68rem',
                    backgroundColor: 'var(--color-surface-2)',
                    color: 'var(--color-text-main)',
                    border: '1px solid var(--color-border)',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {variant.name}
                </span>
              ))}
              {product.variants.length > 4 && (
                <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                  +{product.variants.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Footer / Actions */}
        <div
          style={{
            paddingTop: 'var(--space-sm)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            marginTop: 'var(--space-xs)'
          }}
        >
          <Link
            to={`/product/${product.slug}`}
            className="btn btn-outline"
            style={{
              flex: 1,
              padding: '6px 10px',
              fontSize: '0.8rem',
              textAlign: 'center'
            }}
          >
            Details
          </Link>

          <div style={{ flex: 1.3 }}>
            <RfqAddButton
              product={product}
              buttonStyle="accent"
              fullWidth
              label="Add to RFQ"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
