import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import SkeletonCard from '../components/SkeletonCard';
import { useNews } from '../hooks/useNews';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  const { articles, loading, error } = useNews({ query });

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = inputValue.trim();
    setQuery(q);
    setSearchParams(q ? { q } : {});
  };

  const clearSearch = () => {
    setInputValue('');
    setQuery('');
    setSearchParams({});
  };

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setInputValue(q);
    setQuery(q);
  }, [searchParams]);

  return (
    <main>
      <div className="search-hero">
        <div className="container">
          <h1 className="search-hero-title display-font">
            {query ? `Results for "${query}"` : 'Search News'}
          </h1>
          <form onSubmit={handleSubmit} role="search">
            <div className="search-hero-input-wrap">
              <Search size={20} color="var(--text-muted)" />
              <input
                className="search-hero-input"
                type="search"
                placeholder="Search articles, topics, sources..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                autoFocus
                aria-label="Search news"
                id="search-page-input"
              />
              {inputValue && (
                <button type="button" onClick={clearSearch} aria-label="Clear search" className="icon-btn">
                  <X size={16} />
                </button>
              )}
              <button type="submit" className="search-submit-btn" id="search-submit-btn">
                Search
              </button>
            </div>
          </form>
          {query && !loading && (
            <p style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Found {articles.length} result{articles.length !== 1 ? 's' : ''} for "{query}"
            </p>
          )}
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 64 }}>
        {!query ? (
          <div className="empty-state" style={{ paddingTop: 64 }}>
            <div className="icon">🔍</div>
            <h3>Start searching</h3>
            <p>Enter keywords above to find relevant news articles from global sources.</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <h3>⚠️ Search failed</h3>
            <p>{error}</p>
          </div>
        ) : (
          <div className="article-grid" style={{ marginTop: 32 }}>
            {loading
              ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              : articles.length > 0
                ? articles.map((article, i) => (
                    <ArticleCard key={article.url || i} article={article} index={i} />
                  ))
                : (
                  <div className="empty-state">
                    <div className="icon">😕</div>
                    <h3>No results for "{query}"</h3>
                    <p>Try different keywords or browse by category.</p>
                  </div>
                )
            }
          </div>
        )}
      </div>
    </main>
  );
}
