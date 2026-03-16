"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "../css/ServiceProcess.module.css";

export default function ServiceProcess({ steps, accent, accentRgb, os }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className={styles.section}
      style={{ "--accent": accent, "--accent-rgb": accentRgb }}
    >
      <div className={styles.container}>

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.eyebrow} style={{ color: accent }}>
            {os} — PROCESS
          </span>
          <h2 className={styles.title}>
            How We <span className={styles.titleThin}>Work</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className={styles.stepsWrap}>
          {/* Animated vertical line */}
          <div className={styles.lineTrack}>
            <motion.div
              className={styles.lineProgress}
              style={{ height: lineHeight, background: accent }}
            />
          </div>

          <div className={styles.steps}>
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                className={styles.stepRow}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                {/* Node */}
                <div className={styles.nodeWrap}>
                  <div
                    className={styles.node}
                    style={{ borderColor: accent }}
                  >
                    <span className={styles.nodeNum} style={{ color: accent }}>
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}