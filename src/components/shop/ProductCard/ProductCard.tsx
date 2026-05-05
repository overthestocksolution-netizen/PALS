'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPKR } from '@/utils/currency';
import Badge from '@/components/ui/Badge/Badge';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import type { Product } from '@/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loaded, setLoaded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <article className={`${styles.card} ${product.isSoldOut ? styles.soldOut : ''}`}>
      <Link href={`/shop/${product.slug}`} className={styles.imageLink} aria-label={product.name}>
        <div className={styles.imageWrap}>
          {!loaded && <Skeleton variant="card" className={styles.skeleton} />}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
          {product.isSoldOut && (
            <div className={styles.soldOutOverlay} aria-hidden="true" />
          )}
          <div className={styles.badges}>
            {product.isNew && <Badge type="new" />}
            {product.isOnSale && <Badge type="sale" />}
            {product.isSoldOut && <Badge type="soldOut" />}
          </div>
          {!product.isSoldOut && (
            <button
              className={styles.quickView}
              onClick={(e) => {
                e.preventDefault();
                addItem(product, product.sizes[0]);
              }}
              aria-label={`Quick add ${product.name} to cart`}
            >
              QUICK ADD →
            </button>
          )}
          <button
            className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlistActive : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggle(product);
            }}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <HeartIcon filled={wishlisted} />
          </button>
        </div>
      </Link>
      <Link href={`/shop/${product.slug}`} className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPKR(product.price)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>{formatPKR(product.originalPrice)}</span>
          )}
        </div>
      </Link>
    </article>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
