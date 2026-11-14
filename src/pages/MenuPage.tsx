import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { MessageCircle, Search, X } from 'lucide-react';
import {
  CAKES_CATALOG,
  IMAGES,
  MENU_CATEGORIES,
  type CakeItem,
  type CakeMenuCategory,
} from '../data/bakeryData';
import { SafeImage } from '../components/SafeImage';
import { filterCakes } from '../utils/validation';
import { buildWhatsAppProductUrl } from '../utils/whatsapp';

interface MenuPageProps {
  initialCategory?: CakeMenuCategory;
  onSelectCake: (cake: CakeItem) => void;
  onEnquireCake: (cakeName: string) => void;
}

export function MenuPage({
  initialCategory = 'All Cakes',
  onSelectCake,
  onEnquireCake,
}: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<CakeMenuCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredCakes = useMemo(
    () => filterCakes(CAKES_CATALOG, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.menu-card-item');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 16,
        opacity: 0,
        duration: 0.42,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    }, gridRef);

    return () => ctx.revert();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#FFF8F0]">
      {/* Page Hero */}
      <section className="relative overflow-hidden border-b border-[#35221B]/10 bg-[#F4E9DA]/55 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
                Mr. Cakes Menu
              </p>
              <h1 className="font-display text-4xl font-semibold text-[#35221B] sm:text-5xl text-balance">
                Our Cakes &amp; Patisserie Collection
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[#80695C] sm:text-lg">
                Browse our celebratory cakes and dessert favourites—from velvety Belgian chocolate
                and butterscotch crunch to custom tiered creations crafted upon enquiry.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-[#35221B]/10 shadow-md">
                <SafeImage
                  src={IMAGES.belgianChocolate}
                  alt="Belgian chocolate truffle cake with glossy glaze at Mr. Cakes Vadodara"
                  loading="eager"
                  fallbackTitle="Mr. Cakes Menu"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Toolbar + Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter cakes by category"
              className="flex flex-wrap items-center gap-1 rounded-xl border border-[#35221B]/10 bg-[#F4E9DA]/60 p-1.5"
            >
              {MENU_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${
                      active
                        ? 'bg-[#603B2B] text-[#FFF8F0] shadow-xs'
                        : 'text-[#603B2B] hover:bg-[#FFF8F0]/80 hover:text-[#35221B]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full xl:w-64 shrink-0">
              <label htmlFor="cake-menu-search" className="sr-only">
                Search cakes by flavour or name
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#80695C]"
                aria-hidden="true"
              />
              <input
                id="cake-menu-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavours or cakes..."
                className="h-11 w-full rounded-xl border border-[#35221B]/15 bg-[#FFFDF9] pl-10 pr-9 text-sm text-[#35221B] placeholder:text-[#80695C]/70 focus:border-[#C58A4A] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#80695C] hover:text-[#35221B]"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between text-xs text-[#80695C]">
            <span className="tabular-nums">
              Showing {filteredCakes.length} {filteredCakes.length === 1 ? 'creation' : 'creations'}
              {selectedCategory !== 'All Cakes' ? ` in ${selectedCategory}` : ''}
            </span>
            <span>Enquire for custom sizing &amp; scheduling</span>
          </div>

          {filteredCakes.length === 0 ? (
            <div className="rounded-2xl border border-[#35221B]/10 bg-[#FFFDF9] p-12 text-center">
              <h2 className="font-display text-2xl font-semibold text-[#35221B]">
                No matching cakes found
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#80695C]">
                Looking for a custom flavour or themed design? Reset your filters or send us your
                custom cake idea directly.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All Cakes');
                    setSearchQuery('');
                  }}
                  className="btn-outline-espresso min-h-[42px] rounded-lg px-5 py-2 text-sm font-medium"
                >
                  Reset Filters
                </button>
                <button
                  type="button"
                  onClick={() => onEnquireCake(searchQuery || 'Custom Cake')}
                  className="btn-chocolate min-h-[42px] rounded-lg px-5 py-2 text-sm font-medium"
                >
                  Request Custom Cake
                </button>
              </div>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCakes.map((cake) => (
                <article
                  key={cake.id}
                  className="menu-card-item bakery-card group flex flex-col overflow-hidden rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => onSelectCake(cake)}
                    aria-label={`View details for ${cake.name}`}
                    className="aspect-[4/3] w-full overflow-hidden bg-[#F4E9DA] block"
                  >
                    <SafeImage
                      src={cake.image}
                      alt={cake.alt}
                      fallbackTitle={cake.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </button>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#80695C]">
                        <span>{cake.displayCategory}</span>
                        <span aria-hidden="true">·</span>
                        <span>{cake.menuCategories[0]}</span>
                      </div>
                      <h2 className="mt-1.5 font-display text-xl font-semibold text-[#35221B]">
                        {cake.name}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#80695C]">
                        {cake.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-3 border-t border-[#35221B]/10 pt-4">
                      <button
                        type="button"
                        onClick={() => onSelectCake(cake)}
                        className="btn-outline-espresso inline-flex min-h-[42px] flex-1 items-center justify-center rounded-lg px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap"
                      >
                        View Details
                      </button>
                      <a
                        href={buildWhatsAppProductUrl(cake.name, cake.displayCategory)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-chocolate inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Order Now</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
