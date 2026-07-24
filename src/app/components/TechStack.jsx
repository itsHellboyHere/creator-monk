"use client";

import { motion } from "framer-motion";
import styles from "@/app/css/TechStack.module.css";

const EASE = [0.22, 1, 0.36, 1];

// simple-icons CDN → white brand SVGs, zero setup
const icon = (slug) => `https://cdn.simpleicons.org/${slug}/ffffff`;

const STACK = [
  { name: "Next.js", src: icon("nextdotjs") },
  { name: "React", src: icon("react") },
  { name: "Flutter", src: icon("flutter") },
  { name: "Python", src: icon("python") },
  { name: "Django", src: icon("django") },
//   { name: "OpenAI", src: icon("openai") },
{ name: "Gemini", src: icon("googlegemini") },
  { name: "Grok", src: null }, // no reliable CDN icon — text mark fallback
  { name: "Docker", src: icon("docker") },
  { name: "WhatsApp", src: icon("whatsapp") },
];

export default function TechStack() {
  return (
    <section className={styles.section}>
      {/* mesh grid lines */}
      <div className={styles.mesh} aria-hidden />
      {/* soft radial glow */}
      <div className={styles.glow} aria-hidden />

      <div className={styles.inner}>
        {/* Left: text */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className={styles.title}>Built with tools you can trust.</h2>
          <p className={styles.desc}>
            We don&apos;t experiment on your project. Every website, app and AI
            system we ship is built with modern, proven technology — so it
            stays fast, secure and ready to grow with you.
          </p>
        </motion.div>

        {/* Right: glass logo grid */}
        <div className={styles.grid}>
          {STACK.map((t, i) => (
            <motion.div
              key={t.name}
              className={styles.cell}
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
            >
              {t.src ? (
                <img
                  src={t.src}
                  alt={t.name}
                  className={styles.logo}
                  loading="lazy"
                />
              ) : (
                <span className={styles.textMark}>Grok</span>
              )}
              <span className={styles.cellName}>{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}