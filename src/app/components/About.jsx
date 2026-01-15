"use client";

import styles from "@/app/css/About.module.css";

export default function About() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.heroCard}>
          <p>
            CreatorMonk exists to help creators grow
            with clarity, consistency, and intention.
          </p>
          <span>No noise. No shortcuts. Just progress.</span>
        </div>
      </div>
    </section>
  );
}