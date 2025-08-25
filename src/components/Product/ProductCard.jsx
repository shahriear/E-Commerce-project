import { useState } from 'react';
import { Star, Heart, ZoomIn, Expand } from 'lucide-react';
import { currency } from '../../utils/currency';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const discount =
    product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
  const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);
  const rating = product.rating ?? 4.2;

  const mainImage = product.thumbnail;
  const hoverImage = product.images?.[1] || mainImage;

  return (
    <div
      className={`group relative rounded-2xl bg-gray-200 p-3 shadow-sm transition-all duration-300
    hover:shadow-xl hover:translate-y-0.5`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Discount badge */}
      <div className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white z-10">
        {Math.round(discount)}%
      </div>

      {/* Hover actions (Top Right) */}
      <div
        className={`absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}
      >
        {/* Zoom button */}
        <button
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          onClick={() => alert(`Preview ${product.title}`)}
        >
          <Expand size={19} strokeWidth={1} />
        </button>

        {/* Love button */}
        <button
          className="p-2 bg-white rounded-full shadow hover:bg-red-100"
          onClick={() => toast.error('Please Login to continue')}
        >
          <Heart size={20} className="text-red-500" />
        </button>
      </div>

      <div className="h-40 w-48 overflow-hidden rounded-xl bg-gray-200 flex items-center justify-center relative">
        <img
          src={mainImage}
          alt={product.title}
          className={`absolute h-full w-full object-contain transition-all duration-500 ease-in-out ${
            hovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          }`}
          loading="lazy"
        />

        <img
          src={hoverImage}
          alt={product.title}
          className={`absolute h-full w-full object-contain transition-all duration-500 ease-in-out ${
            hovered ? 'scale-125 opacity-100' : 'scale-100 opacity-0'
          }`}
          loading="lazy"
        />
      </div>

      {/* Product info */}
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-2 text-[14px] font-bold text-gray-800 min-h-[40px] ">
          {product.title}
        </h3>
        <p className="text-green-600 font-medium pb-3">In stock</p>

        <div className="flex items-center gap-1 text-amber-500 text-xs">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.round(rating) ? 'currentColor' : 'transparent'}
            />
          ))}
          <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-medium text-sm md:text-base lg:text-lg truncate">
            {currency(product.price)}
          </span>
          <span className="text-gray-400 line-through text-xs md:text-sm truncate">
            {currency(oldPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
