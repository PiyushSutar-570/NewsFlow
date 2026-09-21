<div align="center">

<img src="public/favicon.svg" alt="NewsFlow Logo" width="80" height="80" />

# NewsFlow

**A modern, fast, and elegant news aggregator built with React + Vite**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Live Demo](#) · [Report Bug](https://github.com/PiyushSutar-570/NewsFlow/issues) · [Request Feature](https://github.com/PiyushSutar-570/NewsFlow/issues)

</div>

---

## ✨ Features

- 🗞️ **Live News Feed** — Fetches real-time headlines from the [GNews API](https://gnews.io) with graceful mock data fallback
- 🏷️ **Category Browsing** — Filter news across 7 topics: General, Technology, Business, Sports, Science, Health & Entertainment
- 🔍 **Full-Text Search** — Instantly search across articles by keyword
- 🔖 **Bookmarks** — Save and manage your favorite articles, persisted via `localStorage`
- 🌙 **Dark / Light Mode** — One-click theme toggle, preference saved across sessions
- 📰 **News Ticker** — Animated breaking-news ticker at the top of every page
- 🃏 **Hero Section** — Spotlight the top 5 articles in a visually rich hero layout
- 📱 **Responsive Design** — Fully mobile-friendly layout with hamburger menu
- ⚡ **Skeleton Loading** — Smooth skeleton screens while content loads
- 🔔 **Toast Notifications** — In-app feedback toasts for bookmark actions
- 🗂️ **Sidebar** — Trending articles sidebar on the home feed
- 📄 **Article Detail Page** — Dedicated full-width article reader view

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev) |
| Build Tool | [Vite 8](https://vitejs.dev) |
| Routing | [React Router v7](https://reactrouter.com) |
| HTTP Client | [Axios](https://axios-http.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Styling | Vanilla CSS with CSS custom properties |
| Linting | [OxLint](https://oxc.rs/docs/guide/usage/linter.html) |

---

## 📁 Project Structure

```
news-website/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   └── hero.png
│   ├── components/
│   │   ├── ArticleCard.jsx     # Reusable news card
│   │   ├── Footer.jsx          # Site footer
│   │   ├── HeroSection.jsx     # Featured articles hero
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── NewsTicker.jsx      # Breaking news ticker
│   │   ├── Sidebar.jsx         # Trending articles sidebar
│   │   ├── SkeletonCard.jsx    # Loading skeleton placeholder
│   │   └── Toast.jsx           # In-app toast notifications
│   ├── context/
│   │   └── AppContext.jsx      # Global state (theme, bookmarks, toasts)
│   ├── hooks/
│   │   └── useNews.js          # Custom hook for fetching & caching news
│   ├── pages/
│   │   ├── Home.jsx            # Homepage with hero + feed
│   │   ├── CategoryPage.jsx    # Category-filtered news feed
│   │   ├── ArticlePage.jsx     # Article detail reader
│   │   ├── SearchPage.jsx      # Keyword search results
│   │   └── BookmarksPage.jsx   # Saved bookmarks list
│   ├── utils/
│   │   ├── api.js              # GNews API integration + mock data
│   │   └── time.js             # Relative time formatting helpers
│   ├── App.jsx                 # Root component & route definitions
│   ├── index.css               # Global styles & design tokens
│   └── main.jsx                # App entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PiyushSutar-570/NewsFlow.git
   cd NewsFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 🔑 API Configuration

NewsFlow uses the **[GNews API](https://gnews.io)** to fetch live headlines.

- The API key is currently embedded in [`src/utils/api.js`](src/utils/api.js) for demonstration purposes.
- If the API limit is reached or the request fails, the app **automatically falls back** to a rich set of built-in mock articles — so it always works offline.

> **Tip:** To use your own API key, replace the `API_KEY` value in `src/utils/api.js` with your key from [gnews.io](https://gnews.io).

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Lint source files with OxLint |

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section + Latest stories feed |
| `/category/:category` | Category | Filtered news by topic |
| `/article` | Article | Full article reader (via query param) |
| `/search?q=...` | Search | Keyword search results |
| `/bookmarks` | Bookmarks | Saved/bookmarked articles |

---

## 🎨 Design Highlights

- **Dark-first design** with a polished light mode alternative
- **CSS Custom Properties** for a consistent, easy-to-modify design system
- **Glassmorphism** effects on the navbar and cards
- **Micro-animations** on hover, focus, and page transitions
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation support

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Piyush Sutar](https://github.com/PiyushSutar-570)

</div>
