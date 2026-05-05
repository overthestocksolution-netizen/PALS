import React from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/shop/ProductCard/ProductCard';
import styles from './RelatedProducts.module.css';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Related products">
      <div className={styles.inner}>
        <h2 className={styles.title}>You Might Also Like</h2>
        <div className={styles.track}>
          {products.map((p) => (
            <div key={p.id} className={styles.cardWrap}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
