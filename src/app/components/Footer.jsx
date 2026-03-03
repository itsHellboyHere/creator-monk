"use client";

import styles from "../css/Footer.module.css";
import SocialLinks from "../components/SocialLinks";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

const links_items = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          
          {/* BRAND SECTION */}
          <div className={styles.brandCol}>
            <div className={styles.logoFrame}>
              <Image 
                src="/logo1.png" 
                alt="CreatorMonk" 
                width={100} 
                height={100} 
                className={styles.brandLogo}
              />
            </div>
            <p className={styles.tagline}>
              Engineering digital presence for the modern creator economy through strategy and cinematic execution.
            </p>
            <SocialLinks variant="footer" />
          </div>

          {/* CONTACT SECTION - NOIDA HQ */}
          <div className={styles.infoCol}>
            <h4 className={styles.label}>Get In Touch</h4>
            <div className={styles.addressBox}>
              <p><FiMapPin className={styles.icon} /> 8C, Galaxy Blue Sapphire</p>
              <p>Sec 16B, Greater Noida</p>
              <p>Uttar Pradesh 201309</p>
            </div>
            <div className={styles.contactLinks}>
                <a href="tel:+917827332337" className={styles.phoneLink}>
                +91 78273 32337 <FiArrowUpRight />
              </a>
              <a href="tel:+917004671676" className={styles.phoneLink}>
                +91 70046 71676 <FiArrowUpRight />
              </a>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className={styles.infoCol}>
            <h4 className={styles.label}>Explore</h4>
            <nav className={styles.navStack}>
              {links_items.map((item) => (
                <Link key={item.name} href={item.href} className={styles.footerLink}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.legal}>
            <span>© {new Date().getFullYear()} CREATORMONK STUDIO</span>
            <span className={styles.dot}></span>
            <span>NOIDA • INDIA</span>
          </div>
          <div className={styles.status}>
            <span className={styles.pulse}></span> AVAILABLE FOR PROJECTS
          </div>
        </div>
      </div>

      {/* MASSIVE BOTTOM WATERMARK - Heavy Visibility */}
      <div className={styles.bigTextContainer}>
        <div className={styles.watermarkWord}>CREATOR</div>
        <div className={styles.watermarkWord}>MONK</div>
      </div>
    </footer>
  );
}