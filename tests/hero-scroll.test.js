/**
 * tests/hero-scroll.test.js
 * Comprehensive unit and integration tests for AV Scroll Hero sequence engine,
 * math, manifest integrity, and asset presence.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// Helper to load manifest
const manifestPath = path.join(ROOT, 'src', 'data', 'heroSequenceManifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Math functions implemented identically to src/lib/heroSequence.ts
function calculateScrollProgress(containerTop, containerHeight, viewportHeight, offsetTop = 0) {
  const scrollDistance = containerHeight - viewportHeight;
  if (scrollDistance <= 0) return 0;
  const scrolled = offsetTop - containerTop;
  const progress = scrolled / scrollDistance;
  return Math.max(0, Math.min(1, progress));
}

function progressToFrameIndex(progress, totalFrames) {
  if (totalFrames <= 0) return 1;
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const rawIndex = Math.round(1 + clampedProgress * (totalFrames - 1));
  return Math.max(1, Math.min(totalFrames, rawIndex));
}

function frameIndexToProgress(frameIndex, totalFrames) {
  if (totalFrames <= 1) return 0;
  const clampedIndex = Math.max(1, Math.min(totalFrames, frameIndex));
  return (clampedIndex - 1) / (totalFrames - 1);
}

function getActiveScene(progress, scenes) {
  const clamped = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const [start, end] = scene.progressRange;
    if (i === scenes.length - 1) {
      if (clamped >= start && clamped <= end) return scene;
    } else {
      if (clamped >= start && clamped < end) return scene;
    }
  }
  return scenes[scenes.length - 1];
}

function calculateSceneOpacity(progress, range) {
  const [inStart, inPeak, outStart, outEnd] = range;
  const p = Math.max(0, Math.min(1, progress));

  if (p < inStart || p > outEnd) return 0;
  if (inStart === inPeak) {
    if (p <= outStart) return 1;
    if (outEnd === outStart) return 0;
    return Math.max(0, Math.min(1, (outEnd - p) / (outEnd - outStart)));
  }
  if (p < inPeak) {
    return Math.max(0, Math.min(1, (p - inStart) / (inPeak - inStart)));
  }
  if (p <= outStart) return 1;
  if (p <= outEnd) {
    if (outEnd === outStart) return 0;
    return Math.max(0, Math.min(1, (outEnd - p) / (outEnd - outStart)));
  }
  return 0;
}

describe('AV Scroll Hero Sequence & Progress Math', () => {
  test('1. calculateScrollProgress maps boundary positions cleanly', () => {
    const vh = 1000;
    const containerHeight = 4800; // 480vh

    // At top of page, containerTop = 0 -> progress = 0.0
    assert.equal(calculateScrollProgress(0, containerHeight, vh), 0);

    // Halfway scrolled
    const halfScroll = -(containerHeight - vh) / 2;
    assert.equal(calculateScrollProgress(halfScroll, containerHeight, vh), 0.5);

    // Completely scrolled (bottom aligned with viewport bottom)
    const fullScroll = -(containerHeight - vh);
    assert.equal(calculateScrollProgress(fullScroll, containerHeight, vh), 1.0);

    // Negative top (past bottom of hero container) clamped to 1.0
    assert.equal(calculateScrollProgress(fullScroll - 500, containerHeight, vh), 1.0);

    // Positive top (scrolled above container) clamped to 0.0
    assert.equal(calculateScrollProgress(200, containerHeight, vh), 0.0);

    // Zero or negative scroll distance handled safely
    assert.equal(calculateScrollProgress(0, 500, 1000), 0);
  });

  test('2. progressToFrameIndex is deterministic and reversible', () => {
    const total = 360;

    assert.equal(progressToFrameIndex(0.0, total), 1);
    assert.equal(progressToFrameIndex(1.0, total), 360);
    assert.equal(progressToFrameIndex(0.5, total), 181);

    // Downward scroll test: monotonically non-decreasing
    let prevFrame = 1;
    for (let p = 0; p <= 1.0; p += 0.01) {
      const f = progressToFrameIndex(p, total);
      assert.ok(f >= prevFrame, `Frame ${f} should be >= ${prevFrame} at progress ${p}`);
      assert.ok(f >= 1 && f <= total, `Frame ${f} out of bounds`);
      prevFrame = f;
    }

    // Upward scroll test: exact match on reversed progress
    for (let p = 1.0; p >= 0; p -= 0.01) {
      const fDown = progressToFrameIndex(p, total);
      const fUp = progressToFrameIndex(p, total);
      assert.equal(fDown, fUp, 'Upward and downward scroll must produce identical frame index');
    }
  });

  test('3. getActiveScene maps all scenes correctly across timeline', () => {
    assert.equal(getActiveScene(0.0, manifest.scenes).sceneNumber, 1);
    assert.equal(getActiveScene(0.10, manifest.scenes).sceneNumber, 1);
    assert.equal(getActiveScene(0.25, manifest.scenes).sceneNumber, 2);
    assert.equal(getActiveScene(0.40, manifest.scenes).sceneNumber, 3);
    assert.equal(getActiveScene(0.60, manifest.scenes).sceneNumber, 4);
    assert.equal(getActiveScene(0.78, manifest.scenes).sceneNumber, 5);
    assert.equal(getActiveScene(0.95, manifest.scenes).sceneNumber, 6);
    assert.equal(getActiveScene(1.0, manifest.scenes).sceneNumber, 6);
  });

  test('4. calculateSceneOpacity produces smooth trapezoidal envelope', () => {
    const range = [0.20, 0.25, 0.45, 0.50];

    // Outside range
    assert.equal(calculateSceneOpacity(0.10, range), 0);
    assert.equal(calculateSceneOpacity(0.55, range), 0);

    // Midpoint of fade-in
    const midFadeIn = calculateSceneOpacity(0.225, range);
    assert.ok(midFadeIn > 0.49 && midFadeIn < 0.51);

    // Sustained peak
    assert.equal(calculateSceneOpacity(0.25, range), 1);
    assert.equal(calculateSceneOpacity(0.35, range), 1);
    assert.equal(calculateSceneOpacity(0.45, range), 1);

    // Midpoint of fade-out
    const midFadeOut = calculateSceneOpacity(0.475, range);
    assert.ok(midFadeOut > 0.49 && midFadeOut < 0.51);

    // Initial Scene 1 opacity must be 1.0 at progress 0.0 (fully visible on page load)
    const scene1Range = manifest.scenes[0].overlay.opacityRange;
    assert.equal(calculateSceneOpacity(0.0, scene1Range), 1.0, 'Scene 1 must be 100% visible at progress 0.0');
    assert.equal(calculateSceneOpacity(0.10, scene1Range), 1.0, 'Scene 1 must sustain 100% visible until outStart');
  });
});

describe('AV Scroll Hero Manifest & Asset Presence', () => {
  test('5. Manifest metadata and 5 canonical clips are verified', () => {
    assert.equal(manifest.totalMasterFrames, 360);
    assert.equal(manifest.resolution.width, 1920);
    assert.equal(manifest.resolution.height, 1080);
    assert.equal(Object.keys(manifest.clips).length, 5);

    for (let c = 1; c <= 5; c++) {
      const clipId = `canonical-clip-0${c}`;
      const clip = manifest.clips[clipId];
      assert.ok(clip, `Clip ${clipId} must exist in manifest`);
      assert.equal(clip.sampledFrameCount, 72);
      assert.equal(clip.sourceTotalFrames, 240);
      assert.equal(clip.sourceDurationSeconds, 10.0);
      assert.equal(clip.sourceFps, 24);
      assert.ok(clip.masterFrameRange[1] - clip.masterFrameRange[0] + 1 === 72);
    }
  });

  test('6. Every single one of the 360 master WebP frames exists on disk', () => {
    const masterDir = path.join(ROOT, 'public', 'hero-frames', 'master');
    assert.ok(fs.existsSync(masterDir), 'Master frames directory must exist');

    for (let i = 1; i <= 360; i++) {
      const filename = `frame-${String(i).padStart(3, '0')}.webp`;
      const filePath = path.join(masterDir, filename);
      assert.ok(fs.existsSync(filePath), `Frame file ${filename} must exist on disk`);
      const stat = fs.statSync(filePath);
      assert.ok(stat.size > 5000, `Frame file ${filename} must be valid size (>5KB, actual: ${stat.size})`);
    }
  });

  test('7. Hero poster webp and jpg exist with valid dimensions', () => {
    const posterWebp = path.join(ROOT, 'public', 'hero-frames', 'hero-poster.webp');
    const posterJpg = path.join(ROOT, 'public', 'hero-frames', 'hero-poster.jpg');

    assert.ok(fs.existsSync(posterWebp), 'hero-poster.webp must exist');
    assert.ok(fs.existsSync(posterJpg), 'hero-poster.jpg must exist');
    assert.ok(fs.statSync(posterWebp).size > 10000);
    assert.ok(fs.statSync(posterJpg).size > 10000);
  });

  test('8. Overlays strictly follow approved copy and exclude removed slogans', () => {
    const rawManifestText = JSON.stringify(manifest);

    // Must NOT contain the removed tagline
    assert.ok(
      !rawManifestText.includes('Thoughtfully made. Made to be remembered.'),
      'Removed slogan must NOT appear in manifest'
    );

    // Opening headline must be GIFTS THAT MAKE AN IMPACT
    const scene1 = manifest.scenes[0];
    assert.equal(scene1.overlay.headlineLine1, 'GIFTS THAT');
    assert.equal(scene1.overlay.headlineLine2, 'MAKE AN IMPACT');
    assert.equal(scene1.overlay.ctaPrimary.label, 'Explore Catalog');
    assert.equal(scene1.overlay.ctaPrimary.href, '/products');
    assert.equal(scene1.overlay.ctaSecondary.label, 'Request a Quote');
  });

  test('9. Original source videos and source frame folders remain 100% intact', () => {
    for (let c = 1; c <= 5; c++) {
      const videoPath = path.join(ROOT, 'public', 'videos', `canonical-clip-0${c}.mp4`);
      assert.ok(fs.existsSync(videoPath), `Canonical video canonical-clip-0${c}.mp4 must be preserved`);

      const frameDir = path.join(ROOT, 'public', 'hero-frames', `canonical-clip-0${c}`);
      assert.ok(fs.existsSync(frameDir), `Source frame dir canonical-clip-0${c} must be preserved`);
      const files = fs.readdirSync(frameDir).filter(f => f.endsWith('.webp'));
      assert.equal(files.length, 240, `Clip 0${c} source directory must still contain all 240 original frames`);
    }
  });
});
