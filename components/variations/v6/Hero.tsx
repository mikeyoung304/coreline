'use client';

import { motion, useReducedMotion } from 'motion/react';
import { V6AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';
import { EASINGS, DELAYS } from '@/lib/animation-constants';

// Extracted constants for performance - prevents re-renders
const GRID_POSITIONS = [20, 35, 50, 65, 80] as const;

export function V6Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Animation props - disabled for reduced motion preference
  const getAnimationProps = (delay: number, y: number = 8) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASINGS.premium },
        };

  return (
    <section
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
      aria-labelledby="v6-hero-heading"
    >
      {/* Layered Horizon Background - expansive landscapes/property horizons */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base gradient - navy at bottom fading to lighter blue/gray */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-[#1a2a3a] to-[#2d3d4d]" />

        {/* Horizon glow effect */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1e3a50]/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        )}

        {/* Geometric line overlays - mimicking site plans */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          role="presentation"
        >
          {/* Horizontal horizon lines */}
          {!prefersReducedMotion ? (
            <>
              <motion.line
                x1="0" y1="70%" x2="100%" y2="70%"
                stroke="#5c7cad"
                strokeWidth="0.5"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.15, pathLength: 1 }}
                transition={{ duration: 2.0, delay: 1.5, ease: EASINGS.premium }}
              />
              <motion.line
                x1="0" y1="75%" x2="100%" y2="75%"
                stroke="#3d4f5f"
                strokeWidth="0.5"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.1, pathLength: 1 }}
                transition={{ duration: 1.8, delay: 1.7 }}
              />
              <motion.line
                x1="0" y1="82%" x2="100%" y2="82%"
                stroke="#3d4f5f"
                strokeWidth="0.5"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.06, pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.9 }}
              />

              {/* Vertical grid lines - subtle site plan aesthetic */}
              {GRID_POSITIONS.map((x, i) => (
                <motion.line
                  key={`v6-grid-${x}`}
                  x1={`${x}%`} y1="60%" x2={`${x}%`} y2="100%"
                  stroke="#3d4f5f"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.04 }}
                  transition={{ duration: 1.2, delay: 2.0 + i * 0.08 }}
                />
              ))}
            </>
          ) : (
            <>
              <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#5c7cad" strokeWidth="0.5" opacity="0.15" />
              <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#3d4f5f" strokeWidth="0.5" opacity="0.1" />
              <line x1="0" y1="82%" x2="100%" y2="82%" stroke="#3d4f5f" strokeWidth="0.5" opacity="0.06" />
            </>
          )}
        </svg>

        {/* Subtle grain texture */}
        <div className="absolute inset-0 luxury-grain opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Logo backdrop glow for visibility */}
        <div className="relative inline-block">
          <div
            className="absolute -inset-8 blur-2xl pointer-events-none opacity-60"
            style={{ background: 'radial-gradient(circle, rgba(125,163,212,0.25) 0%, rgba(107,127,148,0.1) 40%, transparent 70%)' }}
            aria-hidden="true"
          />
          <V6AnimatedLogo className="w-24 h-24 md:w-32 md:h-32 mx-auto relative" />
        </div>

        {/* Text with precise alignment snap animation - compressed timeline */}
        <motion.p
          {...getAnimationProps(DELAYS.textAfterLogo)}
          className="mt-16 text-sm md:text-base uppercase tracking-[0.2em] text-white/50 font-medium"
        >
          Investment Management
        </motion.p>

        <motion.h1
          id="v6-hero-heading"
          {...getAnimationProps(DELAYS.textAfterLogo + DELAYS.textStagger, 12)}
          className="mt-5 text-4xl md:text-6xl lg:text-7xl font-display font-normal text-white tracking-[-0.02em] leading-[1.15]"
        >
          Coreline Partners
        </motion.h1>

        <motion.p
          {...getAnimationProps(DELAYS.textAfterLogo + DELAYS.textStagger * 2)}
          className="mt-6 text-base text-white/60 max-w-lg mx-auto tracking-wide"
        >
          Building lasting value through strategic development.
        </motion.p>

        <motion.div
          {...getAnimationProps(DELAYS.textAfterLogo + DELAYS.textStagger * 3 + DELAYS.ctaAfterText, 16)}
          className="mt-12"
        >
          <ButtonLink
            href={`mailto:${CONTACT_EMAIL}?subject=Development%20Inquiry`}
            variant="ghost"
          >
            Start the Conversation
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
