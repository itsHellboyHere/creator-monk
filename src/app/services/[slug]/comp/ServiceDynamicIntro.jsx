"use client";
import { motion } from "framer-motion";
import styles from "../css/ServiceDynamicIntro.module.css";

export default function ServiceDynamicIntro({ title, imageSrc, tagline }) {
  return (
    <section className={styles.introHero}>
      {/* Background technical grid texture */}
      <div className={styles.techOverlay} />
      
      <div className={styles.container}>
        <div className={styles.layout}>
          
          <motion.div 
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.textContent}
          >
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.tagWrapper}>
              <div className={styles.accentLine} />
              <p className={styles.tagline}>{tagline}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={styles.visualSide}
          >
            <div className={styles.imageWrap}>
              <img src={imageSrc} alt="Service Visual" className={styles.serviceImg} />
              {/* Pulsing Divine Glow */}
              <div className={styles.divineGlow} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}