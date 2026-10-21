/**
 * src/lib/heroSequence.ts
 * Mathematical, timing and manifest utilities for the AV Scroll Hero sequence.
 */

export interface HeroFrameEntry {
  masterIndex: number;
  filename: string;
  path: string;
  clipId: string;
  sourceFrameNumber: number;
  sizeBytes: number;
}

export interface HeroClipMeta {
  clipNumber: number;
  clipId: string;
  sourceVideo: string;
  sourceTotalFrames: number;
  sourceDurationSeconds: number;
  sourceFps: number;
  sampledFrameCount: number;
  sourceFrameRange: [number, number];
  masterFrameRange: [number, number];
  totalSizeBytes: number;
}

export interface HeroOverlayCta {
  label: string;
  href?: string;
  action?: 'openRfqModal';
}

export interface HeroSceneOverlay {
  badge: string;
  headlineLine1: string;
  headlineLine2: string;
  subtitle: string;
  ctaPrimary: HeroOverlayCta;
  ctaSecondary: HeroOverlayCta;
  opacityRange: [number, number, number, number]; // [inStart, inPeak, outStart, outEnd]
  alignment: 'left' | 'center' | 'right';
}

export interface HeroScene {
  sceneNumber: number;
  id: string;
  title: string;
  clipId: string;
  masterFrameRange: [number, number];
  progressRange: [number, number];
  primaryProduct: string;
  overlay: HeroSceneOverlay;
}

export interface HeroManifest {
  project: string;
  version: string;
  updatedAt: string;
  totalMasterFrames: number;
  resolution: {
    width: number;
    height: number;
    aspectRatio: string;
  };
  scrollPinnedHeight: string;
  totalPayloadBytes: number;
  totalPayloadMB: number;
  poster: {
    webp: string;
    jpg: string;
  };
  clips: Record<string, HeroClipMeta>;
  scenes: HeroScene[];
  frames: HeroFrameEntry[];
}

/**
 * Calculates normalized scroll progress [0.0, 1.0] given a container element.
 * Safe against zero division and bounding edge cases.
 */
export function calculateScrollProgress(
  containerTop: number,
  containerHeight: number,
  viewportHeight: number,
  offsetTop: number = 0
): number {
  const scrollDistance = containerHeight - viewportHeight;
  if (scrollDistance <= 0) return 0;

  // When containerTop aligns with offsetTop (e.g. below sticky header)
  const scrolled = offsetTop - containerTop;
  const progress = scrolled / scrollDistance;

  return Math.max(0, Math.min(1, progress));
}

/**
 * Deterministically maps normalized progress [0.0, 1.0] to a 1-based master frame index.
 */
export function progressToFrameIndex(progress: number, totalFrames: number): number {
  if (totalFrames <= 0) return 1;
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const rawIndex = Math.round(1 + clampedProgress * (totalFrames - 1));
  return Math.max(1, Math.min(totalFrames, rawIndex));
}

/**
 * Maps a frame index back to approximate normalized progress.
 */
export function frameIndexToProgress(frameIndex: number, totalFrames: number): number {
  if (totalFrames <= 1) return 0;
  const clampedIndex = Math.max(1, Math.min(totalFrames, frameIndex));
  return (clampedIndex - 1) / (totalFrames - 1);
}

/**
 * Returns the active scene corresponding to current progress.
 */
export function getActiveScene(progress: number, scenes: HeroScene[]): HeroScene {
  if (!scenes || scenes.length === 0) {
    throw new Error('No scenes provided in hero sequence');
  }

  const clamped = Math.max(0, Math.min(1, progress));

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const [start, end] = scene.progressRange;
    // Allow last scene to catch progress === 1.0
    if (i === scenes.length - 1) {
      if (clamped >= start && clamped <= end) return scene;
    } else {
      if (clamped >= start && clamped < end) return scene;
    }
  }

  return scenes[scenes.length - 1];
}

/**
 * Calculates trapezoidal opacity [0.0, 1.0] for a scene overlay given progress and [inStart, inPeak, outStart, outEnd].
 */
export function calculateSceneOpacity(
  progress: number,
  range: [number, number, number, number]
): number {
  const [inStart, inPeak, outStart, outEnd] = range;
  const p = Math.max(0, Math.min(1, progress));

  if (p < inStart || p > outEnd) {
    return 0;
  }

  // If inStart === inPeak (e.g. initial scene starting at 0.0)
  if (inStart === inPeak) {
    if (p <= outStart) return 1;
    if (outEnd === outStart) return 0;
    const t = (outEnd - p) / (outEnd - outStart);
    return Math.max(0, Math.min(1, t));
  }

  // Fade In phase
  if (p < inPeak) {
    const t = (p - inStart) / (inPeak - inStart);
    return Math.max(0, Math.min(1, t));
  }

  // Sustained Full Opacity phase
  if (p <= outStart) {
    return 1;
  }

  // Fade Out phase
  if (p <= outEnd) {
    if (outEnd === outStart) return 0;
    const t = (outEnd - p) / (outEnd - outStart);
    return Math.max(0, Math.min(1, t));
  }

  return 0;
}
