'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrderTracking } from '@/hooks/useOrderTracking';
import { orderTrackingSchema, type OrderTrackingValues } from '@/lib/schemas';
import styles from './page.module.css';

export default function TrackOrderPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderTrackingValues>({ resolver: zodResolver(orderTrackingSchema) });

  const { mutate, data, isPending, isSuccess, isError, reset: resetMutation } = useOrderTracking();

  function onSubmit(values: OrderTrackingValues) {
    mutate({ orderId: values.orderId });
  }

  function handleReset() {
    reset();
    resetMutation();
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Orders</p>
        <h1 className={styles.title}>Track Your<em> Order</em></h1>
        <p className={styles.subtitle}>Enter your order ID to get real-time updates on your delivery.</p>
      </div>

      <div className={styles.content}>
        {!isSuccess ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="orderId">Order ID</label>
              <input
                id="orderId"
                type="text"
                placeholder="e.g. PALS-2025-00123"
                className={`${styles.input} ${errors.orderId ? styles.inputError : ''}`}
                {...register('orderId')}
              />
              {errors.orderId && (
                <span className={styles.fieldError}>{errors.orderId.message}</span>
              )}
            </div>

            <button
              type="submit"
              className={styles.btn}
              disabled={isPending || isSubmitting}
            >
              {isPending ? (
                <span className={styles.btnLoading}>
                  <SpinnerSvg />
                  Tracking…
                </span>
              ) : 'Track Order'}
            </button>

            {isError && (
              <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
            )}

            <p className={styles.hint}>
              Find your Order ID in your confirmation email or under My Orders in your account.
            </p>
          </form>
        ) : (
          <div className={styles.result}>
            {data?.status === 'not_found' ? (
              <div className={styles.notFound}>
                <p className={styles.notFoundTitle}>Order not found</p>
                <p className={styles.notFoundText}>
                  No order found for <strong>{data.orderId}</strong>. Please check your Order ID and try again.
                </p>
                <button className={styles.btnSecondary} onClick={handleReset}>Try Again</button>
              </div>
            ) : (
              <>
                <div className={styles.resultHeader}>
                  <span className={styles.resultIcon}>✓</span>
                  <div>
                    <p className={styles.resultLabel}>Order Found</p>
                    <p className={styles.resultId}>{data?.orderId}</p>
                  </div>
                </div>

                <div className={styles.timeline}>
                  {data?.steps.map((step, i) => (
                    <div key={i} className={`${styles.timelineStep} ${step.done ? styles.done : ''}`}>
                      <div className={styles.dot} />
                      <span className={styles.timelineLabel}>{step.label}</span>
                      {step.timestamp && (
                        <span className={styles.timestamp}>{step.timestamp}</span>
                      )}
                    </div>
                  ))}
                </div>

                <button className={styles.btnSecondary} onClick={handleReset}>
                  Track Another Order
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SpinnerSvg() {
  return (
    <svg
      className={styles.spinner}
      width="14" height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
