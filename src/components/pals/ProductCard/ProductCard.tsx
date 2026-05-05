'use client';
import Link from 'next/link';
import './ProductCard.css';
import type { PalsProduct } from '@/data/palsProducts';
import { formatPKR } from '@/data/palsProducts';

interface Props {
  product: PalsProduct;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/shop/${product.slug}`} className="card">
      <div className="imageWrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="image"
          loading="lazy"
        />
        {product.badge && (
          <span className={`badge ${product.badge === 'SALE' ? 'badgeSale' : 'badgeNew'}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="info">
        <p className="brand">{product.brand}</p>
        <div className="nameRow">
          <p className="name">{product.name}</p>
          <div className="priceWrap">
            <p className="price">{formatPKR(product.price)}</p>
            {product.originalPrice && (
              <p className="originalPrice">{formatPKR(product.originalPrice)}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
