"use client";

import styles from "@/app/css/About.module.css";
import OurTeam from "./OurTeam";

export default function About() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.stickyWrap}>
          <div className={styles.heroCard}>
            <p>
              CreatorMonk exists to help creators grow
              with clarity, consistency, and intention.
            </p>
            <span>No noise. No shortcuts. Just progress.</span>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.block}>
            <h2>The <span>Problem</span></h2>
            <p>
              Creators today are surrounded by noise.
              Growth feels inconsistent, branding feels unclear,
              and monetization often lacks direction.
            </p>
          </div>

          <div className={styles.block}>
            <h2>Our <span>Approach</span></h2>
            <p>
              CreatorMonk focuses on clarity over chaos.
              We help creators build systems, stay consistent,
              and grow sustainably — together.
            </p>
          </div>

          <div className={styles.block}>
            <h2>Who <span>It’s For</span></h2>
            <p>
              Content creators, indie builders, educators,
              designers, developers, and anyone building
              a meaningful personal brand.
            </p>
          </div>
          <div className={styles.values}>
            <h3>What We Stand For</h3>

            <ul>
              <li>Clarity over noise</li>
              <li>Consistency over intensity</li>
              <li>Community over competition</li>
              <li>Integrity over hype</li>
            </ul>
          </div>
          <p className={styles.closing}>
            CreatorMonk<span> 🧘‍♂️</span> is more than a platform.
            It’s a mindset for creators who want to build with intention.
          </p>
        </div>
       
      </div>
       {/* <OurTeam/> */}
    </section>
  );
}