// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const banners = [
//   { id: 1, img: '/banner1.jpg' },
//   { id: 2, img: '/banner2.jpg' },
//   { id: 3, img: '/banner3.jpg' },
//   { id: 4, img: '/banner4.jpg' },
//   { id: 5, img: '/banner5.jpg' },
// ];

// const Banner = () => {
//   return (
//     <div className="w-full py-4 relative">
//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         loop
//         centeredSlides
//         spaceBetween={20}
//         breakpoints={{
//           0: { slidesPerView: 1, spaceBetween: 10 }, // Mobile: 1 slide
//           640: { slidesPerView: 1.2, spaceBetween: 15 }, // Small tablet
//           768: { slidesPerView: 1.5, spaceBetween: 20 }, // Tablet
//           1024: { slidesPerView: 2, spaceBetween: 30 }, // Desktop
//         }}
//       >
//         {banners.map(banner => (
//           <SwiperSlide key={banner.id} className="swiper-slide-custom">
//             <div className="relative overflow-hidden rounded-xl shadow-md">
//               <img
//                 src={banner.img}
//                 alt="banner"
//                 className="w-full h-fit sm:h-[250px] md:h-fit  rounded-xl object-contain"
//               />
//             </div>
//           </SwiperSlide>
//         ))}

//         {/* Left Arrow */}
//         <div className="custom-prev absolute top-1/2 -translate-y-1/2 left-4 md:left-[27%] z-20 bg-white shadow-md rounded-full p-2 sm:p-3 cursor-pointer hover:bg-gray-200 transition">
//           <ChevronLeft size={20} />
//         </div>

//         {/* Right Arrow */}
//         <div className="custom-next absolute top-1/2 -translate-y-1/2 right-4 md:right-[27%] z-20 bg-white shadow-md rounded-full p-2 sm:p-3 cursor-pointer hover:bg-gray-200 transition">
//           <ChevronRight size={20} />
//         </div>
//       </Swiper>

//       {/* Custom scaling */}
//       <style>{`
//         .swiper-slide { transform: scale(0.85); transition: transform 0.4s ease; }
//         .swiper-slide-active { transform: scale(1); }
//       `}</style>
//     </div>
//   );
// };

// export default Banner;
// ----------------------------
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const banners = [
//   { id: 1, img: '/banner1.jpg' },
//   { id: 2, img: '/banner2.jpg' },
//   { id: 3, img: '/banner3.jpg' },
//   { id: 4, img: '/banner4.jpg' },
//   { id: 5, img: '/banner5.jpg' },
// ];

// const Banner = () => {
//   return (
//     <div className="w-full py-4 relative">
//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         loop
//         centeredSlides
//         spaceBetween={20}
//         breakpoints={{
//           0: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
//           480: { slidesPerView: 1, spaceBetween: 12 }, // Small Mobile
//           640: { slidesPerView: 1, spaceBetween: 15 }, // Tablet small
//           768: { slidesPerView: 1, spaceBetween: 20 }, // Tablet
//           1024: { slidesPerView: 1.3, spaceBetween: 30 }, // Desktop
//           1280: { slidesPerView: 2, spaceBetween: 30 }, // Large Desktop
//         }}
//       >
//         {banners.map(banner => (
//           <SwiperSlide key={banner.id}>
//             <div className="relative overflow-hidden rounded-2xl shadow-lg">
//               <img
//                 src={banner.img}
//                 alt="banner"
//                 className="w-fit h-fit px-3 md:px-0 sm:h-fit md:h-fit lg:h-fit xl:h-fit object-cover rounded-2xl"
//               />
//             </div>
//           </SwiperSlide>
//         ))}

//         {/* Left Arrow */}
//         <div className="custom-prev absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-20 bg-white shadow-md rounded-full p-2 sm:p-3 cursor-pointer hover:bg-gray-200 transition hidden sm:flex lg:left-[15%] xl:left-[27%]">
//           <ChevronLeft size={22} />
//         </div>

//         {/* Right Arrow */}
//         <div className="custom-next absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-20 bg-white shadow-md rounded-full p-2 sm:p-3 cursor-pointer hover:bg-gray-200 transition hidden sm:flex lg:right-[15%] xl:right-[27%]">
//           <ChevronRight size={22} />
//         </div>
//       </Swiper>

//       {/* Custom scaling effect */}
//       <style>{`
//         .swiper-slide {
//           transform: scale(0.85);
//           transition: transform 0.4s ease;
//         }
//         .swiper-slide-active {
//           transform: scale(1);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Banner;
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
          0: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
          640: { slidesPerView: 1, spaceBetween: 15 }, // Tablet small
          768: { slidesPerView: 1, spaceBetween: 20 }, // Tablet
          1024: { slidesPerView: 1.3, spaceBetween: 30 }, // Desktop
          1280: { slidesPerView: 2, spaceBetween: 30 }, // Large Desktop
        }}
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id}>
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={banner.img}
                alt={`Banner ${banner.id}`}
                className="w-full h-full sm:h-full md:h-full lg:h-full xl:h-full object-cover px-2 md:px-0"
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

      {/* Custom scaling effect */}
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

// ------------------------------

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const banners = [
//   { id: 1, img: '/banner1.jpg' },
//   { id: 2, img: '/banner2.jpg' },
//   { id: 3, img: '/banner3.jpg' },
//   { id: 4, img: '/banner4.jpg' },
//   { id: 5, img: '/banner5.jpg' },
// ];

// const Banner = () => {
//   return (
//     <div className="w-full relative">
//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         loop
//         centeredSlides
//         spaceBetween={15}
//         breakpoints={{
//           0: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
//           480: { slidesPerView: 1.2, spaceBetween: 12 }, // Small phones landscape
//           640: { slidesPerView: 1.5, spaceBetween: 15 }, // Tablet portrait
//           768: { slidesPerView: 2, spaceBetween: 20 }, // Tablet landscape
//           1024: { slidesPerView: 2.5, spaceBetween: 25 }, // Small laptop
//           1280: { slidesPerView: 3, spaceBetween: 30 }, // Desktop
//         }}
//       >
//         {banners.map(banner => (
//           <SwiperSlide key={banner.id} className="swiper-slide-custom">
//             <div className="relative overflow-hidden rounded-xl shadow-md py-3">
//               <img
//                 src={banner.img}
//                 alt="banner"
//                 className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[320px] xl:h-[380px] object-cover rounded-xl"
//               />
//             </div>
//           </SwiperSlide>
//         ))}

//         {/* Left Arrow */}
//         <div className="custom-prev absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-20 bg-white shadow-md rounded-full p-2 sm:p-3 cursor-pointer hover:bg-gray-200 transition">
//           <ChevronLeft size={20} />
//         </div>

//         {/* Right Arrow */}
//         <div className="custom-next absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-20 bg-white shadow-md rounded-full p-2 sm:p-3 cursor-pointer hover:bg-gray-200 transition">
//           <ChevronRight size={20} />
//         </div>
//       </Swiper>

//       {/* Custom scaling */}
//       <style>{`
//         .swiper-slide {
//           transform: scale(0.85);
//           transition: transform 0.4s ease;
//         }
//         .swiper-slide-active {
//           transform: scale(1);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Banner;
