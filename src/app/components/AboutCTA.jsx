"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import styles from "@/app/css/AboutCTA.module.css";

export default function AboutCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={styles.section} ref={ref}>

      {/* BACKGROUND ELEMENTS */}
      <div className={styles.bgGrid} />
      <div className={styles.bgGlowLeft} />
      <div className={styles.bgGlowRight} />

      {/* DIVIDER */}
      <motion.div
        className={styles.divider}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* MAIN TEXT */}
      <div className={styles.textBlock}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          — READY TO BEGIN
        </motion.span>

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          LET'S BUILD
          <span className={styles.headlineAccent}> SOMETHING</span>
          <br />
          <span className={styles.headlineOutline}>UNCOMMON.</span>
        </motion.h2>

        <motion.p
          className={styles.body}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          You've read who we are. You know what we believe.<br />
          The next move is yours.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <Link href="/contact" className={styles.btnPrimary}>
            <span>START A PROJECT</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/services" className={styles.btnSecondary}>
            EXPLORE SERVICES
          </Link>
        </motion.div>
      </div>

      {/* BOTTOM TICKER */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {Array(8).fill("BUILD WITH PURPOSE · CLARITY OVER CHAOS · THE MONK WAY · UNCOMMON GROWTH ·").map((t, i) => (
            <span key={i} className={styles.tickerItem}>{t}</span>
          ))}
        </div>
      </div>

    </section>
  );
}