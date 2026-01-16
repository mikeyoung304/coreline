'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { V1Hero } from './variations/v1';
import { V2Hero } from './variations/v2';
import { V3Hero } from './variations/v3';
import { V4Hero } from './variations/v4';
import { V5Hero } from './variations/v5';
import { V6Hero } from './variations/v6';
import { V7Hero } from './variations/v7';

const VARIATIONS = [
  { id: 'v1', component: V1Hero },
  { id: 'v2', component: V2Hero },
  { id: 'v3', component: V3Hero },
  { id: 'v4', component: V4Hero },
  { id: 'v5', component: V5Hero },
  { id: 'v6', component: V6Hero },
  { id: 'v7', component: V7Hero },
];

export function VariationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Sync scroll position to currentIndex
  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current && index >= 0 && index < VARIATIONS.length) {
      isScrollingRef.current = true;
      const slideWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * slideWidth,
        behavior,
      });
      setCurrentIndex(index);
      // Reset flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, behavior === 'smooth' ? 600 : 50);
    }
  }, []);

  // Track scroll position to update currentIndex
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const slideWidth = container.offsetWidth;
        const newIndex = Math.round(container.scrollLeft / slideWidth);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < VARIATIONS.length) {
          setCurrentIndex(newIndex);
        }
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollToIndex(currentIndex - 1);
      if (e.key === 'ArrowRight') scrollToIndex(currentIndex + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, scrollToIndex]);

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-navy-950">
      {/* Native scroll container with snap */}
      <div
        ref={scrollRef}
        className="h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {VARIATIONS.map((variation, index) => {
          const Component = variation.component;
          // Pre-render adjacent slides for smooth transitions
          const shouldRender = Math.abs(index - currentIndex) <= 1;

          return (
            <div
              key={variation.id}
              className="w-full h-full flex-shrink-0 snap-center snap-always"
            >
              {shouldRender ? (
                <Component key={index === currentIndex ? `${variation.id}-active` : variation.id} />
              ) : (
                <div className="w-full h-full bg-navy-950" />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-8 pt-12 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none">
        <div className="flex items-center justify-center gap-8 pointer-events-auto">
          {/* Left arrow */}
          <button
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="p-2 opacity-50 hover:opacity-100 disabled:opacity-15 disabled:cursor-not-allowed transition-opacity duration-200"
            aria-label="Previous"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {VARIATIONS.map((variation, index) => (
              <button
                key={variation.id}
                onClick={() => scrollToIndex(index)}
                className="p-1.5 -m-1.5"
                aria-label={`Variation ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : undefined}
              >
                <div
                  className={`rounded-full transition-all duration-400 ease-out ${
                    index === currentIndex
                      ? 'w-5 h-1 bg-white/80'
                      : 'w-1 h-1 bg-white/35 hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === VARIATIONS.length - 1}
            className="p-2 opacity-50 hover:opacity-100 disabled:opacity-15 disabled:cursor-not-allowed transition-opacity duration-200"
            aria-label="Next"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
