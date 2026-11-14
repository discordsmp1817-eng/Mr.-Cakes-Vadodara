import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react';
import { BUSINESS_INFO, IMAGES } from '../data/bakeryData';
import type { AppRoute } from '../components/Navbar';
import { SafeImage } from '../components/SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  onNavigate: (route: AppRoute) => void;
}

const CELEBRATION_PILLARS = [
  {
    number: '01',
    title: 'The Heart of Every Gathering',
    text: 'A celebration truly begins the moment loved ones gather around the cake table. Whether it is an intimate birthday or an anniversary toast, we treat that centrepiece with deep care.',
  },
  {
    number: '02',
    title: 'Thoughtful Presentation & Flavour',
    text: 'Every design balances warm visual elegance with memorable flavours—from deep Belgian chocolate ganache to delicate caramel crunch and fresh fruit cream layers.',
  },
  {
    number: '03',
    title: 'Personal Service in Vadodara',
    text: 'We listen closely to your occasion, preferred theme, and celebration details so the finished cake feels unmistakably yours.',
  },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-[#FFF8F0]">
      {/* Storytelling Hero */}
      <section className="border-b border-[#35221B]/10 bg-[#F4E9DA]/55 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="about-reveal lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
                About Mr. Cakes Vadodara
              </p>
              <h1 className="font-display text-4xl font-semibold text-[#35221B] sm:text-5xl text-balance">
                Crafted for Moments Worth Remembering
              </h1>
              <p className="text-base leading-relaxed text-[#603B2B] sm:text-lg">
                At Mr. Cakes, we believe a cake is never just dessert. It is the shared pause before
                a wish is made, the smile across a family dinner, and the sweet signature of life’s
                happiest milestones.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#80695C]">
                Located at Siddheshwar Plaza on New VIP Road in Vadodara, our patisserie brings
                together rich flavours, refined finishes, and warm customer hospitality—trusted by
                our community with a {BUSINESS_INFO.rating}/5 rating across{' '}
                {BUSINESS_INFO.reviewCount} Google reviews.
              </p>
            </div>

            <div className="about-reveal lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-[#35221B]/10 bg-[#F4E9DA] shadow-lg">
                <div className="aspect-[16/10] w-full">
                  <SafeImage
                    src={IMAGES.craftStory}
                    alt="Hand-piping rich chocolate ganache onto a celebration cake at Mr. Cakes"
                    loading="eager"
                    fallbackTitle="Patisserie Craftsmanship"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cakes Matter in Celebrations */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="about-reveal mb-12 max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
              Our Philosophy
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#35221B] sm:text-4xl text-balance">
              Why Every Celebration Centres Around a Cake
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CELEBRATION_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="about-reveal rounded-2xl border border-[#35221B]/10 bg-[#FFFDF9] p-7 shadow-xs"
              >
                <span className="font-display text-sm font-semibold text-[#C58A4A] tabular-nums">
                  {pillar.number}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[#35221B]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#80695C]">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Showcase Split */}
      <section className="bg-[#F4E9DA]/60 py-16 sm:py-20 border-t border-[#35221B]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="about-reveal lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-[#35221B]/10">
                <SafeImage
                  src={IMAGES.designerTiered}
                  alt="Elegant ivory and caramel designer tiered cake"
                  fallbackTitle="Designer Tiers"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-8 aspect-[4/5] overflow-hidden rounded-2xl border border-[#35221B]/10">
                <SafeImage
                  src={IMAGES.anniversaryFloral}
                  alt="Romantic anniversary cake with floral accents"
                  fallbackTitle="Anniversary Creations"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="about-reveal lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
                <Heart className="h-4 w-4" aria-hidden="true" />
                <span>Made With Care</span>
              </div>

              <h2 className="font-display text-3xl font-semibold text-[#35221B] sm:text-4xl text-balance">
                Thoughtful Details From Enquiry to Celebration
              </h2>

              <p className="text-base leading-relaxed text-[#603B2B]">
                Whether you are planning a surprise midnight birthday cake, an anniversary dinner,
                or a custom tiered centrepiece, our team makes ordering personal and effortless.
                Reach out by phone, WhatsApp, or our enquiry form to discuss flavours and designs.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                <div className="rounded-xl border border-[#35221B]/10 bg-[#FFFDF9] p-4">
                  <div className="flex items-center gap-2 text-[#35221B] font-semibold text-sm">
                    <Star className="h-4 w-4 fill-[#C58A4A] text-[#C58A4A]" aria-hidden="true" />
                    <span className="tabular-nums">
                      {BUSINESS_INFO.rating}/5 Rated on Google
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#80695C] tabular-nums">
                    Across {BUSINESS_INFO.reviewCount} verified customer reviews
                  </p>
                </div>

                <div className="rounded-xl border border-[#35221B]/10 bg-[#FFFDF9] p-4">
                  <div className="flex items-center gap-2 text-[#35221B] font-semibold text-sm">
                    <Sparkles className="h-4 w-4 text-[#C58A4A]" aria-hidden="true" />
                    <span>Bespoke Celebrations</span>
                  </div>
                  <p className="mt-1 text-xs text-[#80695C]">
                    Birthdays, anniversaries, photo &amp; designer cakes
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/cakes')}
                  className="btn-chocolate inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium whitespace-nowrap"
                >
                  <span>Explore Our Cakes</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="btn-outline-espresso inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium whitespace-nowrap"
                >
                  Send an Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
