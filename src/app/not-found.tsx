import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>404 - PAGE NOT FOUND</p>
        <h1 className={styles.title}>Oops.</h1>
        <p className={styles.description}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={`btn-pals-primary ${styles.button}`}>GO HOME -&gt;</Link>
          <Link href="/shop" className={`btn-pals-outline ${styles.button}`}>BROWSE SHOP</Link>
        </div>
      </div>

      <p className={styles.backgroundText}>404</p>
    </div>
  );
}
