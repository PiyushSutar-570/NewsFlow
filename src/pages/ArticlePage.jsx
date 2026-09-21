import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Clock, User, Share2, Bookmark, BookmarkCheck, ArrowLeft,
  AtSign, MessageSquare, Link as LinkIcon, ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, getReadingTime } from '../utils/time';
import ArticleCard from '../components/ArticleCard';
import { MOCK_ARTICLES } from '../utils/api';

const FALLBACK = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80';

const CATEGORY_COLORS = {
  technology: { bg: 'rgba(0,212,255,0.15)', color: 'var(--accent-cyan)' },
  sports: { bg: 'rgba(6,214,160,0.15)', color: 'var(--accent-green)' },
  business: { bg: 'rgba(255,209,102,0.15)', color: 'var(--accent-gold)' },
  science: { bg: 'rgba(168,85,247,0.15)', color: 'var(--accent-purple)' },
  entertainment: { bg: 'rgba(255,107,107,0.15)', color: 'var(--accent-coral)' },
  health: { bg: 'rgba(255,209,102,0.15)', color: 'var(--accent-gold)' },
  general: { bg: 'rgba(136,146,176,0.15)', color: 'var(--text-secondary)' },
};

export default function ArticlePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked, showToast } = useApp();
  const article = state?.article;

  if (!article) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>📰</div>
        <h2>Article not found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>
          This article may have expired or been removed.
        </p>
        <Link to="/" className="article-detail-link" style={{ display: 'inline-flex' }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const saved = isBookmarked(article.url);
  const catStyle = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.general;
  const readingTime = getReadingTime(article.content || article.description || '');
  const relatedArticles = MOCK_ARTICLES
    .filter(a => a.category === article.category && a.url !== article.url)
    .slice(0, 3);

  const handleShare = (platform) => {
    const url = encodeURIComponent(article.url);
    const title = encodeURIComponent(article.title);
    const links = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      copy: null,
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(article.url).then(() => showToast('Link copied!'));
    } else if (links[platform]) {
      window.open(links[platform], '_blank');
    }
  };

  return (
    <main>
      <div className="container" style={{ padding: '32px var(--space-lg)' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.875rem',
            marginBottom: 32, transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          aria-label="Go back"
          id="back-button"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>
          <article className="article-detail" style={{ maxWidth: '100%' }}>
            <span
              className="article-detail-category"
              style={{ background: catStyle.bg, color: catStyle.color }}
            >
              {article.category || 'General'}
            </span>
            <h1 className="article-detail-title display-font">{article.title}</h1>
            <div className="article-detail-meta">
              <span>
                <User size={14} />
                {article.source?.name || 'NewsFlow Editorial'}
              </span>
              <span>
                <Clock size={14} />
                {formatDate(article.publishedAt)}
              </span>
              <span>
                <Clock size={14} />
                {readingTime}
              </span>
              <span className="live-dot">Live</span>
            </div>
            <img
              className="article-detail-img"
              src={article.image || article.urlToImage || FALLBACK}
              alt={article.title}
              onError={e => { e.target.src = FALLBACK; }}
            />
            <p className="article-detail-desc">{article.description}</p>
            {article.content && (
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24, fontSize: '1.05rem' }}>
                {article.content.replace(/\[\+\d+ chars\]/, '').trim()}
              </p>
            )}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-detail-link"
            >
              Read Full Article
              <ExternalLink size={16} />
            </a>
            <div className="share-section">
              <span className="share-label">Share this story:</span>
              <button className="share-btn" onClick={() => handleShare('twitter')} id="share-twitter">
                <AtSign size={15} /> Twitter / X
              </button>
              <button className="share-btn" onClick={() => handleShare('facebook')} id="share-facebook">
                <MessageSquare size={15} /> Share
              </button>
              <button className="share-btn" onClick={() => handleShare('copy')} id="share-copy">
                <LinkIcon size={15} /> Copy Link
              </button>
              <button
                className="share-btn"
                onClick={() => toggleBookmark(article)}
                id="detail-bookmark-btn"
                style={saved ? { color: 'var(--accent-gold)', borderColor: 'var(--accent-gold)' } : {}}
              >
                {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </article>
          <aside style={{ position: 'sticky', top: 110 }}>
            <div className="sidebar-section">
              <div className="sidebar-header">
                <Share2 size={16} className="sidebar-header-icon" />
                Related Stories
              </div>
              {relatedArticles.length > 0 ? (
                relatedArticles.map((related, i) => (
                  <div
                    key={related.url || i}
                    className="trending-item"
                    onClick={() => navigate('/article', { state: { article: related } })}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={related.image || FALLBACK}
                      alt={related.title}
                      style={{ width: 60, height: 50, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                      onError={e => { e.target.src = FALLBACK; }}
                    />
                    <p className="trending-title">{related.title}</p>
                  </div>
                ))
              ) : (
                <p style={{ padding: 16, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  No related articles found.
                </p>
              )}
            </div>
          </aside>
        </div>
        {relatedArticles.length > 0 && (
          <section style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--border-subtle)' }}>
            <div className="section-header">
              <div className="section-title-wrap">
                <div className="section-line" />
                <h2 className="section-title">More in {article.category}</h2>
              </div>
            </div>
            <div className="article-grid">
              {relatedArticles.map((a, i) => (
                <ArticleCard key={a.url || i} article={a} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
