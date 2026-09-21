import { useState, useEffect, useRef } from 'react';
import { fetchNews } from '../utils/api';

export function useNews({ category = 'general', query = '', page = 1 } = {}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef({});

  useEffect(() => {
    const key = `${category}-${query}-${page}`;
    if (cacheRef.current[key]) {
      setArticles(cacheRef.current[key]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const data = await fetchNews({ category, query, page });
        if (!cancelled) {
          cacheRef.current[key] = data;
          setArticles(data);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => { cancelled = true; clearTimeout(timer); };
  }, [category, query, page]);

  const retry = () => {
    const key = `${category}-${query}-${page}`;
    delete cacheRef.current[key];
    setError(null);
    setLoading(true);
    fetchNews({ category, query, page })
      .then(data => { cacheRef.current[key] = data; setArticles(data); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return { articles, loading, error, retry };
}
