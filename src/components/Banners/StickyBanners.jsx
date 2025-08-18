import React, { useMemo } from 'react';

const DEFAULT_BANNERS = [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512914890250-393dfbd7f72f?q=80&w=1200&auto=format&fit=crop',
];

export default function StickyBanners({ banners = DEFAULT_BANNERS }) {
  const list = useMemo(() => [...banners, ...banners], [banners]);

  return (
    <div className="sticky top-6 hidden xl:block">
      <div className="relative w-[260px] select-none overflow-hidden rounded-2xl">
        <div className="animate-[scrollUp_12s_linear_infinite]">
          {list.map((src, i) => (
            <img
              key={i}
              src={src}
              className="mb-4 h-[320px] w-full rounded-2xl object-cover"
              alt={`banner-${i}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}
