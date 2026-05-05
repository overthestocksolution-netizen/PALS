'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { SortOption } from '@/types';
import styles from './SortDropdown.module.css';

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest',     label: 'Newest First'   },
  { value: 'popular',    label: 'Most Popular'   },
  { value: 'price-asc',  label: 'Price: Low–High' },
  { value: 'price-desc', label: 'Price: High–Low' },
  { value: 'sale',       label: 'On Sale'         },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.value === value);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>Sort: {current?.label}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>↓</span>
      </button>
      {open && (
        <ul className={styles.dropdown} role="listbox" aria-label="Sort options">
          {OPTIONS.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`${styles.option} ${opt.value === value ? styles.selected : ''}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
