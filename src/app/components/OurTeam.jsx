"use client";

import styles from "@/app/css/OurTeam.module.css";

const team = [
  
  {
    name: "Rohan Sinha",
    role: "Marketing Head",
    image: "/team/rohan.jpg",
  },
  {
    name: "Vishal Kumar",
    role: "Technical Head",
    image: "/team/vishal.jpg", 
  },
  {
    name: "Kundan ",
    role: "Operations Head",
    image: "/team/kundan.jpg",
  },
];

export default function OurTeam() {
  return (
    <section className={styles.teamSection}>
      <div className={styles.teamContainer}>
        <h2 className={styles.heading}>
          Our <span>Founders</span>
        </h2>

        <div className={styles.teamGrid}>
          {team.map((member) => (
            <div
              key={member.name}
              className={styles.teamCard}
              style={{ backgroundImage: `url(${member.image})` }}
            >
              <div className={styles.overlay}></div>

              <div className={styles.info}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}