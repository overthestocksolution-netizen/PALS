'use client';

import React, { useState } from 'react';
import styles from './NewsletterBanner.module.css';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className={styles.section} aria-label="Newsletter signup">
      <div className={styles.inner}>
        <h2 className={styles.headline}>Stay in the Edit</h2>
        <p className={styles.subtext}>
          New arrivals, exclusive drops, and editorial picks — straight to your inbox.
        </p>
        {submitted ? (
          <p className={styles.success}>You&apos;re in ✓</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className={styles.input}
              aria-label="Email address"
            />
            <button type="submit" className={styles.btn}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
