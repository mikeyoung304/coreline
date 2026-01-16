'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';
import { EASINGS, DURATIONS } from '@/lib/animation-constants';

// V6-specific lighter logo colors for dark background contrast
const V6_V6_LOGO_COLORS = {
  slate: '#6b7f94',  // Lightened from #3d4f5f
  blue: '#7da3d4',   // Lightened from #5c7cad
} as const;

export interface AnimatedLogoProps {
  className?: string;
  onAnimationComplete?: () => void;
}

export function V6AnimatedLogo({ className, onAnimationComplete }: AnimatedLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  // Structural Build Animation - like architectural blueprints coming to life
  return (
    <div className="relative">
      {/* Phase 1: Blueprint grid outline - faint structural guide */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.25, 0] }}
        transition={{ duration: 2.4, ease: EASINGS.out }}
      >
        <svg
          viewBox={LOGO_VIEWBOX}
          className={className}
          aria-hidden="true"
          role="presentation"
        >
          <defs>
            <pattern id="v6-blueprint-grid" width="46" height="46" patternUnits="userSpaceOnUse">
              <path d="M 46 0 L 0 0 0 46" fill="none" stroke={V6_LOGO_COLORS.slate} strokeWidth="0.5" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#v6-blueprint-grid)" />
          {/* Faint outline of final shapes - animated dash */}
          <motion.path
            d={LOGO_PATHS.slateShape}
            fill="none"
            stroke={V6_LOGO_COLORS.slate}
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ strokeDashoffset: 100, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: EASINGS.premium }}
          />
          <motion.path
            d={LOGO_PATHS.blueAccent}
            fill="none"
            stroke={V6_LOGO_COLORS.blue}
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ strokeDashoffset: 100, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: 0.2, ease: EASINGS.premium }}
          />
        </svg>
      </motion.div>

      {/* Main logo with structural build animation */}
      <motion.svg
        viewBox={LOGO_VIEWBOX}
        className={className}
        aria-label="Coreline Partners Logo"
        role="img"
      >
        <defs>
          {/* Clip paths for reveal animations */}
          <clipPath id="v6-slate-reveal">
            <motion.rect
              x="0"
              y="920.4"
              width="920.4"
              height="920.4"
              initial={{ y: 920.4 }}
              animate={{ y: 0 }}
              transition={{ duration: DURATIONS.logo.primary, delay: 0.6, ease: EASINGS.premium }}
            />
          </clipPath>
          <clipPath id="v6-blue-reveal">
            <motion.rect
              x="-920.4"
              y="0"
              width="920.4"
              height="920.4"
              initial={{ x: -920.4 }}
              animate={{ x: 0 }}
              transition={{ duration: DURATIONS.logo.secondary, delay: 1.6, ease: EASINGS.premium }}
            />
          </clipPath>
          {/* SVG filter for glow effect - GPU efficient */}
          <filter id="v6-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          </filter>
        </defs>

        {/* Gray base - assembles vertically from bottom */}
        <g clipPath="url(#v6-slate-reveal)">
          <motion.path
            d={LOGO_PATHS.slateShape}
            fill={V6_LOGO_COLORS.slate}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          />
        </g>

        {/* Blue accent - slides in horizontally */}
        <g clipPath="url(#v6-blue-reveal)">
          <motion.path
            d={LOGO_PATHS.blueAccent}
            fill={V6_LOGO_COLORS.blue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.6 }}
            onAnimationComplete={onAnimationComplete}
          />
        </g>
      </motion.svg>

      {/* Completion glow - uses SVG filter, only animates opacity (GPU accelerated) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.18, 0.1] }}
        transition={{ duration: DURATIONS.logo.glow, delay: 2.4, ease: EASINGS.out }}
        style={{ willChange: 'opacity' }}
      >
        <svg
          viewBox={LOGO_VIEWBOX}
          className={className}
          aria-hidden="true"
        >
          <g filter="url(#v6-glow)">
            <path d={LOGO_PATHS.slateShape} fill={V6_LOGO_COLORS.slate} />
            <path d={LOGO_PATHS.blueAccent} fill={V6_LOGO_COLORS.blue} />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
