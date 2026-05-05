'use client';

import React, { useState } from 'react';
import type { FilterState } from '@/types';
import styles from './FilterSidebar.module.css';

const CATEGORIES = ['men', 'women', 'accessories'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38'];
const COLORS = ['black', 'white', 'gray'];
const PRICE_MAX = 25000;

const defaultFilters: FilterState = {
  categories: [],
  sizes: [],
  priceMin: 0,
  priceMax: PRICE_MAX,
  colors: [],
  brands: [],
  onSaleOnly: false,
};

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  function toggleList<K extends 'categories' | 'sizes' | 'colors'>(key: K, val: string) {
    const arr = filters[key] as string[];
    const next = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
    onChange({ ...filters, [key]: next });
  }

  function clearAll() {
    onChange({ ...defaultFilters });
  }

  const hasFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceMax < PRICE_MAX ||
    filters.onSaleOnly;

  return (
    <aside className={styles.sidebar} aria-label="Product filters">
      <div className={styles.header}>
        <h2 className={styles.heading}>Filter</h2>
        {hasFilters && (
          <button className={styles.clearBtn} onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Category</h3>
        {CATEGORIES.map((cat) => (
          <label key={cat} className={styles.checkLabel}>
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => toggleList('categories', cat)}
              className={styles.checkbox}
            />
            <span className={styles.checkText}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
          </label>
        ))}
      </div>

      {/* Size */}
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Size</h3>
        <div className={styles.sizePills}>
          {SIZES.map((size) => (
            <button
              key={size}
              className={`${styles.sizePill} ${filters.sizes.includes(size) ? styles.sizePillActive : ''}`}
              onClick={() => toggleList('sizes', size)}
              aria-pressed={filters.sizes.includes(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>
          Price
          <span className={styles.priceRange}>
            ₨ 0 – ₨ {filters.priceMax.toLocaleString()}
          </span>
        </h3>
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          step={500}
          value={filters.priceMax}
          onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
          className={styles.rangeInput}
          aria-label="Maximum price"
        />
      </div>

      {/* Color */}
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Color</h3>
        <div className={styles.colorSwatches}>
          {COLORS.map((color) => (
            <button
              key={color}
              className={`${styles.swatch} ${styles[`swatch_${color}`]} ${filters.colors.includes(color) ? styles.swatchActive : ''}`}
              onClick={() => toggleList('colors', color)}
              aria-pressed={filters.colors.includes(color)}
              aria-label={color}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Sale only */}
      <div className={styles.group}>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={(e) => onChange({ ...filters, onSaleOnly: e.target.checked })}
            className={styles.checkbox}
          />
          <span className={styles.checkText}>On Sale Only</span>
        </label>
      </div>
    </aside>
  );
}
