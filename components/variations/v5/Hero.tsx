'use client';

import { motion } from 'motion/react';
import { V5AnimatedLogo } from './AnimatedLogo';
import { CONTACT_EMAIL } from '@/lib/constants';

export function V5Hero() {
  return (
    <section className="relative min-h-dvh flex">
      {/* Left half - Dark */}
      <div className="w-1/2 bg-navy-950 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 text-left"
        >
          <span className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-white tracking-[-0.02em] leading-[1.1]">
            Building
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-brand-slate tracking-[-0.02em] leading-[1.1]"
          >
            Legacies
          </motion.span>
        </motion.div>
      </div>

      {/* Center divider line */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-brand-slate/20 to-transparent z-20" />

      {/* Right half - Light */}
      <div className="w-1/2 bg-cream-50 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 -translate-y-1/2 right-8 md:right-16 text-right"
        >
          <span className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-navy-950 tracking-[-0.02em] leading-[1.1]">
            Through
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-brand-blue tracking-[-0.02em] leading-[1.1]"
          >
            Partnership
          </motion.span>
        </motion.div>
      </div>

      {/* Center: Logo spanning both halves - larger */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <V5AnimatedLogo className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80" />
      </div>

      {/* CTA at bottom center - pill style for split background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 4.0 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Private%20Consultation%20Request`}
          className="inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[0.15em] uppercase bg-white/90 backdrop-blur-sm text-navy-950 rounded-full border border-navy-950/10 hover:bg-white hover:border-navy-950/20 transition-all duration-500 shadow-sm"
        >
          Begin Conversation
        </a>
      </motion.div>
    </section>
  );
}
