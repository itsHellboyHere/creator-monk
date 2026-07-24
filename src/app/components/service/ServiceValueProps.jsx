"use client";

import { motion } from "framer-motion";
import { Zap, Smartphone, Search, Wrench, Cloud, Shield,
         MessageCircle, Bot, TrendingUp, Calendar, Sparkles, BarChart3,
         Palette, Trophy, Layers, BookOpen, Music, Repeat } from "lucide-react";
import { EASE } from "@/app/lib/reveal";
import styles from "@/app/css/service/ServiceValueProps.module.css";

/* lucide icon map — servicesData ke `icon` strings ko component me convert karta hai */
const ICONS = {
  Zap, Smartphone, Search, Wrench, Cloud, Shield,
  MessageCircle, Bot, TrendingUp, Calendar, Sparkles, BarChart3,
  Palette, Trophy, Layers, BookOpen, Music, Repeat,
};

export default function ServiceValueProps({ data }) {
  const items = data.valueProps || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className={styles.eyebrow}>Why it works</span>
          <h2 className={styles.title}>
            Built to <span className={styles.accent}>actually help you.</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <ValueCard key={item.title} {...item} index={i} total={items.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ icon, title, desc, index, total }) {
  const Icon = ICONS[icon] || Sparkles;

  // 2-col grid math for borders
  const cols = 2;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const totalRows = Math.ceil(total / cols);

  const isLeftCol = col === 0;
  const isLastRow = row === totalRows - 1;

  return (
    <motion.div
      className={`${styles.card} ${isLeftCol ? styles.leftCol : ""} ${!isLastRow ? styles.notLastRow : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    >
      {/* soft hover glow */}
      <div className={styles.glow} aria-hidden />

      <div className={styles.iconWrap}>
        <Icon size={28} strokeWidth={1.75} />
      </div>

      <h3 className={styles.cardTitle}>
        <span className={styles.accentBar} aria-hidden />
        <span className={styles.titleText}>{title}</span>
      </h3>

      <p className={styles.cardDesc}>{desc}</p>
    </motion.div>
  );
}