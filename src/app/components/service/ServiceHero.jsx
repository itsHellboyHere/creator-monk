"use client";

import { motion } from "framer-motion";
import { EASE } from "@/app/lib/reveal";
import styles from "@/app/css/service/ServiceHero.module.css";

/* Transparent PNG mockups per service — Canva/Photoroom cut, hosted on Cloudinary */
const HERO_IMG = {
  "web-development":
    "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784701787/mockup-website_yynjfr.png",
    "app-development":"https://res.cloudinary.com/dgifa4wgb/image/upload/v1784701786/app-mockup_pliy1g.png",
  // "app-development": "...",
  "ai-automation":   "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784707993/ai-mockup_uwyan9.png",
  "social-media":    "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784703010/social-mockup_ii7m5h.png",
  "branding":        "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784709126/brand-mockup_gydqg9.png",
  "video-editing":   "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784706973/video-mockup_vmajv5.png",
};

export default function ServiceHero({ data }) {
  const { eyebrow, hero, slug } = data;
  const img = HERO_IMG[slug];
  const hasImg = img && !img.includes("REPLACE_ME");

  const headline = hero.headline;
  const accent = hero.accent;
  const idx = accent ? headline.lastIndexOf(accent) : -1;
  const before = idx >= 0 ? headline.slice(0, idx) : headline;
  const after = idx >= 0 ? headline.slice(idx + accent.length) : "";

  return (
    <section className={styles.hero}>
      <div className={styles.mesh} aria-hidden />

    {/* TEXT — minimal, Apple iPad Air style */}
      <div className={styles.textBlock}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
        >
          {before}
          {accent && <span className={styles.accent}>{accent}</span>}
          {after}
        </motion.h1>
      </div>

      {/* DEVICE — reveals from below like Apple's iPad Air */}
      <div className={styles.stage}>
        <motion.div
          className={styles.glow}
          aria-hidden
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.55, ease: EASE }}
        />
        {hasImg ? (
          <motion.img
            src={img}
            alt={data.title}
            className={styles.device}
            initial={{ y: "60%", opacity: 0, scale: 0.94 }}
            animate={{ y: "0%", opacity: 1, scale: 1 }}
            transition={{
              duration: 1.15,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ) : (
          <div className={styles.placeholder}>Drop transparent PNG here</div>
        )}
      </div>
    </section>
  );
}