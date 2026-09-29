import styles from './legal.module.css';
import { STUDIO_LEGAL } from '../_content/company';

/** toc item: { id: 'section-anchor', label: 'Shown in contents' } */

/** Shared frame for Studio legal pages: hero · sticky contents · document card. */
export default function LegalShell({
  eyebrow,
  title,
  lead,
  toc,
  children,
}) {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.hero}>
          <span className={styles.badge}>
            <span className={styles.dot} aria-hidden />
            {STUDIO_LEGAL.product}
          </span>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className="lead">{lead}</p>
          <p className={styles.meta}>Last updated: {STUDIO_LEGAL.lastUpdated}</p>
        </header>

        <div className={styles.layout}>
          <nav className={styles.toc} aria-label="On this page">
            <p className={styles.tocLabel}>On this page</p>
            <ol>
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>{t.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <article className={styles.doc}>{children}</article>
        </div>
      </div>
    </main>
  );
}

/** One section of the document (anchor = id, used by the contents list). */
export function Section({ id, title, children }) {
  return (
    <section id={id} className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export { styles as legalStyles };