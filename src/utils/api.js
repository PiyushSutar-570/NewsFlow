const GNEWS_BASE = 'https://gnews.io/api/v4';
const API_KEY = '0c3c3a00ce7ed968bb7da5e9eb0b9c41';

const MOCK_ARTICLES = [
  {
    title: "Global Tech Giants Unveil Revolutionary AI Systems That Could Reshape Every Industry",
    description: "Leading technology companies have simultaneously announced breakthrough artificial intelligence platforms that promise to transform healthcare, finance, and education within the next decade.",
    content: "In an unprecedented series of announcements, the world's largest technology companies have unveiled AI systems that researchers are calling the most significant leap forward in machine learning history...",
    url: "https://example.com/ai-revolution",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { name: "TechCrunch", url: "https://techcrunch.com" },
    category: "technology"
  },
  {
    title: "Scientists Discover Massive Underground Ocean on Jupiter's Moon That Could Harbor Life",
    description: "NASA's latest data from the Europa Clipper mission reveals a vast liquid water ocean beneath the icy surface, with conditions remarkably similar to Earth's deep-sea hydrothermal vents.",
    content: "In what many scientists are calling the most exciting discovery in decades, data from the Europa Clipper spacecraft has confirmed the existence of a massive underground ocean...",
    url: "https://example.com/europa-ocean",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { name: "NASA Science", url: "https://nasa.gov" },
    category: "science"
  },
  {
    title: "Global Markets Surge as Central Banks Signal End to Rate Hike Cycle",
    description: "Stock markets worldwide rallied sharply after coordinated statements from the Federal Reserve, ECB, and Bank of England suggested the aggressive monetary tightening period may be nearing its conclusion.",
    content: "Financial markets erupted in celebration as major central banks issued coordinated guidance suggesting the prolonged period of interest rate increases is approaching its end...",
    url: "https://example.com/markets-surge",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { name: "Financial Times", url: "https://ft.com" },
    category: "business"
  },
  {
    title: "Breakthrough Gene Therapy Cures Previously Untreatable Genetic Disorders in Clinical Trials",
    description: "A revolutionary gene-editing technique using next-generation CRISPR technology has shown 94% success rates in eliminating inherited diseases that have plagued families for generations.",
    content: "Medical researchers have achieved what many thought impossible just a decade ago: a reliable cure for dozens of serious genetic disorders using precision gene-editing technology...",
    url: "https://example.com/gene-therapy",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { name: "Nature Medicine", url: "https://nature.com" },
    category: "health"
  },
  {
    title: "Electric Vehicle Charging Network Reaches Million-Station Milestone Across North America",
    description: "The collective EV charging infrastructure across the United States and Canada has surpassed one million charging points, marking a pivotal moment in the clean energy transportation revolution.",
    content: "In a landmark achievement for sustainable transportation, the combined electric vehicle charging network across North America has reached the one million station milestone...",
    url: "https://example.com/ev-milestone",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { name: "CleanTech", url: "https://cleantechnica.com" },
    category: "technology"
  },
  {
    title: "World Cup 2026 Preparations Accelerate as Host Cities Reveal Stunning New Stadiums",
    description: "The three host nations — USA, Canada, and Mexico — have unveiled breathtaking new and renovated stadium designs that promise to make the 2026 FIFA World Cup the most spectacular ever.",
    content: "With less than two years until kickoff, the preparations for the 2026 FIFA World Cup are moving into high gear, with host cities revealing stunning stadium designs...",
    url: "https://example.com/world-cup-2026",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { name: "ESPN", url: "https://espn.com" },
    category: "sports"
  },
  {
    title: "Streaming Wars Intensify as Major Studios Announce Mega-Budget Original Series",
    description: "Hollywood studios are doubling down on streaming investments with a wave of high-budget original productions that could reshape the entertainment landscape for years to come.",
    content: "The streaming wars have entered a new phase, with major studios committing billions of dollars to original content that rivals the production values of blockbuster theatrical films...",
    url: "https://example.com/streaming-wars",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source: { name: "Variety", url: "https://variety.com" },
    category: "entertainment"
  },
  {
    title: "Quantum Computing Achieves Commercial Viability with 1000-Qubit Processor Launch",
    description: "A leading quantum computing firm has commercially launched the world's first 1000-qubit processor, solving optimization problems in minutes that would take classical computers millennia.",
    content: "The quantum computing industry has reached a critical inflection point with the commercial launch of a 1000-qubit processor that delivers practical advantages over classical supercomputers...",
    url: "https://example.com/quantum-computing",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { name: "MIT Tech Review", url: "https://technologyreview.com" },
    category: "technology"
  },
  {
    title: "Amazon Rainforest Shows Signs of Unprecedented Recovery Thanks to Global Conservation Effort",
    description: "International conservation organizations report that coordinated efforts to restore deforested areas of the Amazon have led to the fastest natural regeneration rates ever recorded.",
    content: "In a rare piece of encouraging environmental news, scientists monitoring the Amazon rainforest have detected unprecedented rates of natural forest regeneration in areas previously cleared for agriculture...",
    url: "https://example.com/amazon-recovery",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    source: { name: "The Guardian", url: "https://guardian.com" },
    category: "science"
  },
  {
    title: "New Mental Health Platform Reaches 50 Million Users With AI-Powered Therapy Sessions",
    description: "A groundbreaking digital mental health platform combining AI conversation therapy with human therapist oversight has achieved 50 million active users, democratizing mental healthcare access globally.",
    content: "A digital mental health startup that launched just three years ago has reached an extraordinary milestone, with 50 million people around the world now using its AI-assisted therapy platform...",
    url: "https://example.com/mental-health-ai",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { name: "Health Tech", url: "https://healthtech.com" },
    category: "health"
  },
  {
    title: "SpaceX Starship Successfully Completes First Crewed Lunar Orbit Mission",
    description: "In a historic achievement, SpaceX's Starship carried four astronauts on a successful loop around the Moon, marking humanity's first crewed lunar mission in over half a century.",
    content: "SpaceX has achieved what many thought would take much longer, successfully completing a crewed lunar orbit mission with four astronauts aboard the Starship spacecraft...",
    url: "https://example.com/starship-moon",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    source: { name: "Space.com", url: "https://space.com" },
    category: "science"
  },
  {
    title: "Global Music Streaming Revenue Surpasses $50 Billion as Artists Demand Fair Share",
    description: "The music streaming industry has hit a new revenue milestone, but a growing movement of artists and songwriters is pushing platforms for higher royalty rates and more transparent payment systems.",
    content: "The global music streaming industry has reached a landmark $50 billion in annual revenue, yet many artists are seeing little of this windfall, prompting an increasingly vocal campaign for reform...",
    url: "https://example.com/music-streaming",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { name: "Billboard", url: "https://billboard.com" },
    category: "entertainment"
  },
];

const CATEGORIES = ['general', 'technology', 'business', 'sports', 'entertainment', 'science', 'health'];

async function fetchFromGNews(query, category, page = 1) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    lang: 'en',
    max: '10',
    page: page.toString(),
  });
  if (query) params.set('q', query);
  if (category && category !== 'general') params.set('topic', getCategoryTopic(category));

  const endpoint = query
    ? `${GNEWS_BASE}/search?${params}`
    : `${GNEWS_BASE}/top-headlines?${params}`;

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return (data.articles || []).map(a => ({ ...a, category: category || 'general' }));
}

function getCategoryTopic(category) {
  const map = {
    technology: 'technology',
    business: 'business',
    sports: 'sports',
    entertainment: 'entertainment',
    science: 'science',
    health: 'health',
  };
  return map[category] || 'breaking-news';
}

export async function fetchNews({ category = 'general', query = '', page = 1 } = {}) {
  try {
    const articles = await fetchFromGNews(query, category, page);
    if (articles.length > 0) return articles;
  } catch {}
  let results = MOCK_ARTICLES;
  if (category && category !== 'general') {
    results = MOCK_ARTICLES.filter(a => a.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    results = MOCK_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q)
    );
  }
  return results;
}

export { CATEGORIES, MOCK_ARTICLES };
