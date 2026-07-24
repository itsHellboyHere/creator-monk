"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageCircle, PenTool, Code, Rocket,
  Search, Bot, Zap, Heart, Calendar, Sparkles, TrendingUp,
  Layers, Palette, Package, Upload, Film, Check,
} from "lucide-react";
import { EASE } from "@/app/lib/reveal";
import styles from "@/app/css/service/ServiceProcess.module.css";

const ICONS = {
  MessageCircle, PenTool, Code, Rocket,
  Search, Bot, Zap, Heart, Calendar, Sparkles, TrendingUp,
  Layers, Palette, Package, Upload, Film, Check,
};

export default function ServiceProcess({ data }) {
  const steps = data?.process || [];
  const containerRef = useRef(null);
    console.log("steps ",steps)
  // scroll-driven line fill
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.title}>
            Simple, honest, <span className={styles.accent}>no drama.</span>
          </h2>
          <p className={styles.sub}>
            Four steps. That&apos;s it. You know what&apos;s happening at every stage.
          </p>
        </motion.div>

        <div className={styles.timeline} ref={containerRef}>
          {/* vertical rail */}
          <div className={styles.rail}>
            <motion.div
              className={styles.railFill}
              style={{ height: lineHeight }}
            />
          </div>

          {/* steps */}
          <ol className={styles.steps}>
            {steps.map((step, i) => {
              const Icon = ICONS[step.icon] || Sparkles;
              return (
                <motion.li
                  key={i}
                  className={styles.step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                >
                  {/* dot on rail */}
                  <div className={styles.dot}>
                    <div className={styles.dotInner} />
                  </div>

                  {/* content */}
                  <div className={styles.content}>
                    <div className={styles.stepHead}>
                      <span className={styles.stepNum}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.iconWrap}>
                        <Icon size={20} strokeWidth={2} />
                      </span>
                    </div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}