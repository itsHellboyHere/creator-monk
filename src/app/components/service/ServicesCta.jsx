"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { EASE } from "@/app/lib/reveal";
import styles from "@/app/css/service/ServicesCta.module.css";

export default function ServicesCta() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className={styles.mesh} aria-hidden />

        <div className={styles.inner}>
          <span className={styles.chip}>
            <Sparkles size={14} strokeWidth={2.4} />
            <span>Not sure which one?</span>
          </span>

          <h2 className={styles.title}>
            Tell us what you&apos;re working on —{" "}
            <span className={styles.accent}>we&apos;ll figure it out together.</span>
          </h2>

          <p className={styles.desc}>
            A quick call or WhatsApp message is all it takes. We&apos;ll help you
            pick what your business actually needs, no sales pressure.
          </p>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              <span>Start a Project</span>
              <ArrowRight size={18} strokeWidth={2.4} />
            </Link>
            
            <a
              href="https://wa.me/917827332337?text=Hi%20CreatorMonk"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaGhost}
            >
              <MessageCircle size={17} strokeWidth={2.2} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}