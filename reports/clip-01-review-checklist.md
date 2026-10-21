# Google Veo Clip 01: Quality Review & Approval Checklist
**Project:** AV Corporate Giftings & Events  
**Target:** Clip 01 — Studio Hero Reveal & Hand Lift (`PIX-033` 500ml Bottle)  
**Evaluator:** Creative Director & Motion Lead  
**Date:** October 2026

---

## Evaluation Protocol

Before Clip 01 can be sliced into web scroll frames or used as the visual bridge for Clip 02, it must be evaluated frame-by-frame against the 7 quality criteria below.

Each item must receive a **PASS** status. If any critical flaw is detected, use the **Remediation Notes** column to adjust the prompt or conditioning weights for re-generation.

---

## 1. Product Integrity & Geometry (Weight: CRITICAL)

| Check Item | Acceptance Standard | Status | Inspection Notes |
| :--- | :--- | :---: | :--- |
| **1.1 Cylinder Proportions** | The bottle body maintains straight, parallel cylindrical walls. No bulging, tapering, or breathing during the hand lift. | [ ] PASS<br>[ ] FAIL | Ensure base diameter matches shoulder diameter throughout rotation. |
| **1.2 Cap & Collar Detail** | Brushed stainless steel cap sits flush atop the neck with a visible circular brushed grain. Black silicone collar and loop handle remain attached at the neck joint. | [ ] PASS<br>[ ] FAIL | Check for cap separation, morphing threads, or disappearing loop. |
| **1.3 Color Consistency** | Powder-coated body remains a consistent matte sage/forest green (`#4A6B53`). No shifts toward lime green, neon, or dark olive as the bottle moves. | [ ] PASS<br>[ ] FAIL | Scrub timeline at 25%, 50%, 75% to compare hue. |
| **1.4 Surface Matte Texture** | Surface reflects light with soft, diffuse highlights. No artificial high-gloss plastic shine or oily reflections. | [ ] PASS<br>[ ] FAIL | Verify highlight spread on cylindrical curvature. |

---

## 2. Anatomical & Physical Coherence (Weight: CRITICAL)

| Check Item | Acceptance Standard | Status | Inspection Notes |
| :--- | :--- | :---: | :--- |
| **2.1 Hand Anatomy** | Exactly five fingers visible. Natural knuckle joints, realistic fingernails/cuticles, and authentic skin texture. | [ ] PASS<br>[ ] FAIL | Inspect frame-by-frame during entry (sec 1.0–2.0) and lift (sec 2.5–3.5). |
| **2.2 Biomechanics of Grip** | Fingers firmly and naturally clasp the bottle; index finger loops through or rests on the silicone ring without phasing through the solid geometry. | [ ] PASS<br>[ ] FAIL | Watch for finger clipping through the metal cap or bottle wall. |
| **2.3 Weight & Mass Physics** | The lift exhibits believable physical weight (~700g with liquid). The bottle does not float, jitter, or accelerate unnaturally. | [ ] PASS<br>[ ] FAIL | Natural arc of upward motion and wrist tilt. |
| **2.4 Wardrobe Consistency** | Dark forest-green tailored wool cuff remains crisp with natural fabric folds. No morphing sleeve patterns or dissolving seams. | [ ] PASS<br>[ ] FAIL | Cuff should frame wrist neatly without covering fingers. |

---

## 3. Brand Cleanliness & Zero Hallucination (Weight: CRITICAL)

| Check Item | Acceptance Standard | Status | Inspection Notes |
| :--- | :--- | :---: | :--- |
| **3.1 No Supplier Logos** | Completely zero occurrence of "PIX", "Plastico Impex", or supplier logos anywhere on the bottle, cap, table, or sleeve. | [ ] PASS<br>[ ] FAIL | Mandatory gate: if "PIX" appears, clip must be immediately rejected. |
| **3.2 No Fabricated Text** | No hallucinated alphanumeric strings, garbled glyphs, barcodes, or fake slogans appear on the product surface. | [ ] PASS<br>[ ] FAIL | Surface must remain 100% clean and unbranded. |
| **3.3 No Watermarks or UI** | Footage is pristine with no stock watermarks, timecodes, or AI interface artifacts. | [ ] PASS<br>[ ] FAIL | Check corners and lower edges of frame. |

---

## 4. Environment & Lighting Consistency (Weight: HIGH)

| Check Item | Acceptance Standard | Status | Inspection Notes |
| :--- | :--- | :---: | :--- |
| **4.1 Studio Background** | Warm ivory plaster canvas (`#F4F5EB`) with subtle architectural gradient. No distracting background props or shifting textures. | [ ] PASS<br>[ ] FAIL | Verify color matches website token `--color-warm-ivory`. |
| **4.2 Contact Shadows** | Natural contact shadows sit beneath the bottle while grounded, lifting realistically as the bottle is elevated. | [ ] PASS<br>[ ] FAIL | Check for shadow popping or disconnected shadow artifacts. |
| **4.3 Directional Lighting** | Key light remains stable from 45° upper-left. Specular reflection glides across the steel lid smoothly without flickering. | [ ] PASS<br>[ ] FAIL | Check for light strobing or sudden exposure shifts. |

---

## 5. Camera Motion & Frame Stability (Weight: HIGH)

| Check Item | Acceptance Standard | Status | Inspection Notes |
| :--- | :--- | :---: | :--- |
| **5.1 Smooth Acceleration** | Camera push-in and orbital pan move with cinematic ease-in/ease-out curves. Zero sudden jerk or stutter. | [ ] PASS<br>[ ] FAIL | Ensures high-quality deterministic scrubbing when scroll-controlled. |
| **5.2 Focal Depth & Clarity** | The bottle body, lid, and hand remain tack-sharp. Background has a pleasing, velvety bokeh (approx. f/2.0). | [ ] PASS<br>[ ] FAIL | Check for focal hunting or unexpected blur pulses. |
| **5.3 Terminal Stabilization** | The final 0.8 seconds (approx. frames 95–120) settle into a steady, locked-off hero hold suitable for bridging to Clip 02. | [ ] PASS<br>[ ] FAIL | Must provide a stable last frame for conditioning Clip 02. |

---

## 6. Slicing & Scroll Extraction Readiness (Weight: MEDIUM)

| Check Item | Acceptance Standard | Status | Inspection Notes |
| :--- | :--- | :---: | :--- |
| **6.1 Safe Action Margins** | Center-weighted composition leaves ample negative space on the left 45% of the frame for HTML headline text overlays. | [ ] PASS<br>[ ] FAIL | Test placing "GIFTS THAT MAKE AN IMPACT" over left side. |
| **6.2 Mobile Crop Safety** | If center-cropped to 9:16 or 4:5, the bottle and hand remain fully in frame without cutting off the cap or base. | [ ] PASS<br>[ ] FAIL | Verify 1080×1350 center extraction box. |

---

## Final Gate Sign-Off

- **Overall Clip Status:** `[ ] APPROVED FOR EXTRACTION` | `[ ] REVISION REQUIRED`
- **Reviewed By:** _________________________
- **Date:** _______________
- **Next Action upon Approval:** Extract 24 frames from Clip 01 and condition the starting frame for Clip 02 (Model Transition).
