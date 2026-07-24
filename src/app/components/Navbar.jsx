"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Smartphone,
  Globe,
  Bot,
  TrendingUp,
  Palette,
  Video,
  ArrowRight,
} from "lucide-react";
import styles from "@/app/css/Navbar.module.css";

const SERVICES = [
  { name: "App Development", href: "/services/app-development", desc: "iOS & Android apps.", icon: Smartphone },
  { name: "Website & Software", href: "/services/web-development", desc: "Fast, modern sites & platforms.", icon: Globe },
  { name: "AI & Automation", href: "/services/ai-automation", desc: "Agents & workflows that save hours.", icon: Bot },
  { name: "Social Media", href: "/services/social-media", desc: "Content & growth, fully managed.", icon: TrendingUp },
  { name: "Branding", href: "/services/branding", desc: "Identity, logo & visual systems.", icon: Palette },
  { name: "Video Editing", href: "/services/video-editing", desc: "Scroll-stopping edits & reels.", icon: Video },
];

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", dropdown: true },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile cover
  const [servicesOpen, setServicesOpen] = useState(false); // desktop dropdown

  const closeTimer = useRef(null);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const closeMenu = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 250);
  };

  useMotionValueEvent(scrollY, "change", (curr) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(curr > 20);
    if (curr < 80 || curr < prev) {
      setVisible(true);
    } else {
      setVisible(false);
      setServicesOpen(false);
    }
  });

  // lock body scroll when mobile cover is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // clean up close timer on unmount
  useEffect(() => {
    return () => clearTimeout(closeTimer.current);
  }, []);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: visible || open ? 0 : -120,
        opacity: visible || open ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={styles.wrap}
    >
      <nav className={`${styles.pill} ${scrolled ? styles.solid : ""}`}>
        {/* Brand */}
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <Image
            src="/logo1.png"
            alt="CreatorMonk"
            width={50}
            height={50}
            priority
            className={styles.logoImg}
          />
          <span className={styles.brandText}>CreatorMonk</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <li
                key={item.href}
                className={styles.hasDropdown}
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              >
                <Link
                  href={item.href}
                  className={`${styles.link} ${isActive(item.href) ? styles.active : ""}`}
                >
                  {item.name}
                  <ChevronDown size={14} className={styles.chev} />
                </Link>

                {/* static positioner — framer never touches this */}
                <div
                  className={styles.dropAnchor}
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                >
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        className={styles.dropdown}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span className={styles.dropLabel}>What we do</span>

                        <div className={styles.dropGrid}>
                          {SERVICES.map((s) => {
                            const Icon = s.icon;
                            return (
                              <Link
                                key={s.href}
                                href={s.href}
                                className={`${styles.dropItem} ${isActive(s.href) ? styles.dropActive : ""}`}
                                onClick={() => setServicesOpen(false)}
                              >
                                <span className={styles.dropIcon}>
                                  <Icon size={18} strokeWidth={2.1} />
                                </span>
                                <span className={styles.dropText}>
                                  <span className={styles.dropName}>{s.name}</span>
                                  <span className={styles.dropDesc}>{s.desc}</span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>

                        <Link
                          href="/services"
                          className={styles.dropFooter}
                          onClick={() => setServicesOpen(false)}
                        >
                          <span>See all services</span>
                          <ArrowRight size={15} strokeWidth={2.4} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${isActive(item.href) ? styles.active : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <Link href="/contact" className={styles.cta}>
          Get a quote
        </Link>

        {/* Mobile toggle */}
        <button
          className={styles.burger}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile full-screen cover */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileCover}
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* dedicated close — never depends on the pill */}
            <button
              className={styles.mobileClose}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className={styles.mobileInner}>
              <div className={styles.mobileTop}>
                {NAV_ITEMS.filter((i) => !i.dropdown).map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + idx * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className={`${styles.mLink} ${isActive(item.href) ? styles.mActive : ""}`}
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className={styles.mobileServices}>
                <span className={styles.mLabel}>Services</span>
                {SERVICES.map((s, idx) => (
                  <motion.div
                    key={s.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 + idx * 0.05 }}
                  >
                    <Link
                      href={s.href}
                      className={`${styles.mService} ${isActive(s.href) ? styles.mActive : ""}`}
                      onClick={() => setOpen(false)}
                    >
                      {s.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62 }}
              >
                <Link href="/contact" className={styles.mCta} onClick={() => setOpen(false)}>
               Get a quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}