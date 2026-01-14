"use client";

import styles from "../css/WhyCreatorMonk.module.css"
import { useEffect, useRef } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function WhyCreatorMonk() {
  const innerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.inView);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (innerRef.current) observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, []);

  // subtle parallax for image
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const offset = Math.min(Math.max(rect.top * 0.08, -24), 24);

      imageRef.current.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.section}>
      <div ref={innerRef} className={styles.inner}>
        {/* CONTENT */}
        <div className={styles.content}>
          <h2>What We Offer</h2>

          <p>
            Built to help creators grow together — with clarity,
            collaboration, and real opportunities.
          </p>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.iconCircle}>
                <FiCheckCircle size={20} />
              </div>
              <span>Creator growth strategy</span>
            </li>
            <li className={styles.listItem}>
              <div className={styles.iconCircle}>
                <FiCheckCircle size={20} />
              </div>
              <span>Content ideas & collaborations</span>
            </li>
            <li className={styles.listItem}>
              <div className={styles.iconCircle}>
                <FiCheckCircle size={20} />
              </div>
              <span>Monetization & referral opportunities</span>
            </li>
          </ul>
        </div>

        {/* IMAGE */}
        <div ref={imageRef} className={styles.imageWrap}>
          <img src="/monk.jpeg" alt="Creator Monk offerings" />
        </div>
      </div>
    </section>
  );
}