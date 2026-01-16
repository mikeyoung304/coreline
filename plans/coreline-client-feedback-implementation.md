# CoreLine Client Feedback Implementation

**Date:** 2026-01-16
**Status:** Planning
**Type:** Feature refinement / Cleanup

---

## Overview

Implement client feedback to create a single, clean landing page for CoreLine Investment Management. The client has selected the "Bold Typography" (V2) style and wants a simplified page with minimal text.

## Client Requirements Summary

| Requirement | Details |
|-------------|---------|
| Company Name | "CoreLine Investment Management" (capital L in CoreLine) |
| Text Content | Only "Website coming soon" and "Contact Us" |
| Style | Bold Typography (V2) centered layout, ALL CAPS |
| Font | Match logo font (geometric sans-serif - likely Gilroy/Campton family) |
| CTA | "Contact Us" linking to info@corelineim.com |
| Remove | All "Private Wealth" labels, all variation options |

## Acceptance Criteria

- [ ] Single landing page (no Dashboard, no variation selector)
- [ ] Logo centered on page
- [ ] "CoreLine Investment Management" text displayed (matching logo font, ALL CAPS)
- [ ] "Website coming soon" text below company name
- [ ] "Contact Us" email link below that
- [ ] Clean, minimal design based on V2 style
- [ ] Mobile responsive
- [ ] Respects prefers-reduced-motion
- [ ] Lighthouse 100 target maintained

---

## Technical Approach

### Phase 1: Font Setup

**Add geometric sans-serif font to match logo:**

```typescript
// app/layout.tsx - Add Outfit or similar geometric font
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600'],
});
```

**Note:** If client provides exact font name, swap Outfit for that font. Outfit is the closest free Google Font match to the geometric style in the logo.

### Phase 2: Simplify Page Structure

**Files to modify:**
- `app/page.tsx` - Replace Dashboard with single Hero component
- `app/layout.tsx` - Update metadata, add font

**Files to delete:**
- `app/v2/page.tsx`
- `app/v3/page.tsx`
- `app/v4/page.tsx`
- `app/v5/page.tsx`
- `components/Dashboard.tsx`
- `components/VariationCarousel.tsx`
- `components/variations/v3/` (entire folder)
- `components/variations/v4/` (entire folder)
- `components/variations/v5/` (entire folder)

**Files to keep and modify:**
- `components/variations/v2/Hero.tsx` → Move to `components/Hero.tsx`
- `components/variations/v2/AnimatedLogo.tsx` → Move to `components/AnimatedLogo.tsx`

### Phase 3: Hero Component Redesign

**New Hero layout (based on V2 style):**

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│              [Logo]                     │  ← Centered, animated
│                                         │
│    CORELINE INVESTMENT MANAGEMENT       │  ← ALL CAPS, geometric font
│                                         │
│         Website coming soon             │  ← Sentence case, lighter weight
│                                         │
│            Contact Us                   │  ← Link to mailto:
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Key styling decisions:**
- Background: Cream-50 (`#f8f7f4`) - clean, premium feel
- Text: Navy-950 (`#0c1821`) for company name
- Secondary text: Lighter weight, slightly muted
- CTA: Subtle styling, underline on hover
- Vertical centering with good spacing

### Phase 4: Update Constants

```typescript
// lib/constants.ts
export const BRAND = {
  name: 'CoreLine Investment Management',
  tagline: 'Website coming soon',
  cta: 'Contact Us',
};

export const CONTACT_EMAIL = 'info@corelineim.com';
```

---

## Implementation Checklist

### Setup
- [ ] Add Outfit font (or confirmed font) to layout.tsx
- [ ] Update Tailwind config if needed for new font class

### Cleanup (delete unused files)
- [ ] Delete `app/v2/page.tsx`
- [ ] Delete `app/v3/page.tsx`
- [ ] Delete `app/v4/page.tsx`
- [ ] Delete `app/v5/page.tsx`
- [ ] Delete `components/Dashboard.tsx`
- [ ] Delete `components/VariationCarousel.tsx`
- [ ] Delete `components/variations/v3/` folder
- [ ] Delete `components/variations/v4/` folder
- [ ] Delete `components/variations/v5/` folder

### Restructure
- [ ] Move `components/variations/v2/AnimatedLogo.tsx` to `components/AnimatedLogo.tsx`
- [ ] Move `components/variations/v2/Hero.tsx` to `components/Hero.tsx`
- [ ] Delete `components/variations/v2/` folder after move
- [ ] Delete `components/variations/` folder (should be empty)

### Hero Component Updates
- [ ] Update Hero.tsx layout to centered single-column
- [ ] Remove "Coreline Partners" → use full "CoreLine Investment Management"
- [ ] Remove "Institutional Investment Management" subheading
- [ ] Add "Website coming soon" text
- [ ] Update CTA to say "Contact Us" (not email address)
- [ ] Apply ALL CAPS to company name
- [ ] Use new geometric font for typography
- [ ] Maintain staggered animation timing

### Main Page
- [ ] Update `app/page.tsx` to render Hero directly
- [ ] Remove Dashboard import and usage

### Final Checks
- [ ] Verify mobile responsiveness
- [ ] Test reduced motion preference
- [ ] Run build (`npm run build`)
- [ ] Check Lighthouse scores

---

## File Changes Summary

| Action | File |
|--------|------|
| MODIFY | `app/layout.tsx` |
| MODIFY | `app/page.tsx` |
| MODIFY | `lib/constants.ts` |
| CREATE | `components/Hero.tsx` (from v2) |
| CREATE | `components/AnimatedLogo.tsx` (from v2) |
| DELETE | `app/v2/page.tsx` |
| DELETE | `app/v3/page.tsx` |
| DELETE | `app/v4/page.tsx` |
| DELETE | `app/v5/page.tsx` |
| DELETE | `components/Dashboard.tsx` |
| DELETE | `components/VariationCarousel.tsx` |
| DELETE | `components/variations/*` (all) |

---

## Font Recommendation

Based on logo analysis, the font appears to be from the **Gilroy/Campton** family (geometric sans-serif).

**Free alternatives for web (Google Fonts):**
1. **Outfit** (recommended) - Closest match, excellent weight range
2. **Plus Jakarta Sans** - Good alternative
3. **DM Sans** - Acceptable fallback

**If client provides exact font:**
- Replace Outfit with specified font
- May need to self-host if not on Google Fonts

---

## Questions Resolved

| Question | Answer |
|----------|--------|
| Font | Use Outfit (Google Font) as match; await confirmation from designer |
| Email | info@corelineim.com |
| Deliverable | Single page, delete all variations |
| Company name display | Include as text, ALL CAPS |

---

## Risk Considerations

1. **Font mismatch** - If the actual logo font is significantly different from Outfit, may need adjustment after client review
2. **Animation timing** - V2 animations are designed for different content; may need retuning

---

## References

- Current V2 Hero: `components/variations/v2/Hero.tsx`
- Current V2 Logo Animation: `components/variations/v2/AnimatedLogo.tsx`
- Constants: `lib/constants.ts`
- Font config: `app/layout.tsx`
- Logo SVG with typography: `Logo/Coreline_FullMark_FullColor.svg`
