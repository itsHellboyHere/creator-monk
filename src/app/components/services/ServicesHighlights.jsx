"use client"

import styles from "@/app/css/ServicesHighlights.module.css"

import { FiBarChart2, FiTrendingUp, FiDollarSign } from "react-icons/fi";

const services = [
    {
        title: "Content Strategy",
        icon: FiBarChart2,
        desc: "Plan content that grows reach and consistency."
    },
    {
        title: "Personal Brand Growth",
        icon: FiTrendingUp,
        desc: "Build authority and audience trust."
    },
    {
        title: "Monetization Guidance",
        icon: FiDollarSign,
        desc: "Turn content into sustainable income."
    }
];

export default function ServicesHighlights() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {services.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.title}
                            className={styles.card}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            <div className={styles.icon}>
                                <Icon size={32} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}