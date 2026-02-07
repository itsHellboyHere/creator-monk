"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/app/css/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav className={`${styles.nav} ${scrolled || isOpen ? styles.scrolled : ""}`}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          <div className={styles.logoIcon}>
            <Image src="/logo.png" alt="Logo" width={34} height={34} priority />
          </div>
          <span className={styles.logoText}>
            CREATOR<span className={styles.gold}>MONK</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopContainer}>
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className={styles.ctaBtn}>START A PROJECT</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`${styles.menuBtn} ${isOpen ? styles.menuOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <div className={styles.hamburger} />
        </button>
      </div>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={styles.mobileOverlay}
          >
            <div className={styles.mobileContent}>
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    href={link.href}
                    className={`${styles.mobileNavLink} ${pathname === link.href ? styles.activeMobile : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/contact" className={styles.mobileCta} onClick={() => setIsOpen(false)}>
                  WORK WITH US
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}