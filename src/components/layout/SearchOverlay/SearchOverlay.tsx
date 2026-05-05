'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { trendingSearches, searchSuggestions, type SearchSuggestion, type SuggestionType } from '@/data/search';
import styles from './SearchOverlay.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim().length > 0
    ? searchSuggestions
        .filter((s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.sub.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : [];

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(-1);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, -1));
      } else if (e.key === 'Enter' && active >= 0 && filtered[active]) {
        e.preventDefault();
        window.location.href = filtered[active].href;
        onClose();
      }
    },
    [filtered, active, onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className={styles.inner}>
              {/* ── Input row ── */}
              <div className={styles.inputRow}>
                <span className={styles.searchIcon} aria-hidden="true">
                  <SearchSvg />
                </span>
                <input
                  ref={inputRef}
                  className={styles.input}
                  type="search"
                  placeholder="Search styles, brands, categories…"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActive(-1); }}
                  onKeyDown={handleKey}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Search PALS"
                  aria-autocomplete="list"
                />
                {query && (
                  <button
                    className={styles.clearBtn}
                    onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                    aria-label="Clear search"
                  >
                    <XSvg size={15} />
                  </button>
                )}
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close search">
                  <XSvg size={18} />
                </button>
              </div>

              {/* ── Trending (shown when empty) ── */}
              {query.trim().length === 0 && (
                <motion.div
                  className={styles.trending}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.08 }}
                >
                  <span className={styles.trendingLabel}>Trending</span>
                  <div className={styles.chips}>
                    {trendingSearches.map((term) => (
                      <button
                        key={term}
                        className={styles.chip}
                        onClick={() => { setQuery(term); inputRef.current?.focus(); }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Live suggestions ── */}
              {filtered.length > 0 && (
                <ul className={styles.suggestions} role="listbox" aria-label="Suggestions">
                  {filtered.map((s, i) => (
                    <motion.li
                      key={`${s.href}-${i}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.025 }}
                      role="option"
                      aria-selected={active === i}
                    >
                      <Link
                        href={s.href}
                        className={`${styles.suggestion} ${active === i ? styles.active : ''}`}
                        onClick={onClose}
                      >
                        <span className={styles.typeIcon} aria-hidden="true">
                          <TypeIcon type={s.type} />
                        </span>
                        <span className={styles.textBlock}>
                          <span className={styles.suggLabel}>
                            <Highlight text={s.label} query={query} />
                          </span>
                          <span className={styles.suggSub}>{s.sub}</span>
                        </span>
                        <span className={styles.arrow} aria-hidden="true">↗</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}

              {/* ── No results ── */}
              {query.trim().length > 0 && filtered.length === 0 && (
                <motion.div
                  className={styles.noResults}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>No results for <em>&ldquo;{query}&rdquo;</em></p>
                  <Link
                    href={`/shop?q=${encodeURIComponent(query)}`}
                    className={styles.browseLink}
                    onClick={onClose}
                  >
                    Browse all results →
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* ── Backdrop ── */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden="true"
          />
        </>
      )}
    </AnimatePresence>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className={styles.mark}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function TypeIcon({ type }: { type: SuggestionType }) {
  switch (type) {
    case 'category': return <CategorySvg />;
    case 'brand':    return <BrandSvg />;
    case 'style':    return <StyleSvg />;
    default:         return <ProductSvg />;
  }
}

function SearchSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function XSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function CategorySvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  );
}

function ProductSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  );
}

function BrandSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function StyleSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}
