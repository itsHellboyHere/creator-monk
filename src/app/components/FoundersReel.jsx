"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EASE, revealUp } from "../lib/reveal";
import styles from "@/app/css/FoundersReel.module.css";

/* ------------------------------------------------------------------
 * Founders data — quote = what they promise, author = name · role
 * ------------------------------------------------------------------ */
export const FOUNDERS = [
  {
    quote:
      "Good work is useless if nobody sees it. Getting you in front of the right people is my job.",
    author: "Rohan Raj · Tech & Growth",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1774168188/rohan_te1o7m.jpg",
    alt: "Rohan Raj",
  },
  {
    quote:
      "If a task is boring and repeats every day, it should be running on its own. That's what I build.",
    author: "Vishal · Software & AI",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1774168189/vishal_pez7g5.jpg",
    alt: "Vishal Kumar",
  },
  {
    quote:
      "You'll always know what's happening with your project, without having to chase us.",
    author: "Kundan Choudhary · Studio & Operations",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784863339/WhatsApp_Image_2026-07-23_at_10.07.26_AM_nnvlsw.jpg",
    alt: "Kundan Choudhary",
  },
];

/* Geometry — middle column is larger so the founder reads as the hero.
 * STEP must stay tied to the MIDDLE column's own pitch. */
const CELL_MAIN = 180; // featured + filler cells in the centre column
const CELL_SIDE = 112; // decorative outer columns
const GAP = 10; // must match the CSS gap
const STEP = 3 * (CELL_MAIN + GAP); // 570px

const EXIT_MS = 240;
const SLIDE_MS = 800;
const AUTOPLAY_MS = 4000;

function cn(...c) {
  return c.filter(Boolean).join(" ");
}

/* Blurred filler cell */
function Cell({ size }) {
  return (
    <div
      aria-hidden="true"
      className={styles.cell}
      style={{ width: size, height: size }}
    />
  );
}

/* Featured portrait */
function Featured({ src, alt }) {
  return (
    <div className={styles.featured} style={{ width: CELL_MAIN, height: CELL_MAIN }}>
      <img
        src={src}
        alt={alt ?? ""}
        loading="eager"
        decoding="async"
        className={styles.featuredImg}
      />
    </div>
  );
}

/* Per-character split with stagger delay */
function Chars({ text, startIndex, staggerMs }) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span className={styles.word}>
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className={styles.char}
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function FoundersReel({
  founders = FOUNDERS,
  charStaggerMs = 6,
  autoplay = true,
  autoplayMs = AUTOPLAY_MS,
  eyebrow = "The founders",
  heading = "The people you'll actually work with",
  sub = "No account managers in between. You talk to the people building your project.",
}) {
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [inView, setInView] = React.useState(true);
  const [tabVisible, setTabVisible] = React.useState(true);

  const animating = React.useRef(false);
  const timeouts = React.useRef([]);
  const indexRef = React.useRef(0);
  const stageRef = React.useRef(null);

  const count = founders.length;

  React.useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const clearTimers = React.useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  /* Background tabs throttle setTimeout, so a transition that starts
   * just before the tab hides can land minutes late — leaving the reel
   * on one founder and the text on another. Snap both back in sync. */
  const resync = React.useCallback(() => {
    clearTimers();
    animating.current = false;
    setExiting(false);
    setDisplayIndex(indexRef.current);
  }, [clearTimers]);

  /* Enable column transitions only after first paint */
  React.useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    return () => {
      cancelAnimationFrame(raf);
      clearTimers();
    };
  }, [clearTimers]);

  /* Pause when off-screen; resync when the tab comes back */
  React.useEffect(() => {
    const el = stageRef.current;

    let io;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { threshold: 0.3 }
      );
      io.observe(el);
    }

    const onVis = () => {
      const hidden = document.hidden;
      setTabVisible(!hidden);
      if (!hidden) resync();
      else clearTimers();
    };

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", resync);

    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", resync);
    };
  }, [resync, clearTimers]);

  /* Core transition — wraps around at both ends */
  const goTo = React.useCallback(
    (next) => {
      if (animating.current) return;
      if (next === index) return;
      animating.current = true;

      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
          timeouts.current = [];
        }, SLIDE_MS)
      );
    },
    [index]
  );

  const paginate = React.useCallback(
    (dir) => {
      goTo((index + dir + count) % count);
    },
    [goTo, index, count]
  );

  /* Autoplay — only runs while on-screen and on an active tab */
  React.useEffect(() => {
    if (!autoplay || paused || !inView || !tabVisible || count < 2) return;

    const id = setTimeout(() => {
      goTo((index + 1) % count);
    }, autoplayMs);

    return () => clearTimeout(id);
  }, [autoplay, autoplayMs, paused, inView, tabVisible, count, index, goTo]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  };

  const middleItems = React.useMemo(() => {
    const items = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    founders.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) items.push({ type: "cell" }, { type: "cell" });
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [founders, count]);

  const sideCellCount = 6 + 3 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY * 0.62; // outer columns drift slower

  const colStyle = (y) => ({
    transform: `translateY(${y}px)`,
    transition: mounted
      ? `transform ${SLIDE_MS}ms cubic-bezier(0.65,0,0.35,1)`
      : "none",
  });

  const current = founders[displayIndex];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          variants={revealUp}
          initial="hidden"
          animate="visible"
        >
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.sub}>{sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className={styles.stageWrap}
        >
          <div
            ref={stageRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Founders"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            className={styles.stage}
          >
            {/* Reel */}
            <div aria-hidden="true" className={styles.reel}>
              <div className={styles.columns}>
                <div className={styles.column} style={colStyle(sideY)}>
                  {Array.from({ length: sideCellCount }).map((_, i) => (
                    <Cell key={i} size={CELL_SIDE} />
                  ))}
                </div>

                <div className={styles.columnMain} style={colStyle(middleY)}>
                  {middleItems.map((item, i) =>
                    item.type === "featured" ? (
                      <Featured
                        key={i}
                        src={founders[item.i].image}
                        alt={founders[item.i].alt}
                      />
                    ) : (
                      <Cell key={i} size={CELL_MAIN} />
                    )
                  )}
                </div>

                <div className={styles.column} style={colStyle(sideY)}>
                  {Array.from({ length: sideCellCount }).map((_, i) => (
                    <Cell key={i} size={CELL_SIDE} />
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
              <div className={styles.contentTop}>
                <svg
                  className={styles.quoteMark}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
                </svg>

                <div className={styles.textStage} aria-live="polite">
                  <div aria-hidden="true" className={styles.sizer}>
                    <p className={styles.quote}>{current.quote}</p>
                    <p className={styles.author}>{current.author}</p>
                  </div>

                  <div
                    key={displayIndex}
                    className={cn(styles.textBlock, exiting && styles.exit)}
                  >
                    <p className={styles.quote}>
                      <Chars text={current.quote} startIndex={0} staggerMs={charStaggerMs} />
                    </p>
                    <p className={styles.author}>
                      <Chars
                        text={current.author}
                        startIndex={current.quote.length + 6}
                        staggerMs={charStaggerMs}
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.controls}>
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous founder"
                  className={styles.navBtn}
                >
                  <ChevronLeft size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next founder"
                  className={styles.navBtn}
                >
                  <ChevronRight size={14} strokeWidth={2} />
                </button>

                <div className={styles.dots}>
                  {founders.map((_, i) => (
                    <span
                      key={i}
                      className={cn(styles.dot, i === index && styles.dotActive)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}