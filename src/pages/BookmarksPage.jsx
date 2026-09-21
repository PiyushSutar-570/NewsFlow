import { Link } from 'react-router-dom';
import { Bookmark, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ArticleCard from '../components/ArticleCard';

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useApp();

  return (
    <main>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="page-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{
                    width: 44, height: 44,
                    background: 'var(--accent-cyan-dim)',
                    borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                  }}>
                    <Bookmark size={22} />
                  </div>
                  <h1>My Bookmarks</h1>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {bookmarks.length} saved article{bookmarks.length !== 1 ? 's' : ''}
                </p>
              </div>
              {bookmarks.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear all bookmarks?')) {
                      bookmarks.forEach(b => toggleBookmark(b));
                    }
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 16px',
                    border: '1px solid var(--accent-coral)',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--accent-coral)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                  }}
                  id="clear-bookmarks-btn"
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-coral-dim)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Trash2 size={15} />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {bookmarks.length === 0 ? (
            <div className="empty-state" style={{ paddingTop: 64 }}>
              <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔖</div>
              <h3>No bookmarks yet</h3>
              <p style={{ marginBottom: 24 }}>
                Save articles you want to read later by clicking the bookmark icon on any card.
              </p>
              <Link
                to="/"
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                  color: 'white',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                }}
              >
                Browse News
              </Link>
            </div>
          ) : (
            <div className="article-grid">
              {bookmarks.map((article, i) => (
                <ArticleCard key={article.url || i} article={article} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
