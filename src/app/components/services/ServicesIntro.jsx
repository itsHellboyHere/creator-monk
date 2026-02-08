"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "@/app/css/ServicesIntro.module.css";

// Entry Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function ServicesIntro() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"], 
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);
  
  const cineOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.85, 0.98], [0, 1, 1, 0]);
  const cineScale = useTransform(scrollYProgress, [0.3, 0.98], [0.9, 1.15]);

  return (
    <div ref={scrollRef} className={styles.scrollWrapper}>
      <div className={styles.cinePortal}>
        <motion.div 
          style={{ opacity: cineOpacity, scale: cineScale }}
          className={styles.textWrapper}
        >
          <h2 className={styles.cinematicText}>
            <span className={styles.line}>CREATION</span>
            <span className={styles.line}>LAB</span>
          </h2>
          <motion.div 
            animate={{ top: ["-5%", "105%", "-5%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className={styles.scannerBeam}
          />
        </motion.div>
      </div>

      <section className={styles.introHero}>
        {/* Entry Animation Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ opacity: scrollOpacity, scale: scrollScale }} 
          className={styles.container}
        >
          <div className={styles.layout}>
            <div className={styles.textContent}>
              <motion.h1 variants={itemVariants} className={styles.hindiTitle}>
                उत्तम जीवन के लिए, <br />
                <span className={styles.gold}>हमें अपना सारथी चुनें।</span>
              </motion.h1>
              <motion.p variants={itemVariants} className={styles.tagline}>
                ARCHITECTING YOUR PATH TO DIGITAL DOMINANCE.
              </motion.p>
            </div>

            <div className={styles.visualSide}>
              <motion.div variants={itemVariants} className={styles.imageWrap}>
                <img 
                  src="https://res.cloudinary.com/dgifa4wgb/image/upload/v1770526095/Gemini_Generated_Image_ja8wenja8wenja8w-Photoroom_nm8jk7.png" 
                  alt="Shri Krishna Sarathi"
                  className={styles.sarathiImage}
                />
                <div className={styles.divineGlow} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}