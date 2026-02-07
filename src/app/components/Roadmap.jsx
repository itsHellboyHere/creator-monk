"use client";
import { motion } from "framer-motion";
import styles from "@/app/css/Roadmap.module.css";

const phases = [
  {
    id: "०१",
    tag: "THE BLUEPRINT",
    title: "Neev (Foundation)",
    desc: "We map the brand soul before writing code. Pehle planning, phir execution.",
    pos: "topBox",
    glow: "rgba(255, 174, 0, 0.15)",
    hint: "Parampara. Pratishtha. Anushasan."
  },
  {
    id: "०२",
    tag: "THE ENGINE",
    title: "Asli Power (Dev)",
    desc: "3 platforms launched. Optimized for speed and superstar scale.",
    pos: "midBox",
    glow: "rgba(66, 135, 245, 0.15)",
    hint: "Mogambo Khush Hua!"
  },
  {
    id: "०३",
    tag: "THE LOUDSPEAKER",
    title: "Dhamaka (Social)",
    desc: "Managing the narrative so the noise matches the quality.",
    pos: "bottomBox",
    glow: "rgba(16, 185, 129, 0.15)",
    hint: "Don ko pakadna mushkil hi nahi..."
  }
];

export default function RoadmapGrid() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.gridOverlay} />
      <div className={styles.noiseOverlay} />
      <div className={styles.bgGradient} />

      <div className={styles.header}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.badge}
        >
          STARTUP FRAMEWORK • मिशन सुपरस्टार
        </motion.span>

        <h2 className={styles.title}>
          OUR OPERATING <br />
          <span className={styles.goldText}>SYSTEM.</span>
        </h2>
      </div>

      <div className={styles.bentoGrid}>
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className={`${styles.phaseCard} ${styles[phase.pos]}`}
          >
            <div className={styles.cardTop}>
              <span className={styles.tag}>{phase.tag}</span>
              <span className={styles.id}>{phase.id}</span>
            </div>

            <h3 className={styles.phaseTitle}>{phase.title}</h3>
            <p className={styles.phaseDesc}>{phase.desc}</p>

            <span className={styles.hindiHint}>{phase.hint}</span>
            <div className={styles.cardGlow} style={{ background: phase.glow }} />
          </motion.div>
        ))}

        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className={styles.floatElement}
        >
          <div className={styles.dot} />
          <span>३ SITES LIVE & KICKING</span>
        </motion.div>
      </div>
    </section>
  );
}