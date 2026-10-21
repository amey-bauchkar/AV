import { useState } from 'react';
import { useRfqCart } from './useRfqCart';
import type { Product, BrandingMethod } from '../../types/product';

type RfqAddButtonProps = {
  product: Product;
  quantity?: number;
  variant?: string;
  brandingMethod?: BrandingMethod | 'None / Standard';
  className?: string;
  buttonStyle?: 'primary' | 'accent' | 'outline';
  showIcon?: boolean;
  label?: string;
  fullWidth?: boolean;
};

export function RfqAddButton({
  product,
  quantity = 1,
  variant,
  brandingMethod,
  className = '',
  buttonStyle = 'accent',
  showIcon = true,
  label,
  fullWidth = false
}: RfqAddButtonProps) {
  const { addItem } = useRfqCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedVariant =
      variant || (product.variants && product.variants.length > 0 ? product.variants[0].name : 'Standard');
    const selectedBranding =
      brandingMethod ||
      (product.brandingMethods && product.brandingMethods.length > 0
        ? product.brandingMethods[0]
        : 'None / Standard');

    addItem({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      image: product.images.hero,
      category: product.category,
      capacity: product.capacity,
      material: product.material,
      variant: selectedVariant,
      brandingMethod: selectedBranding,
      quantity
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const btnClass = `btn btn-${buttonStyle} ${className}`.trim();

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={btnClass}
      aria-label={`Add ${product.sku} to Quotation Basket`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: fullWidth ? '100%' : undefined,
        gap: 'var(--space-xs)',
        transition: 'all var(--transition-normal)'
      }}
    >
      {showIcon && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {justAdded ? (
            <polyline points="20 6 9 17 4 12" />
          ) : (
            <>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </>
          )}
        </svg>
      )}
      <span>{justAdded ? 'Added to Quote ✓' : label || 'Add to RFQ'}</span>
    </button>
  );
}
