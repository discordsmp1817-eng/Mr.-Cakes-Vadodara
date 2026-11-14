import { useEffect, useState } from 'react';

interface BrandLoaderProps {
  onComplete?: () => void;
}

export function BrandLoader({ onComplete }: BrandLoaderProps) {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>(() => {
    if (typeof window === 'undefined') return 'done';
    const params = new URLSearchParams(window.location.search);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (params.get('autostart') === '1' || reducedMotion) {
      return 'done';
    }
    return 'visible';
  });

  useEffect(() => {
    if (phase === 'done') {
      onComplete?.();
      return;
    }

    const fadeTimer = window.setTimeout(() => {
      setPhase('fading');
    }, 450);

    const doneTimer = window.setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 800);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#35221B] text-[#FFF8F0] transition-opacity duration-350 ease-out pointer-events-none ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="font-display text-3xl sm:text-4xl tracking-tight text-[#FFF8F0]">
          Mr. Cakes
        </span>
        <span className="h-[1px] w-16 bg-[#C58A4A]/70" />
        <span className="text-xs tracking-[0.22em] uppercase text-[#F4E9DA]/80">
          Vadodara Patisserie
        </span>
      </div>
    </div>
  );
}
