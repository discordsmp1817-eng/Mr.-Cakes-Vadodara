import { useState } from 'react';
import { CakeSlice } from 'lucide-react';

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
  const [hasError, setHasError] = useState(false);

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
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
