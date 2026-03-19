"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "@/app/css/Values.module.css";

const values = [
  {
    num: "01",
    tag: "ORIGIN",
    title: "LISTEN WITH",
    titleAccent: "INTENTION.",
    body: "Every great brand starts with silence. We listen before we speak — understanding your vision, your audience, and your edge before we engineer anything.",
    icon: "◎",
  },
  {
    num: "02",
    tag: "PHILOSOPHY",
    title: "CLARITY OVER",
    titleAccent: "CHAOS.",
    body: "We don't chase trends. We build systems. Clarity of purpose, precision in execution — that's how uncommon builders create work that compounds over time.",
    icon: "⌖",
  },
  {
    num: "03",
    tag: "DHARMA",
    title: "BUILD WORK",
    titleAccent: "THAT LASTS.",
    body: "Viral fades. Substance stays. We help you create a digital presence so deeply rooted in truth that no algorithm shift can shake it.",
    icon: "◈",
  },
];

export default function Values() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={styles.section} ref={ref}>
      {/* Ambient glow */}
      <div className={styles.glow} />

      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.headerBadgeRow}>
          <span className={styles.headerDash} />
          <span className={styles.sectionTag}>THE MONK WAY</span>
          <span className={styles.headerDash} />
        </div>
        <h2 className={styles.sectionTitle}>
          WHAT WE{" "}
          <span className={styles.sectionTitleAccent}>BELIEVE IN.</span>
        </h2>
      </motion.div>

      {/* Values grid */}
      <div className={styles.grid}>
        {values.map((v, i) => (
          <motion.div
            key={v.num}
            className={styles.card}
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.85,
              delay: i * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Top row */}
            <div className={styles.cardTop}>
              <span className={styles.cardNum}>{v.num}</span>
              <span className={styles.cardIcon}>{v.icon}</span>
            </div>

            {/* Tag */}
            <span className={styles.cardTag}>{v.tag}</span>

            {/* Title */}
            <div className={styles.cardTitle}>
              <span className={styles.cardTitleSolid}>{v.title}</span>
              <span className={styles.cardTitleAccent}>{v.titleAccent}</span>
            </div>

            {/* Divider */}
            <div className={styles.cardDivider} />

            {/* Body */}
            <p className={styles.cardBody}>{v.body}</p>

            {/* Hover glow */}
            <div className={styles.cardGlow} />

            {/* Bottom accent line */}
            <div className={styles.cardBottomLine} />
          </motion.div>
        ))}
      </div>

      {/* Bottom quote */}
      <motion.div
        className={styles.quote}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.55 }}
      >
        <span className={styles.quoteLine} />
        <div className={styles.quoteInner}>
          <p className={styles.quoteText}>
            "Discipline is not a constraint — it is the foundation of every
            uncommon thing ever built."
          </p>
          <span className={styles.quoteAuthor}>— THE MONK PRINCIPLE</span>
        </div>
        <span className={styles.quoteLineRight} />
      </motion.div>
    </section>
  );
}