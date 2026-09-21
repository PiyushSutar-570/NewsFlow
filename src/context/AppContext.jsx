import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('newsflow-theme') || 'dark');
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('newsflow-bookmarks') || '[]'); }
    catch { return []; }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('newsflow-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('newsflow-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const toggleBookmark = useCallback((article) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.url === article.url);
      if (exists) {
        showToast('Removed from bookmarks', 'error');
        return prev.filter(b => b.url !== article.url);
      } else {
        showToast('Article bookmarked! 🔖', 'success');
        return [article, ...prev];
      }
    });
  }, [showToast]);

  const isBookmarked = useCallback((url) => bookmarks.some(b => b.url === url), [bookmarks]);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, bookmarks, toggleBookmark, isBookmarked, showToast, toast }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
