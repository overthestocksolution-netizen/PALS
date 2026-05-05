'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatPKR } from '@/utils/currency';
import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Wishlist</h1>
          {items.length > 0 && (
            <span className={styles.count}>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
          )}
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <HeartOutlineIcon />
            </div>
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptyText}>Save pieces you love and come back when you&apos;re ready.</p>
            <Link href="/shop" className={styles.emptyBtn}>Browse the shop →</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link href={`/shop/${product.slug}`} className={styles.imageLink}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={styles.image}
                    />
                    {product.isOnSale && (
                      <span className={styles.badgeSale}>SALE</span>
                    )}
                    {product.isNew && (
                      <span className={styles.badgeNew}>NEW</span>
                    )}
                    {product.isSoldOut && (
                      <div className={styles.soldOutOverlay}>
                        <span>SOLD OUT</span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className={styles.info}>
                  <p className={styles.brand}>{product.brand}</p>
                  <Link href={`/shop/${product.slug}`} className={styles.name}>{product.name}</Link>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{formatPKR(product.price)}</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>{formatPKR(product.originalPrice)}</span>
                    )}
                  </div>
                </div>

                <div className={styles.actions}>
                  {!product.isSoldOut && (
                    <button
                      className={styles.addBtn}
                      onClick={() => addItem(product, product.sizes[0])}
                    >
                      Add to Cart
                    </button>
                  )}
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(product.id)}
                    aria-label="Remove from wishlist"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HeartOutlineIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}
