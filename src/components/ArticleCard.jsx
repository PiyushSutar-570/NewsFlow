import { useNavigate } from 'react-router-dom';
import { Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDistanceToNow } from '../utils/time';

const CATEGORY_COLORS = {
  technology: 'cat-technology',
  sports: 'cat-sports',
  business: 'cat-business',
  science: 'cat-science',
  entertainment: 'cat-entertainment',
  health: 'cat-health',
  general: 'cat-general',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80';

export default function ArticleCard({ article, index = 0 }) {
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked } = useApp();
  const saved = isBookmarked(article.url);
  const catClass = CATEGORY_COLORS[article.category] || 'cat-general';
  const image = article.image || article.urlToImage || FALLBACK_IMAGE;

  const handleClick = () => {
    navigate('/article', { state: { article } });
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(article);
  };

  const sourceName = article.source?.name || 'NewsFlow';
  const time = formatDistanceToNow(article.publishedAt);
  const category = article.category || 'general';

  return (
    <article
      className="article-card"
      onClick={handleClick}
      style={{ animationDelay: `${index * 0.07}s` }}
      aria-label={article.title}
      role="article"
    >
      <div className="card-img-wrap">
        <img
          className="card-img"
          src={image}
          alt={article.title}
          loading="lazy"
          onError={e => { e.target.src = FALLBACK_IMAGE; }}
        />
        <span className={`card-category ${catClass}`}>{category}</span>
        <button
          className={`card-bookmark-btn ${saved ? 'saved' : ''}`}
          onClick={handleBookmark}
          aria-label={saved ? 'Remove bookmark' : 'Save article'}
          id={`bookmark-${encodeURIComponent(article.url).slice(0, 30)}`}
        >
          {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      <div className="card-body">
        <div className="card-source">
          <span className="source-dot" />
          <span className="source-name">{sourceName}</span>
        </div>
        <h3 className="card-title">{article.title}</h3>
        {article.description && (
          <p className="card-desc">{article.description}</p>
        )}
        <div className="card-footer">
          <span className="card-time">
            <Clock size={12} />
            {time}
          </span>
          <span className="read-more">Read more →</span>
        </div>
      </div>
    </article>
  );
}
