// components/CategoryBanner.jsx
import React from 'react';

export default function CategoryBanner() {
  const banners = [
    { id: 1, img: '/banner-7.jpg' },
    { id: 2, img: '/banner-8.jpg' },
    { id: 3, img: '/banner-9.jpg' },
  ];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 my-6 ">
      {banners.map(banner => (
        <div
          key={banner.id}
          className="rounded-xl overflow-hidden bg-gray-200 "
        >
          <img
            src={banner.img}
            alt={`Banner ${banner.id}`}
            className="w-f h-fit object-contain transition-transform duration-500 ease-in-out hover:scale-113"
          />
        </div>
      ))}
    </div>
  );
}
