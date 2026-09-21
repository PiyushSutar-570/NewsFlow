import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search, Sun, Moon, Bookmark, Menu, X, Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const CATEGORIES = [
  { label: 'Home', path: '/' },
  { label: 'Technology', path: '/category/technology' },
  { label: 'Business', path: '/category/business' },
  { label: 'Sports', path: '/category/sports' },
  { label: 'Science', path: '/category/science' },
  { label: 'Health', path: '/category/health' },
  { label: 'Entertainment', path: '/category/entertainment' },
];

export default function Navbar() {
  const { theme, toggleTheme, bookmarks } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" aria-label="NewsFlow Home">
            <div className="logo-icon">
              <Zap size={18} color="white" strokeWidth={2.5} />
            </div>
            <span className="logo-text">News<span>Flow</span></span>
          </Link>

          <nav className="navbar-nav" role="menubar">
            {CATEGORIES.map(cat => (
              <NavLink
                key={cat.path}
                to={cat.path}
                end={cat.path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                role="menuitem"
              >
                {cat.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar-actions">
            <form onSubmit={handleSearch} role="search">
              <div className="search-input-wrap">
                <Search size={15} className="search-icon" />
                <input
                  ref={searchRef}
                  type="search"
                  className="search-input"
                  placeholder="Search news..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  aria-label="Search news articles"
                />
              </div>
            </form>

            <Link to="/bookmarks" className="icon-btn" aria-label={`Bookmarks (${bookmarks.length})`}>
              <Bookmark size={18} />
              {bookmarks.length > 0 && (
                <span className="badge">{bookmarks.length > 9 ? '9+' : bookmarks.length}</span>
              )}
            </Link>

            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className="icon-btn"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ display: 'none' }}
              id="mobile-menu-btn"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
