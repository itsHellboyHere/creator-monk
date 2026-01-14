"use client";

import styles from "../css/CreatorRefferal.module.css"
import { FiUsers, FiGift, FiTrendingUp } from "react-icons/fi";

export default function CreatorReferral() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* CONTENT */}
        <div className={styles.content}>
          <h2>Creator Referral Program</h2>

          <p className={styles.intro}>
            At Creator Monk, creators grow by helping other creators.
          </p>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.iconCircle}>
                <FiUsers size={20} />
              </div>
              <span>Invite creators into a trusted community</span>
            </li>
            <li className={styles.listItem}>
              <div className={styles.iconCircle}>
                <FiGift size={20} />
              </div>
              <span>Unlock rewards and exclusive opportunities</span>
            </li>
            <li className={styles.listItem}>
              <div className={styles.iconCircle}>
                <FiTrendingUp size={20} />
              </div>
              <span>Grow together through long-term collaborations</span>
            </li>
          </ul>
        </div>

        {/* VISUAL - Original Styles Kept */}
        <div className={styles.card}>
          <p className={styles.cardStep}>Invite → Collaborate → Grow</p>
          <p className={styles.cardSub}>
            Your network becomes your advantage.
          </p>
        </div>
      </div>
    </section>
  );
}