import Link from 'next/link';
import styles from './page.module.css';

const IMG_BASE = '/assets/Pals%20imgs';

const INFLUENCERS = [
  {
    name: 'Zara Ahmed', handle: '@zarastyle', followers: '125K', city: 'Lahore',
    specialty: 'Minimalist & Streetwear',
    img: `${IMG_BASE}/taylor-dG4Eb_oC5iM-unsplash.jpg`,
    items: 43,
  },
  {
    name: 'Bilal Chaudhry', handle: '@bilalwears', followers: '89K', city: 'Karachi',
    specialty: 'Vintage & Retro',
    img: `${IMG_BASE}/benjamin-r-ItqFmSxKnIg-unsplash.jpg`,
    items: 67,
  },
  {
    name: 'Aiza Siddiqui', handle: '@aizaofficial', followers: '210K', city: 'Islamabad',
    specialty: 'Luxury Resale',
    img: `${IMG_BASE}/zoe-NKjIT7u5nXE-unsplash.jpg`,
    items: 28,
  },
  {
    name: 'Hassan Malik', handle: '@hassanm', followers: '56K', city: 'Lahore',
    specialty: 'Streetwear & Sneakers',
    img: `${IMG_BASE}/rock-staar-2XcbGfYShfk-unsplash.jpg`,
    items: 91,
  },
  {
    name: 'Sana Rizvi', handle: '@sanarfashion', followers: '178K', city: 'Karachi',
    specialty: 'Sustainable Fashion',
    img: `${IMG_BASE}/alexandra-gorn-WF0LSThlRmw-unsplash.jpg`,
    items: 52,
  },
  {
    name: 'Omar Sheikh', handle: '@omarsheikh', followers: '43K', city: 'Faisalabad',
    specialty: 'Smart Casual',
    img: `${IMG_BASE}/sidharth-sabu-h3mYdW41R1o-unsplash.jpg`,
    items: 34,
  },
];

export default function InfluencersPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>BY INFLUENCERS</p>
          <h1 className={styles.heroTitle}>
            Shop the look.<br /><span className={styles.heroMuted}>From real people.</span>
          </h1>
          <p className={styles.heroText}>
            Browse curated closets from Pakistan&apos;s top fashion influencers. Verified sellers, real style.
          </p>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.gridHeader}>
          <h2 className={styles.sectionTitle}>Featured Creators</h2>
          <p className={styles.sectionMeta}>{INFLUENCERS.length} creators</p>
        </div>

        <div className={styles.grid}>
          {INFLUENCERS.map((influencer) => (
            <Link key={influencer.handle} href={`/profile/${influencer.handle.slice(1)}`} className={styles.card}>
              <div className={styles.portrait}>
                <img
                  src={influencer.img}
                  alt={influencer.name}
                  className={styles.portraitImage}
                />
                <div className={styles.overlay}>
                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <p className={styles.statValue}>{influencer.followers}</p>
                      <p className={styles.statLabel}>followers</p>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.stat}>
                      <p className={styles.statValue}>{influencer.items}</p>
                      <p className={styles.statLabel}>items</p>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.stat}>
                      <p className={styles.city}>{influencer.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.name}>{influencer.name}</h3>
                    <p className={styles.handle}>{influencer.handle}</p>
                  </div>
                  <span className="badge-new">VERIFIED</span>
                </div>
                <p className={styles.specialty}>{influencer.specialty}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.eyebrow}>ARE YOU A CREATOR?</p>
          <h2 className={styles.ctaTitle}>
            Monetise your influence<br />with PALS.
          </h2>
          <p className={styles.ctaText}>
            Join the PALS Influencer Programme. Get verified, grow your audience, and earn from every sale.
          </p>
          <Link href="/contact" className={`btn-pals-primary ${styles.ctaButton}`}>APPLY NOW -&gt;</Link>
        </div>
      </section>
    </>
  );
}
