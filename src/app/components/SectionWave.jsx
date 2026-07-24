"use client";

import { motion } from "framer-motion";
import styles from "@/app/css/SectionWave.module.css";

const WAVE_D =
  "M0,70 C360,10 360,10 720,70 C1080,130 1080,130 1440,70 C1800,10 1800,10 2160,70 C2520,130 2520,130 2880,70 L2880,200 L0,200 Z";

/**
 * position = "top" | "bottom"
 * floats   = [{ icon: <ReactNode/>, left: "20%", size: 34, delay: 0 }, ...]
 *            small themed icons bobbing on the wave crest (SVGator-style)
 * Place inside a `position:relative; overflow:hidden` section.
 */
export default function SectionWave({ position = "top", floats = [] }) {
  return (
    <div
      className={`${styles.wrap} ${position === "bottom" ? styles.bottom : styles.top}`}
      aria-hidden
    >
      {/* back — slowest, lightest */}
      <motion.svg
        className={styles.layer}
        viewBox="0 0 2880 200"
        preserveAspectRatio="none"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.55 }}
      >
        <defs>
          <linearGradient id="wv1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#efe9fc" />
            <stop offset="1" stopColor="#e6def9" />
          </linearGradient>
        </defs>
        <path d={WAVE_D} fill="url(#wv1)" />
      </motion.svg>

{/* floating icons — ride ON the crest like SVGator's boat */}
      {floats.map((f, i) => (
        <motion.span
          key={i}
          className={styles.float}
          style={{
            left: f.left,
            width: f.size ?? 30,
            height: f.size ?? 30,
            color: f.color,        // optional per-icon color
          }}
          animate={{
            y: [0, -7, 0, -4, 0],          // gentle bob, wave jaisa uneven
            rotate: [-4, 3, -4],           // boat rock
          }}
          transition={{
            duration: 6 + i * 1.2,         // slow = smooth
            delay: f.delay ?? i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {f.icon}
        </motion.span>
      ))}

      {/* mid — periwinkle */}
      <motion.svg
        className={styles.layer}
        viewBox="0 0 2880 200"
        preserveAspectRatio="none"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.6, top: "10px" }}
      >
        <defs>
          <linearGradient id="wv2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ddd3f6" />
            <stop offset="1" stopColor="#cfd6fb" />
          </linearGradient>
        </defs>
        <path d={WAVE_D} fill="url(#wv2)" />
      </motion.svg>

      {/* front — most saturated + peach hint */}
      <motion.svg
        className={styles.layer}
        viewBox="0 0 2880 200"
        preserveAspectRatio="none"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.9, top: "22px" }}
      >
        <defs>
          <linearGradient id="wv3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b8a3ee" />
            <stop offset="0.7" stopColor="#cabef4" />
            <stop offset="1" stopColor="#f0cbbd" />
          </linearGradient>
        </defs>
        <path d={WAVE_D} fill="url(#wv3)" />
      </motion.svg>
    </div>
  );
}