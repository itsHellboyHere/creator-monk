"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { EASE } from "@/app/lib/reveal";
import styles from "@/app/css/service/ServicesHubHero.module.css";

export default function ServicesHubHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.mesh} aria-hidden />

      <div className={styles.container}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          What we do
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
        >
          Everything your brand needs to{" "}
          <span className={styles.accent}>grow online.</span>
        </motion.h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          From websites and apps to social media and AI — one team, one clear
          plan, no back-and-forth between vendors.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
        >
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
            <span>Talk to us</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}