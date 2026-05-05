'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { editorialStrip } from '@/data/editorial';
import styles from './EditorialStrip.module.css';

export default function EditorialStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section ref={ref} className={styles.section} aria-label="Editorial feature">
      {/* Left — cinematic image */}
      <div className={styles.imageCol}>
        <motion.div
          className={styles.imageWrap}
          initial={{ scale: 1.08 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={editorialStrip.image}
            alt={editorialStrip.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.imageGrain} aria-hidden="true" />
          <div className={styles.imageOverlay} aria-hidden="true" />
        </motion.div>

        {/* Decorative year tag */}
        <div className={styles.yearTag} aria-hidden="true">2025</div>
      </div>

      {/* Right — editorial text */}
      <div className={styles.textCol}>
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className={styles.eyebrow}>{editorialStrip.eyebrow}</p>

          <h2 className={styles.heading}>
            {editorialStrip.heading}
            <em className={styles.headingEm}><br />{editorialStrip.headingEm}</em>
          </h2>

          <div className={styles.divider} aria-hidden="true" />

          <p className={styles.body}>{editorialStrip.body}</p>

          <Link href={editorialStrip.href} className={styles.cta}>
            <span className={styles.ctaText}>{editorialStrip.cta}</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>

        {/* Ghost decorative text */}
        <div className={styles.ghostWord} aria-hidden="true">Edit</div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
