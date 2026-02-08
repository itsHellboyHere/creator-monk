"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "@/app/css/ServicesIntro.module.css";

export default function ServicesIntro() {
  return (
    <section className={styles.introHero}>
      <div className={styles.container}>
        <div className={styles.layout}>
          
          {/* Left Side: Divine Mission Text */}
          <div className={styles.textContent}>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.hindiTitle}
            >
              उत्तम जीवन के लिए, <br />
              <span className={styles.gold}>हमें अपना सारथी चुनें।</span>
            </motion.h1>
            <p className={styles.tagline}>
              ARCHITECTING YOUR PATH TO DIGITAL DOMINANCE.
            </p>
          </div>

          {/* Right Side: Shri Krishna Visual (No Background) */}
          <div className={styles.visualSide}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className={styles.imageWrap}
            >
              <img 
                src="https://res.cloudinary.com/dgifa4wgb/image/upload/v1770526095/Gemini_Generated_Image_ja8wenja8wenja8w-Photoroom_nm8jk7.png" 
                alt="Shri Krishna Sarathi"
                className={styles.sarathiImage}
              />
              <div className={styles.divineGlow} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}