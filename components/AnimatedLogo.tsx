'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

export function AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] },
        scale: { duration: 2.4, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      <motion.path
        d={LOGO_PATHS.slateShape}
        fill="#3d4f5f"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <motion.path
        d={LOGO_PATHS.blueAccent}
        fill="#5c7cad"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />
    </motion.svg>
  );
}
