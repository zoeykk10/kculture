# Design System Strategy: Sophisticated Seoul

## 1. Overview & Creative North Star
**Creative North Star: The Digital Curator**

This design system is not merely a collection of components; it is an editorial manifesto for modern K-Culture. We are moving away from the "busy" aesthetics of traditional social platforms toward a "Digital Curator" experience—where the UI acts as a silent, premium gallery for cultural content. 

The system achieves a "Sophisticated Seoul" vibe by blending the tactile warmth of traditional Korean porcelain with the razor-sharp precision of high-tech minimalism. We break the standard "template" look through **intentional white space (Ma-eum)**, high-fashion typography scales, and a layout strategy that favors asymmetrical balance over rigid, predictable grids. Every element should feel placed with the care of a ceramicist.

---

## 2. Colors
Our palette is rooted in *Baekja* (porcelain white) and deep *Meok* (ink charcoal), punctuated by surgical strikes of traditional *Dancheong* red and indigo.

### The Palette
*   **Background & Surfaces:** `surface` (#fbf9f4) is our porcelain base. Use `surface_container_lowest` (#ffffff) for the highest focus elements.
*   **Typography:** `on_surface` (#1b1c19) provides the deep charcoal ink feel.
*   **Traditional Accents:** `primary` (#b91d20 - Dancheong Red) and `secondary` (#4c56af - Indigo) are used exclusively for critical calls to action or micro-moments of delight.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning. We define boundaries through **Background Color Shifts**. To separate a content block, place a `surface_container_low` (#f5f3ee) section directly against the `surface` background. This creates a soft, architectural transition that feels more premium than a hard stroke.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine Hanji paper. 
*   **Base:** `surface` (#fbf9f4)
*   **Sectioning:** `surface_container` (#f0eee9)
*   **Elevated Content:** `surface_container_lowest` (#ffffff)
Use nesting to imply importance. A white card (`surface_container_lowest`) sitting on a slightly darker `surface_container` section creates a natural "lift" without the clutter of lines.

### Glass & Gradient Rule
For floating headers or navigational overlays, use **Glassmorphism**. Apply `surface` at 80% opacity with a `20px` backdrop blur. This allows the vibrant imagery of K-Culture to bleed through the UI, softening the interface. Use a subtle linear gradient from `primary` (#b91d20) to `on_primary_container` (#d2312f) for primary CTAs to add a "silken" depth.

---

## 3. Typography
We utilize a dual-typeface system to bridge the gap between high-fashion editorial and technical functionalism.

*   **The Display Voice (Manrope):** Used for `display`, `headline`, and `title` roles. Manrope’s geometric yet warm proportions evoke a modern Seoul boutique. 
    *   *Styling Note:* Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) to create an authoritative, editorial header.
*   **The Functional Voice (Inter):** Reserved for `label-md` and `label-sm`. Inter’s high legibility ensures that even at the smallest scale, technical metadata (like dates or tags) remains crisp and unobtrusive.

**Hierarchy as Identity:** 
Large typographic scales are our primary tool for "Organic Brutalism." Don't be afraid to let a `display-md` headline occupy 40% of the viewport width, surrounded by `spacing-20` (7rem) of white space.

---

## 4. Elevation & Depth
In this system, depth is felt, not seen. We move away from heavy material shadows toward **Tonal Layering**.

*   **The Layering Principle:** Stack `surface-container` tiers. A `surface_container_highest` (#e4e2dd) sidebar against a `surface` (#fbf9f4) main content area creates a structural "valley" that guides the eye naturally.
*   **Ambient Shadows:** If an element must float (e.g., a primary action card), use an extra-diffused shadow: `box-shadow: 0 12px 40px rgba(27, 28, 25, 0.06)`. The shadow color is a 6% opacity version of our `on_surface` charcoal, mimicking natural ambient light.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use `outline_variant` (#c7c7bf) at **15% opacity**. It should be barely perceptible—a "whisper" of a line.

---

## 5. Components

### Buttons
*   **Primary:** Filled with `primary` (#b91d20), using `on_primary` (#ffffff) text. Shape: `rounded-md` (0.375rem). Use a 0.5s transition on hover to `primary_fixed_dim`.
*   **Tertiary:** No background, no border. Use `title-sm` typography with a `secondary` (#4c56af) underline that expands on hover.

### Minimalist Cards
*   **Style:** No borders. Background: `surface_container_lowest` (#ffffff).
*   **Spacing:** Internal padding should be at least `spacing-6` (2rem) to allow content to breathe.
*   **Interaction:** On hover, the card should scale slightly (1.02x) and the ambient shadow should increase in spread, never in opacity.

### Input Fields
*   **Style:** Underline-only or subtle `surface_variant` fill. 
*   **States:** Error states use `error` (#ba1a1a) text but maintain the minimalist aesthetic—avoid thick red boxes. Use a simple `error` colored "dot" indicator next to the label.

### Editorial Chips
*   **Selection:** Use `secondary_container` (#959efd) with `on_secondary_container` text. These should feel like small silk tags on a garment.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. Place text in the "top-left" and supporting imagery in the "bottom-right" with significant distance between them.
*   **Do** use the `spacing-16` and `spacing-20` tokens for section margins. Space is a luxury; use it.
*   **Do** use the `primary` Dancheong red for "Moments of Truth" (Final checkout, brand signatures, success states).

### Don'ts
*   **Don't** use 100% black (#000000). Always use `on_surface` (#1b1c19) for typography to keep the look "Ink-based" rather than "Digital."
*   **Don't** use dividers or horizontal rules. If you need to separate content, use `spacing-8` (2.75rem) of empty space.
*   **Don't** use standard "drop shadows." If the shadow looks like a shadow, it’s too dark. It should look like a soft glow of depth.
*   **Don't** overcrowd cards. If a card has more than three lines of text, it should probably be an editorial article page instead.