import { useEffect, useState } from 'react';
import { CakeSlice } from 'lucide-react';
import { CAKE_IMAGES, type CakeImageKey } from '../data/cakeImages';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackTitle,
}: SafeImageProps) {
  const resolvedSrc = src in CAKE_IMAGES ? CAKE_IMAGES[src as CakeImageKey] : src;
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [resolvedSrc]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F4E9DA] via-[#FFF8F0] to-[#EAD7C0] p-6 text-center text-[#603B2B] ${className}`}
      >
        <CakeSlice className="mb-2 h-8 w-8 text-[#C58A4A]" strokeWidth={1.5} />
        <span className="font-display text-sm font-medium text-[#35221B]">
          {fallbackTitle ?? alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
