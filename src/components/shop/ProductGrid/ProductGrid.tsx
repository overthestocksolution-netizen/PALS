import React from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/shop/ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLineShort} />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No products found</p>
        <p className={styles.emptyText}>Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
