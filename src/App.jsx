import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import NewsTicker from './components/NewsTicker';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import SearchPage from './pages/SearchPage';
import BookmarksPage from './pages/BookmarksPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app-container">
          <NewsTicker />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="*" element={
              <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', marginBottom: 16 }}>🗞️</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Page Not Found</h2>
                <p style={{ color: 'var(--text-secondary)', margin: '12px 0 28px' }}>
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <a href="/" style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                  color: 'white',
                  fontWeight: 700,
                  borderRadius: '999px',
                }}>← Back to Home</a>
              </div>
            } />
          </Routes>
          <Footer />
          <Toast />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
