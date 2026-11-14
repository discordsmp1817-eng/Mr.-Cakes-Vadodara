import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Award,
  Cake,
  ChevronDown,
  ExternalLink,
  Heart,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
  Star,
  Utensils,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  CAKES_CATALOG,
  FEATURED_CATEGORIES,
  GALLERY_ITEMS,
  IMAGES,
  WHY_CHOOSE_ITEMS,
  type CakeItem,
  type CakeMenuCategory,
} from '../data/bakeryData';
import type { AppRoute } from '../components/Navbar';
import { SafeImage } from '../components/SafeImage';
import { buildWhatsAppProductUrl } from '../utils/whatsapp';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onNavigate: (route: AppRoute, category?: CakeMenuCategory) => void;
  onSelectCake: (cake: CakeItem) => void;
}

const WHY_ICONS = [Sparkles, Cake, Utensils, Award, Heart];

export function HomePage({ onNavigate, onSelectCake }: HomePageProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.from('.hero-visual', {
        scale: 0.96,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.to('.hero-parallax-img', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        const children = section.querySelectorAll('.reveal-item');
        if (!children.length) return;
        gsap.from(children, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const featuredCakes = CAKES_CATALOG.filter((cake) => cake.featured);
  const previewGallery = GALLERY_ITEMS.slice(0, 5);

  return (
    <div ref={rootRef} className="overflow-x-clip">
      {/* 1. HERO SECTION */}
      <section className="hero-section relative overflow-hidden bg-gradient-to-b from-[#FFF8F0] via-[#FFF8F0] to-[#F4E9DA]/55 pt-5 pb-14 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
        {/* Subtle decorative caramel circles behind content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[8%] z-0 h-72 w-72 rounded-full bg-[#C58A4A]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-12 left-[-6%] z-0 h-64 w-64 rounded-full bg-[#F4E9DA]/60 blur-2xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Editorial Copy Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="hero-reveal flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-[#603B2B]">
                <span className="inline-flex items-center gap-1 text-[#C58A4A]" aria-hidden="true">
                  <Star className="h-4 w-4 fill-[#C58A4A] text-[#C58A4A]" />
                  <Star className="h-4 w-4 fill-[#C58A4A] text-[#C58A4A]" />
                  <Star className="h-4 w-4 fill-[#C58A4A] text-[#C58A4A]" />
                  <Star className="h-4 w-4 fill-[#C58A4A] text-[#C58A4A]" />
                  <Star className="h-4 w-4 fill-[#C58A4A] text-[#C58A4A]" />
                </span>
                <span className="tabular-nums whitespace-nowrap">
                  Rated {BUSINESS_INFO.rating}/5 by {BUSINESS_INFO.reviewCount} customers
                </span>
                <span aria-hidden="true" className="hidden sm:inline text-[#80695C]/50">·</span>
                <span className="text-[#80695C] whitespace-nowrap">New VIP Road, Vadodara</span>
              </div>

              <h1 className="hero-reveal font-display text-4xl font-semibold tracking-tight text-[#35221B] sm:text-5xl lg:text-[3.65rem] lg:leading-[1.08] text-balance">
                Every Celebration Deserves Something Sweet.
              </h1>

              <p className="hero-reveal max-w-xl text-base leading-relaxed text-[#80695C] sm:text-lg">
                Discover beautifully crafted cakes and irresistible treats, made to turn your
                special moments into unforgettable memories.
              </p>

              <div className="hero-reveal flex flex-wrap items-center gap-3 pt-1 sm:gap-4 sm:pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/cakes')}
                  className="btn-chocolate inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg px-5 py-2.5 sm:px-7 sm:py-3 text-sm font-medium whitespace-nowrap"
                >
                  <span>Explore Our Cakes</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="btn-outline-espresso inline-flex min-h-[46px] items-center justify-center rounded-lg px-5 py-2.5 sm:px-7 sm:py-3 text-sm font-medium whitespace-nowrap"
                >
                  Order Your Cake
                </button>
              </div>

              <div className="hero-reveal pt-3 sm:pt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#35221B]/10 text-xs sm:text-sm text-[#80695C]">
                <span className="whitespace-nowrap">Customised on Enquiry</span>
                <span aria-hidden="true" className="hidden xl:inline text-[#80695C]/50">·</span>
                <span className="whitespace-nowrap">Siddheshwar Plaza, New VIP Road</span>
                <span aria-hidden="true" className="hidden xl:inline text-[#80695C]/50">·</span>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="font-medium text-[#603B2B] hover:text-[#C58A4A] transition-colors tabular-nums whitespace-nowrap"
                >
                  Call {BUSINESS_INFO.phoneRaw}
                </a>
              </div>
            </div>

            {/* Art-Directed Cake Showcase Column */}
            <div className="hero-visual relative lg:col-span-6">
              <div className="relative mx-auto max-w-xl">
                {/* Floating warm border ornament */}
                <div
                  aria-hidden="true"
                  className="animate-gentle-float absolute -inset-3 -z-10 arch-frame border border-[#C58A4A]/35 bg-[#F4E9DA]/50"
                />

                <div className="arch-frame overflow-hidden border border-[#35221B]/10 bg-[#F4E9DA] shadow-[0_28px_60px_-20px_rgba(53,34,27,0.22)]">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <SafeImage
                      src={IMAGES.heroSignature}
                      alt="Artisanal Belgian dark chocolate ganache cake garnished with gold leaf and hazelnuts at Mr. Cakes Vadodara"
                      loading="eager"
                      fallbackTitle="Mr. Cakes Vadodara Signature Ganache"
                      className="hero-parallax-img h-[108%] w-full object-cover"
                    />
                  </div>
                </div>

                {/* Overlapping Editorial Craft Accent */}
                <div className="animate-gentle-float mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-6 rounded-xl border border-[#35221B]/10 bg-[#FFFDF9]/95 px-5 py-3.5 shadow-lg backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C58A4A]">
                    Signature Collection
                  </p>
                  <p className="font-display text-base font-semibold text-[#35221B]">
                    Belgian Chocolate &amp; Designer Tiers
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Scroll Indicator */}
          <div className="mt-12 flex justify-center lg:mt-14">
            <a
              href="#featured-categories"
              className="group inline-flex flex-col items-center gap-1.5 text-xs font-medium tracking-[0.14em] uppercase text-[#80695C] hover:text-[#35221B] transition-colors"
            >
              <span>Explore Creations</span>
              <ChevronDown
                className="h-4 w-4 text-[#C58A4A] transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section
        id="featured-categories"
        className="reveal-section py-16 sm:py-20 lg:py-24 bg-[#FFF8F0]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-item mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
                Curated Collections
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#35221B] sm:text-4xl text-balance">
                Cakes for Every Kind of Moment
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/cakes')}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#603B2B] hover:text-[#C58A4A] transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>Browse Full Menu</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onNavigate('/cakes', cat.targetMenuCategory)}
                className="reveal-item bakery-card group flex flex-col overflow-hidden rounded-2xl text-left"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#F4E9DA]">
                  <SafeImage
                    src={cat.image}
                    alt={cat.alt}
                    fallbackTitle={cat.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#35221B] group-hover:text-[#603B2B] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#80695C]">
                      {cat.subtitle}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#C58A4A]">
                    <span>Explore Category</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="editorial-divider mx-auto max-w-7xl" />

      {/* 3. BEST SELLERS / FEATURED CAKES */}
      <section className="reveal-section py-16 sm:py-20 lg:py-24 bg-[#FFF8F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-item mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
                Customer Favourites
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#35221B] sm:text-4xl text-balance">
                Signature Creations &amp; Classics
              </h2>
              <p className="text-sm sm:text-base text-[#80695C]">
                Select any cake below to view presentation details or place an enquiry directly on WhatsApp.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/cakes')}
              className="btn-outline-espresso inline-flex min-h-[42px] items-center justify-center rounded-lg px-5 py-2 text-sm font-medium whitespace-nowrap self-start sm:self-auto"
            >
              View All Cakes
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCakes.map((cake) => (
              <article
                key={cake.id}
                className="reveal-item bakery-card group flex flex-col overflow-hidden rounded-2xl"
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

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#80695C]">
                      {cake.displayCategory}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-[#35221B] leading-snug">
                      {cake.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#80695C]">
                      {cake.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2.5 pt-3 border-t border-[#35221B]/8">
                    <a
                      href={buildWhatsAppProductUrl(cake.name, cake.displayCategory)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-chocolate inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap"
                    >
                      <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>Order Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onSelectCake(cake)}
                      className="btn-outline-espresso inline-flex min-h-[40px] items-center justify-center rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE MR. CAKES? */}
      <section className="reveal-section bg-[#F4E9DA]/65 py-16 sm:py-20 lg:py-24 border-y border-[#35221B]/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-item mb-12 max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
              Our Promise
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#35221B] sm:text-4xl text-balance">
              Why Celebrations Trust Mr. Cakes
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {WHY_CHOOSE_ITEMS.map((item, idx) => {
              const Icon = WHY_ICONS[idx % WHY_ICONS.length];
              return (
                <div
                  key={item.number}
                  className="reveal-item flex flex-col justify-between rounded-2xl border border-[#35221B]/10 bg-[#FFFDF9] p-6 shadow-xs"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4E9DA] text-[#603B2B]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-sm font-medium text-[#C58A4A] tabular-nums">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[#35221B] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#80695C]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CUSTOMER RATING & REVIEWS */}
      <section className="reveal-section bg-[#FFF8F0] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-item rounded-3xl border border-[#C58A4A]/28 bg-gradient-to-br from-[#FFFDF9] via-[#FFF8F0] to-[#F4E9DA]/80 p-8 sm:p-12 lg:p-14 text-center shadow-[0_24px_54px_-22px_rgba(53,34,27,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C58A4A]">
              Verified Google Rating
            </p>

            <div className="mt-4 flex flex-col items-center justify-center gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl sm:text-6xl font-semibold text-[#35221B] tabular-nums">
                  {BUSINESS_INFO.rating}
                </span>
                <span className="font-display text-2xl text-[#80695C] tabular-nums">/ 5</span>
              </div>

              <div className="flex items-center gap-1.5 py-1" aria-label="4.9 out of 5 stars">
                <Star className="h-5 w-5 fill-[#C58A4A] text-[#C58A4A]" aria-hidden="true" />
                <Star className="h-5 w-5 fill-[#C58A4A] text-[#C58A4A]" aria-hidden="true" />
                <Star className="h-5 w-5 fill-[#C58A4A] text-[#C58A4A]" aria-hidden="true" />
                <Star className="h-5 w-5 fill-[#C58A4A] text-[#C58A4A]" aria-hidden="true" />
                <Star className="h-5 w-5 fill-[#C58A4A] text-[#C58A4A]" aria-hidden="true" />
              </div>

              <p className="text-base sm:text-lg font-medium text-[#603B2B] tabular-nums">
                Based on {BUSINESS_INFO.reviewCount} Customer Reviews on Google
              </p>
            </div>

            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#80695C]">
              Thank you to hundreds of families and celebration hosts across Vadodara who have shared
              their birthdays, anniversaries, and milestones with Mr. Cakes.
            </p>

            <div className="mt-7 flex justify-center">
              <a
                href={BUSINESS_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-chocolate inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium whitespace-nowrap"
              >
                <span>View Google Reviews</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="editorial-divider mx-auto max-w-7xl" />

      {/* 6. GALLERY PREVIEW */}
      <section className="reveal-section bg-[#FFF8F0] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-item mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
                Cake Showcase
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#35221B] sm:text-4xl text-balance">
                Crafted Details From Our Patisserie
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/gallery')}
              className="btn-outline-espresso inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium whitespace-nowrap self-start sm:self-auto"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
            {previewGallery.map((item, idx) => {
              const spanClass =
                idx === 0
                  ? 'md:col-span-6 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-full'
                  : 'md:col-span-3 aspect-[4/3]';
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate('/gallery')}
                  aria-label={`Open gallery to view ${item.title}`}
                  className={`reveal-item group relative overflow-hidden rounded-2xl border border-[#35221B]/10 bg-[#F4E9DA] text-left ${spanClass}`}
                >
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    fallbackTitle={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#35221B]/75 via-[#35221B]/15 to-transparent opacity-85 transition-opacity group-hover:opacity-95" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-[#FFF8F0]">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#F4E9DA]/85">
                      {item.category}
                    </p>
                    <p className="mt-1 font-display text-lg font-medium leading-snug">
                      {item.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. LOCATION SECTION */}
      <section className="reveal-section bg-[#F4E9DA]/55 py-16 sm:py-20 lg:py-24 border-t border-[#35221B]/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="reveal-item lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#35221B]/10 bg-[#FFFDF9] p-7 sm:p-9 shadow-sm">
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
                  Visit Our Vadodara Shop
                </p>
                <h2 className="font-display text-3xl font-semibold text-[#35221B]">
                  {BUSINESS_INFO.name}
                </h2>
                <div className="space-y-4 pt-2 text-sm sm:text-base text-[#603B2B]">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#C58A4A]" aria-hidden="true" />
                    <address className="not-italic leading-relaxed">
                      {BUSINESS_INFO.fullAddress}
                    </address>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-[#C58A4A]" aria-hidden="true" />
                    <a
                      href={BUSINESS_INFO.phoneTel}
                      className="font-semibold text-[#35221B] hover:text-[#C58A4A] transition-colors tabular-nums"
                    >
                      {BUSINESS_INFO.phoneRaw}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={BUSINESS_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-chocolate inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap"
                >
                  <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="btn-outline-espresso inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            <div className="reveal-item lg:col-span-7 overflow-hidden rounded-2xl border border-[#35221B]/10 bg-[#F4E9DA] min-h-[320px] shadow-sm">
              <iframe
                title="Map showing Mr. Cakes Vadodara at Siddheshwar Plaza, New VIP Road"
                src={BUSINESS_INFO.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[340px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="reveal-section bg-gradient-to-br from-[#603B2B] via-[#4D2F22] to-[#35221B] py-16 sm:py-20 text-[#FFF8F0]">
        <div className="reveal-item mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C58A4A]">
            Ready When You Are
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl text-balance">
            Make Your Celebrations Sweeter.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#F4E9DA]/85 sm:text-lg">
            Your special moments deserve a cake made with love.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#FFF8F0] px-7 py-3 text-sm font-semibold text-[#35221B] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F4E9DA] whitespace-nowrap"
            >
              <span>Order Your Cake Today</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
