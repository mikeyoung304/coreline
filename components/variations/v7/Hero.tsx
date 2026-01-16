'use client';

import { motion, useReducedMotion } from 'motion/react';
import { V7AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';
import { EASINGS, DELAYS, LOGO_COLORS } from '@/lib/animation-constants';

// TypeScript interface for asset shapes
interface RectShape {
  id: string;
  type: 'rect';
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  color: string;
}

interface EllipseShape {
  id: string;
  type: 'ellipse';
  x: number;
  y: number;
  rx: number;
  ry: number;
  delay: number;
  color: string;
}

type AssetShape = RectShape | EllipseShape;

// Abstract asset shapes - refined composition with explicit colors
const assetShapes: readonly AssetShape[] = [
  // Industrial/commercial - rectangular forms (clustered)
  { id: 'industrial-1', type: 'rect', x: 8, y: 18, w: 10, h: 16, delay: 0, color: LOGO_COLORS.slate },
  { id: 'industrial-2', type: 'rect', x: 80, y: 12, w: 12, h: 22, delay: 0.15, color: LOGO_COLORS.blue },
  { id: 'commercial-1', type: 'rect', x: 22, y: 72, w: 14, h: 10, delay: 0.3, color: LOGO_COLORS.blue },
  { id: 'commercial-2', type: 'rect', x: 72, y: 68, w: 16, h: 18, delay: 0.1, color: LOGO_COLORS.slate },
  // Residential - softer curved forms
  { id: 'residential-1', type: 'ellipse', x: 88, y: 48, rx: 7, ry: 11, delay: 0.25, color: LOGO_COLORS.blue },
  { id: 'residential-2', type: 'ellipse', x: 10, y: 52, rx: 9, ry: 13, delay: 0.4, color: LOGO_COLORS.slate },
] as const;

// Extracted style constant for grid pattern - prevents re-renders
const GRID_STYLE = {
  backgroundImage: `
    linear-gradient(to right, rgba(61, 79, 95, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(61, 79, 95, 0.03) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
} as const;

export function V7Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Animation props helper
  const getAnimationProps = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASINGS.premium },
        };

  return (
    <section
      className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-cream-50"
      aria-labelledby="v7-hero-heading"
    >
      {/* Asset Mosaic Background - high-end, blurred monochromatic shapes */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" role="presentation">
          <defs>
            <filter id="v7-mosaic-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
            </filter>
            {/* Gradient for fading to whitespace - shifted for natural light */}
            <radialGradient id="v7-fade-gradient" cx="45%" cy="55%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Asset class shapes - only animate opacity for performance */}
          {assetShapes.map((shape) =>
            shape.type === 'rect' ? (
              prefersReducedMotion ? (
                <rect
                  key={shape.id}
                  x={`${shape.x}%`}
                  y={`${shape.y}%`}
                  width={`${shape.w}%`}
                  height={`${shape.h}%`}
                  fill={shape.color}
                  opacity="0.08"
                  filter="url(#v7-mosaic-blur)"
                />
              ) : (
                <motion.rect
                  key={shape.id}
                  x={`${shape.x}%`}
                  y={`${shape.y}%`}
                  width={`${shape.w}%`}
                  height={`${shape.h}%`}
                  fill={shape.color}
                  filter="url(#v7-mosaic-blur)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.08 }}
                  transition={{ duration: 1.8, delay: shape.delay, ease: EASINGS.out }}
                />
              )
            ) : prefersReducedMotion ? (
              <ellipse
                key={shape.id}
                cx={`${shape.x}%`}
                cy={`${shape.y}%`}
                rx={`${shape.rx}%`}
                ry={`${shape.ry}%`}
                fill={shape.color}
                opacity="0.06"
                filter="url(#v7-mosaic-blur)"
              />
            ) : (
              <motion.ellipse
                key={shape.id}
                cx={`${shape.x}%`}
                cy={`${shape.y}%`}
                rx={`${shape.rx}%`}
                ry={`${shape.ry}%`}
                fill={shape.color}
                filter="url(#v7-mosaic-blur)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.06 }}
                transition={{ duration: 1.8, delay: shape.delay, ease: EASINGS.out }}
              />
            )
          )}

          {/* Fade to whitespace overlay */}
          <rect width="100%" height="100%" fill="url(#v7-fade-gradient)" />
        </svg>

        {/* Subtle grid pattern */}
        {!prefersReducedMotion ? (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            style={GRID_STYLE}
          />
        ) : (
          <div className="absolute inset-0" style={GRID_STYLE} />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <V7AnimatedLogo className="w-28 h-28 md:w-36 md:h-36 mx-auto" />

        {/* Text with vertical entrance - compressed timeline */}
        <motion.p
          {...getAnimationProps(DELAYS.textAfterLogo)}
          className="mt-14 text-sm md:text-base uppercase tracking-[0.2em] text-brand-slate/50 font-medium"
        >
          Investment Management
        </motion.p>

        <motion.h1
          id="v7-hero-heading"
          {...getAnimationProps(DELAYS.textAfterLogo + DELAYS.textStagger)}
          className="mt-5 text-4xl md:text-6xl lg:text-7xl font-display font-normal text-navy-950 tracking-[-0.02em] leading-[1.15]"
        >
          Coreline Partners
        </motion.h1>

        <motion.p
          {...getAnimationProps(DELAYS.textAfterLogo + DELAYS.textStagger * 2)}
          className="mt-6 text-base text-brand-slate/60 max-w-lg mx-auto tracking-wide"
        >
          Unlocking value across diverse asset portfolios.
        </motion.p>

        <motion.div
          {...getAnimationProps(DELAYS.textAfterLogo + DELAYS.textStagger * 3 + DELAYS.ctaAfterText)}
          className="mt-12"
        >
          <ButtonLink
            href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20Inquiry`}
            variant="premium"
          >
            Explore Opportunities
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
