import { Link } from 'react-router-dom';
import { AboutShowcaseSection } from '../components/about/AboutShowcaseSection';
import { ManufacturingBenchmarkCards } from '../components/about/ManufacturingBenchmarkCards';

export function AboutPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-2xl)' }}>
      {/* ========================================================
          MASTER ABOUT SHOWCASE CARD — MATCHING SPEC DESIGN
         ======================================================== */}
      <div style={{ marginBottom: 'var(--space-3xl)' }}>
        <AboutShowcaseSection isHomePage={false} />
      </div>

      <section style={{ paddingTop: 'var(--space-md)' }}>

        {/* Manufacturing Benchmarks Glowing Gradient Cards */}
        <ManufacturingBenchmarkCards />

        {/* CTA Section */}
        <div style={{ textAlign: 'center', padding: 'var(--space-2xl) 0' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '12px' }}>
            Ready to Assemble Your Corporate Order?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '620px', marginInline: 'auto', marginBottom: '24px' }}>
            Explore our complete 159-product master catalog and build your custom Quotation Request online in minutes.
          </p>
          <Link
            to="/products"
            className="btn-pill-primary"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              padding: '12px 18px 12px 28px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '1rem'
            }}
          >
            <span>View Master Product Catalog</span>
            <span className="btn-pill-circle" aria-hidden="true" style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
