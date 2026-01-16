'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { StaticLogo } from '@/components/logo/StaticLogo';

const variations = [
  {
    id: 'v1',
    name: 'Classic Trust',
    tagline: 'Timeless elegance meets financial expertise',
    bg: 'bg-navy-900',
    accent: 'bg-brand-blue',
  },
  {
    id: 'v2',
    name: 'Editorial Modern',
    tagline: 'Where strategy meets sophistication',
    bg: 'bg-cream-100',
    accent: 'bg-brand-slate',
    dark: false,
  },
  {
    id: 'v3',
    name: 'Dynamic Innovation',
    tagline: 'Invest with confidence',
    bg: 'bg-brand-slate',
    accent: 'bg-brand-blue',
  },
  {
    id: 'v4',
    name: 'Bold Immersive',
    tagline: 'Luxury investment management, redefined',
    bg: 'bg-cream-50',
    accent: 'bg-navy-950',
    dark: false,
  },
  {
    id: 'v5',
    name: 'Convergence',
    tagline: 'Building legacies through partnership',
    bg: 'bg-navy-950',
    accent: 'bg-brand-blue',
    split: true,
  },
  {
    id: 'v6',
    name: 'Structural Build',
    tagline: 'Strategic development, lasting value',
    bg: 'bg-gradient-to-t from-navy-950 to-brand-slate',
    accent: 'bg-brand-blue',
  },
  {
    id: 'v7',
    name: 'Expansion Pulse',
    tagline: 'Unlocking value across diverse portfolios',
    bg: 'bg-cream-50',
    accent: 'bg-brand-slate',
    dark: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-dvh bg-navy-950">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center"
        >
          <StaticLogo className="w-16 h-16 mx-auto mb-8" />

          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">
            Coreline Partners
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6"
          >
            <p className="text-lg text-white/40 tracking-wide uppercase">
              Brand Identity Exploration
            </p>
            <p className="mt-4 text-white/60 max-w-md mx-auto">
              Seven distinct directions for your digital presence, each crafted to convey trust, sophistication, and excellence.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-16 bg-white/20"
          />
        </motion.div>
      </section>

      {/* Variations Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/30 text-sm uppercase tracking-widest mb-12 text-center"
          >
            Select a direction to explore
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {variations.map((v, index) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link
                  href={`/${v.id}`}
                  className="group block relative aspect-[4/3] overflow-hidden"
                >
                  {/* Background */}
                  {v.split ? (
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 bg-navy-900" />
                      <div className="w-1/2 bg-cream-100" />
                    </div>
                  ) : (
                    <div className={`absolute inset-0 ${v.bg} transition-transform duration-700 group-hover:scale-105`} />
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <span className={`inline-flex items-center justify-center w-8 h-8 text-xs font-medium ${v.accent} text-white`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className={v.dark === false ? 'text-navy-800' : 'text-white/80'}>View →</span>
                      </span>
                    </div>

                    <div>
                      <h2 className={`text-2xl md:text-3xl font-light tracking-tight ${v.dark === false ? 'text-navy-950' : 'text-white'}`}>
                        {v.name}
                      </h2>
                      <p className={`mt-2 text-sm ${v.dark === false ? 'text-navy-800/60' : 'text-white/50'}`}>
                        {v.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <StaticLogo className="w-8 h-8 opacity-40" />
            <span className="text-white/30 text-sm">
              Design Presentation
            </span>
          </div>
          <p className="text-white/20 text-xs">
            Prepared exclusively for Coreline Partners
          </p>
        </div>
      </footer>
    </main>
  );
}
