import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  { id: 1, img: '/banner1.jpg' },
  { id: 2, img: '/banner2.jpg' },
  { id: 3, img: '/banner3.jpg' },
  { id: 4, img: '/banner4.jpg' },
  { id: 5, img: '/banner5.jpg' },
];

const Banner = () => {
  return (
    <div className="w-full py-4 relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        centeredSlides
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 }, // Mobile: 1 slide
          640: { slidesPerView: 1.2, spaceBetween: 15 }, // Small tablet
          768: { slidesPerView: 1.5, spaceBetween: 20 }, // Tablet
          1024: { slidesPerView: 2, spaceBetween: 30 }, // Desktop
        }}
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id} className="swiper-slide-custom">
            <div className="relative overflow-hidden rounded-xl shadow-md">
              <img
                src={banner.img}
                alt="banner"
                className="w-full h-fit sm:h-[250px] md:h-fit  rounded-xl object-contain"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Left Arrow */}
        <div className="custom-prev absolute top-1/2 -translate-y-1/2 left-4 md:left-[27%] z-20 bg-white shadow-md rounded-full p-2 sm:p-3 cursor-pointer hover:bg-gray-200 transition">
          <ChevronLeft size={20} />
        </div>

        {/* Right Arrow */}
        <div className="custom-next absolute top-1/2 -translate-y-1/2 right-4 md:right-[27%] z-20 bg-white shadow-md rounded-full p-2 sm:p-3 cursor-pointer hover:bg-gray-200 transition">
          <ChevronRight size={20} />
        </div>
      </Swiper>

      {/* Custom scaling */}
      <style>{`
        .swiper-slide { transform: scale(0.85); transition: transform 0.4s ease; }
        .swiper-slide-active { transform: scale(1); }
      `}</style>
    </div>
  );
};

export default Banner;
