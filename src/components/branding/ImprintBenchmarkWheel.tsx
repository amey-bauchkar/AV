import React, { useState } from 'react';

export interface BenchmarkCardData {
  id: 'laser' | 'silkscreen' | 'uv' | 'debossing';
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

export const benchmarkCards: BenchmarkCardData[] = [
  {
    id: 'laser',
    category: 'Fiber Laser',
    badge: 'SUS 304',
    options: ['SUS 304', 'Bamboo', 'Alloy'],
    metricNumber: '0.1mm',
    headline: 'Permanent Micron Etch on Steel & Bamboo',
    description: 'Precision beam vaporization removes surface coating for lustrous steel or charred bamboo with permanent scratch-proof precision.',
    capsules: [
      { label: 'Thermal Flask', image: '/products/pix-1020-hero.png' },
      { label: 'Natural Bamboo', image: '/products/pix-bmb-03-hero.png' }
    ],
    index: 0
  },
  {
    id: 'silkscreen',
    category: 'Silkscreen',
    badge: 'Pantone',
    options: ['Pantone', 'Coated', 'Matte Poly'],
    metricNumber: '100%',
    headline: 'High-Opacity Pantone Color Matching',
    description: 'Industrial polyurethane inks deliver maximum pigment opacity and sharp corporate color coverage on curved drinkware.',
    capsules: [
      { label: 'Curved Drinkware', image: '/products/pix-cola-500-wooden-hero.png' },
      { label: 'Water Bottle', image: '/products/pix-3003-hero.png' }
    ],
    index: 1
  },
  {
    id: 'uv',
    category: 'UV Digital',
    badge: 'CMYK',
    options: ['CMYK', 'Gloss', 'Embossed'],
    metricNumber: '1200+',
    headline: 'Instant UV Flatbed with Raised Clear Gloss',
    description: 'Ultraviolet LED curing for photographic color gradients, vibrant multi-hue crests, and tactile embossed clear gloss accents.',
    capsules: [
      { label: 'Full Color Crests', image: '/products/pix-uv-sip-hero.png' },
      { label: 'Tactile Gloss Accents', image: '/products/pix-glass-pu-mug-hero.png' }
    ],
    index: 2
  },
  {
    id: 'debossing',
    category: 'Deboss & Foil',
    badge: 'Brass Die',
    options: ['Brass Die', 'Gold Foil', 'Thermal PU'],
    metricNumber: '3D',
    headline: 'Blind Debossing & Foil on Thermal Leather',
    description: 'CNC brass dies stamp deep tactile impressions and metallic foil into thermal PU leather and executive folios with lasting relief.',
    capsules: [
      { label: 'Hardbound Diaries', image: '/products/pix-nb-101-hero.png' },
      { label: 'Executive Folios', image: '/products/pix-nb-105-pu-hero.png' }
    ],
    index: 3
  }
];

export function ImprintBenchmarkWheel() {
  const [selectedSubstrates, setSelectedSubstrates] = useState<Record<string, number>>({
    laser: 0,
    silkscreen: 0,
    uv: 0,
    debossing: 0
  });

  const handleNextSubstrate = (id: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSubstrates((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % total
    }));
  };

  return (
    <div className="imprint-gradient-cards-container">
      <div className="benchmark-cards-grid">
        {benchmarkCards.map((card) => {
          const currentOptionIndex = selectedSubstrates[card.id] || 0;
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
                      {card.id === 'laser' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3"></circle>
                          <line x1="12" y1="2" x2="12" y2="6"></line>
                          <line x1="12" y1="18" x2="12" y2="22"></line>
                          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                          <line x1="2" y1="12" x2="6" y2="12"></line>
                          <line x1="18" y1="12" x2="22" y2="12"></line>
                        </svg>
                      )}
                      {card.id === 'silkscreen' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                        </svg>
                      )}
                      {card.id === 'uv' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 17 12 22 22 17"></polyline>
                          <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                      )}
                      {card.id === 'debossing' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <path d="M9 9h6v6H9z"></path>
                        </svg>
                      )}
                    </div>
                    <span className="card-category-title">{card.category}</span>
                  </div>

                  <div className="card-actions-group">
                    <button
                      type="button"
                      className="card-pill-dropdown"
                      onClick={(e) => handleNextSubstrate(card.id, card.options.length, e)}
                      title="Toggle substrate profile"
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
        .imprint-gradient-cards-container {
          width: 100%;
          box-sizing: border-box;
        }

        .benchmark-cards-grid {
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
          letter-spacing: -0.05em;
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
          .benchmark-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .benchmark-grad-card {
            min-height: 440px;
          }
        }

        @media (max-width: 640px) {
          .benchmark-cards-grid {
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
