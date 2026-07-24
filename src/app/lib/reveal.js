"use client";

export const EASE = [0.22, 1, 0.36, 1];

// Standard "come up from below" reveal.
// Use like: <motion.div {...revealUp} />
export const revealUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: EASE },
};

// Same but delayed — for staggered children.
export const revealUpDelay = (i = 0, step = 0.1) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: i * step, ease: EASE },
});

// Softer fade-only (for backgrounds/decorations).
export const revealFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: EASE },
};