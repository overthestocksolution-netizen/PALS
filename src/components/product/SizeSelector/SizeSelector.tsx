'use client';

import React from 'react';
import styles from './SizeSelector.module.css';

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>Size</span>
        <button className={styles.guide}>Size Guide</button>
      </div>
      <div className={styles.grid}>
        {sizes.map((size) => (
          <button
            key={size}
            className={`${styles.sizeBtn} ${selected === size ? styles.selected : ''}`}
            onClick={() => onChange(size)}
            aria-pressed={selected === size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
