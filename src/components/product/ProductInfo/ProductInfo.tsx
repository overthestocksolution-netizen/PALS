'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { formatPKR } from '@/utils/currency';
import SizeSelector from '@/components/product/SizeSelector/SizeSelector';
import Accordion from '@/components/ui/Accordion/Accordion';
import Button from '@/components/ui/Button/Button';
import type { Product } from '@/types';
import styles from './ProductInfo.module.css';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? '');
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize);
    }
    setCartOpen(true);
  }

  const accordionItems = [
    {
      title: 'Description',
      content: <p>{product.description}</p>,
    },
    {
      title: 'Size & Fit',
      content: <p>{product.sizeAndFit}</p>,
    },
    {
      title: 'Shipping & Returns',
      content: <p>{product.shippingInfo}</p>,
    },
    {
      title: 'Care Instructions',
      content: (
        <ul>
          {product.careInstructions.map((item) => (
            <li key={item} className={styles.careItem}>— {item}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Brand + Name */}
      <p className={styles.brand}>{product.brand}</p>
      <h1 className={styles.name}>{product.name}</h1>

      {/* Rating */}
      <div className={styles.ratingRow}>
        <Stars rating={product.rating} />
        <span className={styles.reviewCount}>({product.reviewCount})</span>
      </div>

      {/* Price */}
      <div className={styles.priceRow}>
        <span className={styles.price}>{formatPKR(product.price)}</span>
        {product.originalPrice && (
          <span className={styles.originalPrice}>{formatPKR(product.originalPrice)}</span>
        )}
      </div>

      <hr className={styles.divider} />

      {/* Size selector */}
      <SizeSelector
        sizes={product.sizes}
        selected={selectedSize}
        onChange={setSelectedSize}
      />

      {/* Quantity */}
      <div className={styles.qtyRow}>
        <span className={styles.qtyLabel}>Quantity</span>
        <div className={styles.qtyControls}>
          <button
            className={styles.qtyBtn}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className={styles.qtyNum} aria-live="polite">{qty}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Stock notice */}
      {product.inStock > 0 && product.inStock <= 10 && (
        <p className={styles.stock}>Only {product.inStock} left</p>
      )}

      {/* CTA buttons */}
      {product.isSoldOut ? (
        <Button fullWidth size="lg" disabled>
          Sold Out
        </Button>
      ) : (
        <>
          <Button fullWidth size="lg" onClick={handleAddToCart}>
            Add to Cart →
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="outline"
            onClick={() => toggle(product)}
          >
            {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </Button>
        </>
      )}

      {/* Accordion */}
      <div className={styles.accordion}>
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className={styles.star}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
