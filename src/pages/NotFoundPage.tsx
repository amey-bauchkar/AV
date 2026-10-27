import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-3xl)', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
        <span className="badge badge-accent">404 ERROR</span>
        <span className="badge badge-primary">PAGE NOT FOUND</span>
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
        Page Not <em style={{ fontFamily: 'var(--font-display, "Instrument Serif", Georgia, serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-accent, #A34D33)', letterSpacing: '-0.025em' }}>Found.</em>
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text-muted, #66645A)',
          fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
          maxWidth: '520px',
          marginInline: 'auto',
          lineHeight: 1.55,
          marginBottom: 'var(--space-xl)'
        }}
      >
        The page you are looking for does not exist or has been moved. Explore our 159 master products in the 2024–2025 catalog.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link to="/products" className="btn btn-outline">
          Browse All Products
        </Link>
      </div>
    </div>
  );
}
