import React from 'react';
import { Link } from 'react-router-dom';

export interface BrandLogoProps {
  /**
   * 'dark': standard full logo with dark text (for light/ivory backgrounds)
   * 'light': full logo with crisp ivory/white text (for dark backgrounds like footer)
   * 'mark-only': only the ribbon AV monogram with bow (no subtitle text)
   */
  variant?: 'dark' | 'light' | 'mark-only';
  /**
   * Target display height (e.g. 44, 48, 52 or '44px')
   */
  height?: number | string;
  /**
   * If true, wraps the logo in a react-router Link to '/'
   */
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  height = 46,
  href,
  className = '',
  style = {},
  imgStyle = {},
  priority = false
}) => {
  const heightVal = typeof height === 'number' ? `${height}px` : height;

  let src = '/images/logo/logo-full.png';
  let aspectRatio = '760 / 287';

  if (variant === 'light') {
    src = '/images/logo/logo-light.png';
    aspectRatio = '760 / 287';
  } else if (variant === 'mark-only') {
    src = '/images/logo/logo-mark.png';
    aspectRatio = '445 / 230';
  }

  const imageElement = (
    <img
      src={src}
      alt="AV Corporate giftings & events"
      width={variant === 'mark-only' ? 88 : 122}
      height={typeof height === 'number' ? height : undefined}
      fetchPriority={priority ? 'high' : 'auto'}
      loading={priority ? 'eager' : 'lazy'}
      style={{
        height: heightVal,
        width: 'auto',
        aspectRatio,
        display: 'block',
        objectFit: 'contain',
        transition: 'transform var(--transition-fast, 0.2s ease)',
        ...imgStyle
      }}
      className="brand-logo-img"
    />
  );

  if (href) {
    return (
      <Link
        to={href}
        className={`brand-logo-link ${className}`.trim()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          outline: 'none',
          ...style
        }}
        aria-label="AV Corporate giftings & events Home"
      >
        {imageElement}
      </Link>
    );
  }

  return (
    <div
      className={`brand-logo-container ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        ...style
      }}
    >
      {imageElement}
    </div>
  );
};

export default BrandLogo;
