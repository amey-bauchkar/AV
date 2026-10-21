import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { RfqCartProvider } from './components/rfq/RfqCartProvider';
import { SmoothScrollProvider, useSmoothScroll } from './components/layout/SmoothScrollProvider';
import { MainLayout } from './components/layout/MainLayout';

// Synchronous critical path for instant initial render
import { HomePage } from './pages/HomePage';

// Code-split routes for optimal performance
const ProductsPage = lazy(() =>
  import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage }))
);
const CategoryPage = lazy(() =>
  import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage }))
);
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const GiftingKitBuilderPage = lazy(() =>
  import('./pages/GiftingKitBuilderPage').then((m) => ({ default: m.GiftingKitBuilderPage }))
);
const BrandingPage = lazy(() =>
  import('./pages/BrandingPage').then((m) => ({ default: m.BrandingPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const LegalPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.LegalPage }))
);
const AdminPage = lazy(() =>
  import('./pages/AdminPage').then((m) => ({ default: m.AdminPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

/**
 * ScrollToTop helper: scrolls viewport to (0, 0) upon any route navigation using Lenis.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    scrollTo(0, { immediate: true });
  }, [pathname, scrollTo]);

  return null;
}

/**
 * Lightweight route transition fallback indicator.
 */
function RouteLoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 'var(--space-md)'
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid var(--color-border)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
        Loading catalog experience...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <RfqCartProvider>
          <ScrollToTop />
          <MainLayout>
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/corporate-gifting" element={<GiftingKitBuilderPage />} />
                <Route path="/solutions" element={<GiftingKitBuilderPage />} />
                <Route path="/branding" element={<BrandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<LegalPage />} />
                <Route path="/terms" element={<LegalPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </RfqCartProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}
