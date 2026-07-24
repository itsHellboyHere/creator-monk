"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/app/css/OurStory.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/* ------------------------------------------------------------------
 * Chapters — plain English, no dates, no headcount
 * ------------------------------------------------------------------ */
export const CHAPTERS = [
  {
    n: "01",
    label: "Thumbnails",
    title: "It started with one thumbnail.",
    body: "We made thumbnails for YouTube creators. Nothing fancy — just making sure people clicked. That taught us the only lesson that ever mattered: if it doesn't get noticed, it doesn't count.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784868406/c0e19a75-5a06-4ee9-b1c7-97da63e8bb76-Photoroom_rkpxxy.png",
    alt: "A creator sketching a thumbnail",
  },
  {
    n: "02",
    label: "Editing",
    title: "Then they asked us to cut the video too.",
    body: "Thumbnails turned into edits. Edits turned into full channels. We learned how attention actually works — what makes someone stay past the first five seconds.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784868406/23f068ac-06a1-4108-9d22-b2425e8d2599-Photoroom_qryjzk.png",
    alt: "Two people editing a video timeline",
  },
  {
    n: "03",
    label: "Social & Websites",
    title: "Creators became businesses.",
    body: "The same people who wanted views now wanted customers. So we started running their social pages and building their websites. Different tools, same job — get you noticed, then get you taken seriously.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784868406/ChatGPT_Image_Jul_24_2026_at_10_13_11_AM-Photoroom_zoso3r.png",
    alt: "A small business with a website and social presence",
  },
  {
    n: "04",
    label: "AI & WhatsApp",
    title: "Every business had the same problem.",
    body: "Too many messages, not enough hours. So we built WhatsApp bots and AI assistants that answer, follow up, and never sleep. The boring work stopped eating everyone's day.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784868407/ChatGPT_Image_Jul_24_2026_at_10_14_19_AM-Photoroom_ozxwln.png",
    alt: "A robot assistant handling chat messages",
  },
  {
    n: "05",
    label: "Apps",
    title: "And then people wanted the whole thing.",
    body: "Websites became apps. Apps became full systems that run a business end to end. We're still building — bigger projects, better tools, same people who care if it works.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784868406/ChatGPT_Image_Jul_24_2026_at_10_16_00_AM-Photoroom_soqpzl.png",
    alt: "Three friends looking up at an app on a large phone",
  },
];

/* Rail geometry (px, 1:1 with the SVG viewBox) */
const RAIL_W = 200;
const RAIL_CX = RAIL_W / 2;
const RAIL_AMP = 62; // how far the line swings toward each card

/* Build a smooth S-curve path through measured node centers */
function buildPath(centers, height) {
  if (!centers.length || !height) return "";

  const pts = [{ x: RAIL_CX, y: 0 }];
  centers.forEach((cy, i) => {
    const dir = i % 2 === 0 ? -1 : 1;
    pts.push({ x: RAIL_CX + dir * RAIL_AMP, y: cy });
  });
  pts.push({ x: RAIL_CX, y: height });

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const k = (p1.y - p0.y) * 0.5;
    d += ` C ${p0.x} ${p0.y + k}, ${p1.x} ${p1.y - k}, ${p1.x} ${p1.y}`;
  }
  return d;
}

/* Binary-search the path length at a given y — used so each node
 * lights up exactly when the drawn line reaches it. */
function lengthAtY(path, targetY, total) {
  let lo = 0;
  let hi = total;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).y < targetY) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export default function OurStory({
  chapters = CHAPTERS,
  eyebrow = "Our story",
  heading = "How we got here",
  sub = "We didn't start as an agency. We started with one small job, then kept going.",
}) {
  const sectionRef = React.useRef(null);
  const timelineRef = React.useRef(null);
  const pathRef = React.useRef(null);
  const glowRef = React.useRef(null);
  const rowRefs = React.useRef([]);
  const nodeRefs = React.useRef([]);

  const [geo, setGeo] = React.useState({ d: "", height: 0, nodes: [] });

  /* ---- Measure rows → build the rail path ---- */
  const measure = React.useCallback(() => {
    const wrap = timelineRef.current;
    if (!wrap) return;

    const wrapBox = wrap.getBoundingClientRect();
    const height = wrapBox.height;

    const centers = rowRefs.current
      .filter(Boolean)
      .map((row) => {
        const box = row.getBoundingClientRect();
        return box.top - wrapBox.top + box.height / 2;
      });

    if (!centers.length || !height) return;

    setGeo({
      d: buildPath(centers, height),
      height,
      nodes: centers.map((cy, i) => ({
        y: cy,
        x: RAIL_CX + (i % 2 === 0 ? -1 : 1) * RAIL_AMP,
      })),
    });
  }, []);

  useIsoLayoutEffect(() => {
    measure();

    const wrap = timelineRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ---- GSAP: scrubbed line draw + node activation + card reveals ---- */
  useIsoLayoutEffect(() => {
    if (!geo.d) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const glow = glowRef.current;
      const nodes = nodeRefs.current.filter(Boolean);

      /* --- Rail draw --- */
      if (path && !reduce) {
        const total = path.getTotalLength();

        const nodeAt = geo.nodes.map((n) =>
          Math.min(1, lengthAtY(path, n.y, total) / total)
        );

        gsap.set(path, { strokeDasharray: total, strokeDashoffset: total });
        gsap.set(glow, { opacity: 0 });

        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: "top 68%",
          end: "bottom 58%",
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            path.style.strokeDashoffset = String(total * (1 - p));

            const pt = path.getPointAtLength(total * p);
            gsap.set(glow, {
              x: pt.x,
              y: pt.y,
              opacity: p > 0.004 && p < 0.996 ? 1 : 0,
            });

            nodes.forEach((el, i) => {
              const on = p >= nodeAt[i] - 0.004;
              if (on !== el.dataset.on_) {
                el.dataset.on_ = on;
                el.classList.toggle(styles.nodeOn, on);
              }
            });
          },
        });
      } else if (path) {
        path.style.strokeDasharray = "none";
        nodes.forEach((el) => el.classList.add(styles.nodeOn));
      }

      /* --- Card + illustration reveals --- */
      rowRefs.current.filter(Boolean).forEach((row, i) => {
        const card = row.querySelector(`.${styles.card}`);
        const art = row.querySelector(`.${styles.art}`);
        const img = row.querySelector(`.${styles.artImg}`);
        const dir = i % 2 === 0 ? -1 : 1;

        if (reduce) {
          gsap.set([card, art], { opacity: 1, x: 0, y: 0 });
          return;
        }

        gsap.from(card, {
          scrollTrigger: { trigger: row, start: "top 80%", once: true },
          x: dir * 56,
          y: 28,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(art, {
          scrollTrigger: { trigger: row, start: "top 80%", once: true },
          x: dir * -56,
          y: 28,
          opacity: 0,
          scale: 0.94,
          duration: 1,
          delay: 0.12,
          ease: "power3.out",
        });

        /* gentle parallax drift on the illustration */
        gsap.to(img, {
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          yPercent: -8,
          ease: "none",
        });
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [geo]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.sub}>{sub}</p>
        </header>

        <div className={styles.timeline} ref={timelineRef}>
          {/* ---- Rail (desktop only) ---- */}
          <div className={styles.railWrap} aria-hidden="true">
            <svg
              className={styles.railSvg}
              width={RAIL_W}
              height={geo.height || 0}
              viewBox={`0 0 ${RAIL_W} ${geo.height || 0}`}
              fill="none"
            >
              <defs>
                <linearGradient id="cm-rail" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--violet-500)" />
                  <stop offset="55%" stopColor="var(--violet-600)" />
                  <stop offset="100%" stopColor="var(--violet-800)" />
                </linearGradient>
              </defs>

              {/* faint full track */}
              <path d={geo.d} className={styles.railTrack} />
              {/* drawn line */}
              <path ref={pathRef} d={geo.d} className={styles.railLine} />
            </svg>

            {/* travelling glow head */}
            <span className={styles.glow} ref={glowRef} />

            {/* nodes */}
            {geo.nodes.map((n, i) => (
              <span
                key={i}
                ref={(el) => (nodeRefs.current[i] = el)}
                className={styles.node}
                style={{ left: n.x, top: n.y }}
              >
                <span className={styles.nodeRing} />
                <span className={styles.nodeDot} />
              </span>
            ))}
          </div>

          {/* ---- Rows ---- */}
          {chapters.map((c, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={c.n}
                className={styles.row}
                ref={(el) => (rowRefs.current[i] = el)}
              >
                <article
                  className={`${styles.card} ${left ? styles.colLeft : styles.colRight}`}
                >
                  <span className={styles.ghost} aria-hidden="true">
                    {c.n}
                  </span>
                  <span className={styles.label}>
                    <em className={styles.labelNum}>{c.n}</em>
                    {c.label}
                  </span>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.cardBody}>{c.body}</p>
                </article>

                <figure
                  className={`${styles.art} ${left ? styles.colRight : styles.colLeft}`}
                >
                  <span className={styles.artGlow} aria-hidden="true" />
                  <img
                    src={c.image}
                    alt={c.alt}
                    loading="lazy"
                    className={styles.artImg}
                  />
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}