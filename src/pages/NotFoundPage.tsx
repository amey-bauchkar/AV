import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-3xl)', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
        <span className="badge badge-accent">404 ERROR</span>
        <span className="badge badge-primary">PAGE NOT FOUND</span>
      </div>
      <h1 style={{ marginBottom: 'var(--space-sm)' }}>Page Not Found</h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '520px', marginInline: 'auto', marginBottom: 'var(--space-xl)' }}>
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
