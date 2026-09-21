import { useNavigate } from 'react-router-dom';
import { TrendingUp, Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from '../utils/time';

export default function Sidebar({ trendingArticles = [], bookmarkedArticles = [] }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header">
          <TrendingUp size={16} className="sidebar-header-icon" />
          Trending Now
        </div>
        {trendingArticles.slice(0, 6).map((article, i) => (
          <div
            key={article.url || i}
            className="trending-item"
            onClick={() => navigate('/article', { state: { article } })}
            role="button"
            tabIndex={0}
            aria-label={article.title}
          >
            <span className="trending-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="trending-title">{article.title}</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                {formatDistanceToNow(article.publishedAt)} · {article.source?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="newsletter-box">
        <div className="newsletter-icon">
          <Mail size={22} />
        </div>
        <h3 className="newsletter-title">Stay Informed</h3>
        <p className="newsletter-desc">
          Get the best stories delivered to your inbox every morning. No spam, ever.
        </p>
        {subscribed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', color: 'var(--accent-green)', fontWeight: 700 }}>
            <CheckCircle size={20} />
            You're subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="newsletter-btn" id="newsletter-subscribe-btn">
              Subscribe Free
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
