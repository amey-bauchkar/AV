#!/usr/bin/env python3
"""
scripts/build-master-sequence.py
Builds the optimized 360-frame master sequence for AV Corporate Giftings & Events.
Preserves original source directories (canonical-clip-01 through 05) intact.
Generates:
- public/hero-frames/master/frame-001.webp ... frame-360.webp
- public/hero-frames/hero-poster.webp
- public/hero-frames/hero-poster.jpg
- src/data/heroSequenceManifest.json
"""

import os
import shutil
import json
import numpy as np
from PIL import Image

WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
HERO_FRAMES_DIR = os.path.join(WORKSPACE_DIR, "public", "hero-frames")
MASTER_DIR = os.path.join(HERO_FRAMES_DIR, "master")
MANIFEST_PATH = os.path.join(WORKSPACE_DIR, "src", "data", "heroSequenceManifest.json")

os.makedirs(MASTER_DIR, exist_ok=True)

# 1. Define intelligent sampling for each clip (each clip has 240 source frames)
def sample_clip(clip_id, total_target=72):
    if clip_id == 1:
        # Clip 1: Studio Hero & Hand Approach -> Lift & Settle
        # 1-40: static hold (8 frames)
        # 41-110: hand entry & grip (24 frames)
        # 111-180: lift & tilt (24 frames)
        # 181-236: lowering & hold (16 frames)
        s1 = np.linspace(1, 40, 8, endpoint=False, dtype=int)
        s2 = np.linspace(40, 110, 24, endpoint=False, dtype=int)
        s3 = np.linspace(110, 180, 24, endpoint=False, dtype=int)
        s4 = np.linspace(180, 236, 16, endpoint=True, dtype=int)
        res = sorted(list(set(list(s1) + list(s2) + list(s3) + list(s4))))
    elif clip_id == 2:
        # Clip 2: Corporate Model Reveal
        # 1-30: bridge (8 frames)
        # 31-170: pull back & model reveal (44 frames)
        # 171-235: presentation hold (20 frames)
        s1 = np.linspace(1, 30, 8, endpoint=False, dtype=int)
        s2 = np.linspace(30, 170, 44, endpoint=False, dtype=int)
        s3 = np.linspace(170, 235, 20, endpoint=True, dtype=int)
        res = sorted(list(set(list(s1) + list(s2) + list(s3))))
    elif clip_id == 3:
        # Clip 3: Precision Macro Showcase
        # 1-20: intro macro (6 frames)
        # 21-190: micro-slider across cap, collar, loop, shoulder (50 frames)
        # 191-235: macro hold (16 frames)
        s1 = np.linspace(1, 20, 6, endpoint=False, dtype=int)
        s2 = np.linspace(20, 190, 50, endpoint=False, dtype=int)
        s3 = np.linspace(190, 235, 16, endpoint=True, dtype=int)
        res = sorted(list(set(list(s1) + list(s2) + list(s3))))
    elif clip_id == 4:
        # Clip 4: Ensemble Reveal
        # 1-25: transition (7 frames)
        # 26-180: reveal of notebook, pen, card holder (47 frames)
        # 181-236: tabletop hold (18 frames)
        s1 = np.linspace(1, 25, 7, endpoint=False, dtype=int)
        s2 = np.linspace(25, 180, 47, endpoint=False, dtype=int)
        s3 = np.linspace(180, 236, 18, endpoint=True, dtype=int)
        res = sorted(list(set(list(s1) + list(s2) + list(s3))))
    elif clip_id == 5:
        # Clip 5: Final Curated Gift Collection
        # 1-25: match cut (7 frames)
        # 26-190: 7-item ensemble reveal (45 frames)
        # 191-236: final master collection hold (20 frames)
        s1 = np.linspace(1, 25, 7, endpoint=False, dtype=int)
        s2 = np.linspace(25, 190, 45, endpoint=False, dtype=int)
        s3 = np.linspace(190, 236, 20, endpoint=True, dtype=int)
        res = sorted(list(set(list(s1) + list(s2) + list(s3))))

    while len(res) < total_target:
        diffs = [res[i+1] - res[i] for i in range(len(res)-1)]
        max_idx = int(np.argmax(diffs))
        mid = (int(res[max_idx]) + int(res[max_idx+1])) // 2
        if mid not in res:
            res.insert(max_idx + 1, mid)
        else:
            break
    while len(res) > total_target:
        diffs = [res[i+1] - res[i] for i in range(len(res)-1)]
        min_idx = int(np.argmin(diffs))
        res.pop(min_idx + 1)
    return [int(x) for x in res]

print("Selecting frames...")
master_frames = []
master_index = 1

clip_manifest_data = {}

for clip_num in range(1, 6):
    clip_id = f"canonical-clip-0{clip_num}"
    src_dir = os.path.join(HERO_FRAMES_DIR, clip_id)
    sampled = sample_clip(clip_num, 72)
    
    start_master = master_index
    clip_entries = []
    
    for src_frame_num in sampled:
        src_filename = f"frame_{src_frame_num:03d}.webp"
        src_path = os.path.join(src_dir, src_filename)
        
        dest_filename = f"frame-{master_index:03d}.webp"
        dest_path = os.path.join(MASTER_DIR, dest_filename)
        
        # Copy without generational re-compression
        shutil.copyfile(src_path, dest_path)
        file_size = os.path.getsize(dest_path)
        
        entry = {
            "masterIndex": master_index,
            "filename": dest_filename,
            "path": f"/hero-frames/master/{dest_filename}",
            "clipId": clip_id,
            "sourceFrameNumber": src_frame_num,
            "sizeBytes": file_size
        }
        master_frames.append(entry)
        clip_entries.append(entry)
        master_index += 1
        
    end_master = master_index - 1
    clip_manifest_data[clip_id] = {
        "clipNumber": clip_num,
        "clipId": clip_id,
        "sourceVideo": f"/videos/{clip_id}.mp4",
        "sourceTotalFrames": 240,
        "sourceDurationSeconds": 10.0,
        "sourceFps": 24,
        "sampledFrameCount": len(sampled),
        "sourceFrameRange": [sampled[0], sampled[-1]],
        "masterFrameRange": [start_master, end_master],
        "totalSizeBytes": sum(e["sizeBytes"] for e in clip_entries)
    }

total_payload_bytes = sum(f["sizeBytes"] for f in master_frames)
print(f"Generated {len(master_frames)} master frames. Total payload: {total_payload_bytes / (1024*1024):.2f} MB")

# 2. Generate Posters
poster_src = os.path.join(HERO_FRAMES_DIR, "canonical-clip-01", "frame_001.webp")
poster_dest_webp = os.path.join(HERO_FRAMES_DIR, "hero-poster.webp")
poster_dest_jpg = os.path.join(HERO_FRAMES_DIR, "hero-poster.jpg")

shutil.copyfile(poster_src, poster_dest_webp)
with Image.open(poster_src) as img:
    img.convert("RGB").save(poster_dest_jpg, "JPEG", quality=90)

print(f"Generated hero poster webp ({os.path.getsize(poster_dest_webp)} bytes) and jpg ({os.path.getsize(poster_dest_jpg)} bytes)")

# 3. Build Timeline Scenes and Overlays
# 6 Narrative Scenes mapped across 360 frames (0% to 100% scroll progress)
scenes = [
    {
        "sceneNumber": 1,
        "id": "scene-01-the-studio-hero",
        "title": "The Studio Hero",
        "clipId": "canonical-clip-01",
        "masterFrameRange": [1, 32],
        "progressRange": [0.0, 0.15],
        "primaryProduct": "PIX-033 Thermos Vacuum Bottle (SUS 304)",
        "overlay": {
            "badge": "Master Catalog 2024–2025",
            "headlineLine1": "GIFTS THAT",
            "headlineLine2": "MAKE AN IMPACT",
            "subtitle": "Bespoke corporate gifts for clients, teams & executive events.",
            "ctaPrimary": {
                "label": "Explore Catalog",
                "href": "/products"
            },
            "ctaSecondary": {
                "label": "Request a Quote",
                "action": "openRfqModal"
            },
            "opacityRange": [0.0, 0.0, 0.12, 0.16], # in-start, in-peak, out-start, out-end (starts 1.0)
            "alignment": "left"
        }
    },
    {
        "sceneNumber": 2,
        "id": "scene-02-tactile-lift",
        "title": "Tactile Lift & Hand Presentation",
        "clipId": "canonical-clip-01",
        "masterFrameRange": [33, 72],
        "progressRange": [0.15, 0.32],
        "primaryProduct": "PIX-033 Thermos Vacuum Bottle",
        "overlay": {
            "badge": "Ergonomic Craftsmanship",
            "headlineLine1": "TACTILE",
            "headlineLine2": "PERFECTION",
            "subtitle": "Matte powder-coated SUS 304 steel with balanced ergonomic grip.",
            "ctaPrimary": {
                "label": "Explore Drinkware",
                "href": "/category/thermos-bottles"
            },
            "ctaSecondary": {
                "label": "Request a Quote",
                "action": "openRfqModal"
            },
            "opacityRange": [0.15, 0.18, 0.28, 0.32],
            "alignment": "left"
        }
    },
    {
        "sceneNumber": 3,
        "id": "scene-03-corporate-model",
        "title": "Corporate Model Presentation",
        "clipId": "canonical-clip-02",
        "masterFrameRange": [73, 144],
        "progressRange": [0.32, 0.52],
        "primaryProduct": "PIX-033 Executive Presentation",
        "overlay": {
            "badge": "Executive Gifting",
            "headlineLine1": "CRAFTED TO",
            "headlineLine2": "IMPRESS",
            "subtitle": "Double-wall thermal insulation presented with poise for executive recipients.",
            "ctaPrimary": {
                "label": "Explore Catalog",
                "href": "/products"
            },
            "ctaSecondary": {
                "label": "Request a Quote",
                "action": "openRfqModal"
            },
            "opacityRange": [0.32, 0.36, 0.48, 0.52],
            "alignment": "left"
        }
    },
    {
        "sceneNumber": 4,
        "id": "scene-04-precision-macro",
        "title": "Precision Macro Details",
        "clipId": "canonical-clip-03",
        "masterFrameRange": [145, 216],
        "progressRange": [0.52, 0.70],
        "primaryProduct": "PIX-033 Cap, Collar & Finish",
        "overlay": {
            "badge": "Material Integrity",
            "headlineLine1": "PRECISION IN",
            "headlineLine2": "EVERY DETAIL",
            "subtitle": "Brushed steel cap, flush silicone collar with pivoting loop, and fine micro-texture.",
            "ctaPrimary": {
                "label": "Explore Drinkware",
                "href": "/category/thermos-bottles"
            },
            "ctaSecondary": {
                "label": "Request a Quote",
                "action": "openRfqModal"
            },
            "opacityRange": [0.52, 0.56, 0.66, 0.70],
            "alignment": "left"
        }
    },
    {
        "sceneNumber": 5,
        "id": "scene-05-ensemble-reveal",
        "title": "The Ensemble Reveal",
        "clipId": "canonical-clip-04",
        "masterFrameRange": [217, 288],
        "progressRange": [0.70, 0.86],
        "primaryProduct": "Executive Suite (PIX-033, PIX-NB-102, PIX-PN-1003, PIX-CH-1001)",
        "overlay": {
            "badge": "Curated Collections",
            "headlineLine1": "CURATED FOR",
            "headlineLine2": "TEAMS & EVENTS",
            "subtitle": "Hardbound executive notebooks, precision pens, card holders & thermal drinkware.",
            "ctaPrimary": {
                "label": "Build a Custom Kit",
                "href": "/products?action=kit"
            },
            "ctaSecondary": {
                "label": "Request a Quote",
                "action": "openRfqModal"
            },
            "opacityRange": [0.70, 0.74, 0.83, 0.86],
            "alignment": "left"
        }
    },
    {
        "sceneNumber": 6,
        "id": "scene-06-curated-collection",
        "title": "The Master Gifting Collection",
        "clipId": "canonical-clip-05",
        "masterFrameRange": [289, 360],
        "progressRange": [0.86, 1.0],
        "primaryProduct": "Complete 7-Piece Gifting Suite",
        "overlay": {
            "badge": "Complete Corporate Suites",
            "headlineLine1": "GIFTS THAT",
            "headlineLine2": "MAKE AN IMPACT",
            "subtitle": "Complete bespoke gifting suites for client appreciation, employee onboarding & annual milestones.",
            "ctaPrimary": {
                "label": "Explore Catalog",
                "href": "/products"
            },
            "ctaSecondary": {
                "label": "Request a Quote",
                "action": "openRfqModal"
            },
            "opacityRange": [0.86, 0.90, 1.0, 1.0],
            "alignment": "left"
        }
    }
]

manifest = {
    "project": "AV Corporate Giftings & Events",
    "version": "1.0.0",
    "updatedAt": "2026-10-20T02:26:00Z",
    "totalMasterFrames": len(master_frames),
    "resolution": {
        "width": 1920,
        "height": 1080,
        "aspectRatio": "16:9"
    },
    "scrollPinnedHeight": "750vh",
    "totalPayloadBytes": total_payload_bytes,
    "totalPayloadMB": round(total_payload_bytes / (1024 * 1024), 2),
    "poster": {
        "webp": "/hero-frames/hero-poster.webp",
        "jpg": "/hero-frames/hero-poster.jpg"
    },
    "clips": clip_manifest_data,
    "scenes": scenes,
    "frames": master_frames
}

with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

print(f"Manifest written to {MANIFEST_PATH} with {len(master_frames)} frames.")
