"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../css/ServicePricing.module.css";

export default function ServicePricing({ plans, accent, os }) {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "0%" : `-${(plans.length - 1) * 32}%`]
  );

  return (
    <section
      ref={targetRef}
      className={styles.wrapper}
      style={{ "--accent": accent }}
    >
      <div className={styles.sticky}>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
          >
            <p className={styles.sidebarEyebrow} style={{ color: accent }}>
              {os} — PLANS
            </p>
            <h2 className={styles.sidebarTitle}>
              CHOOSE<br />YOUR<br />TIER
            </h2>
          </motion.div>

          {/* Scroll progress bar */}
          <div className={styles.progressWrap}>
            <div
              className={styles.progressTrack}
              style={{ background: `rgba(${accent === "#ffae00" ? "255,174,0" : accent === "#4287f5" ? "66,135,245" : "16,185,129"},0.15)` }}
            >
              <motion.div
                className={styles.progressFill}
                style={{ scaleX: scrollYProgress, background: accent }}
              />
            </div>
            <span className={styles.progressLabel}>SCROLL TO EXPLORE</span>
          </div>

          <div className={styles.sidebarNote}>
            <p className={styles.noteText}>
              * All plans are customised to your requirements. Final scope
              discussed on your free consultation call.
            </p>
          </div>
        </div>

        {/* Cards track */}
        <div className={styles.trackOuter}>
          <motion.div style={{ x }} className={styles.cardTrack}>
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                className={styles.card}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.75 }}
              >
                {/* Card top meta */}
                <div className={styles.cardMeta}>
                  <span
                    className={styles.cardId}
                    style={{ borderColor: accent, color: accent }}
                  >
                    {plan.id}
                  </span>
                  <div className={styles.cardStatus}>
                    <span
                      className={styles.statusPulse}
                      style={{ background: accent }}
                    />
                    <span className={styles.statusText}>AVAILABLE</span>
                  </div>
                </div>

                {/* Plan name */}
                <h3 className={styles.planName}>{plan.name}</h3>
                {plan.tag && (
                  <p className={styles.planTag}>{plan.tag}</p>
                )}

                {/* Divider */}
                <div
                  className={styles.cardDivider}
                  style={{ background: `rgba(0,0,0,0.06)` }}
                />

                {/* Features */}
                <p className={styles.featuresLabel}>WHAT'S INCLUDED</p>
                <ul className={styles.featureList}>
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className={styles.featureItem}>
                      <span
                        className={styles.featDot}
                        style={{ background: accent }}
                      />
                      <span className={styles.featText}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <p className={styles.cardFooterNote}>
                    + Full onboarding & architecture support
                  </p>
                  <Link
                    href="/contact"
                    className={styles.ctaBtn}
                    style={{ "--accent": accent }}
                  >
                    <span>GET STARTED</span>
                    <span className={styles.ctaArrow}>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}