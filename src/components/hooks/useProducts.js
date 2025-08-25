// hooks/useProducts.js
import { useEffect, useState } from 'react';

export function useProducts(limit = 12) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${limit}`)
      .then(res => res.json())
      .then(res => {
        setData(res.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [limit]);

  return { data, loading };
}
