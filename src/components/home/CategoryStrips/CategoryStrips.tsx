import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import styles from './CategoryStrips.module.css';

export default function CategoryStrips() {
  return (
    <section className={styles.section} aria-label="Shop by category">
      {/* ── Section header ── */}
      <div className={styles.sectionHead}>
        <div className={styles.headLeft}>
          <p className={styles.eyebrow}>Curated Collections</p>
          <h2 className={styles.title}>Shop by<em> Category.</em></h2>
        </div>
        <Link href="/shop" className={styles.viewAll}>
          View All Collections
          <span className={styles.viewAllArrow} aria-hidden="true">→</span>
        </Link>
      </div>

      {/* ── Bento grid ── */}
      <div className={styles.grid}>
        {categories.map((cat, i) => (
          <Link key={cat.href} href={cat.href} className={styles.card} aria-label={`Shop ${cat.name} — ${cat.count} items`}>
            {/* Image */}
            {cat.image && (
              <div className={styles.imageWrap}>
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={styles.image}
                  loading="lazy"
                />
              </div>
            )}

            {/* Overlays */}
            <div className={styles.overlayBase} aria-hidden="true" />
            <div className={styles.overlayHover} aria-hidden="true" />

            {/* Ghost number watermark */}
            <span className={styles.ghostNum} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Top bar */}
            <div className={styles.topBar} aria-hidden="true">
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.arrow}>↗</span>
            </div>

            {/* Bottom text */}
            <div className={styles.textBlock}>
              <p className={styles.name}>{cat.name}</p>
              <div className={styles.meta}>
                <span className={styles.count}>{cat.count} items</span>
                <span className={styles.shopNow}>Shop now</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
