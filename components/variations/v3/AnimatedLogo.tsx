'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

export function V3AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  // Slower path tracing - confident pace, not eager
  return (
    <div className="relative">
      {/* Subtle presence glow - refined, not flashy */}
      <motion.div
        className="absolute inset-0 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.2, delay: 2.0 }}
      >
        <svg viewBox={LOGO_VIEWBOX} className={className}>
          <path d={LOGO_PATHS.slateShape} fill="#3d4f5f" />
          <path d={LOGO_PATHS.blueAccent} fill="#5c7cad" />
        </svg>
      </motion.div>

      {/* Main logo with path tracing - confident pace */}
      <motion.svg viewBox={LOGO_VIEWBOX} className={className}>
        {/* Slate shape - traced then filled */}
        <motion.path
          d={LOGO_PATHS.slateShape}
          stroke="#3d4f5f"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={LOGO_PATHS.slateShape}
          fill="#3d4f5f"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        />

        {/* Blue accent - traced then filled */}
        <motion.path
          d={LOGO_PATHS.blueAccent}
          stroke="#5c7cad"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={LOGO_PATHS.blueAccent}
          fill="#5c7cad"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.1 }}
        />
      </motion.svg>
    </div>
  );
}
