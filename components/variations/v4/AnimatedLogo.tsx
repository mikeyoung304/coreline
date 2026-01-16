'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

export function V4AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  // No bounce - smooth, confident entrance
  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        scale: {
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { duration: 0.6 }
      }}
    >
      <motion.path
        d={LOGO_PATHS.slateShape}
        fill="#3d4f5f"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.3 }}
      />
      <motion.path
        d={LOGO_PATHS.blueAccent}
        fill="#5c7cad"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.2 }}
      />
    </motion.svg>
  );
}
