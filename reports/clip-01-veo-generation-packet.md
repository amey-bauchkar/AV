# Google Veo Generation Packet: Clip 01 & Model Transition
**Project:** AV Corporate Giftings & Events  
**Document:** Production Generation Brief & Input Specification  
**Asset Target:** Hero Bottle Studio Reveal, Hand Lift, & Model Transition Concept  
**Status:** READY FOR VIDEO GENERATION (Clip 01 Only)

---

## 1. Approved Creative Parameters

- **Brand:** AV Corporate Giftings & Events.
- **Physical Product Finish:** 100% clean, unbranded matte powder-coated surface.
- **Strict Brand Negative:** No PIX, No Plastico Impex, and **no AV logo or text rendered onto physical products in video footage**.
- **Separation of Layers:** All brand names, headlines ("GIFTS THAT MAKE AN IMPACT"), and CTA buttons ("Explore Catalog", "Request a Quote") are rendered as crisp, live HTML/CSS overlays on the website.
- **Tagline Exclusion:** The slogan *"Thoughtfully made. Made to be remembered."* is explicitly excluded.
- **Human Presentation Strategy:** 
  - **Clip 1:** Anonymous, elegant hand with tailored dark forest-green sleeve cuff lifting the bottle.
  - **Clip 2 (Model Transition):** Sophisticated corporate model presenting the same bottle in mid-shot. Model's face remains secondary/softly de-emphasized; the focus is maintained on the product, hands, grip, silhouette, and material details.

---

## 2. Input Asset Specification for Clip 01

### Primary Product Asset (Shape, Silhouette & Lid Geometry)
- **Catalog SKU:** `PIX-033` (500ml Thermos Vacuum Bottle)
- **Local Relative Path:** `public/products/pix-033-hero.jpeg`
- **Absolute Workspace Path:** `C:\Users\SEBIN\Desktop\AV\public\products\pix-033-hero.jpeg`
- **Catalog Source Page:** Page 4
- **Raw PDF Binary:** `public/catalog-assets/raw/asset_p03_xref220_931bf270.jpeg`
- **Verified Characteristics:**
  - Form: Cylindrical 500ml insulated vacuum bottle, zero taper on lower body.
  - Body Finish: Matte sage green / muted forest green powder coat.
  - Cap Assembly: Circular brushed stainless steel screw-cap with a flush black silicone neck collar and a pivoting loop handle.
  - Brand Status: **Completely unbranded** in source photograph.

### Supporting Interaction Asset (Loop Lifting & Grip Conditioning)
- **Local Relative Path:** `public/catalog-assets/raw/asset_p07_xref407_c1c981fe.jpeg`
- **Absolute Workspace Path:** `C:\Users\SEBIN\Desktop\AV\public\catalog-assets\raw\asset_p07_xref407_c1c981fe.jpeg`
- **Catalog Source Page:** Page 7
- **Verified Characteristics:**
  - Real studio shot of an elegant human hand lifting an insulated flask by its flexible top loop.
  - Neutral white studio lighting, natural skin tones, anatomically correct finger posture.

---

## 3. Master Visual Direction (Clip 01)

- **Environment & Backdrop:** Warm ivory plaster studio surface (`#F4F5EB`) with soft ambient bounce and light, gentle contact shadows.
- **Color Palette:** 
  - Primary Object: Muted sage/forest green (`#4A6B53`).
  - Cap Hardware: Brushed natural stainless steel (`#D1D5DB`).
  - Sleeve Cuff: Deep tailored forest green wool (`#153D25`).
  - Studio Environment: Warm cream / ivory (`#F4F5EB`).
- **Lighting:** Soft natural architectural daylight pouring from 45° upper-left, complemented by a delicate warm rim light that defines the right shoulder of the bottle and hand contour.
- **Cinematography:** 85mm prime lens, f/2.0 aperture, shallow depth of field. Motorized gimbal motion with buttery smooth acceleration and zero handheld jitter.
- **Pacing:** Calm, measured, luxurious (approx. 4.0 to 5.0 seconds).

---

## 4. Google Veo Generation Specification: Clip 01

### Target Format & Settings
- **Interface:** Google Veo (Vertex AI Veo / Google AI Studio / VideoFX)
- **Mode:** Image-to-Video (I2V) preferred; conditioning on `pix-033-hero.jpeg` as the initial frame.
- **Aspect Ratio:** `16:9` (1920 × 1080) for desktop, centered safe-action area for mobile crop.
- **Target Duration:** 4.0 – 5.0 seconds (optimal for physical coherence and deterministic frame extraction).
- **Target Frame Rate:** 24 fps (resulting in 96–120 total rendered frames).

### Generation Prompt (Exact Text to Paste)
```text
Cinematic commercial product film, 85mm prime lens, f/2.0 aperture, shallow depth of field. 

Open on a premium 500ml stainless steel insulated thermos bottle standing upright in elegant three-quarter profile on a warm ivory cream plaster studio surface (#F4F5EB). The bottle features a clean, completely unbranded matte sage green powder-coated cylinder body, a brushed stainless steel screw cap, and an integrated black silicone carrying loop. The bottle surface is pristine, smooth, and entirely free of any logos, text, or markings.

The camera begins with a slow, controlled motorized push-in and subtle orbital move. 

An elegant human hand wearing a tailored dark forest green wool suit cuff enters smoothly and deliberately from the right side of the frame. The fingers wrap naturally and securely around the upper cylinder of the matte green bottle, with the index finger hooking effortlessly through the flexible silicone carrying loop. 

With graceful, steady motion, the hand lifts the bottle four inches off the surface, tilting and turning it 20 degrees toward the camera to reveal its balanced proportions, tactile finish, and metallic lid highlights. 

The movement settles into a rock-steady, product-focused hero hold, perfectly centered and in sharp focus against the soft warm cream background. Soft architectural daylight from upper-left, subtle specular highlights along the brushed steel rim, natural contact shadows lifting off the table. 4K commercial resolution, photorealistic physics, anatomically perfect hand with five fingers.
```

### Negative Prompt (Exact Text to Paste)
```text
PIX, Plastico Impex, AV, logo, text, letters, watermark, brand name, signature, typography, numbers, labels, barcode, extra fingers, six fingers, deformed hand, mutated joints, distorted thumb, melted skin, floating objects, plastic sheen, high-gloss reflection of studio lights, reflections of crew, jitter, strobing, flickering background, morphing bottle lid, changing bottle height, changing green color, abrupt camera jerks, CGI render look, blur, noise.
```

---

## 5. Clip 02 Concept & Prompt: The Corporate Model Transition

> [!IMPORTANT]
> **Production Sequence Gate:**
> Do **NOT** generate Clip 02 until Clip 01 has been generated, reviewed against the review checklist, and approved. The final frame of Clip 01 will establish the baseline lighting, bottle position, and sleeve styling for Clip 02.

### Concept & Transition Strategy
- **Visual Bridge:** At the conclusion of Clip 01, the bottle is held elevated by an elegant hand in a dark forest-green cuff at approximate chest height.
- **Scene 02 Setup:** Clip 02 opens on this exact elevation, drawing back slightly to introduce a sophisticated corporate executive model (in a matching dark forest-green tailored blazer over an ivory silk shirt).
- **Framing Priority:** Medium close-up (chest to waist). The model's face is softly out of focus in the upper frame or framed in three-quarter profile from the chin down, ensuring the **product remains the undisputed visual hero**. This prevents facial morphing or distracting character shifts between scenes.
- **Physical Action:** The model holds the unbranded bottle with both hands (one hand supporting the base, one hand near the neck loop), turning it gently as if presenting a flagship gift to a corporate client or partner.

### Clip 02 Generation Prompt (Draft for Staging)
```text
Cinematic commercial product film, 50mm lens, f/2.2 aperture. 

Continuing seamlessly from the previous shot: a sophisticated corporate executive model dressed in a tailored dark forest-green blazer and warm ivory shirt presents the exact same 500ml matte sage green thermos bottle. 

The camera frames a medium close-up from chest to waist, keeping sharp focal priority on the bottle and elegant hands, while the model's face remains softly out of focus in the upper third of the frame. 

The bottle is held poised in two hands: one hand gracefully cradles the matte base, while the other rests near the brushed stainless steel cap and silicone loop. The model turns the bottle smoothly 15 degrees, catching soft morning studio light along the cylindrical body. 

The bottle remains completely unbranded, with a matte sage green powder-coated finish and brushed steel lid. Warm ivory cream studio background (#F4F5EB) with subtle architectural shadows. Calm, poised, generous corporate gifting presentation. Photorealistic, natural skin texture, perfectly rendered hands, zero camera wobble.
```

### Clip 02 Negative Prompt
```text
PIX, Plastico Impex, AV, text, logo, watermark, face close-up, exaggerated expressions, direct gaze into camera, distorted hands, extra fingers, changing bottle shape, glossy plastic, morphing clothing, abrupt cuts.
```

---

## 6. Execution Instructions for User

When using the Google Veo / VideoFX interface:
1. **Upload Reference Asset 1:** `C:\Users\SEBIN\Desktop\AV\public\products\pix-033-hero.jpeg` as the product conditioning image.
2. **Upload Reference Asset 2 (if multi-image conditioning is supported):** `C:\Users\SEBIN\Desktop\AV\public\catalog-assets\raw\asset_p07_xref407_c1c981fe.jpeg` as the hand interaction reference.
3. **Set Aspect Ratio:** `16:9` (Landscape).
4. **Set Duration:** `4` or `5` seconds.
5. **Paste the Clip 01 Generation Prompt** into the positive prompt field.
6. **Paste the Negative Prompt** into the negative prompt field.
7. **Generate and evaluate against `reports/clip-01-review-checklist.md`.**
