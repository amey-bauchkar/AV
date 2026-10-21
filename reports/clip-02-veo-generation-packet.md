# Google Veo Generation Packet: Clip 02 (Corporate Model Transition)
**Project:** AV Corporate Giftings & Events  
**Document:** Clip 02 Video Generation Specification & Transition Plan  
**Target:** Scene 02 — Corporate Model Presentation & Continuous Camera Pull-Back  
**Canonical Clip 01 Reference:** `C:\Users\SEBIN\Downloads\Hand_lifting_thermos_bottle_1080p_20261020004431.mp4`  
**Workspace Video Copy:** `public/videos/canonical-clip-01.mp4`  
**Status:** READY FOR VIDEO GENERATION (Clip 02 Only)

---

## 1. Canonical Clip 01 Confirmation & Creative Lock

The original first Veo-generated clip has been approved and formally locked as the canonical Clip 01:

- **Source File:** `Hand_lifting_thermos_bottle_1080p_20261020004431.mp4` in `C:\Users\SEBIN\Downloads\`
- **Project Mirror:** `public/videos/canonical-clip-01.mp4`
- **Technical Specs:** 1920 × 1080 (16:9), 24.0 fps, 10.00 seconds duration, exactly 240 frames.
- **Compositional Lock:**
  - The bottle remains near the center of the frame throughout the entire clip.
  - The right-aligned alternative version is permanently discarded.
  - No artificial cropping or reframing is applied to force negative space; the original video framing is preserved 100% intact.
  - The subtle Veo watermark in the bottom-right corner is accepted as part of the source clip.
  - All 240 frames have been extracted to:
    - WebP scroll sequence: `public/hero-frames/canonical-clip-01/frame_001.webp` through `frame_240.webp` (7.42 MB total, 31.7 KB/frame average).
    - Uncompressed PNG reference: `reports/clip-01-analysis/frames-png/frame_001.png` through `frame_240.png`.
- **Motion Arc Analysis:**
  - `0.0s – 2.5s` (Frames 001–060): Bottle stands poised near frame center on warm ivory studio surface in quiet, three-quarter daylight profile.
  - `2.5s – 4.5s` (Frames 061–108): Elegant hand wearing a tailored dark forest-green wool cuff and white shirt cuff enters from the right and grasps the bottle.
  - `4.5s – 8.0s` (Frames 109–192): Hand lifts the bottle ~3–4 inches upward, tilting and showing the unbranded cylinder and brushed steel cap.
  - `8.0s – 10.0s` (Frames 193–240): Hand smoothly lowers the bottle back to the surface and settles into a stable, stationary hero hold.

---

## 2. Clip 01 Ending Frame Extraction (Starting Reference for Clip 02)

To ensure seamless physical continuity into Clip 02, the final stable frame was analyzed and extracted from the verified 10.0-second video:

- **Selected Reference Frame:** Frame 236 / Frame 240 (Timestamp: `00:00:09.83` to `00:00:10.00`).
- **Local Workspace Relative Path:** `public/hero-frames/clip-02-reference-start.png`
- **Secondary Mirror Path:** `public/hero-frames/clip-01-final-frame.png`
- **Absolute Windows Path:** `C:\Users\SEBIN\Desktop\AV\public\hero-frames\clip-02-reference-start.png`
- **Verified Visual State of this Frame:**
  - **Bottle Position:** Resting securely upright near center-frame on the warm ivory plaster tabletop.
  - **Bottle Finish:** 100% clean matte sage-green powder coat, zero text, zero logos.
  - **Cap & Collar:** Brushed stainless-steel cap flush on neck, black silicone collar with pivoting loop handle extending leftward.
  - **Hand Position:** Right hand holding the bottle body firmly from the right side, fingers wrapped naturally around the cylinder, five clear anatomical fingers visible.
  - **Wardrobe:** Tailored dark forest-green wool blazer sleeve cuff with a crisp white shirt cuff showing at the wrist.
  - **Lighting & Ambiance:** Soft directional daylight from 45° upper-left, warm ivory background wall (`#F4F5EB`), contact shadow under bottle base.

---

## 3. Clip 02 Scene Direction & Transition Mechanics

### The Core Creative Goal
Continue naturally from the original hand-held bottle shot into an understated, premium corporate model presentation for **AV Corporate Giftings & Events**.

### Physical Transition Strategy (Continuous Camera Pull-Back)
Instead of attempting an instantaneous morphing of a floating hand into a person, Clip 02 uses a **physically plausible camera pull-back (dolly-out and gentle crane)**:

1. **Start Frame Conditioning:** 
   Clip 02 begins exactly where Clip 01 ends—closely framed on the bottle held by the hand in the dark forest-green sleeve.
2. **Camera Pull-Back (Dolly Out):**
   The camera smoothly glides backward and slightly upward over the first 1.5 seconds.
3. **The Reveal:**
   As the focal plane widens, the hand's sleeve naturally resolves into a full tailored dark forest-green wool blazer worn by an elegant corporate executive model over a warm ivory silk shirt.
4. **Two-Handed Presentation:**
   The model brings their left hand into the shot to join the right hand, gently cradling the bottle with both hands (one hand supporting the base/lower cylinder, one hand resting poised near the loop/shoulder) in a respectful, generous gift-presentation gesture.
5. **Facial De-Emphasis:**
   The model's face remains in the upper third of the frame, framed from the jawline down or kept softly out of depth-of-field focus (85mm lens, f/2.0 shallow DOF). This ensures:
   - The unbranded hero bottle and tactile hands remain the undisputed center of attention.
   - No distracting facial morphing or character identity drift occurs across video cuts.
6. **Terminal Hold:**
   The clip concludes with a calm, rock-steady 1.0-second hold of the two-handed presentation, providing a clean visual bridge for downstream macro and ensemble scenes.

---

## 4. Google Veo Generation Specification: Clip 02

### Interface & Generation Settings
- **Interface:** Google Veo (Vertex AI Veo / Google AI Studio / VideoFX)
- **Generation Mode:** Image-to-Video (I2V)
- **Conditioning Image (First Frame):** `public/hero-frames/clip-02-reference-start.png`
- **Secondary Reference Image (Product Fidelity):** `public/products/pix-033-hero.jpeg`
- **Aspect Ratio:** `16:9` (1920 × 1080)
- **Target Duration:** `4.0` – `5.0` seconds
- **Target Frame Rate:** 24 fps (yielding 96–120 frames)

---

### Ready-to-Paste Generation Prompt (Clip 02)

```text
Cinematic commercial product film, 85mm prime lens, f/2.0 aperture, shallow depth of field.

Seamlessly continuing from the conditioned starting frame: close-up on the unbranded matte sage-green stainless steel thermos bottle held upright on a warm ivory table by a hand in a tailored dark forest-green wool sleeve.

The camera performs a smooth, continuous motorized dolly-out pull-back and gentle pedestal rise. 

As the framing widens from close-up to medium close-up (waist to chest level), the sleeve organically connects to a sophisticated, poised corporate executive model wearing a matching tailored dark forest-green wool blazer over a warm ivory silk dress shirt. 

The model brings their second hand into frame with graceful, deliberate motion, cradling the matte sage green bottle with both hands in an elegant corporate gifting presentation. One hand gently supports the lower cylinder while the other rests poised near the brushed stainless steel cap and black silicone neck loop. 

Sharp focal priority is strictly maintained on the bottle, the brushed metallic lid, and the hands. The model's face remains secondary and softly out of focus in the upper third of the frame. 

The bottle remains completely unbranded, with a smooth matte powder-coated finish and zero logos or markings. Set against a serene warm ivory cream studio environment (#F4F5EB) with soft architectural morning daylight from 45 degrees upper-left. 

The motion settles into a rock-steady, elegant presentation hold for the final second. 4K commercial resolution, natural skin textures, anatomically perfect hands with five fingers each, zero jitter.
```

---

### Ready-to-Paste Negative Prompt (Clip 02)

```text
PIX, Plastico Impex, AV, logo, text, letters, watermark, brand name, signature, typography, numbers, labels, barcode, full-face close-up, sharp facial details, looking directly into camera, exaggerated facial expressions, extra fingers, six fingers, deformed hands, mutated joints, distorted thumb, melted fingers, morphing clothes, changing suit color, changing bottle color, glossy plastic shine, reflections of studio crew, jitter, strobing, flickering background, morphing bottle lid, changing bottle height, abrupt cuts, camera shake, CGI cartoon look, blur, noise.
```

---

## 5. Strict Branding Constraints

- **Zero Physical Branding:** The thermos bottle must remain completely pristine and unbranded. Do not ask Veo to render any AV logo, monogram, or text onto the physical product.
- **No Supplier Marks:** Zero occurrence of "PIX" or "Plastico Impex".
- **Layer Separation:** Brand headlines ("GIFTS THAT MAKE AN IMPACT"), subtitles, and CTA buttons ("Explore Catalog", "Request a Quote") will be overlaid via live HTML/CSS on the webpage.
- **Source Watermark Acceptance:** Existing Veo watermark in the source footage is accepted as-is; do not crop or alter the native 16:9 composition.

---

## 6. Execution Instructions for User

When ready to generate Clip 02 in the Google Veo / VideoFX interface:

1. **Upload Primary Start-Frame Image:**
   - File: `C:\Users\SEBIN\Desktop\AV\public\hero-frames\clip-02-reference-start.png`
   - Role: First frame conditioning to lock bottle position, hand posture, and sleeve color.
2. **Upload Secondary Reference Image (if multi-image conditioning is available):**
   - File: `C:\Users\SEBIN\Desktop\AV\public\products\pix-033-hero.jpeg`
   - Role: Preserves the authentic cylinder geometry and brushed stainless steel cap texture.
3. **Configure Settings:**
   - Aspect Ratio: `16:9` (Landscape)
   - Duration: `5` seconds (or `4` seconds if 5s is unavailable)
   - Generation Style: Photorealistic / Cinematic
4. **Copy & Paste:**
   - Paste the **Ready-to-Paste Generation Prompt** into the prompt field.
   - Paste the **Ready-to-Paste Negative Prompt** into the negative prompt field.
5. **Generate and Review:**
   - Evaluate the resulting video against [reports/clip-02-review-checklist.md](file:///C:/Users/SEBIN/Desktop/AV/reports/clip-02-review-checklist.md).
