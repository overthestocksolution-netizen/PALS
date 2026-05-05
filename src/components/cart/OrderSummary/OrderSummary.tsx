'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { formatPKR } from '@/utils/currency';
import styles from './OrderSummary.module.css';

export default function OrderSummary() {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const { cartTotal, items, discount, couponCode, applyCoupon } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const total = cartTotal();
  const freeShipping = subtotal >= 5000;

  function handleApplyCoupon() {
    const ok = applyCoupon(couponInput);
    if (!ok) {
      setCouponError('Invalid coupon code');
    } else {
      setCouponError('');
    }
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Order Summary</h3>
      <div className={styles.lines}>
        <div className={styles.line}>
          <span>Subtotal</span>
          <span>{formatPKR(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className={`${styles.line} ${styles.discount}`}>
            <span>Discount ({discount}%)</span>
            <span>– {formatPKR(subtotal * discount / 100)}</span>
          </div>
        )}
        <div className={styles.line}>
          <span>Shipping</span>
          <span>{freeShipping ? 'Free' : formatPKR(350)}</span>
        </div>
      </div>

      {/* Coupon */}
      {!couponCode && (
        <div className={styles.coupon}>
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="Discount code"
            className={styles.couponInput}
            aria-label="Discount code"
          />
          <button className={styles.couponBtn} onClick={handleApplyCoupon}>
            Apply
          </button>
        </div>
      )}
      {couponCode && (
        <p className={styles.couponApplied}>✓ Coupon "{couponCode}" applied</p>
      )}
      {couponError && <p className={styles.couponError}>{couponError}</p>}

      <div className={styles.total}>
        <span>Total</span>
        <span>{formatPKR(total + (freeShipping ? 0 : 350))}</span>
      </div>

      {!freeShipping && (
        <p className={styles.shippingNote}>
          Add {formatPKR(5000 - subtotal)} more for free shipping
        </p>
      )}
    </div>
  );
}
