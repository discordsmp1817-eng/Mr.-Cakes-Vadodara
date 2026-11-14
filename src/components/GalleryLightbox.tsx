import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '../data/bakeryData';
import { SafeImage } from './SafeImage';

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigateIndex: (nextIndex: number) => void;
}

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigateIndex,
}: GalleryLightboxProps) {
  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigateIndex((activeIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onNavigateIndex((activeIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, activeIndex, items.length, onClose, onNavigateIndex]);

  if (!isOpen || activeIndex === null) return null;

  const currentItem = items[activeIndex];
  const prevIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery preview: ${currentItem.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1410]/90 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl">
        <div className="mb-3 flex items-center justify-between text-[#FFF8F0]">
          <div className="flex items-center gap-3 text-sm">
            <span className="tabular-nums text-[#C58A4A] font-medium">
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <span aria-hidden="true" className="text-[#F4E9DA]/40">·</span>
            <span className="text-[#F4E9DA]/85">{currentItem.category}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery lightbox"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FFF8F0]/20 bg-[#35221B]/80 text-[#FFF8F0] transition-colors hover:bg-[#603B2B]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-2xl border border-[#FFF8F0]/15 bg-[#2A1B16] shadow-2xl">
          <div className="flex items-center justify-center bg-[#211511]">
            <SafeImage
              src={currentItem.image}
              alt={currentItem.alt}
              loading="eager"
              fallbackTitle={currentItem.title}
              className="block max-h-[72vh] w-auto max-w-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => onNavigateIndex(prevIndex)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#35221B]/80 text-[#FFF8F0] backdrop-blur-xs transition-colors hover:bg-[#603B2B]"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onNavigateIndex(nextIndex)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#35221B]/80 text-[#FFF8F0] backdrop-blur-xs transition-colors hover:bg-[#603B2B]"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between text-[#FFF8F0]">
          <h3 className="font-display text-xl font-medium">{currentItem.title}</h3>
          <p className="text-sm text-[#F4E9DA]/80">{currentItem.caption}</p>
        </div>
      </div>
    </div>
  );
}
