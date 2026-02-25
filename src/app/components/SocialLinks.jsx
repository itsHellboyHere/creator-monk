"use client";
import styles from "@/app/css/SocialLinks.module.css";
import { FiInstagram, FiTwitter, FiFacebook ,} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const socials = [
  { name: "Instagram", icon: FiInstagram, href: "https://www.instagram.com/creatormonk.in?igsh=b200cHBmYzNlOHVq" },
  // { name: "Twitter", icon: FiTwitter, href: "#" },
  { name: "Facebook", icon: FiFacebook, href: "https://www.facebook.com/share/171GX42oU9" },
  { name: "WhatsApp", icon: FaWhatsapp, href: "https://wa.me/7004671676?text=Hi%20Creator%20Monk",},
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