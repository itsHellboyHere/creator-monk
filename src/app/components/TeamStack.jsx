"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EASE, revealUp } from "../lib/reveal";
import styles from "@/app/css/TeamStack.module.css";


export const TEAM = [
  {
    name: "Gaurav Choudhary",
    role: "Marketing",
    quote:
      "Posting every day is the easy part. Getting the right people to stop and actually look — that's the job I take care of.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784870514/WhatsApp_Image_2026-07-24_at_9.41.34_AM_a45due.jpg",
  },
  {
    name: "Sonu",
    role: "Video & Reels",
    quote:
      "A reel gets about two seconds to earn the next twenty. I cut out everything that doesn't help it survive those two.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784863335/WhatsApp_Image_2026-07-23_at_12.38.03_PM_tyzucd.jpg",
  },
];

const AUTOPLAY_MS = 5000;

/* Deterministic tilt per index — Math.random() during render would
 * break SSR hydration, so we derive a stable angle instead. */
function tiltFor(i) {
  const seq = [-7, 6, -4, 8, -6, 5];
  return `${seq[i % seq.length]}deg`;
}

export default function TeamStack({
  team = TEAM,
  autoplay = true,
  autoplayMs = AUTOPLAY_MS,
  eyebrow = "The team",
  heading = "And the people building alongside us",
  sub = "Every project gets real hands on it. Here's who you'll see in the thread.",
}) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = team.length;

  const next = React.useCallback(() => {
    setActive((p) => (p + 1) % count);
  }, [count]);

  const prev = React.useCallback(() => {
    setActive((p) => (p - 1 + count) % count);
  }, [count]);

  React.useEffect(() => {
    if (!autoplay || paused || count < 2) return;
    const id = setTimeout(next, autoplayMs);
    return () => clearTimeout(id);
  }, [autoplay, paused, count, next, autoplayMs, active]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const current = team[active];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.header
          className={styles.header}
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -120px 0px" }}
        >
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.sub}>{sub}</p>
        </motion.header>

        <motion.div
          className={styles.stage}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Team"
        >
          {/* ---- Portrait deck ---- */}
          <div className={styles.deckCol}>
            <span className={styles.deckGlow} aria-hidden="true" />
            <div className={styles.deck}>
              <AnimatePresence initial={false}>
                {team.map((member, i) => {
                  const isActive = i === active;
                  return (
                    <motion.div
                      key={member.image}
                      className={styles.slide}
                      initial={{ opacity: 0, scale: 0.92, y: 46, rotate: tiltFor(i) }}
                      animate={{
                        opacity: isActive ? 1 : 0.45,
                        scale: isActive ? 1 : 0.92,
                        y: isActive ? 0 : 20,
                        rotate: isActive ? "0deg" : tiltFor(i),
                        zIndex: isActive ? count : count - Math.abs(i - active),
                      }}
                      exit={{ opacity: 0, scale: 0.92, y: -46 }}
                      transition={{ duration: 0.62, ease: EASE }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        draggable={false}
                        loading="lazy"
                        className={styles.photo}
                      />
                      <span className={styles.sheen} aria-hidden="true" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* ---- Text + controls ---- */}
          <div className={styles.textCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.36, ease: EASE }}
                className={styles.textBlock}
              >
                <h3 className={styles.name}>{current.name}</h3>
                <p className={styles.role}>{current.role}</p>
                <p className={styles.quote}>{current.quote}</p>
              </motion.div>
            </AnimatePresence>

            <div className={styles.controls}>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous team member"
                className={styles.navBtn}
              >
                <ArrowLeft size={18} strokeWidth={2} className={styles.iconPrev} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next team member"
                className={styles.navBtn}
              >
                <ArrowRight size={18} strokeWidth={2} className={styles.iconNext} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}