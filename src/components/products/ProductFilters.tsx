import { useState } from 'react';
import type { FilterState } from './ActiveFilterChips';
import type { Category } from '../../types/product';

export type FacetOption = {
  value: string;
  label: string;
  count: number;
};

type ProductFiltersProps = {
  filters: FilterState;
  categories: Category[];
  availableMaterials: FacetOption[];
  availableCapacities: FacetOption[];
  availableThermals: FacetOption[];
  availableBrandings: FacetOption[];
  availableTags: FacetOption[];
  onToggleCategory: (slug: string) => void;
  onToggleMaterial: (material: string) => void;
  onToggleCapacity: (capacity: string) => void;
  onToggleThermal: (thermal: string) => void;
  onToggleBranding: (branding: string) => void;
  onToggleTag: (tag: string) => void;
  onClearFacet: (facet: keyof FilterState) => void;
  onResetAll: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
};

export function ProductFilters({
  filters,
  categories,
  availableMaterials,
  availableCapacities,
  availableThermals,
  availableBrandings,
  availableTags,
  onToggleCategory,
  onToggleMaterial,
  onToggleCapacity,
  onToggleThermal,
  onToggleBranding,
  onToggleTag,
  onClearFacet,
  onResetAll,
  isMobileDrawer = false,
  onCloseMobileDrawer
}: ProductFiltersProps) {
  // Accordion collapsed state
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    categories: false,
    materials: false,
    capacities: false,
    thermals: true,
    brandings: false,
    tags: true
  });

  const toggleSection = (section: string) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderSectionHeader = (
    title: string,
    key: string,
    activeCount: number,
    onClear: () => void
  ) => {
    const isCollapsed = collapsed[key];
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: isCollapsed ? 0 : 'var(--space-xs)',
          paddingBottom: 'var(--space-2xs)'
        }}
      >
        <button
          type="button"
          onClick={() => toggleSection(key)}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.88rem',
            fontWeight: 700,
            color: 'var(--color-text-main)'
          }}
        >
          <span>{title}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            {isCollapsed ? '▼' : '▲'}
          </span>
          {activeCount > 0 && (
            <span
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 800,
                borderRadius: 'var(--radius-full)',
                padding: '1px 6px'
              }}
            >
              {activeCount}
            </span>
          )}
        </button>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              fontSize: '0.72rem',
              color: 'var(--color-accent)',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Clear
          </button>
        )}
      </div>
    );
  };

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* 1. Category Facet */}
      <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-md)' }}>
        {renderSectionHeader(
          'Product Categories',
          'categories',
          filters.categories.length,
          () => onClearFacet('categories')
        )}
        {!collapsed.categories && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'var(--space-2xs)' }}>
            {categories.map((cat) => {
              const isChecked = filters.categories.includes(cat.slug);
              return (
                <label
                  key={cat.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    color: isChecked ? 'var(--color-text-main)' : 'var(--color-text-body)',
                    fontWeight: isChecked ? 600 : 400
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleCategory(cat.slug)}
                      style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                    />
                    <span>{cat.name}</span>
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                    ({cat.itemCount})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Materials Facet */}
      {availableMaterials.length > 0 && (
        <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-md)' }}>
          {renderSectionHeader(
            'Material & Build',
            'materials',
            filters.materials.length,
            () => onClearFacet('materials')
          )}
          {!collapsed.materials && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                maxHeight: '220px',
                overflowY: 'auto',
                marginTop: 'var(--space-2xs)',
                paddingRight: '4px'
              }}
            >
              {availableMaterials.map((mat) => {
                const isChecked = filters.materials.includes(mat.value);
                return (
                  <label
                    key={mat.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      color: isChecked ? 'var(--color-text-main)' : 'var(--color-text-body)',
                      fontWeight: isChecked ? 600 : 400
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleMaterial(mat.value)}
                        style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                      />
                      <span>{mat.label}</span>
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      ({mat.count})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. Capacity / Dimensions Facet */}
      {availableCapacities.length > 0 && (
        <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-md)' }}>
          {renderSectionHeader(
            'Capacity / Size',
            'capacities',
            filters.capacities.length,
            () => onClearFacet('capacities')
          )}
          {!collapsed.capacities && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                maxHeight: '200px',
                overflowY: 'auto',
                marginTop: 'var(--space-2xs)',
                paddingRight: '4px'
              }}
            >
              {availableCapacities.map((cap) => {
                const isChecked = filters.capacities.includes(cap.value);
                return (
                  <label
                    key={cap.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      color: isChecked ? 'var(--color-text-main)' : 'var(--color-text-body)',
                      fontWeight: isChecked ? 600 : 400
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleCapacity(cap.value)}
                        style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                      />
                      <span>{cap.label}</span>
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      ({cap.count})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. Branding Methods Facet */}
      {availableBrandings.length > 0 && (
        <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-md)' }}>
          {renderSectionHeader(
            'Custom Branding',
            'brandings',
            filters.brandings.length,
            () => onClearFacet('brandings')
          )}
          {!collapsed.brandings && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'var(--space-2xs)' }}>
              {availableBrandings.map((b) => {
                const isChecked = filters.brandings.includes(b.value);
                return (
                  <label
                    key={b.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      color: isChecked ? 'var(--color-text-main)' : 'var(--color-text-body)',
                      fontWeight: isChecked ? 600 : 400
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleBranding(b.value)}
                        style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                      />
                      <span>{b.label}</span>
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      ({b.count})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5. Thermal Performance Facet */}
      {availableThermals.length > 0 && (
        <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-md)' }}>
          {renderSectionHeader(
            'Thermal Retention',
            'thermals',
            filters.thermals.length,
            () => onClearFacet('thermals')
          )}
          {!collapsed.thermals && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'var(--space-2xs)' }}>
              {availableThermals.map((th) => {
                const isChecked = filters.thermals.includes(th.value);
                return (
                  <label
                    key={th.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      color: isChecked ? 'var(--color-text-main)' : 'var(--color-text-body)',
                      fontWeight: isChecked ? 600 : 400
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleThermal(th.value)}
                        style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                      />
                      <span>{th.label}</span>
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      ({th.count})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 6. Feature & Technical Tags Facet */}
      {availableTags.length > 0 && (
        <div>
          {renderSectionHeader(
            'Features & Attributes',
            'tags',
            filters.tags.length,
            () => onClearFacet('tags')
          )}
          {!collapsed.tags && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                maxHeight: '200px',
                overflowY: 'auto',
                marginTop: 'var(--space-2xs)',
                paddingRight: '4px'
              }}
            >
              {availableTags.map((t) => {
                const isChecked = filters.tags.includes(t.value);
                return (
                  <label
                    key={t.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      color: isChecked ? 'var(--color-text-main)' : 'var(--color-text-body)',
                      fontWeight: isChecked ? 600 : 400
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleTag(t.value)}
                        style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                      />
                      <span>{t.label}</span>
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      ({t.count})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // If mobile drawer layout
  if (isMobileDrawer) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 900,
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={onCloseMobileDrawer}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '360px',
            height: '100%',
            backgroundColor: 'var(--color-surface)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Drawer Header */}
          <div
            style={{
              padding: 'var(--space-md) var(--space-lg)',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-surface-2)'
            }}
          >
            <h3 style={{ fontSize: '1.1rem' }}>Filter Products</h3>
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              aria-label="Close Filter Drawer"
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.25rem',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                padding: '4px'
              }}
            >
              ✕
            </button>
          </div>

          {/* Drawer Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-lg)' }}>
            {content}
          </div>

          {/* Drawer Footer Actions */}
          <div
            style={{
              padding: 'var(--space-md) var(--space-lg)',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              gap: 'var(--space-sm)',
              backgroundColor: 'var(--color-surface-2)'
            }}
          >
            <button
              type="button"
              onClick={onResetAll}
              className="btn btn-outline"
              style={{ flex: 1, fontSize: '0.88rem' }}
            >
              Reset All
            </button>
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="btn btn-primary"
              style={{ flex: 1.5, fontSize: '0.88rem' }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Sidebar Layout
  return (
    <aside
      aria-label="Product Catalog Filters"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-lg)',
        position: 'sticky',
        top: '90px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-md)',
          paddingBottom: 'var(--space-xs)',
          borderBottom: '2px solid var(--color-primary)'
        }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
          Filters
        </h3>
        <button
          type="button"
          onClick={onResetAll}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-accent)',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Reset All
        </button>
      </div>

      {content}
    </aside>
  );
}
