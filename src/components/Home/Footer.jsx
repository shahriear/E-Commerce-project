// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Truck, Gift, Tag, DollarSign, Mail } from 'lucide-react';
// import { CiFacebook } from 'react-icons/ci';
// import { FaInstagram, FaTwitter } from 'react-icons/fa';

// const advantages = [
//   { id: 1, icon: <Tag size={20} />, text: 'Everyday fresh products' },
//   {
//     id: 2,
//     icon: <Truck size={20} />,
//     text: 'Free delivery for order over $70',
//   },
//   { id: 3, icon: <Gift size={20} />, text: 'Daily Mega Discounts' },
//   { id: 4, icon: <DollarSign size={20} />, text: 'Best price on the market' },
// ];

// const footerColumns = [
//   {
//     title: 'FRUIT & VEGETABLES',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
//   {
//     title: 'BREAKFAST & DAIRY',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
//   {
//     title: 'MEAT & SEAFOOD',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
//   {
//     title: 'BEVERAGES',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
//   {
//     title: 'BREADS & BAKERY',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
// ];

// const Footer = () => {
//   return (
//     <div>
//       {/* Newsletter Section */}
//       <div className="bg-color text-white py-10 px-4 md:px-20 flex flex-col md:flex-row justify-between items-center gap-6  ">
//         <div className="container ">
//           <p className="text-sm mb-2">$20 discount for your first order</p>
//           <h2 className="text-2xl md:text-3xl font-bold mb-2">
//             Join our newsletter and get...
//           </h2>
//           <p className="text-sm md:text-base mb-4">
//             Join our email subscription now to get updates on promotions and
//             coupons.
//           </p>
//           <div className="flex max-w-md bg-white items-center">
//             <Mail className="text-gray-400 ml-3" size={20} />
//             <input
//               type="email"
//               placeholder="Your Email Address"
//               className="flex-1 p-2 rounded-l border-0 outline-none text-gray-800 bg-white py-4"
//             />
//             <button className="bg-color text-white font-semibold px-4 py-2 border mx-1 cursor-pointer">
//               Subscribe
//             </button>
//           </div>
//         </div>
//         <div className="flex-1">
//           <img
//             src="/image/footer.png"
//             alt="newsletter"
//             className="w-fit max-w-sm"
//           />
//         </div>
//       </div>
//       <div className="bg-white mt-10 container">
//         {/* Advantages / Features Section */}
//         <div className="bg-gray-50 py-4 ">
//           <Swiper
//             modules={[Navigation]}
//             slidesPerView={1.2} // mobile: one full + peek
//             spaceBetween={15}
//             breakpoints={{
//               640: { slidesPerView: 1.5, spaceBetween: 20 },
//               768: { slidesPerView: 2.5, spaceBetween: 30 },
//               1024: { slidesPerView: 4, spaceBetween: 40 },
//             }}
//           >
//             {advantages.map((adv, index) => (
//               <SwiperSlide key={adv.id}>
//                 <div
//                   className={`flex items-center justify-center md:justify-start space-x-2 p-4 bg-white border-b border-gray-200 ${
//                     index !== advantages.length - 1
//                       ? 'border-r border-gray-200'
//                       : ''
//                   }`}
//                 >
//                   {adv.icon}
//                   <span className="text-sm md:text-base font-medium">
//                     {adv.text}
//                   </span>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//         {/* Footer Links Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 py-10">
//           {footerColumns.map((col, idx) => (
//             <div key={idx}>
//               <h3 className="text-indigo-700 font-semibold mb-3">
//                 {col.title}
//               </h3>
//               <ul className="space-y-1 text-sm text-gray-600">
//                 {col.items.map((item, i) => (
//                   <li key={i}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-between items-center  pb-3 ">
//           <div className="text-center text-sm text-gray-500 pb-6">
//             Copyright 2024. All rights reserved
//           </div>
//           <div className="flex gap-3 text-4xl">
//             <CiFacebook className="text p-1 text-purple-800" />
//             <FaTwitter className=" p-1 text-purple-800" />
//             <FaInstagram className=" p-1 text-purple-800" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Truck, Gift, Tag, DollarSign, Mail } from 'lucide-react';
// import { CiFacebook } from 'react-icons/ci';
// import { FaInstagram, FaTwitter } from 'react-icons/fa';

// const advantages = [
//   { id: 1, icon: <Tag size={20} />, text: 'Everyday fresh products' },
//   {
//     id: 2,
//     icon: <Truck size={20} />,
//     text: 'Free delivery for order over $70',
//   },
//   { id: 3, icon: <Gift size={20} />, text: 'Daily Mega Discounts' },
//   { id: 4, icon: <DollarSign size={20} />, text: 'Best price on the market' },
// ];

// const footerColumns = [
//   {
//     title: 'FRUIT & VEGETABLES',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
//   {
//     title: 'BREAKFAST & DAIRY',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
//   {
//     title: 'MEAT & SEAFOOD',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
//   {
//     title: 'BEVERAGES',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
//   {
//     title: 'BREADS & BAKERY',
//     items: [
//       'Fresh Vegetables',
//       'Herbs & Seasonings',
//       'Fresh Fruits',
//       'Cuts & Sprouts',
//       'Exotic Fruits & Veggies',
//       'Packaged Produce',
//       'Party Trays',
//     ],
//   },
// ];

// const Footer = () => {
//   return (
//     <div>
//       {/* Newsletter Section */}
//       <div className="bg-color text-white py-10 px-4 md:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
//         <div className="flex-1">
//           <p className="text-sm mb-2">$20 discount for your first order</p>
//           <h2 className="text-2xl md:text-3xl font-bold mb-2">
//             Join our newsletter and get...
//           </h2>
//           <p className="text-sm md:text-base mb-4">
//             Join our email subscription now to get updates on promotions and
//             coupons.
//           </p>
//           <div className="flex max-w-md bg-white items-center rounded">
//             <Mail className="text-gray-400 ml-3" size={20} />
//             <input
//               type="email"
//               placeholder="Your Email Address"
//               className="flex-1 p-2 border-0 outline-none text-gray-800 bg-white py-4"
//             />
//             <button className="bg-color text-white font-semibold px-4 py-2 border mx-1 cursor-pointer">
//               Subscribe
//             </button>
//           </div>
//         </div>

//         {/* Hide on mobile, show on md+ */}
//         <div className="hidden md:block flex-1">
//           <img
//             src="/image/footer.png"
//             alt="newsletter"
//             className="w-fit max-w-sm"
//           />
//         </div>
//       </div>

//       <div className="bg-white mt-10 container">
//         {/* Advantages / Features Section */}
//         <div className="bg-gray-50 py-4">
//           <Swiper
//             modules={[Navigation]}
//             slidesPerView={1.2}
//             spaceBetween={15}
//             breakpoints={{
//               640: { slidesPerView: 1.5, spaceBetween: 20 },
//               768: { slidesPerView: 2.5, spaceBetween: 30 },
//               1024: { slidesPerView: 4, spaceBetween: 40 },
//             }}
//           >
//             {advantages.map(adv => (
//               <SwiperSlide key={adv.id}>
//                 <div className="flex items-center justify-center md:justify-start space-x-2 p-4 bg-white border-b border-gray-200">
//                   {adv.icon}
//                   <span className="text-sm md:text-base font-medium">
//                     {adv.text}
//                   </span>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Footer Links Section */}
//         <div className="overflow-x-auto scrollbar-hide">
//           <div className="flex md:grid md:grid-cols-5 gap-8 py-10 min-w-max md:min-w-0">
//             {footerColumns.map((col, idx) => (
//               <div
//                 key={idx}
//                 className="flex-shrink-1 w-[60%] sm:w-[45%] md:w-auto"
//               >
//                 <h3 className="text-indigo-700 font-semibold mb-3">
//                   {col.title}
//                 </h3>
//                 <ul className="space-y-1 text-sm text-gray-600">
//                   {col.items.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="flex flex-col md:flex-row justify-between items-center pb-6 gap-4">
//           <div className="text-center text-sm text-gray-500">
//             Copyright 2024. All rights reserved
//           </div>
//           <div className="flex gap-3 text-3xl">
//             <CiFacebook className="text p-1 text-purple-800" />
//             <FaTwitter className="p-1 text-purple-800" />
//             <FaInstagram className="p-1 text-purple-800" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Truck, Gift, Tag, DollarSign, Mail } from 'lucide-react';
import { CiFacebook } from 'react-icons/ci';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from 'lucide-react';

const advantages = [
  { id: 1, icon: <Tag size={20} />, text: 'Everyday fresh products' },
  {
    id: 2,
    icon: <Truck size={20} />,
    text: 'Free delivery for order over $70',
  },
  { id: 3, icon: <Gift size={20} />, text: 'Daily Mega Discounts' },
  { id: 4, icon: <DollarSign size={20} />, text: 'Best price on the market' },
];

const footerColumns = [
  {
    title: 'FRUIT & VEGETABLES',
    items: [
      'Fresh Vegetables',
      'Herbs & Seasonings',
      'Fresh Fruits',
      'Cuts & Sprouts',
      'Exotic Fruits & Veggies',
      'Packaged Produce',
      'Party Trays',
    ],
  },
  {
    title: 'BREAKFAST & DAIRY',
    items: [
      'Fresh Vegetables',
      'Herbs & Seasonings',
      'Fresh Fruits',
      'Cuts & Sprouts',
      'Exotic Fruits & Veggies',
      'Packaged Produce',
      'Party Trays',
    ],
  },
  {
    title: 'MEAT & SEAFOOD',
    items: [
      'Fresh Vegetables',
      'Herbs & Seasonings',
      'Fresh Fruits',
      'Cuts & Sprouts',
      'Exotic Fruits & Veggies',
      'Packaged Produce',
      'Party Trays',
    ],
  },
  {
    title: 'BEVERAGES',
    items: [
      'Fresh Vegetables',
      'Herbs & Seasonings',
      'Fresh Fruits',
      'Cuts & Sprouts',
      'Exotic Fruits & Veggies',
      'Packaged Produce',
      'Party Trays',
    ],
  },
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div>
      {/* Newsletter Section */}
      <div className="bg-color text-white py-10 px-4 md:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex md:container justify-between items-center">
          <div>
            <p className="text-sm mb-2">$20 discount for your first order</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Join our newsletter and get...
            </h2>
            <p className="text-sm md:text-base mb-4">
              Join our email subscription now to get updates on promotions and
              coupons.
            </p>
            <div className="flex max-w-md bg-white items-center rounded">
              <Mail className="text-gray-400 ml-3" size={20} />
              <input
                type="email"
                placeholder="Your Email Address"
                className="md:flex-1 w-full p-2 border-0 outline-none text-gray-800 bg-white py-4"
              />
              <button className="bg-color text-white font-semibold px-4 py-2 border mx-1 cursor-pointer text-[12px] md:text-[15px]">
                Subscribe
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="/image/footer.png"
              alt="newsletter"
              className="w-fit max-w-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-300 md:mt-2 ">
        {/* Advantages / Features Section */}
        <div className="border-gray-200 whitespace-nowrap  bg-gray-100 md:bg-gray-300 md:container">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1.2}
            spaceBetween={0}
            breakpoints={{
              0: { slidesPerView: 1.5, spaceBetween: 0 },
              640: { slidesPerView: 2, spaceBetween: 0 },
              768: { slidesPerView: 3, spaceBetween: 0 },
              1024: { slidesPerView: 4, spaceBetween: 0 },
            }}
          >
            {advantages.map(adv => (
              <SwiperSlide key={adv.id}>
                <div className="flex items-center space-x-1 p-4 border-b border-r border-gray-200 ">
                  {adv.icon}
                  <span className="text-sm md:text-base font-medium">
                    {adv.text}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className=" md:container">
          {/* Footer Links Section */}
          <div className="pl-3 md:bg-gray-00">
            {/* Footer Links Section */}
            <div className="relative pl-3 ">
              {/* Gradient hint on right */}
              <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l md:bg-none from-gray-200 to-transparent z-10" />

              <div className="overflow-x-auto scrollbar-hide py-6 px-3">
                <div className="flex gap-6 min-w-max md:grid md:grid-cols-5 md:gap-10 md:min-w-0 scroll-smooth">
                  {footerColumns.map((col, idx) => (
                    <div key={idx} className="flex-shrink-0 w-52">
                      <h3 className="text-indigo-700 font-semibold mb-2">
                        {col.title}
                      </h3>
                      <ul className="space-y-1 text-[13px] md:text-sm text-gray-600">
                        {col.items.map((item, i) => (
                          <li
                            key={i}
                            className="cursor-pointer hover:text-black active:text-blue-500 rounded px-1 py-0.5 transition"
                            // onClick={() => alert(`Go to ${item}`)} // replace with navigate or actual link
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Customer Service */}
                  <div className="flex-shrink-0 w-52">
                    <h3 className="text-indigo-700 font-semibold mb-2">
                      Customer Service
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>
                        <a
                          href="/contact-us"
                          className="hover:text-blue-500 transition"
                        >
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/refund-policy"
                          className="hover:text-blue-500 transition"
                        >
                          Refund Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center pb-3 gap-4 md:mb-0 mb-14 ">
              <div className="text-center text-[12px] text-gray-500 ">
                Copyright 2024. All rights reserved
              </div>
              <div className="flex gap-3 text-3xl md:text-4xl">
                <CiFacebook className=" text-purple-800 active:text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                <FaTwitter className=" text-purple-800 active:text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                <FaInstagram className=" text-purple-800 active:text-red-500 cursor-pointer hover:text-pink-500 transition" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
