import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Truck, Gift, Tag, DollarSign, Mail } from 'lucide-react';
import { CiFacebook } from 'react-icons/ci';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

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
  {
    title: 'BREADS & BAKERY',
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
  return (
    <div>
      {/* Newsletter Section */}
      <div className="bg-color text-white py-10 px-4 md:px-20 flex flex-col md:flex-row justify-between items-center gap-6  ">
        <div className="container ">
          <p className="text-sm mb-2">$20 discount for your first order</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Join our newsletter and get...
          </h2>
          <p className="text-sm md:text-base mb-4">
            Join our email subscription now to get updates on promotions and
            coupons.
          </p>
          <div className="flex max-w-md bg-white items-center">
            <Mail className="text-gray-400 ml-3" size={20} />
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 p-2 rounded-l border-0 outline-none text-gray-800 bg-white py-4"
            />
            <button className="bg-color text-white font-semibold px-4 py-2 border mx-1 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="/image/footer.png"
            alt="newsletter"
            className="w-fit max-w-sm"
          />
        </div>
      </div>
      <div className="bg-white mt-10 container">
        {/* Advantages / Features Section */}
        <div className="bg-gray-50 py-4 ">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1.2} // mobile: one full + peek
            spaceBetween={15}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 40 },
            }}
          >
            {advantages.map((adv, index) => (
              <SwiperSlide key={adv.id}>
                <div
                  className={`flex items-center justify-center md:justify-start space-x-2 p-4 bg-white border-b border-gray-200 ${
                    index !== advantages.length - 1
                      ? 'border-r border-gray-200'
                      : ''
                  }`}
                >
                  {adv.icon}
                  <span className="text-sm md:text-base font-medium">
                    {adv.text}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Footer Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 py-10">
          {footerColumns.map((col, idx) => (
            <div key={idx}>
              <h3 className="text-indigo-700 font-semibold mb-3">
                {col.title}
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {col.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center  pb-3 ">
          <div className="text-center text-sm text-gray-500 pb-6">
            Copyright 2024. All rights reserved
          </div>
          <div className="flex gap-3 text-4xl">
            <CiFacebook className="text p-1 text-purple-800" />
            <FaTwitter className=" p-1 text-purple-800" />
            <FaInstagram className=" p-1 text-purple-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
