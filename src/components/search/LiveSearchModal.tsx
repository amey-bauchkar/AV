import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/products.json';
import { RfqAddButton } from '../rfq/RfqAddButton';
import type { Product } from '../../types/product';

type LiveSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LiveSearchModal({ isOpen, onClose }: LiveSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Cast dataset to Product[]
  const products = productsData as unknown as Product[];

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Normalized search query
  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return products
      .filter((p) => {
        const matchSku = p.sku.toLowerCase().includes(trimmed);
        const matchName = p.name.toLowerCase().includes(trimmed);
        const matchCategory = p.category.toLowerCase().includes(trimmed);
        const matchMaterial = p.material.toLowerCase().includes(trimmed);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(trimmed));
        return matchSku || matchName || matchCategory || matchMaterial || matchTags;
      })
      .slice(0, 8); // Top 8 relevant matches
  }, [query, products]);

  // Keyboard navigation through search results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredProducts.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredProducts.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredProducts[selectedIndex];
      if (selected) {
        handleSelectProduct(selected.slug);
      }
    }
  };

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label="Live Catalog Search"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'var(--space-2xl) var(--space-md)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh'
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            padding: 'var(--space-md) var(--space-lg)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            backgroundColor: 'var(--color-surface-2)'
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
            style={{ color: 'var(--color-text-muted)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search 159 products by SKU, name, material, or category (e.g. 5006, vacuum, bamboo)..."
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '1rem',
              color: 'var(--color-text-main)',
              outline: 'none'
            }}
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Clear query"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                padding: 'var(--space-2xs)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              cursor: 'pointer'
            }}
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-md)' }}>
          {query.trim() === '' ? (
            <div style={{ padding: 'var(--space-lg)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>
                Type a SKU code, category, or keyword to find executive corporate gifts.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-xs)', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Thermos Bottles', 'Bamboo Speaker', 'Executive Notebook', 'Metal Pens', 'SUS 304'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setQuery(tag);
                      inputRef.current?.focus();
                    }}
                    className="badge badge-primary"
                    style={{ border: 'none', cursor: 'pointer', padding: '6px 12px' }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                No matching products found for "{query}"
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                Try searching by exact SKU (e.g. PIX-033, PIX-5006, PIX-NB-101) or broader keywords like "Steel", "Bamboo", or "Mug".
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xs)' }}>
              {filteredProducts.map((p, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.slug)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-md)',
                      padding: 'var(--space-sm) var(--space-md)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'var(--color-surface-3)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background-color var(--transition-fast)'
                    }}
                  >
                    <img
                      src={p.images.hero}
                      alt={p.name}
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'contain',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: '#fff',
                        border: '1px solid var(--color-border)'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/products/placeholder-product.svg';
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                          {p.sku}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          • {p.category} {p.capacity ? `(${p.capacity})` : ''}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: 'var(--color-text-main)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.material}
                      </div>
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                      <RfqAddButton
                        product={p}
                        buttonStyle={isSelected ? 'accent' : 'outline'}
                        label="Add"
                        className="btn"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div
          style={{
            padding: 'var(--space-xs) var(--space-md)',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface-2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <span>Use ↑ ↓ to navigate, Enter to select</span>
          <span>{filteredProducts.length} results of 159 products</span>
        </div>
      </div>
    </div>
  );
}
