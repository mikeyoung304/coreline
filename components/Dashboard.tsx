'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { V2Hero } from './variations/v2';
import { V3Hero } from './variations/v3';
import { V4Hero } from './variations/v4';
import { V5Hero } from './variations/v5';
import { V4AnimatedLogo } from './variations/v4/AnimatedLogo';

// Featured variation
const FEATURED = {
  id: 'v4',
  label: 'Geometric',
  optionLabel: 'Recommended',
  description:
    'Structured geometry conveying stability and precision through clean lines and purposeful animation. This design emphasizes clarity and confidence.',
  component: V4Hero,
};

// Alternative variations
const ALTERNATIVES = [
  {
    id: 'v5',
    label: 'Editorial',
    optionLabel: 'Option B',
    description: 'Sophisticated editorial approach with refined typography',
    component: V5Hero,
  },
  {
    id: 'v2',
    label: 'Bold Typography',
    optionLabel: 'Option C',
    description: 'Strong typographic hierarchy with impactful presence',
    component: V2Hero,
  },
  {
    id: 'v3',
    label: 'Gradient Accent',
    optionLabel: 'Option D',
    description: 'Flowing gradients with contemporary visual appeal',
    component: V3Hero,
  },
];

const ALL_VARIATIONS = [FEATURED, ...ALTERNATIVES];

export function Dashboard() {
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

  // Handle initial hash on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && ALL_VARIATIONS.some((v) => v.id === hash)) {
      setSelectedVariation(hash);
      window.history.replaceState({ variation: hash }, '', `#${hash}`);
    }
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setSelectedVariation(event.state?.variation || null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Open variation and push to history
  const openVariation = useCallback((id: string) => {
    setSelectedVariation(id);
    window.history.pushState({ variation: id }, '', `#${id}`);
  }, []);

  // Close variation and go back in history
  const closeVariation = useCallback(() => {
    window.history.back();
  }, []);

  const SelectedComponent = selectedVariation
    ? ALL_VARIATIONS.find((v) => v.id === selectedVariation)?.component
    : null;

  return (
    <>
      {/* Dashboard */}
      <div className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
        {/* Header */}
        <header className="border-b border-white/5 flex-shrink-0">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center flex flex-col items-center"
            >
              <V4AnimatedLogo className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 md:mb-6" />
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-1 md:mb-2">
                Design Presentation
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-white tracking-tight">
                Coreline Partners
              </h1>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:py-12 flex-1 flex flex-col w-full">
          {/* Featured Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex-shrink-0"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <h2 className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/50 font-medium whitespace-nowrap">
                Featured Concept
              </h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Featured Card */}
            <button
              onClick={() => openVariation(FEATURED.id)}
              className="group relative w-full text-left"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl shadow-black/20">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(58,134,255,0.15),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(65,90,119,0.2),transparent_40%)]" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    {/* Recommended badge */}
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-amber-500/20 border border-amber-400/30 rounded-full">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[10px] sm:text-xs font-medium text-amber-200 uppercase tracking-wider">
                        Recommended
                      </span>
                    </div>

                    {/* View indicator - hidden on mobile */}
                    <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs md:text-sm text-white/60">View Full Experience</span>
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                        <svg
                          className="w-3.5 h-3.5 md:w-4 md:h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="max-w-2xl">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display text-white mb-2 sm:mb-3 md:mb-4 group-hover:text-white/90 transition-colors">
                      {FEATURED.label}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-white/50 leading-relaxed group-hover:text-white/70 transition-colors line-clamp-2 sm:line-clamp-none">
                      {FEATURED.description}
                    </p>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors duration-500" />
              </div>
            </button>
          </motion.section>

          {/* Alternatives Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6 flex-shrink-0">
              <h2 className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/50 font-medium whitespace-nowrap">
                Alternative Concepts
              </h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Alternatives Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pb-6 sm:pb-8 md:pb-10">
              {ALTERNATIVES.map((variation, index) => (
                <motion.button
                  key={variation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  onClick={() => openVariation(variation.id)}
                  className="group relative text-left"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg md:rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1">
                    {/* Background accent */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(58,134,255,0.2),transparent_60%)]" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                      {/* Bottom content */}
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-display text-white/80 group-hover:text-white mb-1 sm:mb-1.5 transition-colors">
                          {variation.label}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-white/40 group-hover:text-white/60 transition-colors line-clamp-2">
                          {variation.description}
                        </p>
                      </div>
                    </div>

                    {/* View overlay - hidden on mobile */}
                    <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white font-medium">
                        View Design
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>
        </main>
      </div>

      {/* Full-screen variation viewer */}
      <AnimatePresence>
        {selectedVariation && SelectedComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            {/* Close button */}
            <button
              onClick={closeVariation}
              className="fixed top-6 right-6 z-[60] p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors duration-200 group"
              aria-label="Close preview"
            >
              <svg
                className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* The actual variation */}
            <SelectedComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
