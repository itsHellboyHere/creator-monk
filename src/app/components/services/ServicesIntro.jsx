"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "@/app/css/ServicesIntro.module.css";

export default function ServicesIntro() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"], 
  });

  // Hero Fades out quickly to reveal the lab
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);
  
  // Cinematic Text timing: Arrives as hero leaves, holds, then fades
  const cineOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.85, 0.98], [0, 1, 1, 0]);
  const cineScale = useTransform(scrollYProgress, [0.3, 0.98], [0.9, 1.15]);

  return (
    <div ref={scrollRef} className={styles.scrollWrapper}>
      {/* Centered Portal: Fixes the 60-70% cutoff issue */}
      <div className={styles.cinePortal}>
        <motion.h2 
          style={{ opacity: cineOpacity, scale: cineScale }} 
          className={styles.cinematicText}
        >
          SERVICES
        </motion.h2>
      </div>

      <section className={styles.introHero}>
        <motion.div style={{ opacity, scale }} className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.textContent}>
              <h1 className={styles.hindiTitle}>
                उत्तम जीवन के लिए, <br />
                <span className={styles.gold}>हमें अपना सारथी चुनें।</span>
              </h1>
              <p className={styles.tagline}>ARCHITECTING YOUR PATH TO DIGITAL DOMINANCE.</p>
            </div>
            <div className={styles.visualSide}>
              <div className={styles.imageWrap}>
                <img 
                  src="https://res.cloudinary.com/dgifa4wgb/image/upload/v1770526095/Gemini_Generated_Image_ja8wenja8wenja8w-Photoroom_nm8jk7.png" 
                  alt="Shri Krishna Sarathi"
                  className={styles.sarathiImage}
                />
                <div className={styles.divineGlow} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}