import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = { title: 'How to Sell — PALS' };

const STEPS = [
  {
    number: '01',
    title: 'Create Your Account',
    body: 'Sign up for free in under two minutes. No subscription fees — you only pay when you make a sale. Set up your seller profile to build trust with buyers.',
    img: '/assets/Pals%20imgs/sincerely-media-9ShY-Tq70Mc-unsplash.jpg',
  },
  {
    number: '02',
    title: 'List Your Item',
    body: 'Upload up to 8 photos, write a clear description, set your price, and select size, condition, and category. Sharp photos sell faster — good lighting is everything.',
    img: '/assets/Pals%20imgs/charlesdeluvio-_4K7BwaHUGc-unsplash.jpg',
  },
  {
    number: '03',
    title: 'Get Discovered',
    body: 'Your listing goes live instantly. PALS promotes quality listings across the platform. Share your listing on social media to get extra reach.',
    img: '/assets/Pals%20imgs/alyssa-strohmann-TS--uNw-JqE-unsplash.jpg',
  },
  {
    number: '04',
    title: 'Sell & Get Paid',
    body: 'When your item sells, we notify you immediately. Ship within 2 business days. Once delivery is confirmed, your payout minus 10% PALS fee is sent to your account.',
    img: '/assets/Pals%20imgs/mediamodifier-7cERndkOyDw-unsplash.jpg',
  },
];

const TIPS = [
  'Use natural light — avoid harsh shadows or flash',
  'Shoot on a plain white or grey background',
  'Include front, back, label, and detail shots',
  'Be honest about condition — builds trust and reviews',
  'Price competitively by checking similar listings',
  'Respond to buyer messages within 24 hours',
];

export default function HowToSellPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.eyebrow}>SELLER GUIDE</p>
          <h1 className={styles.heroTitle}>Start selling<br /><em>on PALS.</em></h1>
          <p className={styles.heroSub}>
            Turn your wardrobe into income. No monthly fees. 10% on sales only.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/sell" className={styles.heroCtaPrimary}>List an Item →</Link>
            <Link href="/register" className={styles.heroCtaSecondary}>Create Account</Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <p className={styles.statValue}>10%</p>
              <p className={styles.statLabel}>Service fee</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statValue}>24hr</p>
              <p className={styles.statLabel}>Avg. listing live</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statValue}>Free</p>
              <p className={styles.statLabel}>To list</p>
            </div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <Image
            src="/assets/Pals%20imgs/fujiphilm-ojZ4wJNUM5w-unsplash.jpg"
            alt="Sell on PALS"
            width={700}
            height={800}
            className={styles.heroImage}
            priority
          />
        </div>
      </div>

      <div className={styles.stepsSection}>
        <div className={styles.stepsInner}>
          <h2 className={styles.sectionTitle}>Four steps to your first sale</h2>
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
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tipsSection}>
        <div className={styles.tipsInner}>
          <div className={styles.tipsLeft}>
            <p className={styles.eyebrow}>PRO TIPS</p>
            <h2 className={styles.tipsTitle}>Sell faster with these habits.</h2>
            <Link href="/sell" className={styles.tipsCta}>List Your First Item →</Link>
          </div>
          <ul className={styles.tipsList}>
            {TIPS.map((tip, i) => (
              <li key={i} className={styles.tipItem}>
                <span className={styles.tipNum}>0{i + 1}</span>
                <span className={styles.tipText}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
