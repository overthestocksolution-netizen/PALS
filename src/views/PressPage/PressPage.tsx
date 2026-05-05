'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import styles from './PressPage.module.css';

const PRESS_COVERAGE = [
  { pub: 'Dawn',           headline: 'How PALS is Reshaping Pakistan\'s Fashion Economy',   date: 'April 2025', href: '#' },
  { pub: 'The News',       headline: 'The Resale Revolution: PALS Leads the Charge',        date: 'March 2025', href: '#' },
  { pub: 'ELLE Pakistan',  headline: '10 PALS Finds Under PKR 5,000 Worth Buying Right Now', date: 'Feb 2025',   href: '#' },
  { pub: 'Forbes Pakistan', headline: 'PALS: The Startup Making Pre-Loved Fashion Premium', date: 'Jan 2025',   href: '#' },
  { pub: 'Business Recorder', headline: 'Pakistan\'s Circular Fashion Economy is Growing', date: 'Dec 2024',   href: '#' },
  { pub: 'GEO News',       headline: 'Young Entrepreneurs Changing Pakistani Fashion',       date: 'Nov 2024',  href: '#' },
];

export default function PressPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <h1 className={styles.heading}>Press</h1>
          <a href="/assets/pals-press-kit.zip" download className={styles.kitBtn}>
            <Button variant="outline">
              Download Press Kit →
            </Button>
          </a>
        </div>

        <div className={styles.grid}>
          {PRESS_COVERAGE.map((item) => (
            <div key={item.pub} className={styles.card}>
              <p className={styles.pub}>{item.pub}</p>
              <p className={styles.headline}>{item.headline}</p>
              <div className={styles.cardFooter}>
                <span className={styles.date}>{item.date}</span>
                <a href={item.href} className={styles.readLink}>Read article →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Press contact */}
        <div className={styles.contact}>
          <h2 className={styles.contactTitle}>Press Inquiries</h2>
          <p className={styles.contactText}>
            For media enquiries, interviews, or partnership opportunities, please reach out.
          </p>
          <p className={styles.email}>press@palsfashion.pk</p>

          {submitted ? (
            <p className={styles.success}>Thank you — we&apos;ll be in touch shortly.</p>
          ) : (
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <Input label="Name"    type="text"  underlineOnly placeholder="Your name"    required />
              <Input label="Email"   type="email" underlineOnly placeholder="press@pub.com" required />
              <Input label="Publication" type="text" underlineOnly placeholder="Publication name" />
              <Button type="submit">Send Inquiry →</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
