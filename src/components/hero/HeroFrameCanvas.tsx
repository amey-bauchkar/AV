/**
 * src/components/hero/HeroFrameCanvas.tsx
 * High-performance HTML5 Canvas renderer with prioritized window preloading,
 * cached DPR scaling, zero layout thrashing, and buttery frame rendering.
 */

import React, { useEffect, useRef, useCallback } from 'react';
import type { HeroFrameEntry } from '../../lib/heroSequence';

interface HeroFrameCanvasProps {
  frameIndex: number;
  totalFrames: number;
  posterUrl: string;
  frames: HeroFrameEntry[];
}

// Scene keyframe anchor indices (1-based)
const KEYFRAME_ANCHORS = [1, 33, 73, 145, 217, 289];

export const HeroFrameCanvas: React.FC<HeroFrameCanvasProps> = ({
  frameIndex,
  totalFrames,
  posterUrl,
  frames,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const isLoadedRef = useRef<boolean[]>([]);
  const isRequestedRef = useRef<boolean[]>([]);
  const posterImageRef = useRef<HTMLImageElement | null>(null);
  const currentFrameRef = useRef<number>(frameIndex);
  const lastDrawnImageRef = useRef<HTMLImageElement | null>(null);

  // Cached canvas dimensions to completely eliminate layout thrashing
  const dimensionsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  // Sync ref with prop
  currentFrameRef.current = frameIndex;

  // Measure canvas dimensions without forcing layout inside drawFrame
  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    dimensionsRef.current = {
      width: rect.width,
      height: rect.height,
      dpr,
    };

    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
  }, []);

  // Request a specific frame by 1-based index
  const requestFrame = useCallback(
    (index: number) => {
      const idx = index - 1;
      if (idx < 0 || idx >= totalFrames) return;
      if (isRequestedRef.current[idx]) return;

      isRequestedRef.current[idx] = true;
      const img = new Image();
      img.src = frames[idx].path;
      img.onload = () => {
        isLoadedRef.current[idx] = true;
        // If user is currently near this frame, trigger a crisp redraw
        if (Math.abs(currentFrameRef.current - index) <= 1) {
          drawFrame(currentFrameRef.current);
        }
      };
      imagesRef.current[idx] = img;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frames, totalFrames]
  );

  // Draw frame to canvas
  const drawFrame = useCallback(
    (targetIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
      if (!ctx) return;

      // Ensure dimensions are initialized
      if (dimensionsRef.current.width === 0 || dimensionsRef.current.height === 0) {
        updateDimensions();
      }

      const { width, height, dpr } = dimensionsRef.current;
      if (width === 0 || height === 0) return;

      // 1. Resolve best image
      let imgToDraw: HTMLImageElement | null = null;
      const direct = imagesRef.current[targetIndex - 1];

      if (direct && direct.complete && direct.naturalWidth > 0) {
        imgToDraw = direct;
      } else {
        // Trigger load for target and surrounding window
        requestFrame(targetIndex);

        // Find nearest loaded frame
        const total = frames.length;
        for (let offset = 1; offset < total; offset++) {
          const prevIdx = targetIndex - 1 - offset;
          if (prevIdx >= 0) {
            const prev = imagesRef.current[prevIdx];
            if (prev && prev.complete && prev.naturalWidth > 0) {
              imgToDraw = prev;
              break;
            }
          }
          const nextIdx = targetIndex - 1 + offset;
          if (nextIdx < total) {
            const next = imagesRef.current[nextIdx];
            if (next && next.complete && next.naturalWidth > 0) {
              imgToDraw = next;
              break;
            }
          }
        }
      }

      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        imgToDraw = lastDrawnImageRef.current || posterImageRef.current;
      }

      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        return;
      }

      lastDrawnImageRef.current = imgToDraw;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Warm ivory backdrop fill for seamless edge blending
      ctx.fillStyle = '#F4F5EB';
      ctx.fillRect(0, 0, width, height);

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      // High-impact full-bleed cover framing centered on the products (responsive across mobile & desktop)
      const scale = Math.max(width / imgToDraw.naturalWidth, height / imgToDraw.naturalHeight);
      drawW = imgToDraw.naturalWidth * scale;
      drawH = imgToDraw.naturalHeight * scale;
      drawX = Math.round((width - drawW) / 2);
      drawY = Math.round((height - drawH) / 2);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(imgToDraw, drawX, drawY, drawW, drawH);

      ctx.restore();
    },
    [frames.length, requestFrame, updateDimensions]
  );

  // Initialize preloading on mount
  useEffect(() => {
    // 1. Initialize arrays
    isLoadedRef.current = new Array(totalFrames).fill(false);
    isRequestedRef.current = new Array(totalFrames).fill(false);
    imagesRef.current = new Array(totalFrames).fill(null);

    // 2. Measure dimensions
    updateDimensions();

    // 3. Load poster
    const poster = new Image();
    poster.src = posterUrl;
    poster.onload = () => {
      posterImageRef.current = poster;
      if (!lastDrawnImageRef.current) {
        drawFrame(1);
      }
    };
    posterImageRef.current = poster;

    // 4. Eagerly load opening frames (1..24)
    const initialBatch = Math.min(24, totalFrames);
    for (let i = 1; i <= initialBatch; i++) {
      requestFrame(i);
    }

    // 5. Eagerly load scene keyframes so chapter jumps never flash
    KEYFRAME_ANCHORS.forEach((anchor) => {
      requestFrame(anchor);
      if (anchor + 1 <= totalFrames) requestFrame(anchor + 1);
    });

    // 6. Initial paint
    drawFrame(1);

    // 7. Progressive background loader for remaining frames (in idle batches)
    let idleIndex = 25;
    let idleTimeoutId: number | null = null;

    const loadNextBatch = () => {
      const BATCH_SIZE = 8;
      let loadedInBatch = 0;

      while (idleIndex <= totalFrames && loadedInBatch < BATCH_SIZE) {
        if (!isRequestedRef.current[idleIndex - 1]) {
          requestFrame(idleIndex);
          loadedInBatch++;
        }
        idleIndex++;
      }

      if (idleIndex <= totalFrames) {
        idleTimeoutId = window.setTimeout(loadNextBatch, 80);
      }
    };

    idleTimeoutId = window.setTimeout(loadNextBatch, 200);

    // Resize listener
    const handleResize = () => {
      updateDimensions();
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (idleTimeoutId !== null) {
        clearTimeout(idleTimeoutId);
      }
    };
  }, [drawFrame, posterUrl, requestFrame, totalFrames, updateDimensions]);

  // Redraw and prioritize lookahead window when frameIndex changes
  useEffect(() => {
    // Prioritize lookahead window [frameIndex - 8 ... frameIndex + 20]
    const start = Math.max(1, frameIndex - 8);
    const end = Math.min(totalFrames, frameIndex + 20);
    for (let i = start; i <= end; i++) {
      requestFrame(i);
    }

    drawFrame(frameIndex);
  }, [drawFrame, frameIndex, requestFrame, totalFrames]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--color-warm-ivory, #F4F5EB)',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* Hidden SEO & Accessibility Fallback Poster Image */}
      <img
        src={posterUrl}
        alt="AV Corporate Giftings & Events - Bespoke Sustainable Executive Gifts & Thermal Drinkware"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      />
    </div>
  );
};
