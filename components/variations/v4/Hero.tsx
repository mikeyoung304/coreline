'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { V4AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';
import { StaticLogo } from '@/components/logo/StaticLogo';

// Logo final position and size (must match the static logo placement)
const LOGO_FINAL_SIZE = 40; // w-10 = 40px
const LOGO_FINAL_TOP = 32; // top-8 = 32px
const LOGO_FINAL_LEFT = 32; // left-8 = 32px

export function V4Hero() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number; scale: number } | null>(null);

  // Calculate the animation target based on viewport size
  useEffect(() => {
    const calculateTarget = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const logoSize = vw >= 768 ? 384 : 256; // md:w-96 or w-64

      // Logo starts centered, needs to move to top-left corner
      // Final center position should be at (LOGO_FINAL_LEFT + LOGO_FINAL_SIZE/2, LOGO_FINAL_TOP + LOGO_FINAL_SIZE/2)
      const finalCenterX = LOGO_FINAL_LEFT + LOGO_FINAL_SIZE / 2;
      const finalCenterY = LOGO_FINAL_TOP + LOGO_FINAL_SIZE / 2;

      // Current center is at viewport center
      const currentCenterX = vw / 2;
      const currentCenterY = vh / 2;

      // Calculate offset needed
      const x = finalCenterX - currentCenterX;
      const y = finalCenterY - currentCenterY;
      const scale = LOGO_FINAL_SIZE / logoSize;

      setTargetPosition({ x, y, scale });
    };

    calculateTarget();
    window.addEventListener('resize', calculateTarget);
    return () => window.removeEventListener('resize', calculateTarget);
  }, []);

  return (
    <section className="relative min-h-dvh">
      {/* Phase 1: Full-screen logo animation */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            className="fixed inset-0 z-50 bg-navy-950 flex items-center justify-center"
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
      <div className="min-h-dvh bg-cream-50 flex flex-col">
        {/* Mini logo in corner (after animation) - same position as animation target */}
        {animationComplete && (
          <motion.div
            className="absolute top-8 left-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <StaticLogo className="w-10 h-10" />
          </motion.div>
        )}

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={animationComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[2.75rem] md:text-[4rem] lg:text-[5rem] font-display font-normal text-navy-950 tracking-[-0.02em] leading-[1.05]"
            >
              Coreline Partners
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={animationComplete ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10 text-[13px] tracking-[0.15em] text-navy-800/50 uppercase font-medium"
            >
              Private Wealth · Institutional Advisory
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={animationComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16"
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
