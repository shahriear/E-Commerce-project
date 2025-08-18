import { useState, useEffect } from 'react';

export const useNewProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dead = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products?limit=12`);
        const json = await res.json();
        if (!dead) setData(json.products || []);
      } catch (e) {
        console.error(e);
        if (!dead) setData([]);
      } finally {
        if (!dead) setLoading(false);
      }
    };

    load();
    return () => {
      dead = true;
    };
  }, []);

  return { data, loading };
};
