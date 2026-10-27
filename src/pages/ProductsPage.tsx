import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
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

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Parse initial state from URL query parameters
  const initialCategoryParam = searchParams.getAll('category');
  const initialMaterialParam = searchParams.getAll('material');
  const initialCapacityParam = searchParams.getAll('capacity');
  const initialThermalParam = searchParams.getAll('thermal');
  const initialBrandingParam = searchParams.getAll('branding');
  const initialTagParam = searchParams.getAll('tag');
  const initialSearch = searchParams.get('search') || '';
  const initialSort = (searchParams.get('sort') as SortOption) || 'featured';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialPageSize = parseInt(searchParams.get('pageSize') || '12', 10);
  const initialView = (searchParams.get('view') as 'grid' | 'list') || 'grid';

  // State
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategoryParam,
    materials: initialMaterialParam,
    capacities: initialCapacityParam,
    thermals: initialThermalParam,
    brandings: initialBrandingParam,
    tags: initialTagParam,
    search: initialSearch
  });

  const [sort, setSort] = useState<SortOption>(initialSort);
  const [currentPage, setCurrentPage] = useState<number>(Number.isNaN(initialPage) ? 1 : initialPage);
  const [pageSize, setPageSize] = useState<number>(Number.isNaN(initialPageSize) ? 12 : initialPageSize);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Dynamic Document Title
  useEffect(() => {
    document.title = 'Master Product Catalog | AV Corporate giftings & events';
  }, []);

  // Synchronize state changes to URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    filters.categories.forEach((c) => params.append('category', c));
    filters.materials.forEach((m) => params.append('material', m));
    filters.capacities.forEach((cap) => params.append('capacity', cap));
    filters.thermals.forEach((th) => params.append('thermal', th));
    filters.brandings.forEach((b) => params.append('branding', b));
    filters.tags.forEach((t) => params.append('tag', t));

    if (filters.search.trim()) params.set('search', filters.search.trim());
    if (sort !== 'featured') params.set('sort', sort);
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (pageSize !== 12) params.set('pageSize', pageSize.toString());
    if (viewMode !== 'grid') params.set('view', viewMode);

    setSearchParams(params, { replace: true });
  }, [filters, sort, currentPage, pageSize, viewMode, setSearchParams]);

  // Category name lookup map
  const categoryNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    allCategories.forEach((c) => {
      map[c.slug] = c.name;
    });
    return map;
  }, []);

  // Filter Toggle Handlers (resets page to 1 on any filter change)
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

  // 2. Filter Products: OR within facet, AND across facets
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search text filter
      if (filters.search.trim()) {
        const q = filters.search.trim().toLowerCase();
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesMaterial = product.material.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesSku && !matchesName && !matchesCategory && !matchesMaterial && !matchesTags) {
          return false;
        }
      }

      // Category facet (OR within)
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.categorySlug)) {
          return false;
        }
      }

      // Material facet (OR within)
      if (filters.materials.length > 0) {
        const hasMatchingMaterial = filters.materials.some((m) =>
          product.material.toLowerCase().includes(m.toLowerCase())
        );
        if (!hasMatchingMaterial) return false;
      }

      // Capacity facet (OR within)
      if (filters.capacities.length > 0) {
        if (!product.capacity) return false;
        const matchesCap = filters.capacities.some((c) =>
          product.capacity?.toLowerCase().includes(c.toLowerCase())
        );
        if (!matchesCap) return false;
      }

      // Thermal facet (OR within)
      if (filters.thermals.length > 0) {
        if (!product.thermalPerformance) return false;
        const matchesThermal = filters.thermals.some((th) =>
          product.thermalPerformance?.toLowerCase().includes(th.toLowerCase())
        );
        if (!matchesThermal) return false;
      }

      // Branding facet (OR within)
      if (filters.brandings.length > 0) {
        const matchesBranding = filters.brandings.some((b) =>
          product.brandingMethods.includes(b as any)
        );
        if (!matchesBranding) return false;
      }

      // Tags facet (OR within)
      if (filters.tags.length > 0) {
        const matchesTag = filters.tags.some((t) =>
          product.tags.includes(t)
        );
        if (!matchesTag) return false;
      }

      return true;
    });
  }, [filters]);

  // 3. Sort Filtered Products
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
        // Natural catalog source page and SKU order
        return list;
    }
  }, [filteredProducts, sort]);

  // 4. Client-side Pagination
  const totalFilteredCount = sortedProducts.length;
  const totalPages = Math.ceil(totalFilteredCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Compute Available Facet Options with Real Dynamic Counts
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
        const count = allProducts.filter((p) =>
          p.material.toLowerCase().includes(opt.value.toLowerCase())
        ).length;
        return { ...opt, count };
      })
      .filter((opt) => opt.count > 0);
  }, []);

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
        const count = allProducts.filter((p) =>
          p.capacity && p.capacity.toLowerCase().includes(cap.toLowerCase())
        ).length;
        return { value: cap, label: cap, count };
      })
      .filter((opt) => opt.count > 0);
  }, []);

  const availableThermals: FacetOption[] = useMemo(() => {
    const rawOptions = ['Hot & Cold up to 12 Hours', 'Thermal Double Wall Insulation'];
    return rawOptions
      .map((th) => {
        const count = allProducts.filter((p) =>
          p.thermalPerformance && p.thermalPerformance.toLowerCase().includes(th.toLowerCase())
        ).length;
        return { value: th, label: th, count };
      })
      .filter((opt) => opt.count > 0);
  }, []);

  const availableBrandings: FacetOption[] = useMemo(() => {
    const methods = ['Laser Engraving', 'Screen Printing', 'UV Full Color Printing', 'Debossing'];
    return methods
      .map((b) => {
        const count = allProducts.filter((p) => p.brandingMethods.includes(b as any)).length;
        return { value: b, label: b, count };
      })
      .filter((opt) => opt.count > 0);
  }, []);

  const availableTags: FacetOption[] = useMemo(() => {
    const tags = ['BPA Free', 'Rust Free', 'Vacuum Insulated', 'Double Wall', '80 GSM', 'Tea Infuser'];
    return tags
      .map((tag) => {
        const count = allProducts.filter((p) => p.tags.includes(tag)).length;
        return { value: tag, label: tag, count };
      })
      .filter((opt) => opt.count > 0);
  }, []);

  const activeFilterCount =
    filters.categories.length +
    filters.materials.length +
    filters.capacities.length +
    filters.thermals.length +
    filters.brandings.length +
    filters.tags.length +
    (filters.search.trim() ? 1 : 0);

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      {/* Catalog Header Banner */}
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
          <span className="badge badge-accent">MASTER PRODUCT DIRECTORY</span>
          <span className="badge badge-primary">{allProducts.length} VERIFIED CATALOG MODELS</span>
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
          All Products<br />
          <em
            style={{
              fontFamily: 'var(--font-display, "Instrument Serif", Georgia, serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--color-accent, #A34D33)',
              letterSpacing: '-0.025em'
            }}
          >
            Master Catalog.
          </em>
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
          Explore AV Corporate giftings &amp; events&apos; complete 2024–2025 promotional merchandise catalog. Filter by category, food-grade materials, volume capacities, and custom branding techniques.
        </p>

        {/* Search Input Bar */}
        <div style={{ marginTop: 'var(--space-lg)', maxWidth: '580px', position: 'relative' }}>
          <input
            type="search"
            value={filters.search}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, search: e.target.value }));
              setCurrentPage(1);
            }}
            placeholder="Search by SKU, model name, material (e.g. 5006, Bamboo, 750ml)..."
            style={{
              width: '100%',
              padding: '10px 16px',
              paddingRight: '40px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              fontSize: '0.92rem'
            }}
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => handleClearFacet('search')}
              aria-label="Clear Search Input"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout (Desktop Filters Sidebar + Products Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 280px) 1fr',
          gap: 'var(--space-xl)',
          alignItems: 'start'
        }}
        className="catalog-grid-wrapper"
      >
        {/* Desktop Filter Sidebar */}
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

        {/* Right Main Content Area */}
        <div style={{ minWidth: 0 }}>
          {/* Active Filter Chips */}
          <ActiveFilterChips
            filters={filters}
            categoryNameMap={categoryNameMap}
            onRemoveCategory={(cat) => toggleFacetValue('categories', cat)}
            onRemoveMaterial={(mat) => toggleFacetValue('materials', mat)}
            onRemoveCapacity={(cap) => toggleFacetValue('capacities', cap)}
            onRemoveThermal={(th) => toggleFacetValue('thermals', th)}
            onRemoveBranding={(b) => toggleFacetValue('brandings', b)}
            onRemoveTag={(t) => toggleFacetValue('tags', t)}
            onRemoveSearch={() => handleClearFacet('search')}
            onClearAll={handleResetAll}
          />

          {/* Sort & View Controls */}
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
            totalCount={allProducts.length}
            filteredCount={totalFilteredCount}
            startIndex={startIndex}
            endIndex={endIndex}
            onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          {/* Products Grid / List */}
          <ProductGrid
            products={paginatedProducts}
            viewMode={viewMode}
            onResetFilters={handleResetAll}
          />

          {/* Pagination */}
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
