import { useState } from 'react';

type ProductImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
  fallbackSrc?: string;
  objectFit?: 'contain' | 'cover';
  loading?: 'lazy' | 'eager';
};

const DEFAULT_FALLBACK = '/products/placeholder-product.svg';

export function ProductImage({
  src,
  alt,
  className = '',
  style = {},
  aspectRatio = '1 / 1',
  fallbackSrc = DEFAULT_FALLBACK,
  objectFit = 'contain',
  loading = 'lazy'
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        backgroundColor: 'var(--color-warm-ivory, #F4F5EB)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      className={className}
    >
      {!isLoaded && !hasError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--color-surface-2)',
            animation: 'pulse 1.5s infinite ease-in-out'
          }}
          aria-hidden="true"
        />
      )}

      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          padding: objectFit === 'contain' ? 'var(--space-sm)' : undefined,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity var(--transition-fast)',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
    </div>
  );
}
