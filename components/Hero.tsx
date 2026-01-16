'use client';

import { motion } from 'motion/react';
import { AnimatedLogo } from './AnimatedLogo';
import { CONTACT_EMAIL, BRAND } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative min-h-dvh bg-cream-50 overflow-hidden">
      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        {/* Logo - centered */}
        <div className="mb-8 sm:mb-12">
          <AnimatedLogo className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52" />
        </div>

        {/* Company Name - ALL CAPS */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-navy-950 tracking-[0.1em] uppercase text-center"
        >
          {BRAND.name}
        </motion.h1>

        {/* Website coming soon */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-10 sm:mt-14 md:mt-20 text-sm sm:text-base md:text-lg font-display font-light text-brand-slate/70 tracking-wide text-center"
        >
          {BRAND.tagline}
        </motion.p>

        {/* Contact Us link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 2.4 }}
          className="mt-6 sm:mt-8"
        >
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm sm:text-base font-display font-medium text-brand-slate/70 hover:text-navy-950 transition-colors duration-500 border-b border-brand-slate/30 hover:border-navy-950/50 pb-1"
          >
            {BRAND.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
