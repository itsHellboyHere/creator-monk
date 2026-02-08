"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import styles from "@/app/css/ServicesPortals.module.css";

const servicePortals = [
  { id: "01", title: "SOCIAL_OS", label: "REACH ENGINE", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000" },
  { id: "02", title: "FILM_OS", label: "NARRATIVE CORE", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000" },
  { id: "03", title: "SOFT_OS", label: "CONVERSION BASE", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000" }
];

export default function ServicePortals() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother springs 
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Background shifts precisely to white as the 3rd card arrives
  const bgColor = useTransform(smoothProgress, [0.1, 0.45], ["#020203", "#F8F8F8"]);
  const studioOpacity = useTransform(smoothProgress, [0.2, 0.45], [0, 0.06]);
  const cardScale = useTransform(smoothProgress, [0, 0.3], [0.9, 1]);

  return (
    <motion.section ref={containerRef} style={{ backgroundColor: bgColor }} className={styles.section}>
      {/* Massive Background Logo */}
      <motion.div style={{ opacity: studioOpacity }} className={styles.watermark}>
        STUDIO
      </motion.div>

      <div className={styles.container}>
        <motion.div style={{ scale: cardScale }} className={styles.grid}>
          {servicePortals.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/services/${item.title.toLowerCase().replace('_os', '')}`} className={styles.glassCard}>
                <div className={styles.visualStack}>
                  <img src={item.img} alt={item.title} className={styles.glowImg} />
                  <div className={styles.glassOverlay} />
                  <div className={styles.cardInfo}>
                    <span className={styles.deptTag}>DEPT_{item.id}</span>
                    <h3 className={styles.title}>{item.title}</h3>
                  </div>
                </div>
                
                <div className={styles.footerArea}>
                  <p className={styles.label}>{item.label}</p>
                  <div className={styles.launchBtn}>
                    <span>INITIALIZE</span>
                    <div className={styles.circle} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div >
      </div>
    </motion.section>
  );
}