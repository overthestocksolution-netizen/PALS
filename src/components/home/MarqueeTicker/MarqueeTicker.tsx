import React from 'react';
import styles from './MarqueeTicker.module.css';

const ITEMS = [
  'New Arrivals',
  'Free Shipping Over PKR 5,000',
  'Verified Sellers Only',
  'Sustainable Fashion',
  'Shop the Edit',
  'Exclusive Drops',
  'Authentic Brands',
  'PALS Collection',
];

const TEXT = ITEMS.join('  ·  ') + '  ·  ';

export default function MarqueeTicker() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.text}>{TEXT}</span>
        <span className={styles.text}>{TEXT}</span>
        <span className={styles.text}>{TEXT}</span>
      </div>
    </div>
  );
}
