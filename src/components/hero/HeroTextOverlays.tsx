/**
 * src/components/hero/HeroTextOverlays.tsx
 * Live semantic HTML/CSS overlays synchronized with scroll progress.
 * Renders bold, condensed typography and functional CTAs without baking text into video.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import type { HeroScene } from '../../lib/heroSequence';
import { calculateSceneOpacity } from '../../lib/heroSequence';

interface HeroTextOverlaysProps {
  scenes: HeroScene[];
  currentProgress: number;
  onOpenRfqModal: () => void;
}

export const HeroTextOverlays: React.FC<HeroTextOverlaysProps> = ({
  scenes,
  currentProgress,
  onOpenRfqModal,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div className="container" style={{ position: 'relative', width: '100%', height: '100%' }}>
        {scenes.map((scene) => {
          const opacity = calculateSceneOpacity(currentProgress, scene.overlay.opacityRange);

          // Skip completely invisible scenes from rendering or tab index
          if (opacity <= 0.01) {
            return null;
          }

          // Subtle parallax vertical shift based on opacity
          const translateY = (1 - opacity) * 12;

          return (
            <div
              key={scene.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: '64px',
                opacity,
                transform: `translateY(${translateY}px)`,
                transition: 'opacity 0.05s linear, transform 0.05s linear',
                pointerEvents: opacity > 0.4 ? 'auto' : 'none',
              }}
            >
              <div
                style={{
                  maxWidth: '580px',
                }}
              >
                {/* Reference Tagline */}
                <div style={{ marginBottom: 'clamp(8px, 1.5vw, 14px)' }}>
                  <span
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--color-primary, #153D25)',
                      padding: 0,
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ color: 'var(--color-accent, #F12D18)' }}>●</span>{' '}
                    {scene.overlay.badge}
                  </span>
                </div>

                {/* Bold Condensed Display Headline (Line 1 Vermilion, Line 2 Forest Green) */}
                <h1
                  className="display-headline"
                  style={{
                    margin: 0,
                    marginBottom: 'clamp(8px, 1.2vw, 14px)',
                    fontSize: 'clamp(2.1rem, 6.5vw, 4.4rem)',
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: '0.035em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span style={{ color: 'var(--color-accent, #F12D18)', display: 'block' }}>
                    {scene.overlay.headlineLine1}
                  </span>
                  <span style={{ color: 'var(--color-primary, #153D25)', display: 'block' }}>
                    {scene.overlay.headlineLine2}
                  </span>
                </h1>

                {/* Supporting Editorial Subtitle */}
                <p
                  style={{
                    fontSize: 'clamp(0.95rem, 1.35vw, 1.15rem)',
                    color: 'var(--color-text-body, #2A362E)',
                    lineHeight: 1.55,
                    marginBottom: 'clamp(18px, 2.5vw, 28px)',
                    fontWeight: 500,
                  }}
                >
                  {scene.overlay.subtitle}
                </p>

                {/* Functional CTAs */}
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  {scene.overlay.ctaPrimary.href && (
                    <Link
                      to={scene.overlay.ctaPrimary.href}
                      className="btn-pill-primary"
                      style={{
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        backgroundColor: 'var(--color-primary, #153D25)',
                        color: '#FFFFFF',
                        padding: '10px 14px 10px 22px',
                        borderRadius: 'var(--radius-full, 9999px)',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 14px rgba(21, 61, 37, 0.25)',
                      }}
                    >
                      <span>{scene.overlay.ctaPrimary.label}</span>
                      <span
                        className="btn-pill-circle"
                        aria-hidden="true"
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: 'var(--color-accent, #F12D18)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={onOpenRfqModal}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: 'transparent',
                      color: 'var(--color-primary, #153D25)',
                      padding: '10px 14px 10px 22px',
                      borderRadius: 'var(--radius-full, 9999px)',
                      border: '1.5px solid var(--color-primary, #153D25)',
                      fontFamily: 'inherit',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(21, 61, 37, 0.06)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>{scene.overlay.ctaSecondary.label}</span>
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'var(--color-primary, #153D25)',
                        color: '#FFFFFF',
                        borderRadius: 'var(--radius-full, 9999px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
