'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNewsletter } from '@/hooks/useNewsletter';
import { newsletterSchema, type NewsletterValues } from '@/lib/schemas';
import styles from './NewsletterBanner.module.css';

export default function NewsletterBanner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const { mutate, isPending, isSuccess } = useNewsletter();

  function onSubmit(values: NewsletterValues) {
    mutate(values.email, { onSuccess: () => reset() });
  }

  return (
    <section className={styles.section} aria-label="Newsletter signup">
      <div className={styles.inner}>
        <h2 className={styles.headline}>Stay in the Edit</h2>
        <p className={styles.subtext}>
          New arrivals, exclusive drops, and editorial picks — straight to your inbox.
        </p>

        {isSuccess ? (
          <p className={styles.success}>You&apos;re in ✓</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.inputWrap}>
              <input
                type="email"
                placeholder="Your email address"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                aria-label="Email address"
                {...register('email')}
              />
              {errors.email && (
                <span className={styles.fieldError}>{errors.email.message}</span>
              )}
            </div>
            <button type="submit" className={styles.btn} disabled={isPending}>
              {isPending ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
