"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import styles from "../css/Footer.module.css";

const EXPLORE = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const SERVICES = [
  { name: "App Development", href: "/services/app-development" },
  { name: "Website & Software", href: "/services/web-development" },
  { name: "AI & Automation", href: "/services/ai-automation" },
  { name: "Social Media", href: "/services/social-media" },
  { name: "Branding", href: "/services/branding" },
  { name: "Video Editing", href: "/services/video-editing" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          {/* BRAND */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              <Image
                src="/logo1.png"
                alt="CreatorMonk"
                width={64}
                height={64}
                className={styles.brandLogo}
              />
              <span className={styles.brandName}>CreatorMonk</span>
            </Link>
            <p className={styles.tagline}>
              We design, build and automate — websites, apps, AI and content
              that help your brand grow online.
            </p>
            <SocialLinks variant="footer" />
          </div>

          {/* SERVICES */}
          <div className={styles.col}>
            <h4 className={styles.label}>Services</h4>
            <nav className={styles.navStack}>
              {SERVICES.map((item) => (
                <Link key={item.name} href={item.href} className={styles.link}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* EXPLORE */}
          <div className={styles.col}>
            <h4 className={styles.label}>Explore</h4>
            <nav className={styles.navStack}>
              {EXPLORE.map((item) => (
                <Link key={item.name} href={item.href} className={styles.link}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div className={styles.col}>
            <h4 className={styles.label}>Get in touch</h4>
            <address className={styles.address}>
              <MapPin size={15} strokeWidth={2.2} className={styles.pin} />
              <span>
                8C, Galaxy Blue Sapphire,
                <br />
                Sec 16B, Greater Noida,
                <br />
                Uttar Pradesh 201309
              </span>
            </address>
            <div className={styles.contactStack}>
              <a href="tel:+917827332337" className={styles.contactLink}>
                <Phone size={14} strokeWidth={2.2} />
                <span>+91 78273 32337</span>
                <ArrowUpRight size={14} className={styles.upright} />
              </a>
              <a href="tel:+917004671676" className={styles.contactLink}>
                <Phone size={14} strokeWidth={2.2} />
                <span>+91 70046 71676</span>
                <ArrowUpRight size={14} className={styles.upright} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.legal}>
            <span>© {new Date().getFullYear()} CreatorMonk Studio</span>
            <span className={styles.dot} />
            <span>Greater Noida · India</span>
          </div>
          <div className={styles.status}>
            <span className={styles.pulse} />
            Available for projects
          </div>
        </div>
      </div>

      {/* BIG WATERMARK */}
      <div className={styles.watermark} aria-hidden>
        CREATORMONK
      </div>
    </footer>
  );
}