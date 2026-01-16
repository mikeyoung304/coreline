'use client';

import { motion, useReducedMotion } from 'motion/react';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo-paths';
import { StaticLogo } from '@/components/logo/StaticLogo';

// Slower, more deliberate timing - confidence doesn't rush
const pathVariants = {
  hidden: { pathLength: 0, fillOpacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      pathLength: { duration: 2.0, ease: [0.22, 1, 0.36, 1], delay },
      fillOpacity: { duration: 0.8, delay: delay + 1.8 }
    }
  })
};

// No bounce - confidence doesn't bounce
const containerVariants = {
  hidden: { scale: 1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: 'easeOut' }
  }
};

export function V1AnimatedLogo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticLogo className={className} />;
  }

  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.4, ease: [0.33, 0, 0.67, 1] }
      }}
    >
      <motion.path
        d={LOGO_PATHS.slateShape}
        stroke="#3d4f5f"
        strokeWidth="3"
        fill="#3d4f5f"
        variants={pathVariants}
        custom={0}
      />
      <motion.path
        d={LOGO_PATHS.blueAccent}
        stroke="#5c7cad"
        strokeWidth="3"
        fill="#5c7cad"
        variants={pathVariants}
        custom={1.0}
      />
    </motion.svg>
  );
}
