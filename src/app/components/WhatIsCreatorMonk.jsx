import styles from "@/app/css/WhatIsCreatorMonk.module.css";

export default function WhatIsCreatorMonk() {
  return (
    <section className={styles.section}>
      {/* background image */}
      <div className={styles.bg} />

      {/* sticky pull-up content */}
      <div className={styles.stickyWrap}>
        <div className={styles.content}>
          <h2 className={styles.title}>What is Creator Monk?</h2>

          <p className={styles.text}>
            Creator Monk is a community-driven platform built for creators
            who want to grow with clarity and consistency.
          </p>

          <p className={styles.subtext}>
            We help creators build strong personal brands, create better
            content, and unlock real monetization opportunities — together.
          </p>
        </div>
      </div>
    </section>
  );
}