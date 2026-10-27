import React, { useState } from 'react';

export interface QualityBenchmarkCardData {
  id: 'thermal' | 'binding' | 'bamboo' | 'adhesion';
  category: string;
  badge: string;
  options: string[];
  metricNumber: string;
  headline: string;
  description: string;
  capsules: {
    label: string;
    image: string;
  }[];
  index: number;
}

export const qualityBenchmarkCards: QualityBenchmarkCardData[] = [
  {
    id: 'thermal',
    category: 'Thermal QA',
    badge: 'SUS 304',
    options: ['SUS 304', 'Double-Wall', 'Copper Core'],
    metricNumber: '24h',
    headline: 'Thermal Drinkware Retention',
    description: '12-hour hot and 24-hour cold temperature retention guaranteed by vacuum-sealed double-wall 18/8 stainless steel chambers.',
    capsules: [
      { label: 'Vacuum Bottle', image: '/products/pix-1020-hero.png' },
      { label: 'Thermal Flask', image: '/products/pix-cola-500-wooden-hero.png' }
    ],
    index: 0
  },
  {
    id: 'binding',
    category: 'Binding QA',
    badge: '80 GSM',
    options: ['80 GSM', 'Acid-Free', 'Thermo-PU'],
    metricNumber: '80 GSM',
    headline: 'Executive Binding & Bleed-Free Paper',
    description: '80 GSM acid-free ivory sheets bound in flexible thermal PU covers with magnetic metal clasp plates engineered for debossing.',
    capsules: [
      { label: 'Executive Diary', image: '/products/pix-nb-101-hero.png' },
      { label: 'Leather Journal', image: '/products/pix-nb-105-pu-hero.png' }
    ],
    index: 1
  },
  {
    id: 'bamboo',
    category: 'Eco Material',
    badge: 'Organic',
    options: ['Organic', 'FSC Certified', 'Satin Finish'],
    metricNumber: '100%',
    headline: 'Renewable Natural Bamboo Grain',
    description: 'Organic grain selected bamboo finished with eco-friendly protective coats, combining natural aesthetics with high durability.',
    capsules: [
      { label: 'Bamboo Tumbler', image: '/products/pix-bmb-03-hero.png' },
      { label: 'Natural Wood Flask', image: '/products/pix-bmb-20-hero.png' }
    ],
    index: 2
  },
  {
    id: 'adhesion',
    category: 'Imprint QA',
    badge: 'Class 5B',
    options: ['Class 5B', 'Cross-Hatch', 'ASTM D3359'],
    metricNumber: '0 Flake',
    headline: 'Uniform Logo Adhesion Tested',
    description: 'Cross-hatch tape adhesion tested across fiber laser engraving, silkscreen inks, and UV flatbed curing for lifelong wear resistance.',
    capsules: [
      { label: 'Laser Etched Flask', image: '/products/pix-alu-bottle-hero.png' },
      { label: 'UV Coated Mug', image: '/products/pix-glass-pu-mug-hero.png' }
    ],
    index: 3
  }
];

export function ManufacturingBenchmarkCards() {
  const [selectedBadges, setSelectedBadges] = useState<Record<string, number>>({
    thermal: 0,
    binding: 0,
    bamboo: 0,
    adhesion: 0
  });

  const handleNextBadge = (id: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBadges((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % total
    }));
  };

  return (
    <div className="manufacturing-benchmarks-container">
      {/* Centered Section Header */}
      <div className="benchmarks-header-box">
        <div className="benchmarks-eyebrow-chip">● RIGID QUALITY PROTOCOLS</div>
        <h2 className="benchmarks-heading-title">Our Four Manufacturing Benchmarks</h2>
        <p className="benchmarks-heading-desc">
          Every product batch undergoes 100% QA inspection before custom branding and final packing.
        </p>
      </div>

      {/* 4 Glowing Atmospheric Cards Grid */}
      <div className="manufacturing-cards-grid">
        {qualityBenchmarkCards.map((card) => {
          const currentOptionIndex = selectedBadges[card.id] || 0;
          const currentBadge = card.options[currentOptionIndex];

          return (
            <div
              key={card.id}
              className="benchmark-grad-card"
              role="article"
              aria-label={card.category}
            >
              {/* Top Bar Header */}
              <div>
                <div className="card-top-bar">
                  <div className="card-category-group">
                    <div className="card-icon-circle">
                      {card.id === 'thermal' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                        </svg>
                      )}
                      {card.id === 'binding' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      )}
                      {card.id === 'bamboo' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                        </svg>
                      )}
                      {card.id === 'adhesion' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      )}
                    </div>
                    <span className="card-category-title">{card.category}</span>
                  </div>

                  <div className="card-actions-group">
                    <button
                      type="button"
                      className="card-pill-dropdown"
                      onClick={(e) => handleNextBadge(card.id, card.options.length, e)}
                      title="Toggle specification profile"
                    >
                      <span>{currentBadge}</span>
                      <span className="dropdown-caret">▾</span>
                    </button>
                    <div className="card-arrow-btn">↗</div>
                  </div>
                </div>

                {/* Big Stat Metric */}
                <div className="card-stat-wrap">
                  <div className="card-stat-number">
                    {card.metricNumber}
                    <span className="card-stat-arrow">↗</span>
                  </div>
                </div>

                {/* Headline & Body Copy */}
                <div className="card-copy-wrap">
                  <h3 className="card-bold-headline">{card.headline}</h3>
                  <p className="card-desc-text">{card.description}</p>
                </div>
              </div>

              {/* Bottom Visual Previews & Indicator Dashes */}
              <div className="card-bottom-section">
                <div className="card-capsules-row">
                  {card.capsules.map((cap, i) => (
                    <div
                      key={i}
                      className="card-capsule-item"
                      title={cap.label}
                    >
                      <img
                        src={cap.image}
                        alt={cap.label}
                        loading="lazy"
                        className="card-capsule-img"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination Dashes */}
                <div className="card-dashes-row" aria-hidden="true">
                  {[0, 1, 2, 3].map((dashIdx) => (
                    <div
                      key={dashIdx}
                      className={`card-dash-segment ${dashIdx === card.index ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .manufacturing-benchmarks-container {
          width: 100%;
          box-sizing: border-box;
          margin-bottom: var(--space-3xl);
        }

        .benchmarks-header-box {
          text-align: center;
          max-width: 760px;
          margin: 0 auto var(--space-2xl) auto;
        }

        .benchmarks-eyebrow-chip {
          display: inline-block;
          color: var(--color-accent);
          font-weight: 800;
          font-size: 0.76rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .benchmarks-heading-title {
          font-family: var(--font-heading);
          font-size: clamp(1.8rem, 3.2vw, 2.4rem);
          color: var(--color-primary);
          margin: 0 0 10px 0;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .benchmarks-heading-desc {
          font-family: var(--font-body);
          color: var(--color-text-muted);
          font-size: 0.96rem;
          margin: 0;
          line-height: 1.6;
        }

        .manufacturing-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
        }

        /* Atmospheric Glowing Card Matching PNZ FAS Copper & Archival Charcoal */
        .benchmark-grad-card {
          position: relative;
          border-radius: 28px;
          padding: 26px 22px 22px;
          min-height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          box-sizing: border-box;
          
          /* PNZ FAS signature Copper Obsidian Gradient with radiant ambient warmth */
          background: 
            radial-gradient(circle at 24% 20%, rgba(197, 90, 62, 0.94) 0%, rgba(163, 77, 51, 0.72) 34%, rgba(41, 41, 35, 0.5) 64%, transparent 84%),
            radial-gradient(circle at 14% 16%, rgba(244, 162, 138, 0.45) 0%, transparent 42%),
            linear-gradient(162deg, #2E2723 0%, #1E1A17 46%, #100E0D 100%);
          
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 
            0 20px 44px -10px rgba(16, 14, 13, 0.5),
            inset 0 1px 1px rgba(255, 255, 255, 0.28);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          cursor: pointer;
        }

        .benchmark-grad-card:hover {
          transform: translateY(-8px);
          border-color: rgba(244, 162, 138, 0.45);
          box-shadow: 
            0 32px 64px -12px rgba(16, 14, 13, 0.75),
            0 0 40px rgba(197, 90, 62, 0.38),
            inset 0 1px 2px rgba(255, 255, 255, 0.4);
        }

        /* Top Bar */
        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .card-category-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-icon-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.24);
          color: #FFFFFF;
          flex-shrink: 0;
        }

        .card-category-title {
          color: #FFFFFF;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .card-actions-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-pill-dropdown {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 9999px;
          padding: 6px 13px;
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .card-pill-dropdown:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.38);
        }

        .dropdown-caret {
          font-size: 0.68rem;
          opacity: 0.85;
          margin-left: 2px;
        }

        .card-arrow-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-size: 0.92rem;
          flex-shrink: 0;
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .benchmark-grad-card:hover .card-arrow-btn {
          background: rgba(255, 255, 255, 0.22);
          transform: scale(1.08);
        }

        /* Stat Typography */
        .card-stat-wrap {
          margin-bottom: 22px;
        }

        .card-stat-number {
          font-family: var(--font-heading);
          font-size: clamp(3.2rem, 3.8vw, 3.8rem);
          font-weight: 400;
          color: #FFFFFF;
          letter-spacing: -0.04em;
          line-height: 1;
          display: inline-flex;
          align-items: flex-start;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .card-stat-arrow {
          font-size: 1.35rem;
          margin-left: 4px;
          margin-top: 4px;
          opacity: 0.9;
          font-weight: 300;
        }

        /* Headline & Body Copy */
        .card-copy-wrap {
          margin-bottom: 22px;
        }

        .card-bold-headline {
          font-family: var(--font-heading);
          color: #FFFFFF;
          font-size: 1.05rem;
          font-weight: 500;
          line-height: 1.32;
          margin: 0 0 8px 0;
          letter-spacing: -0.025em;
        }

        .card-desc-text {
          font-family: var(--font-body);
          color: rgba(255, 255, 255, 0.76);
          font-size: 0.86rem;
          line-height: 1.55;
          margin: 0;
          font-weight: 400;
        }

        /* Horizontal Capsule Image Previews matching reference */
        .card-bottom-section {
          width: 100%;
        }

        .card-capsules-row {
          display: flex;
          gap: 10px;
          margin-bottom: 22px;
          width: 100%;
        }

        .card-capsule-item {
          flex: 1;
          height: 64px;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%);
          border: 1px solid rgba(255, 255, 255, 0.22);
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .card-capsule-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.35s ease;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
        }

        .benchmark-grad-card:hover .card-capsule-img {
          transform: scale(1.1);
        }

        /* Bottom Progress Dashes */
        .card-dashes-row {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-top: 4px;
          width: 100%;
        }

        .card-dash-segment {
          height: 3px;
          flex: 1;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.22);
          transition: background 0.3s ease;
        }

        .card-dash-segment.active {
          background: #FFFFFF;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1180px) {
          .manufacturing-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .benchmark-grad-card {
            min-height: 440px;
          }
        }

        @media (max-width: 640px) {
          .manufacturing-cards-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .benchmark-grad-card {
            padding: 24px 20px 20px;
            border-radius: 28px;
            min-height: auto;
          }
          .card-stat-number {
            font-size: 3.2rem;
          }
        }
      `}</style>
    </div>
  );
}
