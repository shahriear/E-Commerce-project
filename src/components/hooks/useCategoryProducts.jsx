import { useState, useEffect } from 'react';
import { CATEGORY_MAP } from '../config/categoryMap';

export const useCategoryProducts = activeCategory => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const slug = CATEGORY_MAP[activeCategory];
        const res = await fetch(
          `https://dummyjson.com/products/category/${slug}?limit=16`
        );
        const json = await res.json();
        if (!cancelled) setData(json.products || []);
      } catch (err) {
        console.error(err);
        if (!cancelled) setData([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [activeCategory]);

  return { data, loading };
};
