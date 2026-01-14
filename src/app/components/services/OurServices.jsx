"use client"
import styles from "@/app/css/OurServices.module.css"
import Image from "next/image"

export default function OurServices() {
  return (
    <section className={styles.servicesHero}>
      <div className={styles.inner}>

        {/* LEFT */}
        <div className={styles.text}>
          <p className={styles.kicker}>Our Services</p>
          <h1>
            What We Offer to Help
            <br />
            <span>Creators Grow</span>
          </h1>
          <p className={styles.desc}>
            We help creators build powerful personal brands,
            grow audiences, and turn content into income.
          </p>
        </div>

        {/* RIGHT */}
        <div className={styles.visual}>
          <div className={styles.imageMock}>
            <Image
              src="/our-services-v2.png"
              alt="Our services illustration"
              fill
              priority
              className={styles.heroImage}
            />
          </div>
        </div>

      </div>
    </section>
  )
}