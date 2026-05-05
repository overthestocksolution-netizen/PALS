import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = { title: 'How to Buy — PALS' };

const STEPS = [
  {
    number: '01',
    title: 'Browse & Discover',
    body: 'Explore thousands of preloved and new pieces from verified sellers. Filter by category, brand, size, price, and condition to find exactly what you\'re looking for.',
    img: '/assets/Pals%20imgs/clark-street-mercantile-qnKhZJPKFD8-unsplash.jpg',
  },
  {
    number: '02',
    title: 'Choose Your Size',
    body: 'Each listing includes detailed size information and fit notes. When in doubt, check the seller\'s measurements or send them a message before purchasing.',
    img: '/assets/Pals%20imgs/tobias-tullius-Fg15LdqpWrs-unsplash.jpg',
  },
  {
    number: '03',
    title: 'Secure Checkout',
    body: 'Pay securely via JazzCash, EasyPaisa, Visa, Mastercard, or Cash on Delivery. All transactions are protected by our buyer guarantee.',
    img: '/assets/Pals%20imgs/mediamodifier-JskqEILt-ds-unsplash.jpg',
  },
  {
    number: '04',
    title: 'Receive & Enjoy',
    body: 'Your item is shipped directly to you. Track your order in real time. If anything is wrong, our buyer protection has you covered — no questions asked.',
    img: '/assets/Pals%20imgs/toa-heftiba-KQ1n6HzSahY-unsplash.jpg',
  },
];

export default function HowToBuyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>BUYER GUIDE</p>
          <h1 className={styles.heroTitle}>How to Buy<br /><em>on PALS.</em></h1>
          <p className={styles.heroSub}>
            Four simple steps to your next favourite piece.
          </p>
          <Link href="/shop" className={styles.heroCta}>Start Browsing →</Link>
        </div>
      </div>

      <div className={styles.stepsSection}>
        <div className={styles.stepsInner}>
          {STEPS.map((step, i) => (
            <div key={step.number} className={`${styles.step} ${i % 2 === 1 ? styles.stepReverse : ''}`}>
              <div className={styles.stepMedia}>
                <Image
                  src={step.img}
                  alt={step.title}
                  width={600}
                  height={700}
                  className={styles.stepImage}
                />
                <div className={styles.stepNumber}>{step.number}</div>
              </div>
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>{step.title}</h2>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.guarantee}>
        <div className={styles.guaranteeInner}>
          <p className={styles.eyebrow}>BUYER PROTECTION</p>
          <h2 className={styles.guaranteeTitle}>Your purchase is protected.</h2>
          <div className={styles.guaranteeGrid}>
            {[
              { icon: '🔒', title: 'Secure Payments', text: 'All transactions encrypted end-to-end.' },
              { icon: '📦', title: 'Order Tracking', text: 'Real-time updates from dispatch to door.' },
              { icon: '↩️', title: 'Easy Returns', text: '7-day return window on all eligible items.' },
              { icon: '💬', title: '24/7 Support', text: 'Our team is always here to help.' },
            ].map((item) => (
              <div key={item.title} className={styles.guaranteeCard}>
                <span className={styles.guaranteeIcon}>{item.icon}</span>
                <h3 className={styles.guaranteeCardTitle}>{item.title}</h3>
                <p className={styles.guaranteeCardText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
