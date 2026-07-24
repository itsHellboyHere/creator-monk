"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "@/app/css/FinalCTA.module.css";

const EASE = [0.22, 1, 0.36, 1];

// TODO: replace with your Cloudinary link after generating
const IMG_URL =
  "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784646347/794cb347-60a0-487e-a98f-5ab4e59c5f8a-Photoroom_vnzhn6.png";

export default function FinalCta() {
  return (
    <section className={styles.section}>
       {/* Curve in: TrustedBy → FinalCTA */}
  <div className={styles.curveTop} aria-hidden="true">
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={styles.curveSvg}
    >
      <path d="M0,90 Q720,0 1440,90 L1440,0 L0,0 Z" />
    </svg>
  </div>

      <div className={styles.mesh} aria-hidden />

      <div className={styles.inner}>
        {/* Left: illustration */}
        <motion.div
          className={styles.art}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className={styles.artGlow} aria-hidden />
          <img
            src={IMG_URL}
            alt="Let's build together"
            className={styles.artImg}
            loading="lazy"
          />
        </motion.div>

        {/* Right: text + magnetic CTA */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          <h2 className={styles.title}>
            Have an idea?{" "}
            <span className={styles.accent}>Let&apos;s build it together.</span>
          </h2>
          <p className={styles.desc}>
            Whether it&apos;s a website, an app, AI automation or your whole
            brand — tell us what you&apos;re dreaming of, and we&apos;ll show
            you how fast it can go live.
          </p>

          <MagneticButton href="/contact">
            <span>Start a Project</span>
            <ArrowRight size={18} strokeWidth={2.4} />
          </MagneticButton>

          <p className={styles.note}>
            Free consultation · Reply within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Magnetic button ---------------- */

function MagneticButton({ href, children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    // pull toward cursor, max ~10px
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.18);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={styles.magnetWrap}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <Link href={href} className={styles.cta}>
        <span className={styles.ctaFill} aria-hidden />
        <span className={styles.ctaContent}>{children}</span>
      </Link>
    </motion.div>
  );
}