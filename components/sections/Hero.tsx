'use client';

import { motion } from 'motion/react';
import { AnimatedLogo } from '@/components/logo';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

// Consistent easing - ease-out for natural deceleration
const ease = [0.25, 0.1, 0.25, 1];

export function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 bg-cream-50">
      <AnimatedLogo className="w-20 h-20 md:w-24 md:h-24" />

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
        className="mt-16 md:mt-20 text-4xl md:text-5xl lg:text-6xl font-medium text-navy-950 text-center tracking-[-0.02em] leading-[1.1]"
      >
        Building Generational
        <br />
        <span className="text-brand-blue">Wealth.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease }}
        className="mt-8 text-lg md:text-xl text-navy-800/60 text-center max-w-md leading-relaxed"
      >
        Sophisticated investment strategies for discerning families and institutions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease }}
        className="mt-12"
      >
        <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Investment%20Inquiry`}>
          Schedule Consultation
        </ButtonLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="absolute bottom-12"
      >
        <ChevronDown className="w-5 h-5 text-navy-800/25" />
      </motion.div>
    </section>
  );
}
