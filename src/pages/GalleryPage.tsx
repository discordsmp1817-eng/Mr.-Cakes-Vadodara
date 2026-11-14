import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Expand } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS, type GalleryCategory } from '../data/bakeryData';
import { SafeImage } from '../components/SafeImage';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { filterGallery } from '../utils/validation';

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(
    () => filterGallery(GALLERY_ITEMS, activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !galleryRef.current) return;

    const cards = galleryRef.current.querySelectorAll('.gallery-card-item');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        scale: 0.97,
        opacity: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="bg-[#FFF8F0]">
      {/* Page Header */}
      <section className="border-b border-[#35221B]/10 bg-[#F4E9DA]/55 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
            Visual Showcase
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[#35221B] sm:text-5xl text-balance">
            Cake &amp; Patisserie Gallery
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#80695C]">
            Explore birthday centrepieces, glossy chocolate creations, romantic anniversary tiers,
            and delicate patisserie desserts. Click any image to view in full detail.
          </p>
        </div>
      </section>

      {/* Filters + Masonry Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="tablist"
              aria-label="Filter gallery by cake category"
              className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#35221B]/10 bg-[#F4E9DA]/60 p-1.5"
            >
              {GALLERY_CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveCategory(category);
                      setLightboxIndex(null);
                    }}
                    className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#603B2B] text-[#FFF8F0] shadow-xs'
                        : 'text-[#603B2B] hover:bg-[#FFF8F0]/80 hover:text-[#35221B]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-[#80695C] tabular-nums">
              {visibleItems.length} {visibleItems.length === 1 ? 'photo' : 'photos'}
            </p>
          </div>

          <div
            ref={galleryRef}
            className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3"
          >
            {visibleItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                data-cursor="zoom"
                aria-label={`Open full view of ${item.title}`}
                className="gallery-card-item group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-[#35221B]/10 bg-[#FFFDF9] text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`w-full overflow-hidden bg-[#F4E9DA] ${item.aspectClass}`}>
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    fallbackTitle={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#35221B]/70 text-[#FFF8F0] opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100"
                >
                  <Expand className="h-4 w-4" />
                </div>

                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C58A4A]">
                    {item.category}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-semibold text-[#35221B]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#80695C]">{item.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <GalleryLightbox
        items={visibleItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigateIndex={(next) => setLightboxIndex(next)}
      />
    </div>
  );
}
