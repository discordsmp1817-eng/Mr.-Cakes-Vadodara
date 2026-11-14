import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { buildWhatsAppGeneralUrl } from '../utils/whatsapp';

interface FloatingActionsProps {
  onScrollToTop: () => void;
}

export function FloatingActions({ onScrollToTop }: FloatingActionsProps) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-25 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      {showTop && (
        <button
          type="button"
          onClick={onScrollToTop}
          aria-label="Back to top"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#35221B]/15 bg-[#FFFDF9]/95 text-[#35221B] shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F4E9DA]"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      <a
        href={buildWhatsAppGeneralUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mr. Cakes Vadodara on WhatsApp"
        className="inline-flex h-12 items-center gap-2 rounded-full bg-[#256D46] px-4 text-sm font-medium text-white shadow-[0_10px_28px_-6px_rgba(37,109,70,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1E5939]"
      >
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap">WhatsApp</span>
      </a>
    </div>
  );
}
