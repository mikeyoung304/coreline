# feat: 5 Landing Page Variations for Coreline Partners

## Overview

Create 5 distinct landing page variations for Coreline Partners, a high-end investment management firm. Each variation combines a unique logo animation with a hero section design, culminating in a single contact CTA. The client provided minimal direction—only the logo—testing our design capabilities.

**Goal:** Present 5 polished options demonstrating range and sophistication.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Motion (Framer Motion), TypeScript

**Constraints:** Static export only, no backend, mailto for contact

---

## Brand Assets

**Logo:** Two interlocking L-shaped pieces forming a stylized "C"
- **Slate shape** (larger, bottom-left): `#415a77`
- **Blue accent** (smaller, top-right): `#3a86ff`

**SVG Paths:**
```typescript
// lib/logo-paths.ts
export const LOGO_PATHS = {
  slateShape: 'M737.69,633.89c0,57.33-46.47,103.8-103.8,103.8h-347.39c-57.33,0-103.8-46.47-103.8-103.8V0h-15.59C74.82,0,0,74.82,0,167.12v586.16c0,92.3,74.82,167.12,167.12,167.12h586.16c92.3,0,167.12-74.82,167.12-167.12v-201.73h-182.71v82.34Z',
  blueAccent: 'M633.89,182.71c57.33,0,103.8,46.47,103.8,103.8v82.34h182.71v-201.73C920.4,74.82,845.58,0,753.28,0h-387.87v182.71h268.48Z',
} as const;

export const LOGO_VIEWBOX = '0 0 920.4 920.4';
```

---

## The 5 Variations

| # | Animation Concept | Hero Concept | Mood |
|---|------------------|--------------|------|
| 1 | Line-by-Line Assembly | Elegant Gradient Overlay | Classic, Trustworthy |
| 2 | Minimal Fade & Rotate | Asymmetric Minimalism | Modern, Editorial |
| 3 | Path Tracing with Glow | Video Background | Innovative, Dynamic |
| 4 | Symmetry Expansion | Interactive Reveal | Bold, Immersive |
| 5 | **Convergence** (mine) | **Split-Screen Duality** | Partnership, Balance |

---

## Variation 1: Classic Trust

### Animation: Line-by-Line Assembly
The logo constructs itself like precise calligraphy, evoking craftsmanship and stability.

**Sequence (3s total):**
1. **0-1.2s:** Slate shape draws stroke from left to right
2. **0.8-2.0s:** Blue accent draws stroke from top, overlapping
3. **1.8-2.5s:** Both shapes fill with color (stroke → fill)
4. **2.2-3.0s:** Subtle scale-up (1.0 → 1.02 → 1.0) as "signature" flourish

```tsx
// components/variations/v1/AnimatedLogo.tsx
'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

const pathVariants = {
  hidden: { pathLength: 0, fillOpacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay },
      fillOpacity: { duration: 0.5, delay: delay + 1.0 }
    }
  })
};

const containerVariants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.02, 1],
    transition: { duration: 0.5, delay: 2.2, ease: 'easeOut' }
  }
};

export function V1AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d={LOGO_PATHS.slateShape}
        stroke="#415a77"
        strokeWidth="4"
        fill="#415a77"
        variants={pathVariants}
        custom={0}
      />
      <motion.path
        d={LOGO_PATHS.blueAccent}
        stroke="#3a86ff"
        strokeWidth="4"
        fill="#3a86ff"
        variants={pathVariants}
        custom={0.8}
      />
    </motion.svg>
  );
}
```

### Hero: Elegant Gradient Overlay
Full-screen navy-to-cream gradient with centered content and abstract line pattern.

**Layout:**
```
┌─────────────────────────────────────────┐
│     ╔════════════════════╗              │  ← Navy gradient top
│     ║   [Animated Logo]  ║              │
│     ╚════════════════════╝              │
│                                         │
│      ELEVATING YOUR INVESTMENTS         │
│      WITH PRECISION AND INSIGHT         │
│                                         │
│      Tailored strategies for            │
│      discerning clients.                │
│                                         │
│         [ Contact Us ]                  │
│                                         │  ← Cream gradient bottom
│     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~        │  ← Subtle line pattern
└─────────────────────────────────────────┘
```

```tsx
// components/variations/v1/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { V1AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';

export function V1Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-cream-50" />

      {/* Abstract line pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <pattern id="lines" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 Q30 0 60 30" stroke="currentColor" fill="none" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#lines)" />
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <V1AnimatedLogo className="w-24 h-24 md:w-32 md:h-32 mx-auto" />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 text-4xl md:text-6xl font-light text-white tracking-tight"
        >
          Elevating Your Investments
          <br />
          <span className="text-brand-blue">With Precision and Insight</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 text-lg text-white/60 max-w-xl mx-auto"
        >
          Tailored strategies for discerning clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10"
        >
          <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Investment%20Inquiry`}>
            Contact Us
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Variation 2: Editorial Modern

### Animation: Minimal Fade & Rotate
Logo reveals through rotation and color saturation, like unveiling a premium product.

**Sequence (2.5s total):**
1. **0-0.3s:** Logo appears in grayscale, slightly rotated (-15°)
2. **0.3-1.8s:** Rotates to 0° while gaining color saturation
3. **1.8-2.5s:** Subtle brightness pulse

```tsx
// components/variations/v2/AnimatedLogo.tsx
'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

export function V2AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      initial={{ rotate: -15, filter: 'grayscale(100%)', opacity: 0 }}
      animate={{
        rotate: 0,
        filter: 'grayscale(0%)',
        opacity: 1
      }}
      transition={{
        rotate: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 1.8, ease: 'easeOut' },
        opacity: { duration: 0.3 }
      }}
    >
      <path d={LOGO_PATHS.slateShape} fill="#415a77" />
      <path d={LOGO_PATHS.blueAccent} fill="#3a86ff" />
    </motion.svg>
  );
}
```

### Hero: Asymmetric Minimalism
Logo positioned off-center left, text stacked right, creating editorial tension.

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│   ╔═══════╗                             │
│   ║ Logo  ║     CORELINE:               │
│   ║       ║     WHERE STRATEGY          │
│   ╚═══════╝     MEETS SOPHISTICATION    │
│                                         │
│                 Building generational    │
│                 wealth through           │
│                 precision.               │
│                                         │
│                 [ Schedule Call ]        │
│                                         │
│                          ↓              │
└─────────────────────────────────────────┘
```

```tsx
// components/variations/v2/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { V2AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';

export function V2Hero() {
  return (
    <section className="relative min-h-dvh bg-cream-50 overflow-hidden">
      {/* Blurred background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-950/5 to-transparent" />

      <div className="relative z-10 min-h-dvh flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Logo */}
          <div className="flex justify-center md:justify-start">
            <V2AnimatedLogo className="w-48 h-48 md:w-64 md:h-64" />
          </div>

          {/* Right: Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-tight"
            >
              Coreline:
              <br />
              <span className="text-brand-slate">Where Strategy</span>
              <br />
              <span className="text-brand-blue">Meets Sophistication</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 text-lg text-navy-800/70 max-w-md"
            >
              Building generational wealth through precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10"
            >
              <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Schedule%20a%20Call`}>
                Schedule a Call
              </ButtonLink>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-navy-800/30 animate-bounce" />
      </motion.div>
    </section>
  );
}
```

---

## Variation 3: Dynamic Innovation

### Animation: Path Tracing with Glow
Light traces along logo paths like a premium car commercial, with soft glow effect.

**Sequence (3.5s total):**
1. **0-2.0s:** Light particle traces slate shape path
2. **1.0-3.0s:** Light traces blue accent (overlapping)
3. **2.5-3.5s:** Soft glow pulse radiates outward, then settles

```tsx
// components/variations/v3/AnimatedLogo.tsx
'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

export function V3AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <div className="relative">
      {/* Glow effect layer */}
      <motion.div
        className="absolute inset-0 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.3] }}
        transition={{ duration: 1, delay: 2.5, times: [0, 0.5, 1] }}
      >
        <svg viewBox={LOGO_VIEWBOX} className={className}>
          <path d={LOGO_PATHS.slateShape} fill="#415a77" />
          <path d={LOGO_PATHS.blueAccent} fill="#3a86ff" />
        </svg>
      </motion.div>

      {/* Main logo with path tracing */}
      <motion.svg viewBox={LOGO_VIEWBOX} className={className}>
        {/* Slate shape - traced then filled */}
        <motion.path
          d={LOGO_PATHS.slateShape}
          stroke="#415a77"
          strokeWidth="6"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d={LOGO_PATHS.slateShape}
          fill="#415a77"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        />

        {/* Blue accent - traced then filled */}
        <motion.path
          d={LOGO_PATHS.blueAccent}
          stroke="#3a86ff"
          strokeWidth="6"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d={LOGO_PATHS.blueAccent}
          fill="#3a86ff"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        />
      </motion.svg>
    </div>
  );
}
```

### Hero: Video Background Subtlety
Slow-motion abstract video with minimal overlay text.

**Layout:**
```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │      [Video: Abstract waves       │  │
│  │       in blue/gray tones]         │  │
│  │                                   │  │
│  │         [Animated Logo]           │  │
│  │                                   │  │
│  │     INVEST WITH CONFIDENCE.       │  │
│  │     MANAGE WITH CORELINE.         │  │
│  │                                   │  │
│  │         [ Get in Touch ]          │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

```tsx
// components/variations/v3/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { V3AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';

export function V3Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/video-poster.jpg"
      >
        <source src="/abstract-waves.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-navy-950/70" />

      <div className="relative z-10 text-center px-6">
        <V3AnimatedLogo className="w-28 h-28 md:w-36 md:h-36 mx-auto" />

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="mt-12 text-3xl md:text-5xl font-light text-white tracking-wide"
        >
          Invest with Confidence.
          <br />
          <span className="text-brand-blue">Manage with Coreline.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.5 }}
          className="mt-10"
        >
          <ButtonLink
            href={`mailto:${CONTACT_EMAIL}?subject=Investment%20Inquiry`}
            className="bg-white text-navy-950 hover:bg-cream-100"
          >
            Get in Touch
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
```

**Note:** For video, create a 10-15 second loop of abstract geometric shapes or fluid gradients in blue/gray tones. Alternatively, use a CSS-only animated gradient as fallback.

---

## Variation 4: Bold Immersive

### Animation: Symmetry Expansion
Logo expands from a central point, like a "core" activating—playing on the brand name.

**Sequence (2.5s total):**
1. **0-0.2s:** Small dot appears at center
2. **0.2-1.5s:** Expands symmetrically, shapes materialize from center
3. **1.5-2.0s:** Blue accent fills in last (the "activation")
4. **2.0-2.5s:** Slight bounce settle

```tsx
// components/variations/v4/AnimatedLogo.tsx
'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

export function V4AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        scale: {
          duration: 1.3,
          ease: [0.34, 1.56, 0.64, 1], // Slight overshoot
        },
        opacity: { duration: 0.2 }
      }}
    >
      <motion.path
        d={LOGO_PATHS.slateShape}
        fill="#415a77"
        initial={{ scale: 0, originX: '50%', originY: '50%' }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.3, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.path
        d={LOGO_PATHS.blueAccent}
        fill="#3a86ff"
        initial={{ scale: 0, opacity: 0, originX: '50%', originY: '50%' }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          scale: { duration: 0.8, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] },
          opacity: { duration: 0.3, delay: 1.2 }
        }}
      />
    </motion.svg>
  );
}
```

### Hero: Interactive Reveal
Full-screen logo animation that shrinks to reveal content beneath.

**Sequence:**
1. Logo animates full-screen on solid navy background
2. Logo shrinks and moves to top-left (future navbar position)
3. Background fades to reveal hero content

```tsx
// components/variations/v4/Hero.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { V4AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';

export function V4Hero() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <section className="relative min-h-dvh">
      {/* Phase 1: Full-screen logo animation */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            className="fixed inset-0 z-50 bg-navy-950 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 0.15, x: '-42vw', y: '-42vh' }}
              transition={{ duration: 1, delay: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
              onAnimationComplete={() => setAnimationComplete(true)}
            >
              <V4AnimatedLogo className="w-64 h-64 md:w-96 md:h-96" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Revealed hero content */}
      <div className="min-h-dvh bg-cream-50 flex flex-col">
        {/* Mini logo in corner (after animation) */}
        {animationComplete && (
          <motion.div
            className="absolute top-6 left-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <V4AnimatedLogo className="w-12 h-12" />
          </motion.div>
        )}

        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={animationComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-light text-navy-950 tracking-tight">
              Luxury Investment Management
              <br />
              <span className="text-brand-blue">Redefined</span>
            </h1>

            <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-navy-800/70">
              <li>Bespoke Portfolios</li>
              <li>•</li>
              <li>Global Expertise</li>
              <li>•</li>
              <li>Unparalleled Returns</li>
            </ul>

            <div className="mt-10">
              <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Investment%20Inquiry`}>
                Begin Your Journey
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

## Variation 5: Convergence (My Addition)

### Concept
The two logo pieces represent partnership—they start separated and converge to interlock. This symbolizes:
- Two parties coming together (investor + advisor)
- The "core" in Coreline (center point of convergence)
- Balance and completion

### Animation: Convergence
The two L-shapes approach from opposite corners and interlock.

**Sequence (3s total):**
1. **0-0.3s:** Both shapes appear at edges, slightly transparent
2. **0.3-2.0s:** Shapes glide toward center, rotating slightly to align
3. **2.0-2.5s:** Interlock with satisfying "click" (subtle scale pulse)
4. **2.5-3.0s:** Full opacity, settled

```tsx
// components/variations/v5/AnimatedLogo.tsx
'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

export function V5AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 0.4, delay: 2.0, ease: 'easeOut' }}
    >
      {/* Slate shape - arrives from bottom-left */}
      <motion.path
        d={LOGO_PATHS.slateShape}
        fill="#415a77"
        initial={{
          x: -150,
          y: 150,
          opacity: 0.6,
          rotate: -8
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          rotate: 0
        }}
        transition={{
          duration: 1.7,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.3
        }}
      />

      {/* Blue accent - arrives from top-right */}
      <motion.path
        d={LOGO_PATHS.blueAccent}
        fill="#3a86ff"
        initial={{
          x: 150,
          y: -150,
          opacity: 0.6,
          rotate: 8
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          rotate: 0
        }}
        transition={{
          duration: 1.7,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.3
        }}
      />
    </motion.svg>
  );
}
```

### Hero: Split-Screen Duality
Left side dark, right side light—logo sits at the intersection, bridging both worlds.

**Layout:**
```
┌────────────────────┬────────────────────┐
│                    │                    │
│   DARK SIDE        │   LIGHT SIDE       │
│   (Navy)           │   (Cream)          │
│                    │                    │
│              ╔═════╧═════╗              │
│              ║   LOGO    ║              │
│              ╚═════╤═════╝              │
│                    │                    │
│   Building         │   Through          │
│   Legacies         │   Partnership      │
│                    │                    │
│            [ Connect With Us ]          │
│                    │                    │
└────────────────────┴────────────────────┘
```

```tsx
// components/variations/v5/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { V5AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';

export function V5Hero() {
  return (
    <section className="relative min-h-dvh flex">
      {/* Left half - Dark */}
      <div className="w-1/2 bg-navy-950 relative">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="absolute bottom-1/3 right-8 text-right"
        >
          <span className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Building
            <br />
            <span className="text-brand-slate">Legacies</span>
          </span>
        </motion.div>
      </div>

      {/* Right half - Light */}
      <div className="w-1/2 bg-cream-50 relative">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="absolute bottom-1/3 left-8 text-left"
        >
          <span className="text-3xl md:text-5xl font-light text-navy-950 tracking-tight">
            Through
            <br />
            <span className="text-brand-blue">Partnership</span>
          </span>
        </motion.div>
      </div>

      {/* Center: Logo spanning both halves */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <V5AnimatedLogo className="w-32 h-32 md:w-48 md:h-48" />
      </div>

      {/* CTA at bottom center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 3.0 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ButtonLink
          href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20Inquiry`}
          className="bg-brand-blue text-white hover:bg-brand-blue/90"
        >
          Connect With Us
        </ButtonLink>
      </motion.div>
    </section>
  );
}
```

---

## File Structure

```
components/
├── logo/
│   ├── StaticLogo.tsx          # Shared static fallback
│   ├── logo-paths.ts           # Shared SVG path data
│   └── index.ts
├── variations/
│   ├── v1/
│   │   ├── AnimatedLogo.tsx    # Line-by-Line Assembly
│   │   ├── Hero.tsx            # Elegant Gradient Overlay
│   │   └── index.ts
│   ├── v2/
│   │   ├── AnimatedLogo.tsx    # Minimal Fade & Rotate
│   │   ├── Hero.tsx            # Asymmetric Minimalism
│   │   └── index.ts
│   ├── v3/
│   │   ├── AnimatedLogo.tsx    # Path Tracing with Glow
│   │   ├── Hero.tsx            # Video Background
│   │   └── index.ts
│   ├── v4/
│   │   ├── AnimatedLogo.tsx    # Symmetry Expansion
│   │   ├── Hero.tsx            # Interactive Reveal
│   │   └── index.ts
│   └── v5/
│       ├── AnimatedLogo.tsx    # Convergence
│       ├── Hero.tsx            # Split-Screen Duality
│       └── index.ts
├── ui/
│   ├── Button.tsx
│   ├── Container.tsx
│   └── ScrollReveal.tsx
└── Footer.tsx

app/
├── layout.tsx
├── globals.css
├── page.tsx                    # Default/selector page
├── v1/page.tsx                 # Variation 1 route
├── v2/page.tsx                 # Variation 2 route
├── v3/page.tsx                 # Variation 3 route
├── v4/page.tsx                 # Variation 4 route
└── v5/page.tsx                 # Variation 5 route
```

---

## Implementation Phases

### Phase 1: Shared Foundation
- [ ] Create `lib/logo-paths.ts` with SVG data
- [ ] Create `components/logo/StaticLogo.tsx` (shared fallback)
- [ ] Set up `components/variations/` folder structure
- [ ] Create route structure (`app/v1/`, `app/v2/`, etc.)
- [ ] Update `globals.css` with any additional theme tokens

**Files:**
- `lib/logo-paths.ts`
- `components/logo/StaticLogo.tsx`
- `components/logo/index.ts`
- `app/v1/page.tsx` through `app/v5/page.tsx`

### Phase 2: Variation 1 - Classic Trust
- [ ] Build `V1AnimatedLogo.tsx` (line-by-line assembly)
- [ ] Build `V1Hero.tsx` (gradient overlay + line pattern)
- [ ] Test reduced motion fallback
- [ ] Mobile responsive check

### Phase 3: Variation 2 - Editorial Modern
- [ ] Build `V2AnimatedLogo.tsx` (fade & rotate)
- [ ] Build `V2Hero.tsx` (asymmetric layout)
- [ ] Test reduced motion fallback
- [ ] Mobile responsive check

### Phase 4: Variation 3 - Dynamic Innovation
- [ ] Build `V3AnimatedLogo.tsx` (path tracing + glow)
- [ ] Build `V3Hero.tsx` (video background)
- [ ] Create/source abstract video or CSS fallback
- [ ] Test reduced motion fallback
- [ ] Mobile responsive check

### Phase 5: Variation 4 - Bold Immersive
- [ ] Build `V4AnimatedLogo.tsx` (symmetry expansion)
- [ ] Build `V4Hero.tsx` (interactive reveal)
- [ ] Test animation state management
- [ ] Test reduced motion fallback
- [ ] Mobile responsive check

### Phase 6: Variation 5 - Convergence
- [ ] Build `V5AnimatedLogo.tsx` (convergence animation)
- [ ] Build `V5Hero.tsx` (split-screen duality)
- [ ] Test reduced motion fallback
- [ ] Mobile responsive check

### Phase 7: Polish & Index
- [ ] Create index page (`app/page.tsx`) with variation selector
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Lighthouse audit all variations (target: 100)
- [ ] Final accessibility review
- [ ] Static export test (`npm run build`)

---

## Acceptance Criteria

### Per Variation
- [ ] Logo animation plays on load (2-4 seconds)
- [ ] Animation respects `prefers-reduced-motion`
- [ ] Hero fills viewport on all screen sizes
- [ ] Single CTA (mailto link) works correctly
- [ ] Typography is readable and elegant
- [ ] Mobile responsive (320px - 2560px)

### Overall
- [ ] All 5 variations are distinct and polished
- [ ] Static export builds successfully
- [ ] Lighthouse Performance: 100 on all variations
- [ ] No console errors
- [ ] Footer with compliance text on all pages

---

## Technical Notes

### Animation Easing
Use consistent easing across all variations:
```typescript
const ease = [0.25, 0.1, 0.25, 1]; // Custom ease-out
const easeExpo = [0.16, 1, 0.3, 1]; // Expo ease-out (for path drawing)
const easeOvershoot = [0.34, 1.56, 0.64, 1]; // Slight bounce
```

### Reduced Motion Pattern
Every animated component must:
```typescript
const prefersReducedMotion = useReducedMotion();
if (prefersReducedMotion) {
  return <StaticVersion />;
}
```

### Performance Budget
- Total JS per variation: < 100KB
- LCP: < 1.0s
- CLS: < 0.01
- No layout shift during animations

---

## References

- Logo files: `/Users/mikeyoung/CODING/Coreline/Logo/`
- Existing code patterns: `/Users/mikeyoung/CODING/Coreline/components/`
- Brand colors: `#3a86ff` (blue), `#415a77` (slate)
- Motion docs: https://motion.dev/docs/react-quick-start
- Tailwind v4: https://tailwindcss.com/blog/tailwindcss-v4
