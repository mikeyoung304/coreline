'use client';

import { motion } from 'motion/react';
import { V2AnimatedLogo } from './AnimatedLogo';
import { CONTACT_EMAIL } from '@/lib/constants';

export function V2Hero() {
  return (
    <section className="relative min-h-dvh bg-cream-50 overflow-hidden">
      {/* Subtle background accent - warmer */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-950/[0.015]" />

      <div className="relative z-10 min-h-dvh flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Logo - 5 columns, confident sizing */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end lg:pr-12">
            <V2AnimatedLogo className="w-40 h-40 md:w-52 md:h-52" />
          </div>

          {/* Right: Content - 7 columns with border */}
          <div className="lg:col-span-7 lg:border-l lg:border-navy-950/10 lg:pl-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-display font-normal text-navy-950 tracking-[-0.02em] leading-[1.08]"
            >
              Coreline Partners
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.9 }}
              className="mt-6 text-lg md:text-xl font-light text-brand-slate/70 tracking-tight"
            >
              Institutional Investment Management
            </motion.p>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.3 }}
              className="mt-10 block text-sm tracking-[0.2em] uppercase text-brand-slate/40 font-medium"
            >
              Est. 2024 · New York
            </motion.span>

            {/* Gold accent line + CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 2.7 }}
              className="mt-14 flex items-center gap-6"
            >
              <div className="h-px w-12 bg-accent-gold/60" />
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Private%20Consultation%20Request`}
                className="text-sm font-medium tracking-[0.15em] uppercase text-brand-slate/70 hover:text-accent-gold transition-colors duration-500"
              >
                Begin Conversation
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle divider at bottom - no bounce */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
          className="w-px h-12 bg-gradient-to-b from-transparent to-navy-950/10"
        />
      </div>
    </section>
  );
}
