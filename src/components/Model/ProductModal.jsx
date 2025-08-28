import { X, Star } from 'lucide-react';
import { currency } from '../../utils/currency';
import { useState } from 'react';
import ZoomableImage from '../ZoomableImage/ZoomableImage';

export default function ProductModal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-300 mx-4 px-6 py-4">
          <div>
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-500 py-2">{product.brand}</p>
            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={
                    i < Math.round(product.rating ?? 4)
                      ? 'currentColor'
                      : 'transparent'
                  }
                />
              ))}
              <span className="ml-2 text-gray-600 text-sm">
                {product.rating?.toFixed(1)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left: Images */}
          <div>
            <ZoomableImage
              src={selectedImage}
              alt={product.title}
              className="w-full h-[350px] object-contain rounded-lg border"
            />

            <div className="flex gap-2 mt-4">
              {[product.thumbnail, ...(product.images || [])].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className={`w-16 h-16 object-contain rounded-md border cursor-pointer transition ${
                    img === selectedImage
                      ? 'border-red-500'
                      : 'border-gray-300 opacity-50 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-5 flex flex-col ">
            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xl font-bold">
                {currency(product.price)}
              </span>

              {product.discountPercentage && (
                <span className="text-gray-500 line-through">
                  {currency(
                    (
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(0)
                  )}
                </span>
              )}
            </div>
            <p className="text-green-600 font-medium pb-1">In stock</p>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.description || 'No description available.'}
            </p>
            {/* Sizes */}
            {product.sizes && (
              <div className="flex gap-2 items-center flex-wrap">
                <span className="font-medium">Size:</span>
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className="px-3 py-1 border rounded-md hover:bg-gray-100 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mt-4">
              {/* Quantity Selector */}
              <div className="flex items-center overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-200 transition border rounded-full border-gray-400 "
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-200 transition border rounded-full border-gray-400 "
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button className=" bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-full flex items-center justify-center gap-2 font-medium transition">
                🛒 Add To Cart
              </button>
            </div>

            {/* Wishlist + Compare */}
            <div className="flex gap-5 mt-10">
              <button className=" px-2 py-1 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-200 transition font-normal text-[13px]">
                ♥ Add to Wishlist
              </button>
              <button className=" px-2 py-1 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-200 transition font-normal text-[13px]">
                ⇄ Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
