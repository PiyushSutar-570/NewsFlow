import { Link } from 'react-router-dom';
import { Zap, AtSign, Play, Globe, Users, Rss } from 'lucide-react';

const FOOTER_LINKS = {
  Sections: [
    { label: 'Technology', path: '/category/technology' },
    { label: 'Business', path: '/category/business' },
    { label: 'Science', path: '/category/science' },
    { label: 'Sports', path: '/category/sports' },
    { label: 'Entertainment', path: '/category/entertainment' },
    { label: 'Health', path: '/category/health' },
  ],
  Company: [
    { label: 'About Us', path: '#' },
    { label: 'Careers', path: '#' },
    { label: 'Advertise', path: '#' },
    { label: 'Contact', path: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Service', path: '#' },
    { label: 'Cookie Policy', path: '#' },
    { label: 'Corrections', path: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="logo-icon">
                <Zap size={18} color="white" strokeWidth={2.5} />
              </div>
              <span className="logo-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800 }}>
                News<span style={{ color: 'var(--accent-cyan)' }}>Flow</span>
              </span>
            </div>
            <p className="footer-desc">
              Your premium destination for curated global news. We aggregate the best journalism 
              from hundreds of trusted sources so you never miss what matters.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[
                { Icon: AtSign, label: 'Twitter / X' },
                { Icon: Play, label: 'YouTube' },
                { Icon: Globe, label: 'Website' },
                { Icon: Users, label: 'LinkedIn' },
                { Icon: Rss, label: 'RSS Feed' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="icon-btn"
                  aria-label={label}
                  style={{ width: 36, height: 36, border: '1px solid var(--border-subtle)', borderRadius: 8 }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="footer-heading">{category}</h4>
              <div className="footer-links">
                {links.map(link => (
                  <Link key={link.label} to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NewsFlow. All rights reserved.</span>
          <span style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem' }}>
            Powered by NewsFlow Engine v2.0
          </span>
        </div>
      </div>
    </footer>
  );
}
