import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileNavigation } from './MobileNavigation';
import { LiveSearchModal } from '../search/LiveSearchModal';
import { RfqCartWidget } from '../rfq/RfqCartWidget';

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
      />

      <main style={{ flex: 1 }}>{children}</main>

      <Footer />

      {/* Global Modals & Drawers */}
      <LiveSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <RfqCartWidget />
    </div>
  );
}
