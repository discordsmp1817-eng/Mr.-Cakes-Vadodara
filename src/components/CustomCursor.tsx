import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !ringRef.current) return;
    const ring = ringRef.current;

    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3.out' });
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      gsap.to(ring, { opacity: 1, duration: 0.2, overwrite: 'auto' });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, input, select, textarea, [data-cursor="zoom"]');
      if (interactive) {
        gsap.to(ring, {
          scale: 1.55,
          borderColor: 'rgba(197, 138, 74, 0.85)',
          backgroundColor: 'rgba(197, 138, 74, 0.08)',
          duration: 0.2,
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(96, 59, 43, 0.45)',
          backgroundColor: 'transparent',
          duration: 0.2,
        });
      }
    };

    const onLeave = () => {
      gsap.to(ring, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 h-7 w-7 rounded-full border border-[#603B2B]/45 transition-opacity"
    />
  );
}
