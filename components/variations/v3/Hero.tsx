'use client';

import { motion } from 'motion/react';
import { V3AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';

export function V3Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-navy-950 luxury-grain">
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <V3AnimatedLogo className="w-24 h-24 md:w-32 md:h-32 mx-auto" />

        {/* Institutional label - appears after logo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 text-sm md:text-base uppercase tracking-[0.25em] text-white/40 font-medium"
        >
          Investment Management
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3.0, delay: 3.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-4xl md:text-6xl lg:text-7xl font-display font-normal text-white tracking-[-0.02em] leading-[1.1]"
        >
          Coreline Partners
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 4.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20"
        >
          <ButtonLink
            href={`mailto:${CONTACT_EMAIL}?subject=Private%20Consultation%20Request`}
            variant="ghost"
          >
            Schedule a Consultation
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
