'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { V4AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';
import { StaticLogo } from '@/components/logo/StaticLogo';

export function V4Hero() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number; scale: number } | null>(null);

  // Calculate the animation target based on viewport size
  useEffect(() => {
    const calculateTarget = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Determine responsive values based on viewport width
      // Mobile (< 640px): top-4 left-4 w-8 h-8 (16px, 16px, 32px)
      // SM (640-768px): top-6 left-6 w-10 h-10 (24px, 24px, 40px)
      // MD+ (≥ 768px): top-8 left-8 w-10 h-10 (32px, 32px, 40px)
      let finalSize, finalTop, finalLeft, startSize;

      if (vw < 640) {
        finalSize = 32; // w-8
        finalTop = 16; // top-4
        finalLeft = 16; // left-4
        startSize = 256; // w-64
      } else if (vw < 768) {
        finalSize = 40; // w-10
        finalTop = 24; // top-6
        finalLeft = 24; // left-6
        startSize = 256; // w-64
      } else {
        finalSize = 40; // w-10
        finalTop = 32; // top-8
        finalLeft = 32; // left-8
        startSize = 384; // md:w-96
      }

      // Logo starts centered, needs to move to top-left corner
      // Final center position should be at (finalLeft + finalSize/2, finalTop + finalSize/2)
      const finalCenterX = finalLeft + finalSize / 2;
      const finalCenterY = finalTop + finalSize / 2;

      // Current center is at viewport center
      const currentCenterX = vw / 2;
      const currentCenterY = vh / 2;

      // Calculate offset needed
      const x = finalCenterX - currentCenterX;
      const y = finalCenterY - currentCenterY;
      const scale = finalSize / startSize;

      setTargetPosition({ x, y, scale });
    };

    calculateTarget();
    window.addEventListener('resize', calculateTarget);
    return () => window.removeEventListener('resize', calculateTarget);
  }, []);

  return (
    <section className="relative h-full overflow-hidden">
      {/* Phase 1: Full-screen logo animation */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            className="absolute inset-0 z-50 bg-navy-950 flex items-center justify-center"
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {targetPosition && (
              <motion.div
                initial={{ scale: 1, x: 0, y: 0 }}
                animate={{
                  scale: targetPosition.scale,
                  x: targetPosition.x,
                  y: targetPosition.y
                }}
                transition={{
                  duration: 1.6,
                  delay: 2.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                onAnimationComplete={() => setAnimationComplete(true)}
              >
                <V4AnimatedLogo className="w-64 h-64 md:w-96 md:h-96" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Revealed hero content */}
      <div className="h-full bg-cream-50 flex flex-col">
        {/* Mini logo in corner (after animation) - same position as animation target */}
        {animationComplete && (
          <motion.div
            className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <StaticLogo className="w-8 h-8 sm:w-10 sm:h-10" />
          </motion.div>
        )}

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
          <div className="text-center max-w-3xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={animationComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] font-display font-normal text-navy-950 tracking-[-0.02em] leading-[1.05]"
            >
              Coreline Partners
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={animationComplete ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 sm:mt-8 md:mt-10 text-[11px] sm:text-xs md:text-[13px] tracking-[0.12em] sm:tracking-[0.15em] text-navy-800/50 uppercase font-medium"
            >
              Private Wealth · Institutional Advisory
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={animationComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 sm:mt-12 md:mt-16"
            >
              <ButtonLink
                href={`mailto:${CONTACT_EMAIL}?subject=Private%20Consultation%20Request`}
                variant="premium"
              >
                Request Introduction
              </ButtonLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
