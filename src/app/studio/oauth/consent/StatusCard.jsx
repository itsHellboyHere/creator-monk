// Loading / redirecting / error states of the consent page.
import styles from './consent.module.css';

export default function StatusCard({ kind, title, text }) {
  return (
    <div className={`${styles.card} ${styles.center}`}>
      {kind === 'loading' ? <span className={styles.spinner} aria-hidden /> : <span className={styles.errIcon}>!</span>}
      <h1 className={styles.title}>{title}</h1>
      {text && <p className={styles.muted}>{text}</p>}
    </div>
  );
}
