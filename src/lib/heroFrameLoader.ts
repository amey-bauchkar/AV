/**
 * src/lib/heroFrameLoader.ts
 * Bounded, prioritized frame loader with LRU eviction and smooth fallback.
 */

import type { HeroFrameEntry } from './heroSequence';

export class HeroFrameLoader {
  private frames: HeroFrameEntry[];
  private cache: Map<number, HTMLImageElement> = new Map();
  private inFlight: Map<number, Promise<HTMLImageElement>> = new Map();
  private maxCacheSize: number;
  private posterImage: HTMLImageElement | null = null;
  private lastRenderedIndex: number = 1;
  private onFrameLoadedCallback?: (frameIndex: number) => void;

  constructor(
    frames: HeroFrameEntry[],
    posterUrl?: string,
    maxCacheSize: number = 80,
    onFrameLoaded?: (frameIndex: number) => void
  ) {
    this.frames = frames;
    this.maxCacheSize = maxCacheSize;
    this.onFrameLoadedCallback = onFrameLoaded;

    if (posterUrl) {
      const img = new Image();
      img.src = posterUrl;
      this.posterImage = img;
    }
  }

  /**
   * Preloads the initial window of opening frames (1..20) for instant startup.
   */
  public preloadInitialWindow(count: number = 20): Promise<void> {
    const promises: Promise<HTMLImageElement>[] = [];
    const limit = Math.min(count, this.frames.length);

    for (let i = 1; i <= limit; i++) {
      promises.push(this.loadFrame(i));
    }

    return Promise.allSettled(promises).then(() => undefined);
  }

  /**
   * Gets a frame if already cached and decoded.
   * If not ready, triggers prioritized loading for the frame and surrounding window,
   * while returning the closest available frame so the canvas never flashes blank.
   */
  public getFrame(index: number): {
    image: HTMLImageElement | null;
    isExact: boolean;
    resolvedIndex: number;
  } {
    const clampedIndex = Math.max(1, Math.min(this.frames.length, index));

    // Request load for current and lookahead window
    this.prioritizeWindow(clampedIndex);

    // 1. Exact match in cache
    const exact = this.cache.get(clampedIndex);
    if (exact && exact.complete && exact.naturalWidth > 0) {
      this.lastRenderedIndex = clampedIndex;
      return { image: exact, isExact: true, resolvedIndex: clampedIndex };
    }

    // 2. Fall back to last rendered frame if still in cache
    const last = this.cache.get(this.lastRenderedIndex);
    if (last && last.complete && last.naturalWidth > 0) {
      return { image: last, isExact: false, resolvedIndex: this.lastRenderedIndex };
    }

    // 3. Search closest cached frame
    let closestIndex = -1;
    let minDistance = Infinity;

    for (const [cachedIdx, img] of this.cache.entries()) {
      if (img.complete && img.naturalWidth > 0) {
        const dist = Math.abs(cachedIdx - clampedIndex);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = cachedIdx;
        }
      }
    }

    if (closestIndex !== -1) {
      const closest = this.cache.get(closestIndex)!;
      this.lastRenderedIndex = closestIndex;
      return { image: closest, isExact: false, resolvedIndex: closestIndex };
    }

    // 4. Fall back to poster image
    if (this.posterImage && this.posterImage.complete && this.posterImage.naturalWidth > 0) {
      return { image: this.posterImage, isExact: false, resolvedIndex: 1 };
    }

    return { image: null, isExact: false, resolvedIndex: 1 };
  }

  /**
   * Loads a specific frame by 1-based index with deduplicated in-flight promise.
   */
  public loadFrame(index: number): Promise<HTMLImageElement> {
    const clampedIndex = Math.max(1, Math.min(this.frames.length, index));

    // Check cache
    if (this.cache.has(clampedIndex)) {
      return Promise.resolve(this.cache.get(clampedIndex)!);
    }

    // Check in-flight
    if (this.inFlight.has(clampedIndex)) {
      return this.inFlight.get(clampedIndex)!;
    }

    const frameEntry = this.frames[clampedIndex - 1];
    if (!frameEntry) {
      return Promise.reject(new Error(`Frame entry ${clampedIndex} out of bounds`));
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.inFlight.delete(clampedIndex);
        this.cache.set(clampedIndex, img);
        this.enforceCacheLimit(clampedIndex);
        if (this.onFrameLoadedCallback) {
          this.onFrameLoadedCallback(clampedIndex);
        }
        resolve(img);
      };
      img.onerror = () => {
        this.inFlight.delete(clampedIndex);
        // Do not throw unhandled exception; resolve to closest cached or reject cleanly
        reject(new Error(`Failed to load frame ${clampedIndex} at ${frameEntry.path}`));
      };
      img.src = frameEntry.path;
    });

    this.inFlight.set(clampedIndex, promise);
    return promise;
  }

  /**
   * Prioritizes the window around the current index:
   * [current - 4 ... current + 12] in scroll direction.
   */
  public prioritizeWindow(currentIndex: number, lookahead: number = 14, lookbehind: number = 5): void {
    const start = Math.max(1, currentIndex - lookbehind);
    const end = Math.min(this.frames.length, currentIndex + lookahead);

    // Load active index first
    this.loadFrame(currentIndex).catch(() => {});

    // Then load forward window
    for (let i = currentIndex + 1; i <= end; i++) {
      this.loadFrame(i).catch(() => {});
    }

    // Then backward window
    for (let i = currentIndex - 1; i >= start; i--) {
      this.loadFrame(i).catch(() => {});
    }
  }

  /**
   * Evicts cached frames farthest from the target index when exceeding maxCacheSize.
   */
  private enforceCacheLimit(pivotIndex: number): void {
    if (this.cache.size <= this.maxCacheSize) return;

    // Collect indices and sort by distance from pivotIndex descending
    const indices = Array.from(this.cache.keys());
    indices.sort((a, b) => Math.abs(b - pivotIndex) - Math.abs(a - pivotIndex));

    const removeCount = this.cache.size - this.maxCacheSize;
    for (let i = 0; i < removeCount; i++) {
      // Never evict frame 1 (hero anchor)
      if (indices[i] !== 1) {
        this.cache.delete(indices[i]);
      }
    }
  }

  public getCacheStats(): { cachedCount: number; maxCacheSize: number; inFlightCount: number } {
    return {
      cachedCount: this.cache.size,
      maxCacheSize: this.maxCacheSize,
      inFlightCount: this.inFlight.size,
    };
  }

  public destroy(): void {
    this.cache.clear();
    this.inFlight.clear();
    this.posterImage = null;
    this.onFrameLoadedCallback = undefined;
  }
}
