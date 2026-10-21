type ProductPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ProductPagination({
  currentPage,
  totalPages,
  onPageChange
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Product Catalog Pagination"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        marginTop: 'var(--space-3xl)',
        marginBottom: 'var(--space-xl)',
        flexWrap: 'wrap'
      }}
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        style={{
          padding: '8px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          color: currentPage === 1 ? 'var(--color-text-muted)' : 'var(--color-text-main)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        ← Previous
      </button>

      {/* Numbered Page Buttons */}
      {pageNumbers.map((p, idx) => {
        if (p === '...') {
          return (
            <span
              key={`dots-${idx}`}
              style={{
                padding: '8px 6px',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem'
              }}
            >
              ...
            </span>
          );
        }

        const isCurrent = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => handlePageClick(p as number)}
            aria-current={isCurrent ? 'page' : undefined}
            style={{
              minWidth: '38px',
              height: '38px',
              padding: '0 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid',
              borderColor: isCurrent ? 'var(--color-primary)' : 'var(--color-border)',
              backgroundColor: isCurrent ? 'var(--color-primary)' : 'var(--color-surface)',
              color: isCurrent ? '#fff' : 'var(--color-text-main)',
              fontSize: '0.85rem',
              fontWeight: isCurrent ? 700 : 500,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        style={{
          padding: '8px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          color: currentPage === totalPages ? 'var(--color-text-muted)' : 'var(--color-text-main)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        Next →
      </button>
    </nav>
  );
}
