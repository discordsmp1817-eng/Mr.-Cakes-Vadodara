import { MapPin, Phone, Star } from 'lucide-react';
import { BUSINESS_INFO, type CakeMenuCategory } from '../data/bakeryData';
import type { AppRoute } from './Navbar';

interface FooterProps {
  onNavigate: (route: AppRoute, category?: CakeMenuCategory) => void;
}

const QUICK_LINKS: { label: string; route: AppRoute }[] = [
  { label: 'Home', route: '/' },
  { label: 'Our Cakes', route: '/cakes' },
  { label: 'About Us', route: '/about' },
  { label: 'Gallery', route: '/gallery' },
  { label: 'Contact & Order', route: '/contact' },
];

const FOOTER_CATEGORIES: CakeMenuCategory[] = [
  'Birthday Cakes',
  'Chocolate Cakes',
  'Designer Cakes',
  'Anniversary Cakes',
  'Pastries',
  'Special Occasion Cakes',
];

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#35221B]/10 bg-[#35221B] text-[#F4E9DA]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Rating */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-block font-display text-3xl font-semibold tracking-tight text-[#FFF8F0]"
            >
              {BUSINESS_INFO.shortBrand}
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-[#F4E9DA]/80">
              Handcrafted celebration cakes, rich chocolate creations, and boutique patisserie
              treats in Vadodara—made to turn every milestone into a cherished memory.
            </p>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#FFF8F0] hover:text-[#C58A4A] transition-colors"
              >
                <Star className="h-4 w-4 fill-[#C58A4A] text-[#C58A4A]" aria-hidden="true" />
                <span className="font-semibold tabular-nums">{BUSINESS_INFO.rating}/5</span>
                <span className="text-[#F4E9DA]/70" aria-hidden="true">·</span>
                <span className="text-[#F4E9DA]/85 tabular-nums">
                  {BUSINESS_INFO.reviewCount} Google Reviews
                </span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
              Explore
            </h2>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.route}>
                  <a
                    href={link.route}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.route);
                    }}
                    className="text-[#F4E9DA]/80 transition-colors hover:text-[#FFF8F0]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cake Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
              Cake Categories
            </h2>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => onNavigate('/cakes', category)}
                    className="text-left text-[#F4E9DA]/80 transition-colors hover:text-[#FFF8F0]"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Verified Address */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
              Visit &amp; Contact
            </h2>
            <div className="space-y-3 text-sm text-[#F4E9DA]/85">
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#C58A4A]" aria-hidden="true" />
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="tabular-nums font-medium text-[#FFF8F0] hover:text-[#C58A4A] transition-colors"
                >
                  {BUSINESS_INFO.phoneRaw}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C58A4A]" aria-hidden="true" />
                <address className="not-italic leading-relaxed text-[#F4E9DA]/80">
                  {BUSINESS_INFO.fullAddress}
                </address>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#F4E9DA]/12 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-[#F4E9DA]/65">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p>New VIP Road, Vadodara · Gujarat 390019</p>
        </div>
      </div>
    </footer>
  );
}
