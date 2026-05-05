import React from 'react';
import Link from 'next/link';
import { brands } from '@/data/brands';
import styles from './BrandsRow.module.css';

export default function BrandsRow() {
  return (
    <section className={styles.section} aria-label="Top brands">
      <p className={styles.heading}>Top Brands</p>
      <div className={styles.track}>
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/shop?brand=${brand.slug}`}
            className={styles.pill}
          >
            {brand.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
