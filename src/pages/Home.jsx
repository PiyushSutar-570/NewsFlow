import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu, Briefcase, Dumbbell, FlaskConical, Tv, HeartPulse, Globe,
  ChevronRight, Flame, Stars
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ArticleCard from '../components/ArticleCard';
import SkeletonCard from '../components/SkeletonCard';
import Sidebar from '../components/Sidebar';
import { useNews } from '../hooks/useNews';
import { MOCK_ARTICLES } from '../utils/api';

const CATEGORIES = [
  { key: 'general', label: 'All', Icon: Globe },
  { key: 'technology', label: 'Tech', Icon: Cpu },
  { key: 'business', label: 'Business', Icon: Briefcase },
  { key: 'sports', label: 'Sports', Icon: Dumbbell },
  { key: 'science', label: 'Science', Icon: FlaskConical },
  { key: 'entertainment', label: 'Entertainment', Icon: Tv },
  { key: 'health', label: 'Health', Icon: HeartPulse },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('general');
  const { articles, loading, error, retry } = useNews({ category: activeCategory });

  const displayArticles = articles.length > 0 ? articles : [];

  return (
    <main>
      <div className="container">
        {loading ? (
          <div className="hero-section section">
            <div className="hero-grid">
              <div className="skeleton" style={{ height: 460, borderRadius: 24 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: 80, borderRadius: 16 }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <HeroSection articles={displayArticles.slice(0, 5)} />
        )}
      </div>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-line" />
              <h2 className="section-title">Latest Stories</h2>
              <Flame size={20} color="var(--accent-coral)" />
            </div>
            <Link to="/category/general" className="view-all-btn">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="category-filter" role="tablist" aria-label="News categories">
            {CATEGORIES.map(({ key, label, Icon }) => (
              <button
                key={key}
                className={`cat-tab ${activeCategory === key ? 'active' : ''}`}
                onClick={() => setActiveCategory(key)}
                role="tab"
                aria-selected={activeCategory === key}
                id={`cat-tab-${key}`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
          <div className="main-layout">
            <div>
              {error ? (
                <div className="error-state">
                  <h3>⚠️ Could not load articles</h3>
                  <p>{error}</p>
                  <button className="retry-btn" onClick={retry}>Try Again</button>
                </div>
              ) : (
                <div className="article-grid">
                  {loading
                    ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                    : displayArticles.slice(5).length > 0
                      ? displayArticles.slice(5).map((article, i) => (
                          <ArticleCard key={article.url || i} article={article} index={i} />
                        ))
                      : displayArticles.map((article, i) => (
                          <ArticleCard key={article.url || i} article={article} index={i} />
                        ))
                  }
                  {!loading && displayArticles.length === 0 && (
                    <div className="empty-state">
                      <div className="icon">📰</div>
                      <h3>No articles found</h3>
                      <p>Try a different category or check back later.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Sidebar trendingArticles={MOCK_ARTICLES.slice(0, 8)} />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-line" />
              <h2 className="section-title">Explore Topics</h2>
              <Stars size={20} color="var(--accent-gold)" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
            {CATEGORIES.filter(c => c.key !== 'general').map(({ key, label, Icon }) => (
              <Link
                key={key}
                to={`/category/${key}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  padding: '24px 16px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 16,
                  textAlign: 'center',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-cyan)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                id={`explore-${key}`}
              >
                <div style={{
                  width: 52, height: 52,
                  background: 'var(--accent-cyan-dim)',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                }}>
                  <Icon size={24} />
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
