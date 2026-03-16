"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "../css/ServiceAbout.module.css";

export default function ServiceAbout({
  os,
  dept,
  watermark,
  mission,
  stat,
  about,
  accent,
  accentRgb,
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const watermarkOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    [0, 0.04, 0.04, 0]
  );
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={containerRef}
      className={styles.section}
      style={{ "--accent": accent, "--accent-rgb": accentRgb }}
    >
      {/* Watermark */}
      <motion.div
        style={{ opacity: watermarkOpacity, y: watermarkY }}
        className={styles.watermark}
      >
        {watermark}
      </motion.div>

      {/* ── TOP: Mission band — dark ── */}
      <div className={styles.missionBand}>
        <div className={styles.container}>
          <motion.div
            className={styles.missionInner}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.missionLeft}>
              <div className={styles.osRow}>
                <span className={styles.deptPill}>
                  <span className={styles.deptDot} style={{ background: accent }} />
                  {dept}
                </span>
                <span className={styles.osTag} style={{ color: accent }}>
                  {os}
                </span>
              </div>
              <p className={styles.missionEyebrow}>// MISSION_OBJECTIVE</p>
              <h2 className={styles.missionHeadline}>{about.headline}</h2>
              <p className={styles.missionBody}>{about.body}</p>
            </div>

            <div className={styles.missionRight}>
              {/* Stat card */}
              <motion.div
                className={styles.statBlock}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <span className={styles.statValue} style={{ color: accent }}>
                  {stat.value}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
                <div
                  className={styles.statBar}
                  style={{ background: accent }}
                />
              </motion.div>

              {/* Mission quote */}
              <motion.div
                className={styles.missionQuote}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <div
                  className={styles.quoteBar}
                  style={{ background: accent }}
                />
                <p className={styles.quoteText}>"{mission}"</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM: Benefits — light ── */}
      <div className={styles.benefitsBand}>
        <div className={styles.container}>
          <motion.p
            className={styles.benefitsEyebrow}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            CORE ADVANTAGES
          </motion.p>

          <div className={styles.benefitsGrid}>
            {about.points.map((item, i) => (
              <motion.div
                key={item.id}
                className={styles.benefitCard}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Top row */}
                <div className={styles.cardTop}>
                  <span className={styles.cardId}>{item.id}</span>
                  <div
                    className={styles.cardDot}
                    style={{ background: accent }}
                  />
                </div>

                {/* Number accent */}
                <span className={styles.cardNum}>0{i + 1}</span>

                <h3 className={styles.cardTitle}>{item.head}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>

                {/* Bottom accent line */}
                <div
                  className={styles.cardLine}
                  style={{ background: accent }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}