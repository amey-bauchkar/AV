export type FilterState = {
  categories: string[];
  materials: string[];
  capacities: string[];
  thermals: string[];
  brandings: string[];
  tags: string[];
  search: string;
};

type ActiveFilterChipsProps = {
  filters: FilterState;
  categoryNameMap?: Record<string, string>;
  onRemoveCategory: (slug: string) => void;
  onRemoveMaterial: (mat: string) => void;
  onRemoveCapacity: (cap: string) => void;
  onRemoveThermal: (thermal: string) => void;
  onRemoveBranding: (branding: string) => void;
  onRemoveTag: (tag: string) => void;
  onRemoveSearch: () => void;
  onClearAll: () => void;
};

export function ActiveFilterChips({
  filters,
  categoryNameMap = {},
  onRemoveCategory,
  onRemoveMaterial,
  onRemoveCapacity,
  onRemoveThermal,
  onRemoveBranding,
  onRemoveTag,
  onRemoveSearch,
  onClearAll
}: ActiveFilterChipsProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.materials.length > 0 ||
    filters.capacities.length > 0 ||
    filters.thermals.length > 0 ||
    filters.brandings.length > 0 ||
    filters.tags.length > 0 ||
    Boolean(filters.search.trim());

  if (!hasActiveFilters) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        marginBottom: 'var(--space-md)',
        padding: 'var(--space-sm) var(--space-md)',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)'
      }}
    >
      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
        Active Filters:
      </span>

      {/* Search Filter Chip */}
      {filters.search.trim() && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            color: 'var(--color-text-main)'
          }}
        >
          <span>Query: &quot;{filters.search}&quot;</span>
          <button
            type="button"
            onClick={onRemoveSearch}
            aria-label="Remove search filter"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0 2px' }}
          >
            ✕
          </button>
        </span>
      )}

      {/* Category Chips */}
      {filters.categories.map((catSlug) => (
        <span
          key={`cat-${catSlug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(15, 23, 42, 0.08)',
            border: '1px solid rgba(15, 23, 42, 0.15)',
            fontSize: '0.75rem',
            color: 'var(--color-primary)',
            fontWeight: 600
          }}
        >
          <span>Category: {categoryNameMap[catSlug] || catSlug}</span>
          <button
            type="button"
            onClick={() => onRemoveCategory(catSlug)}
            aria-label={`Remove category filter ${catSlug}`}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit', padding: '0 2px' }}
          >
            ✕
          </button>
        </span>
      ))}

      {/* Material Chips */}
      {filters.materials.map((mat) => (
        <span
          key={`mat-${mat}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-accent-soft)',
            border: '1px solid var(--color-accent)',
            fontSize: '0.75rem',
            color: 'var(--color-accent)',
            fontWeight: 600
          }}
        >
          <span>Material: {mat}</span>
          <button
            type="button"
            onClick={() => onRemoveMaterial(mat)}
            aria-label={`Remove material filter ${mat}`}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit', padding: '0 2px' }}
          >
            ✕
          </button>
        </span>
      ))}

      {/* Capacity Chips */}
      {filters.capacities.map((cap) => (
        <span
          key={`cap-${cap}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            color: 'var(--color-text-main)'
          }}
        >
          <span>Capacity: {cap}</span>
          <button
            type="button"
            onClick={() => onRemoveCapacity(cap)}
            aria-label={`Remove capacity filter ${cap}`}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0 2px' }}
          >
            ✕
          </button>
        </span>
      ))}

      {/* Thermal Chips */}
      {filters.thermals.map((thermal) => (
        <span
          key={`thermal-${thermal}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            color: 'var(--color-text-main)'
          }}
        >
          <span>Insulation: {thermal}</span>
          <button
            type="button"
            onClick={() => onRemoveThermal(thermal)}
            aria-label={`Remove thermal filter ${thermal}`}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0 2px' }}
          >
            ✕
          </button>
        </span>
      ))}

      {/* Branding Chips */}
      {filters.brandings.map((b) => (
        <span
          key={`branding-${b}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            color: 'var(--color-text-main)'
          }}
        >
          <span>Branding: {b}</span>
          <button
            type="button"
            onClick={() => onRemoveBranding(b)}
            aria-label={`Remove branding filter ${b}`}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0 2px' }}
          >
            ✕
          </button>
        </span>
      ))}

      {/* Tag Chips */}
      {filters.tags.map((tag) => (
        <span
          key={`tag-${tag}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-eco-soft)',
            border: '1px solid var(--color-eco)',
            fontSize: '0.75rem',
            color: 'var(--color-eco)',
            fontWeight: 600
          }}
        >
          <span>Tag: {tag}</span>
          <button
            type="button"
            onClick={() => onRemoveTag(tag)}
            aria-label={`Remove tag filter ${tag}`}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit', padding: '0 2px' }}
          >
            ✕
          </button>
        </span>
      ))}

      {/* Clear All Action */}
      <button
        type="button"
        onClick={onClearAll}
        style={{
          marginLeft: 'auto',
          border: 'none',
          backgroundColor: 'transparent',
          color: 'var(--color-accent)',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
}
