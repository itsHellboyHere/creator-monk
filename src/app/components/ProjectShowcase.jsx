"use client";
import { motion } from "framer-motion";
import styles from "@/app/css/ProjectShowcase.module.css";
import Link from "next/link";

const projects = [
  {
    name: "Unidecor",
    type: "Interior Design Platform",
    status: "MISSION: SUCCESS",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770456446/Image_07-02-26_at_2.54_PM_1_fkgkwi.jpg", 
    link: "https://unidecor.in", // Temporary placeholder
    tech: ["Next.js", "Framer Motion", "CMS","Sanity"]
  },
  {
    name: "Navya Nirman",
    type: "Industrial Paint & Waterproofing",
    status: "LIVE & KICKING",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770456445/Image_07-02-26_at_2.54_PM_vny1fs.jpg",
    link: "https://navyanirman.com", // Temporary placeholder
    tech: ["SEO Engine", "React", "Cloud Storage"]
  },
  {
    name: "Hexalam",
    type: "Digital Laminate Catalog",
    status: "BETA LAUNCH",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770456446/Image_07-02-26_at_2.55_PM_fh47xf.jpg",
    link: "https://hexalam.com", // Temporary placeholder
    tech: ["Dynamic Search", "Product API", "Tailwind"]
  }
];

export default function ProjectShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <span className={styles.badge}>MONK STUDIO • LAUNCH LOG</span>
            <h2 className={styles.title}>PROVEN <span className={styles.gold}>SYSTEMS.</span></h2>
          </header>

          <div className={styles.grid}>
            {projects.map((project, i) => (
              <motion.div 
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={styles.projectCard}
              >
                <div className={styles.visualArea}>
                  <div className={styles.imgWrap}>
                    <img src={project.image} alt={project.name} />
                  </div>
                  <div className={styles.statusBadge}>{project.status}</div>
                </div>

                <div className={styles.contentArea}>
                  <div className={styles.meta}>
                    <span className={styles.type}>{project.type}</span>
                    <div className={styles.techStack}>
                      {project.tech.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <Link href={project.link} className={styles.launchBtn} target="_blank">
                    VISIT SITE <span>↗</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bgWatermark}>STUDIO</div>
    </section>
  );
}