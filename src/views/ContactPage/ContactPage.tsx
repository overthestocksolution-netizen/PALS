'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { useContact } from '@/hooks/useContact';
import { contactSchema, type ContactValues } from '@/lib/schemas';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const { mutate, isPending, isSuccess, isError, reset: resetMutation } = useContact();

  function onSubmit(values: ContactValues) {
    mutate(values);
  }

  function handleReset() {
    reset();
    resetMutation();
  }

  return (
    <div className={styles.page}>
      <div className={styles.imagePane}>
        <Image
          src="/assets/Pals%20imgs/freestocks-_3Q3tsJ01nc-unsplash.jpg"
          alt="PALS editorial — contact us"
          fill priority sizes="50vw"
          className={styles.bgImage}
        />
        <div className={styles.imageOverlay}>
          <p className={styles.overlayQuote}>&ldquo;We&apos;d love to hear from you.&rdquo;</p>
        </div>
      </div>

      <div className={styles.formPane}>
        <div className={styles.formInner}>
          <h1 className={styles.heading}>Get in Touch</h1>

          {isSuccess ? (
            <div className={styles.successBlock}>
              <p className={styles.success}>
                Thank you for reaching out. We&apos;ll be in touch within 24 hours.
              </p>
              <button className={styles.resetBtn} onClick={handleReset}>Send another message →</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
              {isError && (
                <div className={styles.formError} role="alert">
                  Something went wrong. Please try again.
                </div>
              )}

              <Input
                label="Name"
                type="text"
                underlineOnly
                placeholder="Your name"
                error={errors.name?.message}
                {...register('name')}
              />
              <Input
                label="Email"
                type="email"
                underlineOnly
                placeholder="your@email.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                label="Subject"
                type="text"
                underlineOnly
                placeholder="How can we help?"
                error={errors.subject?.message}
                {...register('subject')}
              />

              <div className={styles.textareaWrap}>
                <label htmlFor="message" className={styles.textareaLabel}>Message</label>
                <textarea
                  id="message"
                  className={`${styles.textarea} ${errors.message ? styles.textareaError : ''}`}
                  placeholder="Tell us more…"
                  rows={5}
                  {...register('message')}
                />
                {errors.message && (
                  <span className={styles.fieldError}>{errors.message.message}</span>
                )}
              </div>

              <Button type="submit" fullWidth size="lg" disabled={isPending}>
                {isPending ? 'Sending…' : 'Send Message →'}
              </Button>
            </form>
          )}

          <div className={styles.officeInfo}>
            <h3 className={styles.officeTitle}>Office</h3>
            <p className={styles.officeText}>123 The Mall Road, Lahore 54000, Pakistan</p>
            <p className={styles.officeText}>hello@palsfashion.pk</p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
              <a href="https://tiktok.com"    target="_blank" rel="noopener noreferrer" className={styles.socialLink}>TikTok</a>
              <a href="https://twitter.com"   target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
