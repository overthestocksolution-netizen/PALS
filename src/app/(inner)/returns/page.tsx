import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const STEPS = [
  { num: '01', title: 'Request a Return', body: 'Go to My Orders in your account and click "Request Return" within 7 days of receiving your item.' },
  { num: '02', title: 'Pack Your Item',    body: 'Pack the item securely in its original packaging (if available) with all tags still attached.' },
  { num: '03', title: 'Ship It Back',      body: 'Drop off at any TCS or Leopard courier point. Use the return label we email you — shipping is free.' },
  { num: '04', title: 'Get Refunded',      body: 'Once we receive and inspect the item, your refund is issued within 3–5 business days.' },
];

const POLICY = [
  { title: 'Eligible Items',    body: 'Unused, unworn items with original tags attached. Must be returned within 7 days of delivery.' },
  { title: 'Non-Returnable',    body: 'Underwear, swimwear, earrings, customised items, and Sale items marked "Final Sale".' },
  { title: 'Refund Method',     body: 'Refunds go back to your original payment method. JazzCash/EasyPaisa refunds take 1–2 days; card refunds 3–5 days.' },
  { title: 'Damaged Items',     body: 'If your item arrives damaged, contact us within 24 hours with photos and we will resolve it immediately.' },
];

export default function ReturnsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Policies</p>
        <h1 className={styles.title}>Returns &<em> Refunds</em></h1>
        <p className={styles.subtitle}>Easy, free returns within 7 days — no questions asked on eligible items.</p>
      </div>

      <div className={styles.content}>
        <section className={styles.stepsSection}>
          <h2 className={styles.sectionTitle}>How Returns Work</h2>
          <div className={styles.steps}>
            {STEPS.map((s) => (
              <div key={s.num} className={styles.step}>
                <span className={styles.stepNum}>{s.num}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.policySection}>
          <h2 className={styles.sectionTitle}>Return Policy</h2>
          <div className={styles.policyGrid}>
            {POLICY.map((p) => (
              <div key={p.title} className={styles.policyCard}>
                <h3 className={styles.policyTitle}>{p.title}</h3>
                <p className={styles.policyBody}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.cta}>
          <p>Need help with a return?</p>
          <Link href="/contact" className={styles.ctaBtn}>Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
