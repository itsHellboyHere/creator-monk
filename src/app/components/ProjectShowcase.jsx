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
    link: "https://theunidecor.com",
    tech: ["Next.js", "Framer Motion", "CMS", "Sanity","Dynamic Search"],
    hindi: "सुंदरता"
  },
  {
    name: "Navya Nirman",
    type: "Industrial Paint & Waterproofing",
    status: "LIVE & KICKING",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770456445/Image_07-02-26_at_2.54_PM_vny1fs.jpg",
    link: "https://navyyanirman.com",
    tech: ["SEO Engine", "React", "Cloud Storage"],
    hindi: "निर्माण"
  },
  {
    name: "Hexalam",
    type: "Digital Laminate Catalog",
    status: "BETA LAUNCH",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770456446/Image_07-02-26_at_2.55_PM_fh47xf.jpg",
    link: "https://hexalam.com",
    tech: ["Nextjs Routing", "Product API", "Module CSS","Aesthic 3D"],
    hindi: "विविधता"
  }
];

export default function ProjectShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={styles.badge}
          >
            MONK STUDIO • LAUNCH LOG
          </motion.span>
          <h2 className={styles.title}>
            PROVEN <span className={styles.gold}>SYSTEMS.</span>
          </h2>
        </header>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.div 
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`${styles.projectCard} ${i % 2 !== 0 ? styles.reverse : ""}`}
            >
              {/* Image Section */}
              <div className={styles.visualArea}>
                <div className={styles.imgWrap}>
                  <img src={project.image} alt={project.name} />
                  <div className={styles.vignette} />
                </div>
                <div className={styles.statusBadge}>{project.status}</div>
                <span className={styles.cardHindi}>{project.hindi}</span>
              </div>

              {/* Text Section */}
              <div className={styles.contentArea}>
                <div className={styles.meta}>
                  <span className={styles.type}>{project.type}</span>
                  <div className={styles.techStack}>
                    {project.tech.map(t => <span key={t}>// {t}</span>)}
                  </div>
                </div>
                <h3 className={styles.projectName}>{project.name}</h3>
                <Link href={project.link} className={styles.launchBtn} target="_blank">
                  VIEW LIVE MISSION <span>↗</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Massive "STUDIO" Watermark - Fixed to bottom */}
      <div className={styles.bgWatermark}>STUDIO</div>
    </section>
  );
}