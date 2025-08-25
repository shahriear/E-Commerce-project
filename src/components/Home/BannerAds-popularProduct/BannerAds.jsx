import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  { id: 1, img: '/BannerAds1.jpg' },
  { id: 2, img: '/BannerAds2.jpg' },
  { id: 3, img: '/BannerAds3.jpg' },
  { id: 4, img: '/BannerAds4.jpg' },
];

const BannerAds = () => {
  return (
    <div className="w-full py-6  relative">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 }, // Mobile
          640: { slidesPerView: 2 }, // Small Tablet
          768: { slidesPerView: 2 }, // Tablet
          1024: { slidesPerView: 3 }, // Desktop
        }}
        className="px-8"
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id}>
            <div className="relative flex items-center justify-center bg-gray-50 rounded-xl shadow-md overflow-hidden h-[200px] sm:h-[260px] md:h-[320px] lg:h-fit">
              <img
                src={banner.img}
                alt={`Banner ${banner.id}`}
                className="w-full h-full object-contain rounded-xl transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Left Arrow */}
        <div className="custom-prev absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-20 bg-white shadow-md rounded-full p-2 cursor-pointer hover:bg-gray-200 transition">
          <ChevronLeft size={22} />
        </div>

        {/* Right Arrow */}
        <div className="custom-next absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-20 bg-white shadow-md rounded-full p-2 cursor-pointer hover:bg-gray-200 transition">
          <ChevronRight size={22} />
        </div>
      </Swiper>
    </div>
  );
};

export default BannerAds;
