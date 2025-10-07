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
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 1, spaceBetween: 20 },
          1024: { slidesPerView: 1.3, spaceBetween: 30 },
          1280: { slidesPerView: 2, spaceBetween: 30 },
        }}
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id}>
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={banner.img}
                alt={`Banner ${banner.id}`}
                className="w-full h-full sm:h-full md:h-full lg:h-full xl:h-full object-cover px-2 md:px-0 rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Left Arrow */}
        <div className="custom-prev hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 lg:left-[15%] xl:left-[27%] z-20 bg-white shadow-md rounded-full p-2 lg:p-3 cursor-pointer hover:bg-gray-200 transition">
          <ChevronLeft size={22} />
        </div>

        {/* Right Arrow */}
        <div className="custom-next hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 lg:right-[15%] xl:right-[27%] z-20 bg-white shadow-md rounded-full p-2 lg:p-3 cursor-pointer hover:bg-gray-200 transition">
          <ChevronRight size={22} />
        </div>
      </Swiper>

      <style>{`
        .swiper-slide {
          transform: scale(0.85);
          transition: transform 0.4s ease;
        }
        .swiper-slide-active {
          transform: scale(1);
        }
      `}</style>
    </div>
  );
};

export default Banner;
