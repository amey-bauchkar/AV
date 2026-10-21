export type SortOption =
  | 'featured'
  | 'name-asc'
  | 'name-desc'
  | 'sku-asc'
  | 'sku-desc'
  | 'capacity-desc'
  | 'capacity-asc';

type ProductSortProps = {
  sort: SortOption;
  onSortChange: (newSort: SortOption) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalCount: number;
  filteredCount: number;
  startIndex: number;
  endIndex: number;
  onOpenMobileFilters?: () => void;
  activeFilterCount?: number;
};

export function ProductSort({
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  pageSize,
  onPageSizeChange,
  totalCount,
  filteredCount,
  startIndex,
  endIndex,
  onOpenMobileFilters,
  activeFilterCount = 0
}: ProductSortProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-md)',
        padding: 'var(--space-md) var(--space-lg)',
        backgroundColor: 'var(--color-surface-2)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        marginBottom: 'var(--space-lg)'
      }}
    >
      {/* Left: Result Counter & Mobile Filter Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        {onOpenMobileFilters && (
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="mobile-filter-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                  borderRadius: 'var(--radius-full)',
                  padding: '1px 6px',
                  fontSize: '0.7rem',
                  fontWeight: 800
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
          {filteredCount === 0 ? (
            '0 products'
          ) : (
            <>
              Showing <strong style={{ color: 'var(--color-text-main)' }}>{startIndex + 1}–{Math.min(endIndex, filteredCount)}</strong> of{' '}
              <strong style={{ color: 'var(--color-text-main)' }}>{filteredCount}</strong> products
              {filteredCount !== totalCount && (
                <span style={{ fontSize: '0.8rem', marginLeft: '4px' }}>
                  (filtered from {totalCount})
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right: Sort Dropdown, Page Size, and View Mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label htmlFor="product-sort-select" style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Sort:
          </label>
          <select
            id="product-sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            style={{
              padding: '6px 10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              fontSize: '0.85rem',
              color: 'var(--color-text-main)',
              cursor: 'pointer'
            }}
          >
            <option value="featured">Catalog Order</option>
            <option value="name-asc">Product Name (A → Z)</option>
            <option value="name-desc">Product Name (Z → A)</option>
            <option value="sku-asc">SKU Code (Ascending)</option>
            <option value="sku-desc">SKU Code (Descending)</option>
            <option value="capacity-desc">Capacity (High → Low)</option>
            <option value="capacity-asc">Capacity (Low → High)</option>
          </select>
        </div>

        {/* Page Size Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label htmlFor="product-pagesize-select" style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Show:
          </label>
          <select
            id="product-pagesize-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{
              padding: '6px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              fontSize: '0.85rem',
              color: 'var(--color-text-main)',
              cursor: 'pointer'
            }}
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>

        {/* View Toggle */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden'
          }}
        >
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            aria-label="Switch to Grid View"
            style={{
              padding: '6px 10px',
              backgroundColor: viewMode === 'grid' ? 'var(--color-primary)' : 'transparent',
              color: viewMode === 'grid' ? '#fff' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            aria-label="Switch to List View"
            style={{
              padding: '6px 10px',
              backgroundColor: viewMode === 'list' ? 'var(--color-primary)' : 'transparent',
              color: viewMode === 'list' ? '#fff' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
