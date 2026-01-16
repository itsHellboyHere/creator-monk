"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/app/css/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };


    if (pathname !== "/") {
      setScrolled(true);
    } else {
      window.addEventListener("scroll", onScroll);
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navInner}>
        <h2 className={styles.logo}>
          <span className={styles.monk}>
            <Image
              src="/logo.jpeg"
              alt="Creator Monk Logo"
              width={32}
              height={32}
              priority
            />
          </span>
          <span className={styles.text}>
            Creator<span className={styles.gradient}>Monk</span>
          </span>
        </h2>

        {/* Desktop links */}
        <ul className={styles.links}>
          {links.map((link) => (
            <li
              key={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ""
                }`}
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className={styles.menuBtn}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={styles.mobileMenu}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ""
                }`}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}