"use client";
import styles from "@/app/css/SocialLinks.module.css";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

const socials = [
  { name: "Instagram", icon: FiInstagram, href: "#" },
  { name: "Twitter", icon: FiTwitter, href: "#" },
  { name: "Facebook", icon: FiFacebook, href: "#" },
];

export default function SocialLinks({ variant = "footer" }) {
  return (
    <ul className={`${styles.wrapper} ${styles[variant]}`}>
      {socials.map(({ name, icon: Icon, href }) => (
        <li key={name}>
          <a
            href={href}
            aria-label={name}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
          >
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}