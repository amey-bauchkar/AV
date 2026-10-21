import { useState } from 'react';
import type { Product } from '../../types/product';
import { generateProductSpecSheet } from '../../lib/productSpecSheet';

type DownloadSpecSheetButtonProps = {
  product: Product;
  buttonStyle?: 'primary' | 'accent' | 'outline';
  className?: string;
  label?: string;
  fullWidth?: boolean;
};

export function DownloadSpecSheetButton({
  product,
  buttonStyle = 'outline',
  className = '',
  label = 'Download Spec Sheet (PDF)',
  fullWidth = false
}: DownloadSpecSheetButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      await generateProductSpecSheet(product);
    } catch (err) {
      console.error('Failed to generate PDF spec sheet:', err);
      alert('Could not generate the PDF specification sheet. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const btnClass = `btn btn-${buttonStyle} ${className}`.trim();

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className={btnClass}
      aria-label={`Download Product Specification Sheet for ${product.sku}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-xs)',
        width: fullWidth ? '100%' : undefined,
        cursor: isGenerating ? 'wait' : 'pointer',
        opacity: isGenerating ? 0.75 : 1
      }}
    >
      {isGenerating ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ animation: 'spin 1s linear infinite' }}
        >
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )}
      <span>{isGenerating ? 'Generating PDF...' : label}</span>
    </button>
  );
}
