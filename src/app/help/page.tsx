import Link from 'next/link';
import styles from './page.module.css';

export const metadata = { title: 'Help Centre — PALS' };

const FAQS = [
  {
    q: 'How do I track my order?',
    a: "After your order is confirmed, you will receive an email with a tracking number. You can use this to track your parcel on our courier partner's website.",
  },
  {
    q: 'What is the return policy?',
    a: 'We accept returns within 7 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 3–5 business days within Pakistan. Express delivery (1–2 days) is available for major cities.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Yes. PALS uses industry-standard encryption. We accept JazzCash, EasyPaisa, Visa, Mastercard, and Cash on Delivery.',
  },
  {
    q: 'Can I sell on PALS?',
    a: 'Absolutely. Create an account, go to Sell, and list your item. PALS charges a 10% service fee on successful sales.',
  },
  {
    q: 'How do I contact a seller?',
    a: 'You can message sellers directly from their product listing page. Go to the item, tap "Ask Seller", and send your message.',
  },
];

export default function HelpPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>SUPPORT</p>
          <h1 className={styles.heroTitle}>How can we help?</h1>
          <p className={styles.heroSub}>Find answers to common questions or reach out to our team.</p>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.quickLinks}>
          {[
            { label: 'How to Buy', href: '/how-to-buy', icon: '🛍️' },
            { label: 'How to Sell', href: '/how-to-sell', icon: '🏷️' },
            { label: 'Contact Us', href: '/contact', icon: '✉️' },
            { label: 'Returns', href: '/contact', icon: '↩️' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className={styles.quickCard}>
              <span className={styles.quickIcon}>{link.icon}</span>
              <span className={styles.quickLabel}>{link.label}</span>
              <span className={styles.quickArrow}>→</span>
            </Link>
          ))}
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {FAQS.map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{item.q}</h3>
                <p className={styles.faqA}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.contactBanner}>
          <div>
            <h2 className={styles.contactTitle}>Still need help?</h2>
            <p className={styles.contactText}>Our team typically responds within 24 hours.</p>
          </div>
          <Link href="/contact" className={styles.contactBtn}>Contact Support →</Link>
        </div>
      </div>
    </div>
  );
}
