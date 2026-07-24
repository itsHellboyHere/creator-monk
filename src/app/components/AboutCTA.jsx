"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import styles from "@/app/css/AboutCTA.module.css";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const useIso = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/* TODO: replace with the Cloudinary URL once generated */
const ART =
  "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784873469/ChatGPT_Image_Jul_24_2026_at_11_40_08_AM-Photoroom_kydqt7.png";

export default function AboutCta({
  image = ART,
  eyebrow = "Start here",
  heading = "Tell us what you're trying to build.",
  sub = "A short call, then a clear quote. No pressure, no long forms.",
  primaryHref = "/contact",
  primaryLabel = "Start a project",
  waHref = "https://wa.me/917827332337",
  waLabel = "Talk on WhatsApp",
}) {
  const rootRef = React.useRef(null);
  const orbitRef = React.useRef(null);
  const dotRef = React.useRef(null);

  useIso(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(`.${styles.reveal}`, {
          scrollTrigger: { trigger: rootRef.current, start: "top 76%", once: true },
          y: 34,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        });

        gsap.from(`.${styles.artWrap}`, {
          scrollTrigger: { trigger: rootRef.current, start: "top 76%", once: true },
          x: 48,
          opacity: 0,
          scale: 0.94,
          duration: 1.1,
          delay: 0.1,
          ease: "power3.out",
        });

        /* dot travelling along the orbit path */
        const path = orbitRef.current;
        const dot = dotRef.current;
        if (path && dot) {
          const len = path.getTotalLength();
          gsap.to(
            { t: 0 },
            {
              t: 1,
              duration: 9,
              repeat: -1,
              ease: "none",
            onUpdate: function () {
                const pt = path.getPointAtLength(len * this.targets()[0].t);
                gsap.set(dot, { x: pt.x, y: pt.y });
              },
            }
          );
        }

        /* slow arc rotation */
        gsap.to(`.${styles.arcs}`, {
          rotate: 360,
          duration: 90,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={rootRef}>
      {/* ---- Creative SVG backdrop ---- */}
      <svg
        className={styles.canvas}
        viewBox="0 0 1200 620"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cm-cta-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--violet-500)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--periwinkle)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cm-cta-orbit" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--violet-600)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="cm-cta-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--violet-500)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--violet-500)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* concentric arcs */}
        <g className={styles.arcs}>
          <circle cx="880" cy="300" r="150" fill="none" stroke="url(#cm-cta-arc)" strokeWidth="1.4" />
          <circle cx="880" cy="300" r="225" fill="none" stroke="url(#cm-cta-arc)" strokeWidth="1.2" strokeDasharray="3 9" />
          <circle cx="880" cy="300" r="300" fill="none" stroke="url(#cm-cta-arc)" strokeWidth="1" />
        </g>

        {/* orbit path + travelling dot */}
        <ellipse
          ref={orbitRef}
          cx="880"
          cy="300"
          rx="262"
          ry="196"
          fill="none"
          stroke="url(#cm-cta-orbit)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
  <g ref={dotRef} className={styles.dot}>
          <circle r="16" fill="url(#cm-cta-glow)" />
          <circle r="4" fill="var(--violet-600)" />
        </g>
      </svg>

      <div className={styles.inner}>
        {/* ---- Copy ---- */}
        <div className={styles.copy}>
          <span className={`${styles.eyebrow} ${styles.reveal}`}>{eyebrow}</span>
          <h2 className={`${styles.heading} ${styles.reveal}`}>{heading}</h2>
          <p className={`${styles.sub} ${styles.reveal}`}>{sub}</p>

          <div className={`${styles.actions} ${styles.reveal}`}>
            <Link href={primaryHref} className={styles.primary}>
              <span className={styles.primaryLabel}>
                {primaryLabel}
                <ArrowRight size={18} strokeWidth={2.2} className={styles.arrow} />
              </span>
              <span className={styles.sweep} aria-hidden="true" />
            </Link>

            
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghost}
            >
              <MessageCircle size={18} strokeWidth={2} />
              {waLabel}
            </a>
          </div>
        </div>

        {/* ---- Illustration ---- */}
        <figure className={styles.artWrap}>
          <span className={styles.artGlow} aria-hidden="true" />
          <img src={image} alt="" loading="lazy" className={styles.art} />
        </figure>
      </div>
    </section>
  );
}