"use client";

import styles from "../css/Footer.module.css";
import SocialLinks from "../components/SocialLinks"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        
        {/* BRAND */}
        <div className={styles.brand}>
          <h3>
            Creator<span>Monk</span>
          </h3>
          <p>
            Helping creators grow, collaborate, and monetize
            with clarity and strategy.
          </p>
        </div>

        {/* LINKS */}
        <div className={styles.links}>
          <h4>Explore</h4>
          <ul>
            <li>Home</li>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* SOCIALS */}
        <div className={styles.social}>
          <h4>Connect</h4>
          <SocialLinks variant="footer" />
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} CreatorMonk. All rights reserved.</p>
      </div>
    </footer>
  );
}