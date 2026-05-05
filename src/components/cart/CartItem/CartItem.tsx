'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPKR } from '@/utils/currency';
import type { CartItem as CartItemType } from '@/types';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQty, removeItem } = useCartStore();

  return (
    <div className={styles.item}>
      <Link href={`/shop/${item.product.slug}`} className={styles.imageLink} aria-label={item.product.name}>
        <div className={styles.imageWrap}>
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            sizes="80px"
            className={styles.image}
          />
        </div>
      </Link>
      <div className={styles.details}>
        <div className={styles.top}>
          <div>
            <p className={styles.brand}>{item.product.brand}</p>
            <Link href={`/shop/${item.product.slug}`} className={styles.name}>
              {item.product.name}
            </Link>
            <p className={styles.size}>Size: {item.size}</p>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => removeItem(item.product.id, item.size)}
            aria-label={`Remove ${item.product.name} from cart`}
          >
            ✕
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.qtyRow}>
            <button
              className={styles.qtyBtn}
              onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className={styles.qty} aria-live="polite">{item.quantity}</span>
            <button
              className={styles.qtyBtn}
              onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className={styles.price}>{formatPKR(item.product.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
