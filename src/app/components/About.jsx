"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/app/css/About.module.css";
import Link from "next/link";

const chapters = [
  {
    id: "01",
    tag: "ORIGIN",
    headline: "WE DON'T",
    headlineAccent: "FOLLOW TRENDS.",
    subline: "WE SET THEM.",
    body: "CreatorMonk was born from one belief: that uncommon builders deserve uncommon growth. Not viral gimmicks. Not hollow metrics. Real systems. Real results.",
    img: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=1400&q=80",
    stat: "5+",
    statLabel: "Creators Scaled",
  },
  {
    id: "02",
    tag: "PHILOSOPHY",
    headline: "CLARITY IS",
    headlineAccent: "THE STRATEGY.",
    subline: "NOISE IS THE ENEMY.",
    body: "In a world addicted to content volume, we obsess over signal. Every piece of content we engineer carries intention — designed to attract, convert, and compound.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    stat: "2x",
    statLabel: "Avg. Growth Rate",
  },
  {
    id: "03",
    tag: "DHARMA",
    headline: "BUILD WORK",
    headlineAccent: "THAT LASTS.",
    subline: "THE MONK WAY.",
    body: "True creation is disciplined. Structured. Timeless. We help you build a digital presence so strong, algorithms become irrelevant.",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400&q=80",
    stat: "∞",
    statLabel: "Compound Impact",
  }
];

export default function About() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setActive(a => (a + 1) % chapters.length);
          return 0;
        }
        return p + 0.4;
      });
    }, 35);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const goTo = (i) => {
    if (i === active) return;
    setActive(i);
  };

  const c = chapters[active];

  return (
    <div className={styles.root}>

      {/* FULL BG IMAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active + "-bg"}
          className={styles.bgWrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.img
            className={styles.bgImg}
            src={c.img}
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
          <div className={styles.bgOverlay} />
        </motion.div>
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className={styles.inner}>

        {/* LEFT: BIG TEXT */}
        <div className={styles.leftCol}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active + "-text"}
              className={styles.textBlock}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowLine} />
                {c.tag} / {c.id}
              </p>
              <h2 className={styles.h2}>{c.headline}</h2>
              <h2 className={styles.h2Orange}>{c.headlineAccent}</h2>
              <p className={styles.subline}>{c.subline}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: BODY + CONTROLS */}
        <div className={styles.rightCol}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active + "-body"}
              className={styles.bodyBlock}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.statRow}>
                <span className={styles.statNum}>{c.stat}</span>
                <span className={styles.statLabel}>{c.statLabel}</span>
              </div>
              <p className={styles.body}>{c.body}</p>
              <Link href="/services" className={styles.cta}>
              <span>DISCOVER OUR PATH →</span>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* CHAPTER NAV */}
          <div className={styles.chapterNav}>
            {chapters.map((ch, i) => (
              <div
                key={ch.id}
                className={`${styles.chapterItem} ${i === active ? styles.chapterItemActive : ""}`}
                onClick={() => goTo(i)}
              >
                <div className={styles.chapterThumb}>
                  <img src={ch.img} alt={ch.tag} />
                  <div className={styles.chapterThumbOverlay} />
                  {i === active && (
                    <div className={styles.chapterProgress}>
                      <div className={styles.chapterProgressFill} style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
                <div className={styles.chapterMeta}>
                  <span className={styles.chapterNum}>{ch.id}</span>
                  <span className={styles.chapterTag}>{ch.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className={styles.bottomBar}>
        <span className={styles.bottomText}>CREATORMONK — EST. 2026</span>
        <div className={styles.bottomDots}>
          {chapters.map((_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <span className={styles.bottomCounter}>{String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</span>
      </div>

    </div>
  );
}