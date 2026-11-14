import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export type AppRoute = '/' | '/cakes' | '/about' | '/gallery' | '/contact';

interface NavbarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const NAV_LINKS: { label: string; route: AppRoute }[] = [
  { label: 'Home', route: '/' },
  { label: 'Our Cakes', route: '/cakes' },
  { label: 'About Us', route: '/about' },
  { label: 'Gallery', route: '/gallery' },
  { label: 'Contact', route: '/contact' },
];

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentRoute]);

  const handleLinkClick = (route: AppRoute) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF8F0]/95 backdrop-blur-md border-b border-[#35221B]/10 shadow-[0_6px_24px_-12px_rgba(53,34,27,0.14)]'
          : 'bg-[#FFF8F0]/85 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="font-display text-2xl font-semibold tracking-tight text-[#35221B] whitespace-nowrap shrink-0 transition-colors hover:text-[#603B2B]"
        >
          Mr. Cakes
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#80695C]"
        >
          {NAV_LINKS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.route);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#35221B] font-semibold'
                    : 'text-[#80695C] hover:text-[#35221B]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C58A4A] transition-all duration-200 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('/contact')}
            className="btn-chocolate hidden sm:inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap shrink-0"
          >
            Order Now
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#35221B]/15 bg-[#FFFDF9] text-[#35221B] transition-colors hover:bg-[#F4E9DA] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`md:hidden overflow-hidden border-t border-[#35221B]/10 bg-[#FFF8F0] transition-all duration-300 ease-out ${
          mobileOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav aria-label="Mobile Navigation" className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.route);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`flex min-h-[44px] items-center justify-between rounded-lg px-3.5 text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F4E9DA] text-[#35221B] font-semibold'
                    : 'text-[#603B2B] hover:bg-[#F4E9DA]/60'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C58A4A]" aria-hidden="true" />
                )}
              </a>
            );
          })}
          <div className="mt-2 pt-2 border-t border-[#35221B]/10">
            <button
              type="button"
              onClick={() => handleLinkClick('/contact')}
              className="btn-chocolate flex min-h-[44px] w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium"
            >
              Order Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
