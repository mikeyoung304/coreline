'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from './logo-paths';
import { StaticLogo } from './StaticLogo';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  className?: string;
  onAnimationComplete?: () => void;
}

export function AnimatedLogo({ className, onAnimationComplete }: AnimatedLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={cn('w-24 h-24', className)}
      aria-label="Coreline Partners Logo"
      role="img"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onAnimationComplete={onAnimationComplete}
    >
      {/* Slate L-shape */}
      <motion.path
        d={LOGO_PATHS.slateShape}
        fill="#415a77"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          delay: 0.1,
        }}
      />
      {/* Blue accent - subtle stagger */}
      <motion.path
        d={LOGO_PATHS.blueAccent}
        fill="#3a86ff"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          delay: 0.2,
        }}
      />
    </motion.svg>
  );
}
