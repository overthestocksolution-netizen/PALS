import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal';
import { featuredItems as FEATURED } from '@/data/featured';
import styles from './FeaturedGrid.module.css';

export default function FeaturedGrid() {
  return (
    <section className={styles.section} aria-label="Featured editorial">
      <div className={styles.inner}>

        {/* ── Section header ── */}
        <ScrollReveal>
          <div className={styles.sectionHead}>
            <div className={styles.headLeft}>
              <p className={styles.eyebrow}>SS 2025 — Curated Edits</p>
              <h2 className={styles.title}>The <em>Edit.</em></h2>
            </div>
            <p className={styles.desc}>
              Three stories. One season.<br />
              Shop the looks defining right now.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Editorial grid ── */}
        <div className={styles.grid}>
          {FEATURED.map((item, i) => (
            <ScrollReveal
              key={item.id}
              delay={i * 0.1}
              className={styles[item.cardClass as keyof typeof styles]}
            >
              <Link href={item.href} className={styles.card} aria-label={`${item.category} — ${item.name}`}>

                {/* Image */}
                <div className={styles.imageWrap}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 50vw"
                    className={styles.image}
                    loading="lazy"
                  />
                </div>

                {/* Always-visible gradient */}
                <div className={styles.grad} aria-hidden="true" />
                {/* Hover darkening */}
                <div className={styles.gradHover} aria-hidden="true" />

                {/* Ghost editorial number */}
                <span className={styles.ghostNum} aria-hidden="true">{item.num}</span>

                {/* Top: index + arrow */}
                <div className={styles.topRow} aria-hidden="true">
                  <span className={styles.indexNum}>{item.num}</span>
                  <span className={styles.arrow}>↗</span>
                </div>

                {/* Bottom: permanent text block */}
                <div className={styles.textBlock}>
                  <span className={styles.category}>{item.category}</span>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.tagline}>{item.tagline}</p>
                  <span className={styles.cta}>
                    Explore Edit
                    <span className={styles.ctaArrow} aria-hidden="true">→</span>
                  </span>
                </div>

              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
