'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

export function V5AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  // Inevitable convergence - shapes emerge from void
  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      style={{
        filter: 'drop-shadow(0 0 60px rgba(61, 79, 95, 0.15))'
      }}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 0.6, delay: 3.2, ease: 'easeOut' }}
    >
      {/* Slate shape - emerges from bottom-left */}
      <motion.path
        d={LOGO_PATHS.slateShape}
        fill="#3d4f5f"
        initial={{
          x: -80,
          y: 80,
          opacity: 0,
          scale: 0.85,
          rotate: -5
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0
        }}
        transition={{
          duration: 2.4,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.6,
          opacity: { duration: 0.8, delay: 0.6 }
        }}
      />

      {/* Blue accent - emerges from top-right */}
      <motion.path
        d={LOGO_PATHS.blueAccent}
        fill="#5c7cad"
        initial={{
          x: 80,
          y: -80,
          opacity: 0,
          scale: 0.85,
          rotate: 5
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0
        }}
        transition={{
          duration: 2.4,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.6,
          opacity: { duration: 0.8, delay: 0.6 }
        }}
      />
    </motion.svg>
  );
}
