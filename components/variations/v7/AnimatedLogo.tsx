'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';
import { EASINGS, LOGO_COLORS } from '@/lib/animation-constants';

export interface AnimatedLogoProps {
  className?: string;
  onAnimationComplete?: () => void;
}

// ViewBox center for transform origin
const VIEWBOX_CENTER = '460.2px 460.2px';

export function V7AnimatedLogo({ className, onAnimationComplete }: AnimatedLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion && onAnimationComplete) {
      onAnimationComplete();
    }
  }, [prefersReducedMotion, onAnimationComplete]);

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <div className="relative">
      <motion.svg
        viewBox={LOGO_VIEWBOX}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-label="Coreline Partners Logo"
        role="img"
      >
        {/* Main logo with button press effect */}
        <motion.g
          initial={{ scale: 0.95 }}
          animate={{
            scale: [0.95, 1, 0.97, 1], // Grow in, press, release
          }}
          transition={{
            duration: 2.0,
            times: [0, 0.8, 0.88, 1], // Press at 1.7s (0.85 * 2.0)
            ease: EASINGS.premium,
          }}
          style={{
            transformOrigin: VIEWBOX_CENTER,
            transformBox: 'view-box',
          }}
        >
          {/* Slate shape */}
          <motion.path
            d={LOGO_PATHS.slateShape}
            fill={LOGO_COLORS.slate}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASINGS.premium }}
          />

          {/* Blue accent */}
          <motion.path
            d={LOGO_PATHS.blueAccent}
            fill={LOGO_COLORS.blue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASINGS.premium }}
            onAnimationComplete={onAnimationComplete}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
