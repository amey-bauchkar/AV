import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';
import type { Product, Category } from '../types/product';

import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters, type FacetOption } from '../components/products/ProductFilters';
import { ActiveFilterChips, type FilterState } from '../components/products/ActiveFilterChips';
import { ProductSort, type SortOption } from '../components/products/ProductSort';
import { ProductPagination } from '../components/products/ProductPagination';

const allProducts = productsData as unknown as Product[];
const allCategories = categoriesData as Category[];

// Helper: Safely parse capacity into numerical value for sorting
function parseCapacityNumber(cap: string | null): number {
  if (!cap) return 0;
  const matchMl = cap.match(/(\d+)\s*ml/i);
  if (matchMl) return parseInt(matchMl[1], 10);
  const matchPages = cap.match(/(\d+)\s*pages/i);
  if (matchPages) return parseInt(matchPages[1], 10);
  return 0;
}

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Find category from categories.json
  const category = useMemo(() => {
    return allCategories.find((c) => c.slug === slug);
  }, [slug]);

  // Dynamic Document Title & SEO
  useEffect(() => {
    if (category) {
      document.title = `${category.name} | AV Corporate giftings & events`;
    } else {
      document.title = 'Category Not Found | AV Corporate giftings & events';
    }
  }, [category]);

  // Filter State (pre-filtered to this category, allowing sub-facets)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    materials: searchParams.getAll('material'),
    capacities: searchParams.getAll('capacity'),
    thermals: searchParams.getAll('thermal'),
    brandings: searchParams.getAll('branding'),
    tags: searchParams.getAll('tag'),
    search: searchParams.get('search') || ''
  });

  const [sort, setSort] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync to URL
  useEffect(() => {
    const params = new URLSearchParams();
    filters.materials.forEach((m) => params.append('material', m));
    filters.capacities.forEach((cap) => params.append('capacity', cap));
    filters.thermals.forEach((th) => params.append('thermal', th));
    filters.brandings.forEach((b) => params.append('branding', b));
    filters.tags.forEach((t) => params.append('tag', t));

    if (filters.search.trim()) params.set('search', filters.search.trim());
    if (sort !== 'featured') params.set('sort', sort);
    if (currentPage > 1) params.set('page', currentPage.toString());

    setSearchParams(params, { replace: true });
  }, [filters, sort, currentPage, setSearchParams]);

  // Base Products belonging to this category
  const baseCategoryProducts = useMemo(() => {
    if (!category) return [];
    return allProducts.filter((p) => p.categorySlug === category.slug);
  }, [category]);

  // Sub-filtering within Category
  const filteredProducts = useMemo(() => {
    return baseCategoryProducts.filter((product) => {
      // Search text filter
      if (filters.search.trim()) {
        const q = filters.search.trim().toLowerCase();
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesMaterial = product.material.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesSku && !matchesName && !matchesMaterial && !matchesTags) {
          return false;
        }
      }

      // Material facet
      if (filters.materials.length > 0) {
        const hasMatchingMaterial = filters.materials.some((m) =>
          product.material.toLowerCase().includes(m.toLowerCase())
        );
        if (!hasMatchingMaterial) return false;
      }

      // Capacity facet
      if (filters.capacities.length > 0) {
        if (!product.capacity) return false;
        const matchesCap = filters.capacities.some((c) =>
          product.capacity?.toLowerCase().includes(c.toLowerCase())
        );
        if (!matchesCap) return false;
      }

      // Thermal facet
      if (filters.thermals.length > 0) {
        if (!product.thermalPerformance) return false;
        const matchesThermal = filters.thermals.some((th) =>
          product.thermalPerformance?.toLowerCase().includes(th.toLowerCase())
        );
        if (!matchesThermal) return false;
      }

      // Branding facet
      if (filters.brandings.length > 0) {
        const matchesBranding = filters.brandings.some((b) =>
          product.brandingMethods.includes(b as any)
        );
        if (!matchesBranding) return false;
      }

      // Tags facet
      if (filters.tags.length > 0) {
        const matchesTag = filters.tags.some((t) => product.tags.includes(t));
        if (!matchesTag) return false;
      }

      return true;
    });
  }, [baseCategoryProducts, filters]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sort) {
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'sku-asc':
        return list.sort((a, b) => a.sku.localeCompare(b.sku, undefined, { numeric: true }));
      case 'sku-desc':
        return list.sort((a, b) => b.sku.localeCompare(a.sku, undefined, { numeric: true }));
      case 'capacity-desc':
        return list.sort((a, b) => parseCapacityNumber(b.capacity) - parseCapacityNumber(a.capacity));
      case 'capacity-asc':
        return list.sort((a, b) => parseCapacityNumber(a.capacity) - parseCapacityNumber(b.capacity));
      case 'featured':
      default:
        return list;
    }
  }, [filteredProducts, sort]);

  // Pagination
  const totalFilteredCount = sortedProducts.length;
  const totalPages = Math.ceil(totalFilteredCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Facet Options derived strictly from this category's products
  const availableMaterials: FacetOption[] = useMemo(() => {
    const rawOptions = [
      { value: 'SUS 304', label: 'SUS 304 Stainless Steel' },
      { value: '201 Steel', label: '201 Stainless Steel' },
      { value: 'Natural Bamboo', label: 'Natural Bamboo' },
      { value: 'Borosilicate Glass', label: 'Borosilicate Glass' },
      { value: 'Ceramic', label: 'Ceramic' },
      { value: 'Thermal PU', label: 'Thermal PU Leather' },
      { value: 'Real Cork', label: 'Real Cork' },
      { value: 'Metal', label: 'Metal & Zinc Alloy' }
    ];

    return rawOptions
      .map((opt) => {
        const count = baseCategoryProducts.filter((p) =>
          p.material.toLowerCase().includes(opt.value.toLowerCase())
        ).length;
        return { ...opt, count };
      })
      .filter((opt) => opt.count > 0);
  }, [baseCategoryProducts]);

  const availableCapacities: FacetOption[] = useMemo(() => {
    const rawOptions = [
      '500ml',
      '750ml',
      '1000ml',
      '450ml',
      '400ml',
      '380ml',
      '350ml',
      '280ml',
      '208 Pages',
      '160 Pages'
    ];

    return rawOptions
      .map((cap) => {
        const count = baseCategoryProducts.filter((p) =>
          p.capacity && p.capacity.toLowerCase().includes(cap.toLowerCase())
        ).length;
        return { value: cap, label: cap, count };
      })
      .filter((opt) => opt.count > 0);
  }, [baseCategoryProducts]);

  const availableThermals: FacetOption[] = useMemo(() => {
    const rawOptions = ['Hot & Cold up to 12 Hours', 'Thermal Double Wall Insulation'];
    return rawOptions
      .map((th) => {
        const count = baseCategoryProducts.filter((p) =>
          p.thermalPerformance && p.thermalPerformance.toLowerCase().includes(th.toLowerCase())
        ).length;
        return { value: th, label: th, count };
      })
      .filter((opt) => opt.count > 0);
  }, [baseCategoryProducts]);

  const availableBrandings: FacetOption[] = useMemo(() => {
    const methods = ['Laser Engraving', 'Screen Printing', 'UV Full Color Printing', 'Debossing'];
    return methods
      .map((b) => {
        const count = baseCategoryProducts.filter((p) => p.brandingMethods.includes(b as any)).length;
        return { value: b, label: b, count };
      })
      .filter((opt) => opt.count > 0);
  }, [baseCategoryProducts]);

  const availableTags: FacetOption[] = useMemo(() => {
    const tags = ['BPA Free', 'Rust Free', 'Vacuum Insulated', 'Double Wall', '80 GSM', 'Tea Infuser'];
    return tags
      .map((tag) => {
        const count = baseCategoryProducts.filter((p) => p.tags.includes(tag)).length;
        return { value: tag, label: tag, count };
      })
      .filter((opt) => opt.count > 0);
  }, [baseCategoryProducts]);

  const toggleFacetValue = useCallback((facetKey: keyof Omit<FilterState, 'search'>, value: string) => {
    setFilters((prev) => {
      const currentList = prev[facetKey];
      const exists = currentList.includes(value);
      const nextList = exists
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];
      return { ...prev, [facetKey]: nextList };
    });
    setCurrentPage(1);
  }, []);

  const handleClearFacet = useCallback((facetKey: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [facetKey]: facetKey === 'search' ? '' : []
    }));
    setCurrentPage(1);
  }, []);

  const handleResetAll = useCallback(() => {
    setFilters({
      categories: [],
      materials: [],
      capacities: [],
      thermals: [],
      brandings: [],
      tags: [],
      search: ''
    });
    setCurrentPage(1);
  }, []);

  // Not Found State for Invalid Category Slugs
  if (!category) {
    return (
      <div className="container" style={{ paddingBlock: 'var(--space-3xl)', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
          <span className="badge badge-accent">404</span>
          <span className="badge badge-primary">CATEGORY NOT FOUND</span>
        </div>
        <h2 style={{ marginBottom: 'var(--space-sm)' }}>Category &quot;{slug}&quot; Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)', maxWidth: '480px', marginInline: 'auto' }}>
          The requested product category is not part of the AV Corporate giftings & events 2024–2025 master catalog.
        </p>
        <Link to="/products" className="btn btn-primary">
          Browse All 159 Products
        </Link>
      </div>
    );
  }

  const activeFilterCount =
    filters.materials.length +
    filters.capacities.length +
    filters.thermals.length +
    filters.brandings.length +
    filters.tags.length +
    (filters.search.trim() ? 1 : 0);

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      {/* Category Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(var(--space-xl), 3vw, var(--space-2xl))',
          marginBottom: 'var(--space-xl)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-sm)' }}>
          <span className="badge badge-accent">CATALOG CATEGORY</span>
          <span className="badge badge-primary">{category.itemCount} VERIFIED MODELS</span>
          <span className="badge" style={{ backgroundColor: 'rgba(15, 23, 42, 0.08)' }}>
            PAGES {category.startPage}–{category.endPage}
          </span>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.75rem, 5.6vw, 4.75rem)',
            fontWeight: 400,
            lineHeight: 1.04,
            letterSpacing: '-0.04em',
            color: 'var(--color-primary-dark, #292923)',
            margin: '0 0 var(--space-md) 0'
          }}
        >
          {category.name.includes(' ') ? (
            <>
              {category.name.substring(0, category.name.lastIndexOf(' '))}{' '}
              <em
                style={{
                  fontFamily: 'var(--font-display, "Instrument Serif", Georgia, serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--color-accent, #A34D33)',
                  letterSpacing: '-0.025em'
                }}
              >
                {category.name.substring(category.name.lastIndexOf(' ') + 1)}.
              </em>
            </>
          ) : (
            <>
              {category.name}{' '}
              <em
                style={{
                  fontFamily: 'var(--font-display, "Instrument Serif", Georgia, serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--color-accent, #A34D33)',
                  letterSpacing: '-0.025em'
                }}
              >
                Collection.
              </em>
            </>
          )}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-muted, #66645A)',
            fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
            maxWidth: '780px',
            lineHeight: 1.55,
            margin: 0
          }}
        >
          {category.description}
        </p>

        {/* Category Switcher Pills */}
        <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
            Jump to Another Category:
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {allCategories.map((c) => {
              const isCurrent = c.slug === category.slug;
              return (
                <Link
                  key={c.id}
                  to={`/category/${c.slug}`}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: isCurrent ? 700 : 500,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid',
                    borderColor: isCurrent ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: isCurrent ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: isCurrent ? '#fff' : 'var(--color-text-main)',
                    textDecoration: 'none'
                  }}
                >
                  {c.name} ({c.itemCount})
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 280px) 1fr',
          gap: 'var(--space-xl)',
          alignItems: 'start'
        }}
        className="catalog-grid-wrapper"
      >
        {/* Desktop Sidebar */}
        <div className="desktop-filters-sidebar">
          <ProductFilters
            filters={filters}
            categories={allCategories}
            availableMaterials={availableMaterials}
            availableCapacities={availableCapacities}
            availableThermals={availableThermals}
            availableBrandings={availableBrandings}
            availableTags={availableTags}
            onToggleCategory={(cat) => toggleFacetValue('categories', cat)}
            onToggleMaterial={(mat) => toggleFacetValue('materials', mat)}
            onToggleCapacity={(cap) => toggleFacetValue('capacities', cap)}
            onToggleThermal={(th) => toggleFacetValue('thermals', th)}
            onToggleBranding={(b) => toggleFacetValue('brandings', b)}
            onToggleTag={(t) => toggleFacetValue('tags', t)}
            onClearFacet={handleClearFacet}
            onResetAll={handleResetAll}
          />
        </div>

        {/* Products Column */}
        <div style={{ minWidth: 0 }}>
          <ActiveFilterChips
            filters={filters}
            onRemoveCategory={(cat) => toggleFacetValue('categories', cat)}
            onRemoveMaterial={(mat) => toggleFacetValue('materials', mat)}
            onRemoveCapacity={(cap) => toggleFacetValue('capacities', cap)}
            onRemoveThermal={(th) => toggleFacetValue('thermals', th)}
            onRemoveBranding={(b) => toggleFacetValue('brandings', b)}
            onRemoveTag={(t) => toggleFacetValue('tags', t)}
            onRemoveSearch={() => handleClearFacet('search')}
            onClearAll={handleResetAll}
          />

          <ProductSort
            sort={sort}
            onSortChange={setSort}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            pageSize={pageSize}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
            totalCount={baseCategoryProducts.length}
            filteredCount={totalFilteredCount}
            startIndex={startIndex}
            endIndex={endIndex}
            onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          <ProductGrid
            products={paginatedProducts}
            viewMode={viewMode}
            onResetFilters={handleResetAll}
          />

          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <ProductFilters
          filters={filters}
          categories={allCategories}
          availableMaterials={availableMaterials}
          availableCapacities={availableCapacities}
          availableThermals={availableThermals}
          availableBrandings={availableBrandings}
          availableTags={availableTags}
          onToggleCategory={(cat) => toggleFacetValue('categories', cat)}
          onToggleMaterial={(mat) => toggleFacetValue('materials', mat)}
          onToggleCapacity={(cap) => toggleFacetValue('capacities', cap)}
          onToggleThermal={(th) => toggleFacetValue('thermals', th)}
          onToggleBranding={(b) => toggleFacetValue('brandings', b)}
          onToggleTag={(t) => toggleFacetValue('tags', t)}
          onClearFacet={handleClearFacet}
          onResetAll={handleResetAll}
          isMobileDrawer
          onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
        />
      )}
    </div>
  );
}
