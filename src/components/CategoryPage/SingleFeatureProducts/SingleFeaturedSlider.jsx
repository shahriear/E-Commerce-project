import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../Product/ProductCard';

const SingleFeaturedSlider = () => {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };
    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + products.length) % products.length);
  };

  if (products.length === 0) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="relative overflow-hidden w-full py-4">
      {/* Title */}
      <h3 className="text-md font-semibold mb-2 px-2">FEATURED PRODUCTS</h3>

      {/* Slider wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {products.map(product => (
          <div
            key={product.id}
            className="flex-shrink-0 w-full flex justify-start" // Left aligned
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Left Arrow inside card */}
      <button
        onClick={prevSlide}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Arrow inside card */}
      <button
        onClick={nextSlide}
        className="absolute right-28 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default SingleFeaturedSlider;
