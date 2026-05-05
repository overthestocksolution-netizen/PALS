import Link from 'next/link';
import styles from './page.module.css';

const IMG_BASE = '/assets/Pals%20imgs';

const DROPS = [
  {
    title: 'The Monochrome Edit',
    date: 'May 2025',
    description: 'A curated capsule of black and white essentials from top Pakistani sellers.',
    img: `${IMG_BASE}/alyssa-strohmann-TS--uNw-JqE-unsplash.jpg`,
    items: 24,
  },
  {
    title: 'Vintage Revisited',
    date: 'April 2025',
    description: 'Rare preloved finds from the 90s and early 2000s - handpicked by our style team.',
    img: `${IMG_BASE}/hannah-morgan-ycVFts5Ma4s-unsplash.jpg`,
    items: 18,
  },
  {
    title: 'The Minimalist',
    date: 'March 2025',
    description: 'Clean lines, neutral palettes. Less is more - and these pieces prove it.',
    img: `${IMG_BASE}/fujiphilm-ojZ4wJNUM5w-unsplash.jpg`,
    items: 31,
  },
];

const EDITORIALS = [
  {
    title: 'How to Style a Preloved Blazer',
    read: '4 min read',
    img: `${IMG_BASE}/mediamodifier-JskqEILt-ds-unsplash.jpg`,
  },
  {
    title: 'The Rise of Quiet Luxury in Pakistan',
    read: '6 min read',
    img: `${IMG_BASE}/caio-coelho-QRN47la37gw-unsplash.jpg`,
  },
  {
    title: '5 Wardrobe Essentials Under Rs.3000',
    read: '3 min read',
    img: `${IMG_BASE}/dmitry-ganin-EhWzbMPQcqQ-unsplash.jpg`,
  },
];

export default function PalsLabPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>PALS LAB</p>
            <h1 className={styles.heroTitle}>Where fashion<br />meets culture.</h1>
            <p className={styles.heroText}>
              PALS Lab is our editorial and curation studio. Exclusive drops, style guides, and the stories behind the clothes.
            </p>
          </div>
          <div className={styles.heroMedia}>
            <img src={`${IMG_BASE}/micheile-henderson-FpPcoOAk5PI-unsplash.jpg`} alt="PALS Lab Studio" className={styles.heroImage} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>CURATED COLLECTIONS</p>
            <h2 className={styles.sectionTitle}>Exclusive Drops</h2>
          </div>
        </div>
        <div className={styles.dropGrid}>
          {DROPS.map((drop) => (
            <div key={drop.title} className={styles.dropCard}>
              <div className={styles.dropMedia}>
                <img src={drop.img} alt={drop.title} className={styles.dropImage} />
                <div className={styles.dropBadge}>{drop.items} ITEMS</div>
              </div>
              <div className={styles.dropBody}>
                <p className={styles.dropDate}>{drop.date}</p>
                <h3 className={styles.dropTitle}>{drop.title}</h3>
                <p className={styles.dropText}>{drop.description}</p>
                <Link href="/shop" className="link-underline">SHOP DROP -&gt;</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.editorialSection}>
        <div className={styles.editorialInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>STYLE STORIES</p>
              <h2 className={styles.editorialTitle}>From the Studio</h2>
            </div>
          </div>
          <div className={styles.editorialGrid}>
            {EDITORIALS.map((editorial) => (
              <div key={editorial.title} className={styles.editorialCard}>
                <div className={styles.editorialMedia}>
                  <img src={editorial.img} alt={editorial.title} className={styles.editorialImage} />
                </div>
                <div className={styles.editorialBody}>
                  <p className={styles.editorialMeta}>{editorial.read}</p>
                  <h3 className={styles.editorialCardTitle}>{editorial.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.ctaBox}>
          <p className={styles.eyebrow}>STAY AHEAD</p>
          <h2 className={styles.ctaTitle}>Be first for every drop.</h2>
          <p className={styles.ctaText}>Subscribe to PALS Lab updates and never miss an exclusive collection.</p>
          <Link href="/#newsletter" className={`btn-pals-primary ${styles.ctaButton}`}>JOIN THE LIST -&gt;</Link>
        </div>
      </section>
    </>
  );
}
