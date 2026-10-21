# Google Veo Generation Packet: Clip 03 (Precision Macro Showcase)
**Project:** AV Corporate Giftings & Events  
**Document:** Clip 03 Video Generation Specification & Macro Asset Plan  
**Target:** Scene 03 / Clip 03 — Precision Macro Product Showcase (`PIX-033` 500ml Thermos Bottle)  
**Status:** READY FOR VIDEO GENERATION (Clip 03)

---

## 1. Locked Production Assets (Clips 01 & 02 Approved)

The first two scenes of the cinematic scroll experience have been approved and permanently locked:

1. **Canonical Clip 01 (Studio Hero & Hand Lift):**
   - **Source File:** `Hand_lifting_thermos_bottle_1080p_20261020004431.mp4` (in `C:\Users\SEBIN\Downloads\`)
   - **Project Mirror:** `public/videos/canonical-clip-01.mp4`
   - **Metrics:** 1920 × 1080, 24.0 fps, 10.00s, 240 frames total.
   - **Frame Slices:** `public/hero-frames/canonical-clip-01/frame_001.webp` through `frame_240.webp` (7.42 MB).
   - **Status:** **LOCKED & CANONICAL**.

2. **Canonical Clip 02 (Corporate Model Presentation):**
   - **Source File:** `Executive_presenting_sage_green_…_20261020012128.mp4` (in `C:\Users\SEBIN\Downloads\`)
   - **Project Mirror:** `public/videos/canonical-clip-02.mp4`
   - **Metrics:** 1920 × 1080, 24.0 fps, 10.00s, 240 frames total.
   - **Frame Slices:** `public/hero-frames/canonical-clip-02/frame_001.webp` through `frame_240.webp` (11.0 MB).
   - **Final Stable Frame:** Frame 235 (`t=9.79s`) extracted as `public/hero-frames/clip-03-reference-start.png`.
   - **Status:** **LOCKED & CANONICAL**.

---

## 2. Verified Reference Assets for Clip 03

### A. Preceding Scene Reference (Clip 02 Ending State)
- **Local Relative Path:** `public/hero-frames/clip-03-reference-start.png`
- **Secondary Mirror:** `public/hero-frames/clip-02-final-frame.png`
- **Absolute Path:** `C:\Users\SEBIN\Desktop\AV\public\hero-frames\clip-03-reference-start.png`
- **Visual Description:** Frame 235 of approved Clip 02. The corporate model in a dark forest-green tailored blazer over a warm ivory shirt holds the unbranded 500ml sage green bottle with two hands. The model's face is secondary/de-emphasized above the collar.

### B. High-Fidelity Macro Cap & Neck Reference (1080p Native & 16:9 Formats)
- **16:9 Native Upload Frame (1920 × 1080):** `public/hero-frames/clip-03-macro-start-1080p.png`
  - **Absolute Path:** `C:\Users\SEBIN\Desktop\AV\public\hero-frames\clip-03-macro-start-1080p.png`
  - **Advantage:** Native 16:9 full HD format prevents letterboxing, black bars, or automatic cropping in Google Veo / VideoFX.
- **Precision Detail Crop (550 × 300):** `public/hero-frames/clip-03-macro-detail-reference.png`
  - **Absolute Path:** `C:\Users\SEBIN\Desktop\AV\public\hero-frames\clip-03-macro-detail-reference.png`
- **Source:** Isolated from 1080p native master footage (`reports/clip-01-analysis/frames-png/frame_001.png`).
- **Verified Visual Attributes:**
  - **Cap Hardware:** Cylindrical brushed natural stainless steel screw cap with vertical circular brushed grain and a subtle metallic specular highlight.
  - **Silicone Collar & Loop:** Flush matte black silicone neck collar with a pivoting loop handle attached via an authentic mechanical hinge pin.
  - **Transition Collar:** Smooth tapered neck curving into the cylindrical bottle shoulder.
  - **Powder Coat Finish:** Matte sage green (`#4A6B53`) with fine, non-reflective micro-pebble texture.
  - **Brand Status:** 100% clean, unbranded, zero logos or text.

### C. Master Product Identity Reference
- **Local Relative Path:** `public/products/pix-033-hero.jpeg`
- **Absolute Path:** `C:\Users\SEBIN\Desktop\AV\public\products\pix-033-hero.jpeg`
- **Role:** Confirms overall bottle proportions, sage-green colorway, and unbranded finish.

### D. Verification Audit of Previous Candidate (`asset_p08_xref456_9550555e.jpeg`)
- **Audit Result:** Inspection of `asset_p08_xref456_9550555e.jpeg` revealed it is a low-res (176×176) image from catalog page 8 showing a silver open-mouth thermos lying down with its cap detached. It does **not** depict the sage-green bottle `PIX-033`.
- **Replacement:** We use `public/hero-frames/clip-03-macro-detail-reference.png` (high-res 1080p authentic crop) and `public/catalog-assets/raw/asset_p04_xref265_fe144708.jpeg` (Page 4 inspection of the PIX-033 cap underside), guaranteeing source-data accuracy without hallucination.

---

## 3. Clip 03 Visual Direction & Sequence

### Purpose
Shift the viewer's attention from the corporate model's two-handed presentation into an intimate, tactile appreciation of the bottle's material quality, certified stainless steel hardware, and smooth powder-coated finish.

### Cinematography & Camera Movement
- **Lens & Aperture:** 100mm macro prime lens, f/2.8 aperture, velvety shallow depth of field.
- **Lighting:** Soft architectural daylight flowing from 45° upper-left, complemented by a delicate warm rim light that grazes the metallic edge of the brushed stainless steel cap.
- **Environment:** Serene warm ivory cream plaster studio backdrop (`#F4F5EB`) with soft out-of-focus background falloff.
- **Transition Style:** A clean, editorial match-cut transitioning directly from the model's two-handed hold into an extreme macro close-up of the cap and neck.
- **Motion Path:** The camera glides horizontally and tilts slightly downward across the top cap (seconds 0.0–2.0), reveals the brushed steel grain and black silicone loop attachment (seconds 2.0–3.5), and pans across the textured matte sage-green shoulder (seconds 3.5–5.0).
- **Ending State:** Settle into a rock-steady, beautifully lit close-up of the bottle shoulder and cap, perfectly composed to serve as the visual springboard for Clip 04 (the ensemble reveal with notebook and pen).

---

## 4. Google Veo Generation Specification: Clip 03

### Interface Settings
- **Interface:** Google Veo (Vertex AI Veo / Google AI Studio / VideoFX)
- **Generation Mode:** Image-to-Video (I2V) preferred.
- **Primary Conditioning Image:** `public/hero-frames/clip-03-macro-start-1080p.png` (or `public/hero-frames/clip-03-macro-detail-reference.png`)
- **Preceding Scene Bridge Reference:** `public/hero-frames/clip-03-reference-start.png` (Clip 02 Ending Hold)
- **Secondary Reference Image (if supported):** `public/products/pix-033-hero.jpeg`
- **Aspect Ratio:** `16:9` (1920 × 1080)
- **Target Duration:** `4.0` – `5.0` seconds
- **Target Frame Rate:** 24 fps (producing 96–120 frames for scroll scrubbing)

---

### Ready-to-Paste Generation Prompt (Clip 03)

```text
Cinematic commercial product macro film, 100mm macro lens, f/2.8 aperture, velvety shallow depth of field.

Extreme close-up macro product showcase of the top cap, collar, and shoulder of a premium 500ml thermos vacuum bottle. 

Starting focused tightly on the circular brushed natural stainless steel screw cap, showing the fine directional brushed grain and subtle metallic luster under soft studio lighting. 

The camera glides with slow, butter-smooth horizontal slider motion from left to right. 

The move reveals the flush matte black silicone collar beneath the cap, highlighting the integrated pivoting loop handle attached cleanly with a subtle hinge pin. 

The camera continues its slow, controlled drift downward along the smooth curve of the bottle shoulder, catching soft morning architectural daylight across the tactile matte sage-green powder-coated surface. The powder coat exhibits a delicate, ultra-fine pebble texture.

The cylindrical bottle surface is completely pristine, unbranded, and smooth, with zero logos, zero text, zero monograms, and zero markings. 

The background is a creamy, softly blurred warm ivory plaster gradient (#F4F5EB). Lighting remains stable and calm with gentle specular rim highlights along the steel edge and soft contact shadows. 

The motion gently decelerates and settles into a rock-steady, locked-off close-up hold for the final second. 4K commercial resolution, photorealistic industrial design fidelity, zero camera shake, zero flicker.
```

---

### Ready-to-Paste Negative Prompt (Clip 03)

```text
PIX, Plastico Impex, AV, logo, monogram, engraving, text, letters, watermark, brand name, signature, typography, numbers, labels, barcode, stickers, human hands, fingers, skin, face, open bottle mouth, liquids, pouring water, steam, threads visible, unscrewed lid, detached cap, plastic gloss, high-gloss shine, scratches, dents, dirty surface, rust, color shifts, lime green, changing bottle color, morphing geometry, jitter, strobing, flickering light, fast camera movement, abrupt cuts, camera shake, CGI cartoon look, blur, noise.
```

---

## 5. Strict Source-Data & Technical Accuracy Constraints

- **Verified Form Only:** Portray only the external surfaces verified from catalog photography: cylindrical brushed stainless steel cap, black silicone collar with pivoting loop, and cylindrical matte sage-green body.
- **No Hidden Mechanisms:** Do not generate internal vacuum chambers, cross-sections, cutaways, liquid pouring, or unscrewed components.
- **No Invented Engravings:** In strict accordance with the approved creative brief, the bottle surface must remain 100% clean and unbranded (no laser-engraved AV monogram, no supplier marks).
- **Separation of Layers:** Product specifications (e.g., "Food-Grade SUS 304 Steel • Double-Wall Vacuum") will be rendered exclusively as sharp HTML/CSS overlays on the website.

---

## 6. Execution Instructions for User

When ready to generate Clip 03 in Google Veo:

1. **Upload Primary Reference Image:**
   - Preferred 16:9 file: `C:\Users\SEBIN\Desktop\AV\public\hero-frames\clip-03-macro-start-1080p.png`
   - Alternative detail crop: `C:\Users\SEBIN\Desktop\AV\public\hero-frames\clip-03-macro-detail-reference.png`
   - Role: Image-to-Video start conditioning to lock the exact cap profile, brushed steel texture, silicone loop, and sage-green powder-coat.
2. **Upload Secondary Reference (if multi-image conditioning is available):**
   - File: `C:\Users\SEBIN\Desktop\AV\public\products\pix-033-hero.jpeg`
   - Optional Bridge Reference: `C:\Users\SEBIN\Desktop\AV\public\hero-frames\clip-03-reference-start.png` (Clip 02 Ending Hold)
3. **Configure Settings:**
   - Aspect Ratio: `16:9` (Landscape)
   - Duration: `4` or `5` seconds
   - Style: Photorealistic / Commercial
4. **Copy & Paste Prompts:**
   - Paste the **Ready-to-Paste Generation Prompt** into the positive prompt field.
   - Paste the **Ready-to-Paste Negative Prompt** into the negative prompt field.
5. **Generate and Evaluate:**
   - Review against [reports/clip-03-review-checklist.md](file:///C:/Users/SEBIN/Desktop/AV/reports/clip-03-review-checklist.md).
