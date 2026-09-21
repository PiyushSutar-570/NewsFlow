import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import SkeletonCard from '../components/SkeletonCard';
import Sidebar from '../components/Sidebar';
import { useNews } from '../hooks/useNews';
import { MOCK_ARTICLES } from '../utils/api';

const CATEGORY_META = {
  technology: {
    label: 'Technology',
    desc: 'Latest breakthroughs in AI, software, hardware, and the tech world.',
    color: 'var(--accent-cyan)',
    emoji: '💻',
  },
  business: {
    label: 'Business',
    desc: 'Markets, economy, companies, and the global business landscape.',
    color: 'var(--accent-gold)',
    emoji: '📈',
  },
  sports: {
    label: 'Sports',
    desc: 'Scores, highlights, and analysis from the world of sports.',
    color: 'var(--accent-green)',
    emoji: '⚽',
  },
  science: {
    label: 'Science',
    desc: 'Discoveries, research, and advances in science and nature.',
    color: 'var(--accent-purple)',
    emoji: '🔬',
  },
  entertainment: {
    label: 'Entertainment',
    desc: 'Movies, music, TV, celebrities, and pop culture.',
    color: 'var(--accent-coral)',
    emoji: '🎬',
  },
  health: {
    label: 'Health',
    desc: 'Medical research, wellness tips, and health breakthroughs.',
    color: 'var(--accent-gold)',
    emoji: '🏥',
  },
  general: {
    label: 'All News',
    desc: 'Top stories from around the world, curated by our editors.',
    color: 'var(--accent-cyan)',
    emoji: '🌍',
  },
};

const PAGE_SIZE = 9;

export default function CategoryPage() {
  const { category = 'general' } = useParams();
  const [page, setPage] = useState(1);
  const { articles, loading, error, retry } = useNews({ category });
  const meta = CATEGORY_META[category] || CATEGORY_META.general;

  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const paginated = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="page-header">
            <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <Link to="/" style={{ color: 'var(--accent-cyan)' }}>Home</Link>
                <ChevronRight size={14} style={{ display: 'inline', margin: '0 4px' }} />
                {meta.label}
              </span>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 2.5 + 'rem' }}>{meta.emoji}</span>
              <div>
                <h1 style={{ color: meta.color }}>{meta.label}</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{meta.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="main-layout">
            <div>
              {error ? (
                <div className="error-state">
                  <h3>⚠️ Could not load articles</h3>
                  <p>{error}</p>
                  <button className="retry-btn" onClick={retry}>Try Again</button>
                </div>
              ) : (
                <>
                  <div className="article-grid">
                    {loading
                      ? [...Array(PAGE_SIZE)].map((_, i) => <SkeletonCard key={i} />)
                      : paginated.length > 0
                        ? paginated.map((article, i) => (
                            <ArticleCard key={article.url || i} article={article} index={i} />
                          ))
                        : (
                          <div className="empty-state">
                            <div className="icon">{meta.emoji}</div>
                            <h3>No articles in {meta.label}</h3>
                            <p>Check back soon for the latest stories.</p>
                          </div>
                        )
                    }
                  </div>
                  {totalPages > 1 && (
                    <div className="pagination" aria-label="Pagination">
                      <button
                        className="page-btn"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                          onClick={() => setPage(i + 1)}
                          aria-label={`Page ${i + 1}`}
                          aria-current={page === i + 1 ? 'page' : undefined}
                          id={`page-btn-${i + 1}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        className="page-btn"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        aria-label="Next page"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <Sidebar trendingArticles={MOCK_ARTICLES.slice(0, 8)} />
          </div>
        </div>
      </section>
    </main>
  );
}
