"use client";

import { motion } from "framer-motion";
import styles from "@/app/css/ContactHero.module.css";

const EASE = [0.22, 1, 0.36, 1];

// TODO: replace with your Cloudinary URL
const HERO_IMG =
  "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784646347/794cb347-60a0-487e-a98f-5ab4e59c5f8a-Photoroom_vnzhn6.png";

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.mesh} aria-hidden />

      <div className={styles.inner}>
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className={styles.eyebrow}>Say hello</span>
          <h1 className={styles.title}>
            Let&apos;s <span className={styles.accent}>build something</span> together.
          </h1>
          <p className={styles.desc}>
            Tell us what you&apos;re working on — a website, an app, a brand, or
            something you&apos;re still figuring out. We reply within a few
            hours with honest advice.
          </p>
        </motion.div>

        <motion.div
          className={styles.art}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          <div className={styles.artGlow} aria-hidden />
          <img src={HERO_IMG} alt="" className={styles.artImg} />
        </motion.div>
      </div>
    </section>
  );
}