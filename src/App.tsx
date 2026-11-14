import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { BrandLoader } from './components/BrandLoader';
import { CustomCursor } from './components/CustomCursor';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { Navbar, type AppRoute } from './components/Navbar';
import { ProductDetailModal } from './components/ProductDetailModal';
import type { CakeItem, CakeMenuCategory } from './data/bakeryData';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';

gsap.registerPlugin(ScrollTrigger);

const ROUTE_META: Record<AppRoute, { title: string; description: string }> = {
  '/': {
    title: 'Mr. Cakes Vadodara – Birthday, Chocolate & Designer Cakes',
    description:
      'Discover handcrafted birthday, Belgian chocolate, anniversary, and designer cakes at Mr. Cakes Vadodara on New VIP Road. Rated 4.9/5 by 518 customers.',
  },
  '/cakes': {
    title: 'Our Cakes & Menu – Mr. Cakes Vadodara',
    description:
      'Explore Belgian chocolate, Black Forest, Red Velvet, Butterscotch, Pineapple, Strawberry, and Designer cakes at Mr. Cakes Vadodara.',
  },
  '/about': {
    title: 'About Us – Mr. Cakes Vadodara',
    description:
      'Learn about Mr. Cakes Vadodara and our dedication to crafting celebration cakes for birthdays, anniversaries, and special milestones.',
  },
  '/gallery': {
    title: 'Cake Gallery – Mr. Cakes Vadodara',
    description:
      'Browse our visual showcase of birthday cakes, chocolate ganache creations, designer tiers, and patisserie desserts in Vadodara.',
  },
  '/contact': {
    title: 'Order & Contact – Mr. Cakes Vadodara',
    description:
      'Enquire or order your custom celebration cake at Mr. Cakes Vadodara, Siddheshwar Plaza, New VIP Road. Call 7802880555 or message on WhatsApp.',
  },
};

function parseRoute(pathname: string): AppRoute {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (
    normalized === '/' ||
    normalized === '/cakes' ||
    normalized === '/about' ||
    normalized === '/gallery' ||
    normalized === '/contact'
  ) {
    return normalized;
  }
  return '/';
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    typeof window !== 'undefined' ? parseRoute(window.location.pathname) : '/'
  );
  const [menuCategory, setMenuCategory] = useState<CakeMenuCategory>('All Cakes');
  const [prefilledCakeType, setPrefilledCakeType] = useState<string>('');
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Sync browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRoute(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Update SEO document title & meta description per route
  useEffect(() => {
    const meta = ROUTE_META[route];
    document.title = meta.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', meta.description);
    }
  }, [route]);

  // Lenis smooth scrolling + GSAP ScrollTrigger sync
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Subtle route entry animation & ScrollTrigger refresh
  useEffect(() => {
    ScrollTrigger.refresh();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !mainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0.92 },
        { opacity: 1, duration: 0.25, ease: 'power2.out', clearProps: 'opacity' }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [route]);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const navigateTo = useCallback((nextRoute: AppRoute, category?: CakeMenuCategory) => {
    if (category) {
      setMenuCategory(category);
    } else if (nextRoute === '/cakes') {
      setMenuCategory('All Cakes');
    }

    if (window.location.pathname !== nextRoute) {
      window.history.pushState({}, '', nextRoute);
    }
    setRoute(nextRoute);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const handleEnquireCake = useCallback(
    (cakeName: string) => {
      setPrefilledCakeType(cakeName);
      navigateTo('/contact');
    },
    [navigateTo]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#35221B]">
      <BrandLoader />
      <CustomCursor />

      <Navbar currentRoute={route} onNavigate={(next) => navigateTo(next)} />

      <main ref={mainRef} className="flex-1">
        {route === '/' && (
          <HomePage onNavigate={navigateTo} onSelectCake={(cake) => setSelectedCake(cake)} />
        )}
        {route === '/cakes' && (
          <MenuPage
            initialCategory={menuCategory}
            onSelectCake={(cake) => setSelectedCake(cake)}
            onEnquireCake={handleEnquireCake}
          />
        )}
        {route === '/about' && <AboutPage onNavigate={(next) => navigateTo(next)} />}
        {route === '/gallery' && <GalleryPage />}
        {route === '/contact' && <ContactPage prefilledCakeType={prefilledCakeType} />}
      </main>

      <Footer onNavigate={navigateTo} />

      <FloatingActions onScrollToTop={scrollToTop} />

      <ProductDetailModal
        cake={selectedCake}
        onClose={() => setSelectedCake(null)}
        onEnquireViaForm={handleEnquireCake}
      />
    </div>
  );
}
