"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/app/css/About.module.css";

const slides = [
  {
    id: 1,
    label: "ORIGIN_01",
    title: "LISTEN WITH INTENTION",
    desc: "In a world full of noise, we choose stillness. Growth does not begin with speed — it begins with clarity of purpose.",
    img: "airpods.webp"
  },
  {
    id: 2,
    label: "PHILOSOPHY_02",
    title: "CLARITY OVER CHAOS",
    desc: "When intention is clear, the path reveals itself. We design digital systems that align vision with execution.",
    img: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770959947/Gemini_Generated_Image_bj2fgobj2fgobj2f_wm6ukh.jpg"
  },
  {
    id: 3,
    label: "DHARMA_03",
    title: "BUILD WITH PURPOSE",
    desc: "True creation is not loud. It is disciplined. Structured. Timeless. We help uncommon builders shape work that lasts.",
    img: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770959948/IMG_3392_zuorfq.jpg"
  }
];

export default function About() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => (old >= 100 ? 0 : old + 1.43));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) next();
  }, [progress, next]);

  return (
    <main className={styles.aboutPage}>
      <div className={styles.stageWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={styles.galleryCard}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
              src={slides[active].img}
              className={styles.mainImg}
            />

            <div className={styles.glassLayer}></div>

            <div className={styles.contentOverlay}>
              <div className={styles.textSide}>
                <motion.span 
                   initial={{ x: -20, opacity: 0 }} 
                   animate={{ x: 0, opacity: 1 }} 
                   className={styles.label}
                >
                  {slides[active].label}
                </motion.span>

                <motion.h1 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  className={styles.title}
                >
                  {slides[active].title.split(" ")[0]}{" "}
                  <span className={styles.outlineText}>
                    {slides[active].title.split(" ").slice(1).join(" ")}
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.3 }}
                  className={styles.desc}
                >
                  {slides[active].desc}
                </motion.p>

                <button className={styles.cta}>DISCOVER_OUR_PATH</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* THUMBNAIL NAVIGATION */}
        <div className={styles.thumbnailTrack}>
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ""}`}
              onClick={() => { setActive(i); setProgress(0); }}
            >
              <img src={s.img} alt="thumbnail" />
              {i === active && (
                <div className={styles.thumbTimer}>
                  <div className={styles.fill} style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}