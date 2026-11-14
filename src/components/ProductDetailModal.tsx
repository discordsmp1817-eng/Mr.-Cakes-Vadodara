import { useEffect } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import type { CakeItem } from '../data/bakeryData';
import { buildWhatsAppProductUrl } from '../utils/whatsapp';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  cake: CakeItem | null;
  onClose: () => void;
  onEnquireViaForm: (cakeName: string) => void;
}

export function ProductDetailModal({
  cake,
  onClose,
  onEnquireViaForm,
}: ProductDetailModalProps) {
  useEffect(() => {
    if (!cake) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cake, onClose]);

  if (!cake) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cake-modal-title"
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#35221B]/65 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#35221B]/12 bg-[#FFFDF9] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close details for ${cake.name}`}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8F0]/90 text-[#35221B] shadow-sm transition-colors hover:bg-[#F4E9DA]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-[4/3] md:aspect-auto md:h-full bg-[#F4E9DA] overflow-hidden">
            <SafeImage
              src={cake.image}
              alt={cake.alt}
              loading="eager"
              fallbackTitle={cake.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[#80695C]">
                <span>{cake.displayCategory}</span>
                <span aria-hidden="true">·</span>
                <span>{cake.menuCategories[0]}</span>
              </div>

              <h2
                id="cake-modal-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#35221B] leading-tight"
              >
                {cake.name}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-[#603B2B]">
                {cake.detailsDescription}
              </p>

              <div className="rounded-xl bg-[#F4E9DA]/65 p-4 text-xs leading-relaxed text-[#603B2B]">
                <div className="flex items-center gap-2 font-semibold text-[#35221B] mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-[#C58A4A]" aria-hidden="true" />
                  <span>Customised to Your Celebration</span>
                </div>
                <p>
                  Every order is discussed individually so we can tailor sizing, custom inscriptions,
                  and pickup or delivery timing around your celebration in Vadodara.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppProductUrl(cake.name, cake.displayCategory)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-chocolate inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEnquireViaForm(cake.name);
                }}
                className="btn-outline-espresso inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap"
              >
                Enquiry Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
