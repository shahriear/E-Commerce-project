import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heart, Shuffle, Star } from 'lucide-react';
import { currency } from '../../utils/currency';
import ZoomableImage from '../ZoomableImage/ZoomableImage';
import ProductTabs from './ProductTabs';
import RelatedProducts from '../ProductDetails/RelatedProducts/RelatedProducts';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  const ramOptions = ['4GB', '6GB', '8GB', '12GB'];
  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-gray-300 border-b-blue-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product)
    return <p className="p-6 text-center my-64">Product not found...</p>;

  const isElectronics =
    product.category === 'smartphones' || product.category === 'laptops';
  const isClothing =
    product.category === 'mens-shirts' ||
    product.category === 'womens-dresses' ||
    product.category === 'tops';

  const discount =
    product.discountPercentage ?? Math.floor(Math.random() * 20) + 5;
  const oldPrice = (product.price / (1 - discount / 100)).toFixed(0);

  const additionalInfo = [
    { label: 'Brand', value: product.brand || 'N/A' },
    { label: 'Category', value: product.category || 'N/A' },
    { label: 'Stock', value: product.stock || 'N/A' },
    { label: 'Warranty', value: '1 Year Official Warranty' },
  ];

  const reviews = [
    {
      user: 'Hemant Kumar',
      date: '2025-08-30',
      comment: 'Great product!',
      rating: 4.3,
    },
    {
      user: 'Pritam Awatade',
      date: '2024-11-02',
      comment: 'Average quality.',
      rating: 3,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-2xl shadow-md p-5 sm:p-7">
        <div>
          <div className="bg-gray-100 rounded-xl p-3 sm:p-4 flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square flex items-center justify-center">
              <ZoomableImage
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="flex sm:justify-center gap-3 mt-4 overflow-x-auto sm:overflow-x-hidden pb-2">
            {[product.thumbnail, ...(product.images || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-lg border cursor-pointer transition-all duration-200 ${
                  img === selectedImage
                    ? 'border-pink-600 shadow-md'
                    : 'border-gray-300 hover:opacity-80'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">
              {product.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-black">Brand: </span>
                {product.brand}
              </p>
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
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
              <button
                onClick={() => setActiveTab('reviews')}
                className="text-gray-400 hover:text-pink-600 transition text-sm"
              >
                {reviews.length} Reviews
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-xl sm:text-2xl text-red-600 font-bold">
                {currency(product.price)}
              </span>
              <span className="text-gray-500 line-through">
                {currency(oldPrice)}
              </span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {Math.round(discount)}% OFF
              </span>
            </div>

            {product.stock > 0 ? (
              <p className="text-green-600 font-sans mb-2 bg-green-100 inline px-2 py-1 rounded-2xl">
                In stock
              </p>
            ) : (
              <p className="text-red-600 font-normal mb-2 bg-red-100 inline px-2 py-0 rounded-2xl">
                Out of stock
              </p>
            )}

            <p className="text-gray-700 leading-relaxed mb-6 mt-6 text-sm sm:text-base">
              {product.description}
            </p>

            {/* RAM */}
            {isElectronics && (
              <div className="">
                <h3 className="font-semibold mb-2 text-gray-900">RAM:</h3>
                <div className="flex gap-2 flex-wrap">
                  {ramOptions.map(ram => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(ram)}
                      className={`px-3 py-1 rounded-lg text-sm border transition ${
                        selectedRam === ram
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {isClothing && (
              <div className="">
                <h3 className="font-semibold mb-2">Select Size:</h3>
                <div className="flex gap-2 flex-wrap">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm border transition ${
                        selectedSize === size
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-3 py-1">
              <button
                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                className="px-3 py-1 bg-gray-200 hover:text-white hover:bg-red-600 text-xl rounded-full"
              >
                -
              </button>
              <span className="px-3 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 text-xl bg-gray-200 hover:text-white hover:bg-green-600 rounded-full"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-5">
              <button
                className="flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-900 transition w-fit sm:w-auto justify-center text-[13px] md:text-[15px]"
                onClick={() => toast.error('Please Login to continue')}
              >
                <FaShoppingCart /> Add to Cart
              </button>

              <div className="flex gap-2">
                <div className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 border rounded-full hover:bg-pink-100 text-pink-600"
                    onClick={() => toast.error('Please Login to continue')}
                  >
                    <Heart size={14} />
                  </button>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                <div className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 border rounded-full hover:bg-gray-100 text-gray-600"
                    onClick={() => toast.error('Please Login to continue')}
                  >
                    <Shuffle size={14} />
                  </button>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Add to Compare
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ProductTabs
          description={product.description}
          additionalInfo={additionalInfo}
          reviews={reviews}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
}
