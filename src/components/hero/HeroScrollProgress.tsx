/**
 * src/components/hero/HeroScrollProgress.tsx
 * Minimalist luxury progress bar and chapter indicator for the cinematic sequence.
 */

import React from 'react';
import type { HeroScene } from '../../lib/heroSequence';

interface HeroScrollProgressProps {
  currentProgress: number;
  currentScene: HeroScene;
  totalScenes: number;
}

export const HeroScrollProgress: React.FC<HeroScrollProgressProps> = ({
  currentProgress,
  currentScene,
  totalScenes,
}) => {
  const percent = Math.round(currentProgress * 100);

  return (
    <div
      aria-label="Cinematic sequence scroll progress"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'absolute',
        bottom: 'clamp(20px, 3.5vw, 36px)',
        right: 'clamp(20px, 4vw, 48px)',
        zIndex: 20,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '6px',
      }}
    >
      {/* Chapter Indicator (PNZ FAS style: tabular numbers, muted tone, hairline border) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--paper-light, #FCFBF8)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full, 9999px)',
          border: '1px solid var(--line, #D6D3C8)',
          fontSize: '11px',
          fontVariantNumeric: 'tabular-nums',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          color: 'var(--muted, #66645A)',
          letterSpacing: '0.04em',
        }}
      >
        <span>
          0{currentScene.sceneNumber} / 0{totalScenes}
        </span>
      </div>

      {/* Progress Bar Track */}
      <div
        style={{
          width: '140px',
          height: '2px',
          backgroundColor: 'var(--line-light, #EEEBE3)',
          borderRadius: '1px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${percent}%`,
            backgroundColor: 'var(--copper, #A34D33)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>
    </div>
  );
};
