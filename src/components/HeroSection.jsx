import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from '../utils/time';

const FALLBACK = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80';

export default function HeroSection({ articles = [] }) {
  const navigate = useNavigate();
  const [main, ...rest] = articles;
  const sideArticles = rest.slice(0, 4);

  if (!main) return null;

  const handleClick = (article) => navigate('/article', { state: { article } });

  return (
    <section className="hero-section section" aria-label="Featured news">
      <div className="hero-grid">
        <div
          className="hero-main"
          onClick={() => handleClick(main)}
          role="article"
          aria-label={main.title}
          tabIndex={0}
          onKeyPress={e => e.key === 'Enter' && handleClick(main)}
        >
          <img
            className="hero-main-img"
            src={main.image || main.urlToImage || FALLBACK}
            alt={main.title}
            onError={e => { e.target.src = FALLBACK; }}
          />
          <div className="hero-main-overlay" />
          <div className="hero-main-content">
            <span className="hero-category-badge">{main.category || 'Featured'}</span>
            <h1 className="hero-title display-font">{main.title}</h1>
            <div className="hero-meta">
              <span className="live-dot">Live</span>
              <span>{main.source?.name || 'NewsFlow'}</span>
              <span>
                <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
                {formatDistanceToNow(main.publishedAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="hero-sidebar">
          {sideArticles.map((article, i) => (
            <div
              key={article.url || i}
              className="hero-side-card"
              onClick={() => handleClick(article)}
              role="article"
              aria-label={article.title}
              tabIndex={0}
              onKeyPress={e => e.key === 'Enter' && handleClick(article)}
              style={{ animationDelay: `${(i + 1) * 0.1}s` }}
            >
              <img
                className="hero-side-img"
                src={article.image || article.urlToImage || FALLBACK}
                alt={article.title}
                onError={e => { e.target.src = FALLBACK; }}
              />
              <div className="hero-side-content">
                <div className="hero-side-category">{article.category || 'news'}</div>
                <h3 className="hero-side-title">{article.title}</h3>
                <div className="hero-side-time">
                  {formatDistanceToNow(article.publishedAt)} · {article.source?.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
