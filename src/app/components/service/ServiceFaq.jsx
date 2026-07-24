"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { EASE } from "@/app/lib/reveal";
import styles from "@/app/css/service/ServiceFaq.module.css";

export default function ServiceFaq({ data }) {
  const faqs = Array.isArray(data?.faqs) ? data.faqs : [];
  const [openIdx, setOpenIdx] = useState(0); // first open by default

  if (faqs.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.mesh} aria-hidden />

      <div className={styles.container}>
        {/* HEAD */}
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className={styles.eyebrow}>FAQ</span>
          <h2 className={styles.title}>
            Still curious?{" "}
            <span className={styles.accent}>We&apos;ve got you.</span>
          </h2>
          <p className={styles.sub}>
            Answers to the questions everyone asks — no fluff.
          </p>
        </motion.div>

        {/* ACCORDION */}
        <ul className={styles.list}>
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </ul>

        {/* INLINE BOTTOM CTA */}
        <motion.div
          className={styles.stillWrap}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className={styles.still}>
            <div className={styles.stillLeft}>
              <span className={styles.stillDot} aria-hidden />
              <span className={styles.stillText}>
                Still have questions?
              </span>
            </div>
            <Link href="/contact" className={styles.stillCta}>
              <span>Ask us directly</span>
              <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── Single FAQ item ─────────── */

function FaqItem({ faq, index, isOpen, onToggle }) {
  // split answer into sentences for stagger reveal
  const sentences = (faq.a || "").split(/(?<=\.)\s+/).filter(Boolean);

  return (
    <motion.li
      className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.num}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={styles.q}>{faq.q}</span>
        <span className={styles.iconWrap} aria-hidden>
          <Plus
            size={20}
            strokeWidth={2.4}
            className={styles.icon}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={styles.answerWrap}
          >
            <div className={styles.answer}>
              {sentences.map((line, i) => (
                <motion.p
                  key={i}
                  className={styles.line}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + i * 0.08,
                    ease: EASE,
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}