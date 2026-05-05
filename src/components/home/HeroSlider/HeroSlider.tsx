'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { heroSlides as SLIDES } from '@/data/slides';
import styles from './HeroSlider.module.css';

const DURATION = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    setProgress(0);
    const tick = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (tick / DURATION) * 100, 100));
    }, tick);

    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      setProgress(0);
    }, DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [paused, current]);

  const slide = SLIDES[current];

  return (
    <section
      className={styles.wrapper}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero slideshow"
    >
      {/* Full-bleed image with Ken Burns */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className={styles.imageBg}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={current === 0}
            sizes="100vw"
            className={styles.image}
          />
        </motion.div>
      </AnimatePresence>

      {/* Multi-layer gradient overlay */}
      <div className={styles.gradientOverlay} aria-hidden="true" />
      <div className={styles.gradientSide} aria-hidden="true" />

      {/* Grain overlay */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Top bar */}
      <div className={styles.topBar}>
        <AnimatePresence mode="wait">
          <motion.span
            key={slide.id + '-accent'}
            className={styles.accent}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {slide.accent}
          </motion.span>
        </AnimatePresence>

        <div className={styles.counter}>
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.id + '-num'}
              className={styles.counterCurrent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {slide.num}
            </motion.span>
          </AnimatePresence>
          <span className={styles.counterDivider}>/</span>
          <span className={styles.counterTotal}>0{SLIDES.length}</span>
        </div>
      </div>

      {/* Giant ghost number — decorative */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + '-ghost'}
          className={styles.ghostNum}
          aria-hidden="true"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {slide.num}
        </motion.div>
      </AnimatePresence>

      {/* Main text block — bottom left */}
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-content'}
            className={styles.contentInner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className={styles.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              {slide.category}
            </motion.p>

            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {slide.headline}
              <br />
              <em>{slide.headlineEm}</em>
            </motion.h1>

            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              {slide.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Link href={slide.href} className={styles.cta}>
                <span className={styles.ctaText}>{slide.cta}</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  <ArrowRightIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right side — nav arrows + slide labels */}
      <div className={styles.sideNav}>
        <button className={styles.sideBtn} onClick={prev} aria-label="Previous slide">
          <span className={styles.sideBtnLine} />
          <ChevronUpIcon />
        </button>
        <div className={styles.slideLabels}>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`${styles.slideLabel} ${i === current ? styles.slideLabelActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className={styles.slideLabelLine} />
              <span className={styles.slideLabelNum}>{s.num}</span>
            </button>
          ))}
        </div>
        <button className={styles.sideBtn} onClick={next} aria-label="Next slide">
          <span className={styles.sideBtnLine} />
          <ChevronDownIcon />
        </button>
      </div>

      {/* Progress bar */}
      <div className={styles.progressTrack} aria-hidden="true">
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%`, transition: paused ? 'none' : undefined }}
        />
      </div>

      {/* Scroll hint */}
      <motion.div
        className={styles.scrollHint}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </motion.div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
