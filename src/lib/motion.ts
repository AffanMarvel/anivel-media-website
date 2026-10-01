import { Variants, Transition } from "framer-motion";

/**
 * Editorial non-bouncy easing curves
 * Crafted for premium, high-craft digital agency presentation
 */
export const editorialEase = [0.16, 1, 0.3, 1] as const; // Apple / editorial high-end cubic bezier
export const smoothEase = [0.25, 0.1, 0.25, 1] as const;
export const standardDuration = 0.6;

export const defaultTransition: Transition = {
  duration: standardDuration,
  ease: editorialEase,
};

/**
 * Text reveal animation: smooth upward slide + opacity + subtle mask
 */
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.7,
      ease: editorialEase,
      delay: customDelay,
    },
  }),
};

/**
 * Fade up for cards and section containers
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: editorialEase,
      delay: customDelay,
    },
  }),
};

/**
 * Stagger container for lists and grids
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Image container reveal with subtle zoom-out
 */
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.06,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: editorialEase,
    },
  },
};

/**
 * Card interaction variants (subtle movement, no bouncing)
 */
export const cardHoverTransition: Transition = {
  duration: 0.3,
  ease: editorialEase,
};
