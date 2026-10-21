/**
 * src/components/hero/ScrollHero.tsx
 * Master scroll-controlled cinematic hero component for AV Corporate Giftings & Events.
 * Pinned 750vh container with sticky viewport, LERP-smoothed canvas scrubbing,
 * responsive live HTML/CSS overlays, and reduced-motion fallback.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import manifestData from '../../data/heroSequenceManifest.json';
import type { HeroManifest } from '../../lib/heroSequence';
import {
  calculateScrollProgress,
  progressToFrameIndex,
  getActiveScene,
} from '../../lib/heroSequence';
import { HeroFrameCanvas } from './HeroFrameCanvas';
import { HeroTextOverlays } from './HeroTextOverlays';
import { HeroScrollProgress } from './HeroScrollProgress';
import { Link } from 'react-router-dom';
import { useSmoothScroll } from '../layout/SmoothScrollProvider';

const manifest = manifestData as unknown as HeroManifest;
const HEADER_HEIGHT_PX = 0;

// Default fallback inertial smoothing coefficient
const DEFAULT_LERP_FACTOR = 0.08;
const LENIS_LERP_FACTOR = 0.18;

interface ScrollHeroProps {
  onOpenRfqModal: () => void;
}

export const ScrollHero: React.FC<ScrollHeroProps> = ({ onOpenRfqModal }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { lenis } = useSmoothScroll();

  // React state for UI rendering
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Physics & LERP animation tracking refs
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(1);
  const currentFrameFloatRef = useRef<number>(1);
  const lastRenderedFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);

  // 1. Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 2. Physics LERP Smoothing Engine
  const smoothStep = useCallback(() => {
    // When Lenis is active, window scroll is smoothly guided, so follow responsively
    const lerpFactor = lenis ? LENIS_LERP_FACTOR : DEFAULT_LERP_FACTOR;

    // Interpolate progress
    const progressDiff = targetProgressRef.current - currentProgressRef.current;
    currentProgressRef.current += progressDiff * lerpFactor;

    // Interpolate frame index
    const frameDiff = targetFrameRef.current - currentFrameFloatRef.current;
    currentFrameFloatRef.current += frameDiff * lerpFactor;

    const frameToDraw = Math.round(currentFrameFloatRef.current);

    if (frameToDraw !== lastRenderedFrameRef.current) {
      lastRenderedFrameRef.current = frameToDraw;
      setCurrentFrameIndex(frameToDraw);
    }

    setCurrentProgress(currentProgressRef.current);

    // Settle condition: snap when close enough and stop RAF loop to conserve CPU
    if (Math.abs(progressDiff) < 0.0002 && Math.abs(frameDiff) < 0.03) {
      currentProgressRef.current = targetProgressRef.current;
      currentFrameFloatRef.current = targetFrameRef.current;
      lastRenderedFrameRef.current = targetFrameRef.current;
      setCurrentProgress(targetProgressRef.current);
      setCurrentFrameIndex(targetFrameRef.current);
      rafIdRef.current = null;
      return;
    }

    rafIdRef.current = requestAnimationFrame(smoothStep);
  }, [lenis]);

  // 3. Passive Scroll Listener: updates targets and kicks off smoothing
  const handleScroll = useCallback(() => {
    if (prefersReducedMotion) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const progress = calculateScrollProgress(
      rect.top,
      rect.height,
      window.innerHeight,
      HEADER_HEIGHT_PX
    );
    const frameIdx = progressToFrameIndex(progress, manifest.totalMasterFrames);

    targetProgressRef.current = progress;
    targetFrameRef.current = frameIdx;

    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(smoothStep);
    }
  }, [prefersReducedMotion, smoothStep]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Listen to Lenis scroll if available, else native window scroll
    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial evaluation
    handleScroll();

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [handleScroll, lenis, prefersReducedMotion]);

  const currentScene = useMemo(() => {
    return getActiveScene(currentProgress, manifest.scenes);
  }, [currentProgress]);

  // -------------------------------------------------------------
  // REDUCED MOTION STATIC HERO FALLBACK
  // -------------------------------------------------------------
  if (prefersReducedMotion) {
    return (
      <section
        style={{
          position: 'relative',
          padding: 'clamp(40px, 6vw, 80px) 0',
          backgroundColor: 'var(--color-warm-ivory, #F4F5EB)',
          overflow: 'hidden',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(24px, 4vw, 48px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(21, 61, 37, 0.08)',
                    color: 'var(--color-primary, #153D25)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full, 9999px)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ color: 'var(--color-accent, #F12D18)' }}>●</span> Master Catalog
                  2024–2025
                </span>
              </div>

              <h1
                className="display-headline"
                style={{
                  margin: 0,
                  marginBottom: '16px',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '0.035em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ color: 'var(--color-accent, #F12D18)', display: 'block' }}>
                  GIFTS THAT
                </span>
                <span style={{ color: 'var(--color-primary, #153D25)', display: 'block' }}>
                  MAKE AN IMPACT
                </span>
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                  color: 'var(--color-text-body, #2A362E)',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                  marginBottom: '28px',
                }}
              >
                Direct B2B supply of certified food-grade SUS 304 thermal drinkware, 80 GSM
                executive stationery, precision-crafted writing instruments, and curated corporate gift sets.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link
                  to="/products"
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
                  }}
                >
                  <span>Explore Catalog</span>
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
                  }}
                >
                  <span>Request a Quote</span>
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

            <div>
              <img
                src={manifest.poster.webp}
                alt="AV Corporate Giftings & Events - Executive Hero Collection"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-2xl, 24px)',
                  boxShadow: '0 20px 40px -15px rgba(21, 61, 37, 0.25)',
                  border: '1px solid rgba(21, 61, 37, 0.08)',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // -------------------------------------------------------------
  // MASTER SCROLL-CONTROLLED CINEMATIC HERO
  // -------------------------------------------------------------
  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: manifest.scrollPinnedHeight || '750vh',
        backgroundColor: 'var(--color-warm-ivory, #F4F5EB)',
      }}
      aria-label="Interactive cinematic product showcase"
    >
      {/* Sticky Viewport positioned full-bleed across viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'var(--color-warm-ivory, #F4F5EB)',
        }}
      >
        {/* HTML5 Canvas Frame Scrubbing Engine */}
        <HeroFrameCanvas
          frameIndex={currentFrameIndex}
          totalFrames={manifest.totalMasterFrames}
          posterUrl={manifest.poster.webp}
          frames={manifest.frames}
        />

        {/* Live Synchronized HTML/CSS Text Overlays */}
        <HeroTextOverlays
          scenes={manifest.scenes}
          currentProgress={currentProgress}
          onOpenRfqModal={onOpenRfqModal}
        />

        {/* Minimalist Editorial Progress & Chapter Indicator */}
        <HeroScrollProgress
          currentProgress={currentProgress}
          currentScene={currentScene}
          totalScenes={manifest.scenes.length}
        />
      </div>
    </section>
  );
};
