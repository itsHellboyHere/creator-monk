import styles from "../css/Hero.module.css";
import CTAButton from "../components/CTAButton"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Creator <span>Monks</span>
      </h1>

      <p className={styles.subtitle}>
        We help creators turn ideas into polished content,
        strong brands, and meaningful growth.
      </p>

      <div className={styles.cta}>
        <CTAButton />
      </div>
    </section>
  );
}