"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import styles from "@/app/css/Hero.module.css";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  // start offscreen so no reveal-blob sits in the corner on load
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  useAnimationFrame(() => {
    offsetX.set((offsetX.get() + 0.35) % 40);
    offsetY.set((offsetY.get() + 0.35) % 40);
  });

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const maskImage = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, black, transparent 80%)`;

  const EASE = [0.22, 1, 0.36, 1];

  return (
    <section className={styles.hero} onMouseMove={handleMouseMove}>
      {/* faint base grid */}
      <div className={styles.gridBase} aria-hidden>
        <GridPattern id="grid-base" offsetX={offsetX} offsetY={offsetY} />
      </div>

      {/* violet grid revealed under cursor */}
      <motion.div
        className={styles.gridReveal}
        style={{ maskImage, WebkitMaskImage: maskImage }}
        aria-hidden
      >
        <GridPattern id="grid-accent" offsetX={offsetX} offsetY={offsetY} />
      </motion.div>

      {/* gradient blobs */}
      <div className={styles.blobs} aria-hidden>
        <span className={styles.blobViolet} />
        <span className={styles.blobBlue} />
        <span className={styles.blobPeach} />
      </div>

      {/* content */}
      <div className={styles.content}>
        {/* <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
   
Websites · Apps · AI · Social · Branding
        </motion.span> */}

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
        >
          We design, build{" "}
          <br className={styles.brDesktop} />&amp;{" "}
          <span className={styles.accent}>automate.</span>
        </motion.h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
     {/* sub */}
From websites and apps to social media and AI automation — CreatorMonk
builds everything your brand needs to grow online. Clean design, shipped fast.
        </motion.p>

       <motion.div
  className={styles.actions}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
>
  <Link href="/contact" className={`${styles.ctaButton} ${styles.ctaPrimary}`}>
    <span className={styles.ctaText}>Start a Project</span>
    <span className={styles.iconContainer}>
      <ArrowRight size={18} className={styles.arrow} strokeWidth={2.4} />
    </span>
  </Link>

  <Link href="/services" className={`${styles.ctaButton} ${styles.ctaGhost}`}>
    <span className={styles.ctaText}>See what we do</span>
    <span className={styles.iconContainer}>
      <ArrowRight size={18} className={styles.arrow} strokeWidth={2.4} />
    </span>
  </Link>
</motion.div>
      </div>
    </section>
  );
}

function GridPattern({ id, offsetX, offsetY }) {
  return (
    <svg width="100%" height="100%" className={styles.svg}>
      <defs>
        <motion.pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}