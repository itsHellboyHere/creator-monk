"use client";

import styles from "../css/Footer.module.css";
import SocialLinks from "../components/SocialLinks";
import Link from "next/link";

const links_items = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Cinematic Blueprint Layer */}
      <div className={styles.gridOverlay} />
      
      <div className={styles.container}>
        <div className={styles.inner}>

          {/* BRAND - Perfectly left-aligned with Navbar Logo */}
          <div className={styles.brand}>
            <h3 className={styles.logo}>
              CREATOR<span>MONK</span>
            </h3>
            <p className={styles.tagline}>
              Helping creators grow, collaborate, and monetize
              with clarity and strategy.
            </p>
          </div>

          {/* EXPLORE - Aligned with Navbar Links */}
          <div className={styles.links}>
            <h4 className={styles.sectionHeading}>Explore</h4>
            <ul className={styles.list}>
              {links_items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={styles.footerLink}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIALS - Aligned with Navbar CTA area */}
          <div className={styles.social}>
            <h4 className={styles.sectionHeading}>Connect</h4>
            <SocialLinks variant="footer" />
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.divider} />
          <div className={styles.bottomContent}>
            <p>© {new Date().getFullYear()} CreatorMonk. All rights reserved.</p>
            <div className={styles.location}>BOKARO • INDIA</div>
          </div>
        </div>
      </div>

      {/* MASSIVE BACKGROUND TEXT - Hiding behind like "Sansthan" */}
      <div className={styles.bgWatermark}>CREATORMONK</div>
    </footer>
  );
}