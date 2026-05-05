'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { sellStats } from '@/data/editorial';
import styles from './SellOnPals.module.css';

export default function SellOnPals() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section ref={ref} className={styles.section} aria-label="Sell on PALS">
      <div className={styles.inner}>

        {/* Left — headline + CTA */}
        <motion.div
          className={styles.textCol}
          initial={{ opacity: 0, x: -36 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className={styles.eyebrow}>For Sellers</p>
          <h2 className={styles.heading}>
            Your wardrobe
            <em> earns.</em>
          </h2>
          <p className={styles.body}>
            List in minutes. Reach thousands of buyers across Pakistan.
            Get paid fast — PALS handles the rest.
          </p>
          <div className={styles.actions}>
            <Link href="/sell" className={styles.ctaPrimary}>
              Start Selling
            </Link>
            <Link href="/how-to-sell" className={styles.ctaSecondary}>
              How it works →
            </Link>
          </div>
        </motion.div>

        {/* Right — stats grid */}
        <div className={styles.statsGrid}>
          {sellStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={styles.stat}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 + 0.15 }}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full-width grain overlay */}
      <div className={styles.grain} aria-hidden="true" />
    </section>
  );
}
