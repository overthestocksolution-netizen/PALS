'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/cart/CartItem/CartItem';
import OrderSummary from '@/components/cart/OrderSummary/OrderSummary';
import Button from '@/components/ui/Button/Button';
import { paymentLogos as PAYMENT_LOGOS } from '@/data/payment';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cartOpen, setCartOpen } = useUIStore();
  const items = useCartStore((s) => s.items);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.heading}>Your Cart ({items.length})</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className={styles.body}>
              {items.length === 0 ? (
                <div className={styles.empty}>
                  <div className={styles.emptyMedia}>
                    <Image
                      src="/assets/Pals imgs/mediamodifier-JskqEILt-ds-unsplash.jpg"
                      alt="Empty cart"
                      width={220}
                      height={260}
                      className={styles.emptyImage}
                    />
                  </div>
                  <p className={styles.emptyTitle}>Your cart is empty</p>
                  <p className={styles.emptyText}>Add some pieces to get started.</p>
                  <Button
                    variant="outline"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping →
                  </Button>
                </div>
              ) : (
                <>
                  <div className={styles.items}>
                    {items.map((item) => (
                      <CartItem
                        key={`${item.product.id}-${item.size}`}
                        item={item}
                      />
                    ))}
                  </div>
                  <div className={styles.summary}>
                    <OrderSummary />
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                  >
                    <Button fullWidth size="lg">
                      Checkout →
                    </Button>
                  </Link>
                  <div className={styles.paymentLogos}>
                    {PAYMENT_LOGOS.map((logo) => (
                      <div key={logo.name} className={styles.paymentBadge}>
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={52}
                          height={22}
                          className={styles.paymentLogo}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
