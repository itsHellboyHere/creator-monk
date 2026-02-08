"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "../css/ServiceAbout.module.css";

export default function ServiceAbout({ mission, benefits, accent, title }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Splitting the mission for visual impact
    const words = mission.split(" ");
    const head = words.slice(0, 3).join(" ");
    const tail = words.slice(3).join(" ");

    // Adjusted opacity: much subtler to prevent clashing with text
    const watermarkOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.05, 0.05, 0]);

    return (
        <section ref={containerRef} className={styles.aboutWrapper}>
            {/* BACKGROUND LAYER */}
            <motion.div style={{ opacity: watermarkOpacity }} className={styles.fixedWatermark}>
                {typeof title === 'string' ? title : "CORE"}
            </motion.div>

            <div className={styles.contentContainer}>
                <div className={styles.mainGrid}>
                    
                    {/* LEFT: STICKY MISSION */}
                    <div className={styles.missionZone}>
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className={styles.missionContent}
                        >
                            <div className={styles.tagWrapper}>
                                <div className={styles.livePulse} style={{ backgroundColor: accent }} />
                                <span className={styles.missionEyebrow} style={{ color: accent }}>
                                    // MISSION_OBJECTIVE
                                </span>
                            </div>

                            <h2 className={styles.missionStatement}>
                                <span className={styles.heavyText}>{head}</span> 
                                <span className={styles.lightText}>{tail}</span>
                            </h2>

                            <div className={styles.missionFooter}>
                                <div className={styles.missionRule} style={{ backgroundColor: accent }} />
                                <p className={styles.detailText}>
                                    Engineering unshakeable foundations for the next generation of the Creator Empire.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: SCROLLING SPECS */}
                    <div className={styles.technicalZone}>
                        {benefits.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className={styles.specCard}
                            >
                                <div className={styles.specHeader}>
                                    <span className={styles.specId}>{item.id}</span>
                                    <div className={styles.indicator} style={{ backgroundColor: accent }} />
                                </div>
                                <h3 className={styles.specTitle}>{item.head}</h3>
                                <p className={styles.specDesc}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}