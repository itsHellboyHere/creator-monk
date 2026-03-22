"use client";
import { motion } from "framer-motion";
import styles from "@/app/css/Hero.module.css";

// Text entrance — runs ONCE on mount, no repeat
// Kept exactly as-is — this is the signature effect
const maskVars = {
  initial: {
    x: "-100%",
    opacity: 0,
    scale: 0.9,
  },
  animate: (i) => ({
    x: "0%",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      delay: 0.3 + i * 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section id="banner" className={`${styles.hero} sec-wrapper`}>

      {/* Gradient — static, no animation. Visual depth without CPU cost */}
      <div className={styles.movingGradient} />

      <div className={styles.content}>
        {/* Badge — fades in once */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={styles.badge}
        >
          INFULENCE • ENGINEERING • IMPACT
        </motion.div>

        {/* Title — slides in from left one by one. Runs once. Keep this. */}
        <div className={styles.titleContainer}>
          {["WE BUILD", "DIGITAL", "SUPERSTARS."].map((text, i) => (
            <div key={i} className={styles.mask}>
              <motion.h1
                custom={i}
                variants={maskVars}
                initial="initial"
                animate="animate"
                className={i === 2 ? styles.goldText : styles.whiteText}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Description — fades in once */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className={styles.bottomRow}
        >
          <p className={styles.description}>
            We engineer growth for creators who are built to last —
            not fade with trends or algorithms.
          </p>
        </motion.div>
      </div>

      {/* Scroll hint — CSS animation only, no Framer Motion */}
      <div className={styles.scrollHint}>
        <p>कहानी यहीं खत्म नहीं होती</p>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>

      <div className={styles.vignette} />
      <div className={styles.grain} />
    </section>
  );
}