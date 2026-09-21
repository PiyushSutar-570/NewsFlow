import { useEffect, useRef } from 'react';

const TICKER_ITEMS = [
  "🔴 BREAKING: Global AI Summit Announces Historic Regulatory Framework for Advanced AI Systems",
  "📈 Markets Hit All-Time High as Tech Sector Leads Broad Rally Across Major Indices",
  "🚀 SpaceX Successfully Launches 200th Falcon 9 Mission in a Single Calendar Year",
  "🧬 Scientists Announce Breakthrough in Alzheimer's Research with New Treatment Protocol",
  "⚽ FIFA Confirms Record 5 Billion Viewers Expected for 2026 World Cup Opening Ceremony",
  "🌍 UN Climate Report: Renewable Energy Now Cheaper Than Fossil Fuels in 90% of Countries",
  "💊 FDA Approves Revolutionary Cancer Treatment with 95% Success Rate in Late-Stage Trials",
  "🎬 Box Office Records Shattered as Anticipated Sequel Earns $1.2 Billion Opening Weekend",
];

export default function NewsTicker() {
  const trackRef = useRef(null);

  return (
    <div className="news-ticker" role="marquee" aria-label="Breaking news ticker">
      <div className="ticker-inner container">
        <span className="ticker-label">Breaking</span>
        <div className="ticker-track">
          <div className="ticker-content" ref={trackRef}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="ticker-item">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
