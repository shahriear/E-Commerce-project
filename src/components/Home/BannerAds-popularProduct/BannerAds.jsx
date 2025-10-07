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
  { id: 5, img: '/BannerAds2.jpg' },
  { id: 6, img: '/BannerAds3.jpg' },
  { id: 7, img: '/BannerAds4.jpg' },
];

const BannerAds = () => {
  return (
    <div className="w-full py- relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1.5 },
          480: { slidesPerView: 1.7 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2.3 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        className="px-4 sm:px-6 md:px-8"
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id}>
            <div className="relative flex items-center justify-center bg-gray-50 rounded-xl shadow-md overflow-hidden h-fit sm:h-full md:h-full lg:h-full xl:h-full transition-transform duration-300">
              <img
                src={banner.img}
                alt={`Banner ${banner.id}`}
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Left Arrow */}
        <div className="custom-prev hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-20 bg-white shadow-md rounded-full p-2 cursor-pointer hover:bg-gray-200 transition">
          <ChevronLeft size={22} />
        </div>

        {/* Right Arrow */}
        <div className="custom-next hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-20 bg-white shadow-md rounded-full p-2 cursor-pointer hover:bg-gray-200 transition">
          <ChevronRight size={22} />
        </div>
      </Swiper>
    </div>
  );
};

export default BannerAds;
