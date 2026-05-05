'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.imagePane}>
        <Image
          src="/assets/Pals%20imgs/freestocks-_3Q3tsJ01nc-unsplash.jpg"
          alt="PALS editorial — contact us"
          fill
          priority
          sizes="50vw"
          className={styles.bgImage}
        />
        <div className={styles.imageOverlay}>
          <p className={styles.overlayQuote}>
            &ldquo;We&apos;d love to hear from you.&rdquo;
          </p>
        </div>
      </div>

      <div className={styles.formPane}>
        <div className={styles.formInner}>
          <h1 className={styles.heading}>Get in Touch</h1>

          {submitted ? (
            <p className={styles.success}>
              Thank you for reaching out. We&apos;ll be in touch within 24 hours.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <Input label="Name"    type="text"  underlineOnly placeholder="Your name"    required />
              <Input label="Email"   type="email" underlineOnly placeholder="your@email.com" required />
              <Input label="Subject" type="text"  underlineOnly placeholder="How can we help?" required />
              <div className={styles.textareaWrap}>
                <label htmlFor="message" className={styles.textareaLabel}>Message</label>
                <textarea
                  id="message"
                  className={styles.textarea}
                  placeholder="Tell us more..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" fullWidth size="lg">Send Message →</Button>
            </form>
          )}

          <div className={styles.officeInfo}>
            <h3 className={styles.officeTitle}>Office</h3>
            <p className={styles.officeText}>123 The Mall Road, Lahore 54000, Pakistan</p>
            <p className={styles.officeText}>hello@palsfashion.pk</p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>TikTok</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
