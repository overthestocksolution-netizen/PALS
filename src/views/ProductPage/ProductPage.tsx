import React from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ImageGallery from '@/components/product/ImageGallery/ImageGallery';
import ProductInfo from '@/components/product/ProductInfo/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts/RelatedProducts';
import styles from './ProductPage.module.css';

interface ProductPageProps {
  slug: string;
}

export default function ProductPage({ slug }: ProductPageProps) {
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.gallery}>
          <ImageGallery images={product.images} productName={product.name} />
        </div>
        <div className={styles.info}>
          <ProductInfo product={product} />
        </div>
      </div>
      <RelatedProducts products={related} />
    </div>
  );
}
