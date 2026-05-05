'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/cart/CartItem/CartItem';
import OrderSummary from '@/components/cart/OrderSummary/OrderSummary';
import Button from '@/components/ui/Button/Button';
import styles from './CartPage.module.css';

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Shopping Cart</h1>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Your cart is empty</p>
            <p className={styles.emptyText}>Explore our collection and find something you love.</p>
            <Link href="/shop">
              <Button variant="outline">Continue Shopping →</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.items}>
              {items.map((item) => (
                <CartItem key={`${item.product.id}-${item.size}`} item={item} />
              ))}
            </div>
            <div className={styles.aside}>
              <OrderSummary />
              <Link href="/checkout">
                <Button fullWidth size="lg">Checkout →</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
