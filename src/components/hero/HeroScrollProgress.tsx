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
      {/* Chapter Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'transparent',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full, 9999px)',
          border: '1px solid rgba(21, 61, 37, 0.15)',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-primary, #153D25)',
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
          height: '3px',
          backgroundColor: 'rgba(21, 61, 37, 0.12)',
          borderRadius: '3px',
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
            backgroundColor: 'var(--color-accent, #F12D18)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>
    </div>
  );
};
