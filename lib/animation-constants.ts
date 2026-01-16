/**
 * Centralized animation constants for enterprise-grade consistency
 * across all landing page variations.
 */

// Brand-standard easing curves
export const EASINGS = {
  /** Primary content animations - smooth, confident */
  premium: [0.22, 1, 0.36, 1] as const,
  /** Mechanical/precision animations - snappy, deliberate */
  precision: [0.25, 0.1, 0.25, 1] as const,
  /** Interactive hover states */
  hover: [0.33, 0, 0.67, 1] as const,
  /** Simple ease out for secondary elements */
  out: 'easeOut' as const,
} as const;

// Animation durations in seconds
export const DURATIONS = {
  logo: {
    fade: 0.4,
    primary: 1.4,
    secondary: 1.2,
    glow: 0.8,
  },
  text: {
    entrance: 0.6,
    stagger: 0.3,
  },
  background: {
    reveal: 1.8,
    lines: 2.0,
  },
  cta: {
    entrance: 0.6,
  },
} as const;

// Animation delays - compressed for enterprise feel (target: ~3s to full content)
export const DELAYS = {
  /** When logo animation completes and text should start */
  textAfterLogo: 2.0,
  /** Stagger between text elements */
  textStagger: 0.3,
  /** CTA appears after text */
  ctaAfterText: 0.4,
  /** Background elements start */
  backgroundStart: 1.5,
} as const;

// Logo colors (from logo-paths, centralized here for reference)
export const LOGO_COLORS = {
  slate: '#3d4f5f',
  blue: '#5c7cad',
} as const;

// Animation transition presets
export const TRANSITIONS = {
  /** Standard content entrance */
  entrance: {
    duration: DURATIONS.text.entrance,
    ease: EASINGS.premium,
  },
  /** Logo primary animation */
  logoPrimary: {
    duration: DURATIONS.logo.primary,
    ease: EASINGS.premium,
  },
  /** Background reveal */
  background: {
    duration: DURATIONS.background.reveal,
    ease: EASINGS.out,
  },
} as const;
