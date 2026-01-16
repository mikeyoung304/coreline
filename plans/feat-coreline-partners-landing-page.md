# feat: Coreline Partners - Premium Landing Page

## Overview

Build a premium, Apple-inspired landing page for Coreline Partners, a high-end investment management firm. Pure static site with animated logo reveal, smooth scroll animations, and enterprise-grade visual polish. **No backend required** - contact via mailto link.

**Brand Identity:**
- **Logo**: Two-part interlocking "C" shape (rounded rectangles with negative space)
- **Colors**: `#3a86ff` (vibrant electric blue), `#415a77` (refined slate blue)
- **Typography**: Clean modern sans-serif
- **Design Language**: Geometric, sophisticated two-tone, Apple-like minimalism

---

## Problem Statement

Coreline Partners needs a digital presence that matches their premium positioning. The landing page must:

1. **Convey Trust & Sophistication** - High-net-worth clients expect excellence
2. **Load Blazingly Fast** - Sub-second LCP, perfect Lighthouse scores
3. **Impress Visually** - Anchor project to win future business
4. **Be Rock Solid** - Static site = zero backend failures

---

## Proposed Solution

A single-page static landing experience:
- Animated logo reveal on page load
- Full-viewport hero with elegant typography
- Scroll-triggered content reveals
- About section highlighting firm philosophy
- Contact button (`mailto:` link)
- Compliance-ready footer

**Tech Stack:**
- Next.js 15 App Router (static export)
- Tailwind CSS v4 (CSS-first configuration)
- Motion (Framer Motion) for all animations
- TypeScript strict mode
- **No backend / No API routes / No database**

---

## Technical Approach

### Architecture

```
coreline-partners/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing page (static)
│   ├── globals.css             # Tailwind v4 @theme
│   └── privacy/page.tsx        # Privacy Policy (optional)
├── components/
│   ├── logo/
│   │   ├── AnimatedLogo.tsx    # SVG animation
│   │   ├── StaticLogo.tsx      # Fallback/reduced-motion
│   │   └── logo-paths.ts       # SVG path data
│   ├── sections/
│   │   ├── Hero.tsx            # Full-viewport hero
│   │   ├── About.tsx           # Philosophy section
│   │   └── Stats.tsx           # Trust metrics (optional)
│   ├── ui/
│   │   ├── Button.tsx          # Primary CTA button
│   │   ├── ScrollReveal.tsx    # Animation wrapper
│   │   └── Container.tsx       # Max-width wrapper
│   └── Footer.tsx              # Compliance disclosures
├── lib/
│   ├── animations.ts           # Animation variants/presets
│   ├── utils.ts                # cn() helper
│   └── constants.ts            # Brand colors, email, etc.
└── public/
    ├── og-image.png            # Open Graph image
    └── favicon.ico
```

### Simplified - No Backend

```typescript
// Contact is just a mailto link
const CONTACT_EMAIL = 'contact@corelinepartners.com';

<Button asChild>
  <a href={`mailto:${CONTACT_EMAIL}?subject=Investment%20Inquiry`}>
    Schedule Consultation
  </a>
</Button>
```

### Brand Color System

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-brand-blue: #3a86ff;
  --color-brand-slate: #415a77;

  /* Extended Palette */
  --color-navy-950: #0a1628;
  --color-navy-900: #0d1f3c;
  --color-cream-50: #fafaf9;
  --color-cream-100: #f5f5f4;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-slow: 800ms;
}
```

---

## Implementation Phases

### Phase 1: Foundation Setup

**Tasks:**
1. Initialize Next.js 15 project with static export
2. Configure Tailwind CSS v4 with brand theme
3. Set up font optimization (Inter via next/font)
4. Configure TypeScript strict mode
5. Set up basic security headers

**Files to create:**
- `app/layout.tsx`
- `app/globals.css`
- `next.config.js`
- `package.json`

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  poweredByHeader: false,
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ]
    }];
  },
};
module.exports = nextConfig;
```

**Success Criteria:**
- [ ] `npm run dev` starts successfully
- [ ] Brand colors available as Tailwind classes
- [ ] Static export builds with `npm run build`

---

### Phase 2: Logo Animation

**Tasks:**
1. Extract SVG paths from logo files
2. Create AnimatedLogo component with Motion
3. Implement two-part reveal:
   - Slate blue shape draws first (0-0.8s)
   - Blue accent draws second (0.4-1.2s)
4. Add StaticLogo fallback for reduced-motion
5. Ensure no layout shift

**Animation Specification:**
```tsx
// components/logo/AnimatedLogo.tsx
'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS } from './logo-paths';
import { StaticLogo } from './StaticLogo';

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
      opacity: { duration: 0.3, delay }
    }
  })
};

export function AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <motion.svg
      viewBox="0 0 920.4 920.4"
      className={className}
      initial="hidden"
      animate="visible"
    >
      {/* Slate blue L-shape */}
      <motion.path
        d={LOGO_PATHS.slateShape}
        fill="#415a77"
        variants={pathVariants}
        custom={0}
      />
      {/* Blue accent */}
      <motion.path
        d={LOGO_PATHS.blueAccent}
        fill="#3a86ff"
        variants={pathVariants}
        custom={0.4}
      />
    </motion.svg>
  );
}
```

**Files to create:**
- `components/logo/AnimatedLogo.tsx`
- `components/logo/StaticLogo.tsx`
- `components/logo/logo-paths.ts`

**Success Criteria:**
- [ ] Logo animates smoothly on load
- [ ] Reduced motion shows static logo instantly
- [ ] No CLS during animation

---

### Phase 3: Hero Section

**Tasks:**
1. Full-viewport hero (100dvh)
2. Animated logo centered at top
3. Elegant typography hierarchy
4. Primary CTA button (mailto link)
5. Subtle scroll indicator
6. Mobile responsive

**Design:**
```
┌─────────────────────────────────────┐
│           [Animated Logo]           │
│                                     │
│         BUILDING GENERATIONAL       │
│              WEALTH.                │
│                                     │
│   Sophisticated investment          │
│   strategies for discerning         │
│   families and institutions.        │
│                                     │
│      [Schedule Consultation]        │  ← mailto: link
│                                     │
│              ↓                      │
└─────────────────────────────────────┘
```

**Files to create:**
- `components/sections/Hero.tsx`
- `components/ui/Button.tsx`

**Hero.tsx:**
```tsx
'use client';

import { motion } from 'motion/react';
import { AnimatedLogo } from '@/components/logo/AnimatedLogo';
import { Button } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-dvh flex flex-col items-center justify-center px-6 bg-cream-50">
      <AnimatedLogo className="w-24 h-24 md:w-32 md:h-32" />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 text-4xl md:text-6xl lg:text-7xl font-medium text-navy-950 text-center tracking-tight"
      >
        Building Generational
        <br />
        <span className="text-brand-blue">Wealth.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="mt-6 text-lg md:text-xl text-navy-800/70 text-center max-w-xl"
      >
        Sophisticated investment strategies for discerning families and institutions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="mt-10"
      >
        <Button asChild>
          <a href={`mailto:${CONTACT_EMAIL}?subject=Investment%20Inquiry`}>
            Schedule Consultation
          </a>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8"
      >
        <ChevronDown className="w-6 h-6 text-navy-800/30 animate-bounce" />
      </motion.div>
    </section>
  );
}
```

**Success Criteria:**
- [ ] Hero fills viewport on all devices
- [ ] CTA button opens email client
- [ ] Animations feel premium and polished

---

### Phase 4: Scroll Animations & About Section

**Tasks:**
1. Create ScrollReveal wrapper using Motion's `useInView`
2. Build About section with firm philosophy
3. Optional: Stats section with metrics
4. Staggered reveal animations

**ScrollReveal (Motion-only, no GSAP):**
```tsx
// components/ui/ScrollReveal.tsx
'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Files to create:**
- `components/ui/ScrollReveal.tsx`
- `components/sections/About.tsx`
- `components/sections/Stats.tsx` (optional)

**Success Criteria:**
- [ ] Sections animate smoothly on scroll
- [ ] Reduced motion shows content immediately
- [ ] No jank or performance issues

---

### Phase 5: Footer & Compliance

**Tasks:**
1. Create footer with compliance disclosures
2. Add copyright and contact info
3. Optional: Privacy policy link
4. Ensure text is readable

**Required Disclosures (finance industry):**
```typescript
// lib/constants.ts
export const CONTACT_EMAIL = 'contact@corelinepartners.com';

export const COMPLIANCE = {
  firm: 'Investment advisory services offered through Coreline Partners.',
  risk: 'Investing involves risk, including the potential loss of principal. Past performance is not indicative of future results.',
  year: new Date().getFullYear(),
};
```

**Footer.tsx:**
```tsx
import { COMPLIANCE, CONTACT_EMAIL } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-navy-950 text-white/60">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm">{COMPLIANCE.firm}</p>
        <p className="mt-4 text-xs max-w-2xl mx-auto">{COMPLIANCE.risk}</p>
        <p className="mt-8 text-xs">
          © {COMPLIANCE.year} Coreline Partners. All rights reserved.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-4 inline-block text-xs text-white/40 hover:text-white/60 transition-colors"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
```

**Success Criteria:**
- [ ] All compliance text present
- [ ] Footer readable on all backgrounds
- [ ] Email link works

---

### Phase 6: Polish & Performance

**Tasks:**
1. Optimize all assets (SVG, fonts)
2. Configure SEO metadata
3. Create OG image
4. Cross-browser testing
5. Lighthouse optimization (target: 100)
6. Accessibility audit

**Performance Targets:**
| Metric | Target |
|--------|--------|
| Lighthouse Performance | **100** |
| LCP | **< 1.0s** |
| CLS | **< 0.01** |
| Total JS | **< 80KB** |

**SEO Metadata:**
```tsx
// app/layout.tsx
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Coreline Partners | Investment Management',
  description: 'Sophisticated investment strategies for discerning families and institutions.',
  metadataBase: new URL('https://corelinepartners.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Coreline Partners',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a1628',
};
```

**Success Criteria:**
- [ ] Lighthouse all 100s
- [ ] Works in Chrome, Safari, Firefox, Edge
- [ ] Mobile tested iOS + Android
- [ ] Accessibility: zero violations

---

## Acceptance Criteria

### Functional
- [ ] Logo animation plays on page load
- [ ] Scroll animations work throughout
- [ ] Contact button opens email client
- [ ] Footer displays compliance text

### Non-Functional
- [ ] LCP < 1.0s
- [ ] CLS < 0.01
- [ ] Lighthouse Performance: 100
- [ ] WCAG 2.2 AA compliant
- [ ] Works without JavaScript (graceful degradation)

### Quality Gates
- [ ] TypeScript strict mode, no errors
- [ ] All images optimized
- [ ] Cross-browser tested
- [ ] Mobile responsive (320px - 2560px)

---

## Dependencies

**npm packages:**
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "typescript": "^5.5.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0"
  }
}
```

**Note:** No GSAP (saves ~23KB), no Zod, no form libraries - pure static site.

---

## Deployment

Static export to any CDN:
- **Vercel** (recommended for Next.js)
- **Render** (user has MCP configured)
- **Cloudflare Pages**
- **Netlify**

```bash
npm run build  # Outputs to /out folder
```

---

## What's NOT Included (Simplified Scope)

- ❌ Contact form
- ❌ API routes
- ❌ Database
- ❌ Rate limiting
- ❌ Bot protection
- ❌ CSRF protection
- ❌ Server-side logic
- ❌ User authentication
- ❌ CMS integration

**This is intentional.** A static site is:
- Infinitely scalable (CDN)
- Zero backend failures
- Maximum security (no attack surface)
- Blazing fast

---

## References

### Brand Assets
- Logo files: `/Users/mikeyoung/CODING/Coreline Partners/`
- Brand colors: `#3a86ff`, `#415a77`

### Design Inspiration
- [Apple.com](https://apple.com) - Whitespace, typography
- [Stripe.com](https://stripe.com) - Premium SaaS aesthetic
- [Linear.app](https://linear.app) - Smooth animations

### Technical Docs
- [Next.js 15 Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Motion Documentation](https://motion.dev/docs/react-quick-start)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4)

---

## Checklist Summary

- [ ] Phase 1: Foundation Setup
- [ ] Phase 2: Logo Animation
- [ ] Phase 3: Hero Section
- [ ] Phase 4: Scroll Animations & About
- [ ] Phase 5: Footer & Compliance
- [ ] Phase 6: Polish & Performance
