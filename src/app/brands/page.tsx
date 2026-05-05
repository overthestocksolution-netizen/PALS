import Link from 'next/link';
import { brands } from '@/data/brands';
import { palsImageLibrary } from '@/constants/palsImageLibrary';
import styles from './page.module.css';

export const metadata = { title: 'Brands - PALS' };

const BRAND_IMAGES = [
  palsImageLibrary.products.stripedTee[0],
  palsImageLibrary.products.sneakers[0],
  palsImageLibrary.products.jeans[0],
  palsImageLibrary.products.dress[0],
  palsImageLibrary.products.blazer[0],
  palsImageLibrary.products.hoodie[0],
];

export default function BrandsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>PALS BRANDS</p>
            <h1 className={styles.heading}>All Brands</h1>
            <p className={styles.lead}>
              Designer names, everyday labels, and resale favorites presented with sharper visual context.
            </p>
          </div>
          <div className={styles.heroMedia}>
            <img src={palsImageLibrary.content.drop1} alt="PALS brands hero" className={styles.heroImage} />
          </div>
        </section>

        <div className={styles.grid}>
          {brands.map((brand, index) => (
            <Link
              key={brand.slug}
              href={`/shop?brand=${brand.slug}`}
              className={styles.card}
            >
              <div className={styles.cardMedia}>
                <img
                  src={BRAND_IMAGES[index % BRAND_IMAGES.length]}
                  alt={`${brand.name} collection`}
                  className={styles.cardImage}
                />
              </div>
              <p className={styles.name}>{brand.name}</p>
              {brand.featured && <span className={styles.featured}>Featured</span>}
              <span className={styles.arrow} aria-hidden="true">-&gt;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
