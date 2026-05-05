'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPKR } from '@/utils/currency';
import Badge from '@/components/ui/Badge/Badge';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal';
import styles from './TrendingSection.module.css';

const TRENDING = products.filter((p) => !p.isSoldOut).slice(0, 4);

export default function TrendingSection() {
  return (
    <section className={styles.section} aria-label="Trending products">
      <div className={styles.inner}>
        <ScrollReveal>
          <h2 className={styles.title}>Trending Now</h2>
        </ScrollReveal>
        <div className={styles.grid}>
          {TRENDING.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.07}>
              <TrendingCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingCard({ product }: { product: (typeof products)[0] }) {
  const [loaded, setLoaded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className={`${styles.card} ${product.isSoldOut ? styles.soldOut : ''}`}>
      <Link href={`/shop/${product.slug}`} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <div className={styles.imageWrap}>
          {!loaded && <Skeleton variant="card" className={styles.skeleton} />}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
          {product.isSoldOut && (
            <div className={styles.soldOutOverlay} aria-hidden="true" />
          )}
          {/* Badges */}
          <div className={styles.badges}>
            {product.isNew && <Badge type="new" />}
            {product.isOnSale && <Badge type="sale" />}
            {product.isSoldOut && <Badge type="soldOut" />}
          </div>
          {/* Quick view */}
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
          {/* Wishlist */}
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
        <p className={styles.category}>{product.category}</p>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPKR(product.price)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>{formatPKR(product.originalPrice)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
