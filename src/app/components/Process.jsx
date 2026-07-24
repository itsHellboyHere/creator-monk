"use client";

import { motion } from "framer-motion";
import { MessageCircle, ClipboardList, Hammer, Rocket } from "lucide-react";
import styles from "@/app/css/Process.module.css";

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Tell us your idea",
    desc: "A quick call or WhatsApp message about what you need — no technical talk required.",
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "We plan it for you",
    desc: "We turn your idea into a clear plan — what we'll build, how long it takes, and what it costs. No surprises.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "We build, you relax",
    desc: "Our team designs and builds everything. You get updates along the way and can share feedback anytime.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Launch & grow",
    desc: "We go live together — and we stay with you after launch to keep things running and growing.",
  },
];

export default function Process() {
  return (
    <section className={styles.section}>
      <div className={styles.bgWash} aria-hidden />

      <motion.div
        className={styles.head}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className={styles.eyebrow}>How we work</span>
        <h2 className={styles.title}>
          From idea to launch, <span className={styles.accent}>made easy.</span>
        </h2>
        <p className={styles.sub}>
          No confusing process, no tech jargon. Here&apos;s exactly what
          happens when you work with us.
        </p>
      </motion.div>

      <div className={styles.timeline}>
        {/* connecting line — draws in on scroll */}
        <motion.div
          className={styles.line}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          aria-hidden
        />

        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.num}
              className={styles.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE }}
            >
              <span className={styles.ghostNum}>{s.num}</span>
              <span className={styles.node}>
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </motion.div>
          );
        })}
            </div>

      {/* Curve out: Process → TrustedBy */}
      <div className={styles.curveBottom} aria-hidden="true">
        <svg
          viewBox="0 0 2880 110"
          preserveAspectRatio="none"
          className={styles.curveSvg}
        >
          <path
            d="M0,28 C240,92 480,18 720,42 C960,66 1200,94 1440,62 C1680,30 1920,86 2160,54 C2400,22 2640,76 2880,46 L2880,110 L0,110 Z"
            fill="var(--curve-next)"
          />
        </svg>

        <svg
          viewBox="0 0 2880 110"
          preserveAspectRatio="none"
          className={styles.curveSvg}
        >
          <path
            d="M0,50 C260,18 500,86 760,58 C1020,30 1230,76 1440,48 C1700,14 1920,88 2180,58 C2420,30 2660,80 2880,52 L2880,110 L0,110 Z"
            fill="var(--curve-next-soft)"
          />
        </svg>
      </div>
    </section>
  );
}