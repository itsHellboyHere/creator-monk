"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/app/css/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { 
    name: "Services", 
    href: "/services",
    subLinks: [
      { name: "SOCIAL_OS", href: "/services/social-os", tag: "REACH" },
      { name: "SOFT_OS", href: "/services/soft-os", tag: "CORE" },
      { name: "FILM_OS", href: "/services/film-os", tag: "LENS" },
    ]
  },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSub, setActiveSub] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className={`${styles.nav} ${scrolled || isOpen ? styles.scrolled : ""}`}>
      <div className={styles.navInner}>
<Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
  <Image 
    src="/logo1.png" 
    alt="CreatorMonk Logo" 
    width={70} // Adjusted for better scale
    height={70} 
    priority 
    className={styles.logoImg}
  />
  <span className={styles.logoText}>
    CREATOR<span className={styles.gold}>MONK</span>
  </span>
</Link>

        {/* DESKTOP NAV */}
        <div className={styles.desktopContainer}>
          <ul className={styles.links}>
            {links.map((link) => {
              const parentActive =
                isActive(link.href) ||
                link.subLinks?.some((sub) => isActive(sub.href));

              return (
                <li
                  key={link.href}
                  className={styles.navLi}
                  onMouseEnter={() => link.subLinks && setActiveSub(true)}
                  onMouseLeave={() => setActiveSub(false)}
                >
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${parentActive ? styles.active : ""}`}
                  >
                    {link.name}
                  </Link>

                  {/* DROPDOWN */}
                  {link.subLinks && (
                    <AnimatePresence>
                      {activeSub && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={styles.dropdown}
                        >
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`${styles.subLink} ${
                                isActive(sub.href) ? styles.subActive : ""
                              }`}
                            >
                              <span className={styles.subTag}>{sub.tag}</span>
                              <span className={styles.subName}>{sub.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>

          <Link href="/contact" className={styles.ctaBtn}>
            START A PROJECT
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className={`${styles.menuBtn} ${isOpen ? styles.menuOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.hamburger} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className={styles.mobileOverlay}
          >
            <div className={styles.mobileContent}>
              {links.map((link) => (
                <div key={link.href} className={styles.mobileItemWrap}>
                  <Link
                    href={link.href}
                    className={`${styles.mobileNavLink} ${
                      isActive(link.href) ? styles.activeMobile : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>

                  {link.subLinks && (
                    <div className={styles.mobileSubGroup}>
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`${styles.mobileSubLink} ${
                            isActive(sub.href) ? styles.mobileSubActive : ""
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/contact"
                className={styles.mobileCta}
                onClick={() => setIsOpen(false)}
              >
                WORK WITH US
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}