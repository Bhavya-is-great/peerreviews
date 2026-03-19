import styles from "./AuthShell.module.css";

export default function AuthShell({ badge, title, description, children }) {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop} />
      <section className={styles.shell}>
        <div className={styles.header}>
          <span className={styles.badge}>{badge}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.content}>{children}</div>
      </section>
    </main>
  );
}
