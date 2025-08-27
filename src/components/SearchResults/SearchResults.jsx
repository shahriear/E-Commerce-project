import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        // console.log('Fetching products for:', query);
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        // console.log('Fetched data:', data);
        setResults(data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">
        Search results for: "{query}"
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map(product => (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-32 h-32 object-cover mb-2 rounded"
              />
              <h3 className="text-sm font-medium text-center">
                {product.title}
              </h3>
              <p className="text-purple-600 font-semibold mt-1">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
