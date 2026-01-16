'use client';

import { motion } from 'motion/react';
import { V1AnimatedLogo } from './AnimatedLogo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';

export function V1Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 overflow-hidden bg-navy-950 luxury-grain">
      {/* Subtle radial glow - confident, not decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-slate/[0.03] rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-4xl">
        <V1AnimatedLogo className="w-20 h-20 md:w-28 md:h-28 mx-auto" />

        {/* Institutional label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.0 }}
          className="block mt-20 text-xs uppercase tracking-[0.25em] text-white/40 font-medium"
        >
          Investment Management
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 3.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-5xl md:text-6xl lg:text-7xl font-display font-normal text-white tracking-[-0.02em] leading-[1.1]"
        >
          Coreline Partners
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-base text-white/50 max-w-md mx-auto tracking-wide"
        >
          For principals and family offices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <ButtonLink
            href={`mailto:${CONTACT_EMAIL}?subject=Private%20Consultation%20Request`}
            variant="ghost"
          >
            Begin a Conversation
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
