"use client";
import { motion } from "framer-motion";
import styles from "@/app/css/OurTeam.module.css";

const team = [
  {
    name: "Rohan Sinha",
    role: "Marketing Head",
    image: "/team/rohan.jpg",
    dialogue: "Market ka Raja",
  },
  {
    name: "Vishal Kumar",
    role: "Technical Head",
    image: "/team/vishal.jpg",
    dialogue: "Asli Power",
  },
  {
    name: "Kundan",
    role: "Operations Head",
    image: "/team/kundan.jpg",
    dialogue: "System ka Khiladi",
  },
];

export default function OurTeam() {
  return (
    <section className={styles.teamSection}>
      <div className={styles.gridOverlay} />
      
      <div className={styles.teamContainer}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.badge}>THE MONKS BEHIND THE SCENES</span>
          <h2 className={styles.heading}>
            MEET THE <span>FOUNDERS</span>
          </h2>
        </motion.div>

        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={styles.teamCard}
            >
              {/* Hindi Watermark Moved to Background Layer */}
              <span className={styles.hindiWatermark}>संस्थापक</span>

              <div 
                className={styles.cardImg} 
                style={{ backgroundImage: `url(${member.image})` }} 
              />
              <div className={styles.vignette} />
              
              <div className={styles.cardContent}>
                <span className={styles.dialogue}>{member.dialogue}</span>
                <div className={styles.nameBlock}>
                  <h3>{member.name}</h3>
                  <div className={styles.roleTag}>{member.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}