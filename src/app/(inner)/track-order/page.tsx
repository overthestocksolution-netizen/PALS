'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (orderId.trim()) setSubmitted(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Orders</p>
        <h1 className={styles.title}>Track Your<em> Order</em></h1>
        <p className={styles.subtitle}>Enter your order ID to get real-time updates on your delivery.</p>
      </div>

      <div className={styles.content}>
        {!submitted ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="orderId">Order ID</label>
              <input
                id="orderId"
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. PALS-2025-00123"
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.btn}>Track Order</button>
            <p className={styles.hint}>
              Find your Order ID in your confirmation email or under My Orders in your account.
            </p>
          </form>
        ) : (
          <div className={styles.result}>
            <div className={styles.resultHeader}>
              <span className={styles.resultIcon}>✓</span>
              <div>
                <p className={styles.resultLabel}>Order Found</p>
                <p className={styles.resultId}>{orderId}</p>
              </div>
            </div>
            <div className={styles.timeline}>
              {[
                { label: 'Order Placed',    done: true  },
                { label: 'Payment Confirmed', done: true  },
                { label: 'Packed & Dispatched', done: true  },
                { label: 'Out for Delivery', done: false },
                { label: 'Delivered',        done: false },
              ].map((step, i) => (
                <div key={i} className={`${styles.timelineStep} ${step.done ? styles.done : ''}`}>
                  <div className={styles.dot} />
                  <span className={styles.timelineLabel}>{step.label}</span>
                </div>
              ))}
            </div>
            <button className={styles.btnSecondary} onClick={() => { setSubmitted(false); setOrderId(''); }}>
              Track Another Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
