'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { formatPKR } from '@/utils/currency';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import type { PaymentMethod } from '@/types';
import styles from './CheckoutPage.module.css';

const STEPS = ['Delivery', 'Payment', 'Review'];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('jazzcash');
  const items = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.cartTotal());

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.main}>
          {/* Progress indicator */}
          <div className={styles.progress} aria-label="Checkout progress">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className={`${styles.step} ${i <= step ? styles.stepActive : ''}`}>
                  <div className={styles.stepDot}>{i < step ? '✓' : i + 1}</div>
                  <span className={styles.stepLabel}>{label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={styles.stepLine} />}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1 — Delivery */}
          {step === 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Delivery Details</h2>
              <div className={styles.formGrid}>
                <Input label="Full Name"    type="text"   underlineOnly placeholder="Jane Smith"       />
                <Input label="Email"        type="email"  underlineOnly placeholder="you@example.com"  />
                <Input label="Phone"        type="tel"    underlineOnly placeholder="+92 300 0000000"  />
                <Input label="Address"      type="text"   underlineOnly placeholder="Street address"   />
                <Input label="City"         type="text"   underlineOnly placeholder="City"             />
                <Input label="Postal Code"  type="text"   underlineOnly placeholder="Postal code"      />
              </div>
              <div className={styles.deliveryMethods}>
                <h3 className={styles.subsectionTitle}>Delivery Method</h3>
                <label className={`${styles.radioCard} ${styles.radioCardSelected}`}>
                  <input type="radio" name="delivery" value="standard" defaultChecked className={styles.radioInput} />
                  <div>
                    <p className={styles.radioTitle}>Standard Delivery</p>
                    <p className={styles.radioSub}>3–5 business days • Free over ₨ 5,000</p>
                  </div>
                  <span className={styles.radioPrice}>₨ 350</span>
                </label>
                <label className={styles.radioCard}>
                  <input type="radio" name="delivery" value="express" className={styles.radioInput} />
                  <div>
                    <p className={styles.radioTitle}>Express Delivery</p>
                    <p className={styles.radioSub}>1–2 business days</p>
                  </div>
                  <span className={styles.radioPrice}>₨ 800</span>
                </label>
              </div>
              <Button size="lg" onClick={() => setStep(1)}>Continue to Payment →</Button>
            </div>
          )}

          {/* Step 2 — Payment */}
          {step === 1 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Payment</h2>
              <div className={styles.paymentTabs}>
                {(['jazzcash', 'easypaisa', 'card', 'cod'] as PaymentMethod[]).map((m) => (
                  <button
                    key={m}
                    className={`${styles.tab} ${paymentMethod === m ? styles.tabActive : ''}`}
                    onClick={() => setPaymentMethod(m)}
                  >
                    {m === 'jazzcash'   && <Image src="/assets/logos/jazzcash.webp"  alt="JazzCash"   width={60} height={20} className={styles.tabLogo} />}
                    {m === 'easypaisa'  && <Image src="/assets/logos/easypesa.png"   alt="EasyPaisa"  width={60} height={20} className={styles.tabLogo} />}
                    {m === 'card'       && 'Visa / MC'}
                    {m === 'cod'        && 'Cash on Delivery'}
                  </button>
                ))}
              </div>

              {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                <div className={styles.paymentForm}>
                  <Input
                    label="Mobile Number"
                    type="tel"
                    underlineOnly
                    placeholder="03XX XXXXXXX"
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className={styles.paymentForm}>
                  <Input label="Card Number"  type="text" underlineOnly placeholder="XXXX XXXX XXXX XXXX" />
                  <div className={styles.cardRow}>
                    <Input label="Expiry Date" type="text" underlineOnly placeholder="MM / YY" />
                    <Input label="CVV"         type="text" underlineOnly placeholder="CVC"      />
                  </div>
                  <Input label="Name on Card" type="text" underlineOnly placeholder="Jane Smith" />
                </div>
              )}

              {paymentMethod === 'cod' && (
                <p className={styles.codMessage}>
                  Pay in cash when your order arrives. No advance payment required.
                </p>
              )}

              <div className={styles.stepBtns}>
                <button className={styles.backBtn} onClick={() => setStep(0)}>← Back</button>
                <Button size="lg" onClick={() => setStep(2)}>Review Order →</Button>
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 2 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Review & Place Order</h2>
              <div className={styles.reviewItems}>
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className={styles.reviewItem}>
                    <p className={styles.reviewName}>{item.product.name}</p>
                    <p className={styles.reviewMeta}>Size: {item.size} × {item.quantity}</p>
                    <p className={styles.reviewPrice}>{formatPKR(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className={styles.stepBtns}>
                <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                <Button size="lg">Place Order →</Button>
              </div>
            </div>
          )}
        </div>

        {/* Mini order summary */}
        <aside className={styles.sidebar}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}`} className={styles.summaryItem}>
              <span className={styles.summaryItemName}>{item.product.name} ×{item.quantity}</span>
              <span>{formatPKR(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>{formatPKR(cartTotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
