"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE } from "@/app/lib/reveal";
import styles from "@/app/css/service/ServiceIncluded.module.css";

export default function ServiceIncluded({ data }) {
  const items = Array.isArray(data?.included) ? data.included : [];
  const containerRef = useRef(null);

  // parallax on left column — subtle upward drift as scroll progresses
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  if (items.length === 0) return null;

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.mesh} aria-hidden />

      <div className={styles.container}>
        {/* LEFT — statement + CTA */}
        <motion.div className={styles.left} style={{ y: leftY }}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            What you get
          </motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
          >
            Everything included.{" "}
            <span className={styles.accent}>No hidden extras.</span>
          </motion.h2>

          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          >
            A full package, one clear quote. No surprises later, no small print.
          </motion.p>

          <motion.div
            className={styles.ctaWrap}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
          >
            <Link href="/contact" className={styles.cta}>
              <span className={styles.ctaBloom} aria-hidden />
              <span>Get a clear quote</span>
              <ArrowRight size={17} strokeWidth={2.4} />
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT — checklist */}
        <ul className={styles.list}>
          {items.map((text, i) => (
            <ChecklistItem key={i} text={text} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ChecklistItem({ text, index }) {
  return (
    <motion.li
      className={styles.item}
      initial={{ opacity: 0, x: 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: EASE,
      }}
    >
      <span className={styles.check} aria-hidden>
        <svg viewBox="0 0 24 24" fill="none">
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            className={styles.checkRing}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.6,
              delay: 0.1 + index * 0.07,
              ease: EASE,
            }}
          />
          <motion.path
            d="M7 12.5l3.2 3.2L17 9"
            className={styles.checkTick}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.45,
              delay: 0.35 + index * 0.07,
              ease: EASE,
            }}
          />
        </svg>
      </span>

      <span className={styles.text}>{text}</span>
    </motion.li>
  );
}