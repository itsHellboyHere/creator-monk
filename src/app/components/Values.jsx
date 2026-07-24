"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Receipt, MessageSquare, Rocket, KeyRound } from "lucide-react";
import styles from "@/app/css/Values.module.css";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const useIso = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export const VALUES = [
  {
    n: "01",
    Icon: Receipt,
    title: "We quote once.",
    body: "One number after a short call, and that stays the number. No surprise line items later.",
  },
  {
    n: "02",
    Icon: MessageSquare,
    title: "Boring updates beat surprises.",
    body: "You'll hear from us even when there's nothing exciting to report. You shouldn't have to guess.",
  },
  {
    n: "03",
    Icon: Rocket,
    title: "Live beats perfect.",
    body: "We'd rather put something real in front of your customers than polish it privately for months.",
  },
  {
    n: "04",
    Icon: KeyRound,
    title: "It's yours, not ours.",
    body: "Your code, your domain, your accounts. Nothing stays locked behind us if you ever walk away.",
  },
];

export default function Values({
  values = VALUES,
  eyebrow = "How we work",
  heading = "Four things we don't bend on",
}) {
  const rootRef = React.useRef(null);

  useIso(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.head} > *`, {
        scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(`.${styles.card}`, {
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 82%", once: true },
        y: 48,
        opacity: 0,
        scale: 0.97,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* cursor-follow spotlight */
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className={styles.section} ref={rootRef}>
      <span className={styles.mesh} aria-hidden="true" />
      <span className={styles.orb} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>
        </header>

        <div className={styles.grid}>
          {values.map(({ n, Icon, title, body }) => (
            <article key={n} className={styles.card} onMouseMove={onMove}>
              <span className={styles.spot} aria-hidden="true" />
              <div className={styles.cardTop}>
                <span className={styles.iconWrap}>
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className={styles.num}>{n}</span>
              </div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}