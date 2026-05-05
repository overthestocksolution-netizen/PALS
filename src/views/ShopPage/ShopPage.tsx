'use client';

import React, { useState, useMemo } from 'react';
import FilterSidebar from '@/components/shop/FilterSidebar/FilterSidebar';
import ProductGrid from '@/components/shop/ProductGrid/ProductGrid';
import SortDropdown from '@/components/shop/SortDropdown/SortDropdown';
import Button from '@/components/ui/Button/Button';
import { products } from '@/data/products';
import type { FilterState, SortOption } from '@/types';
import styles from './ShopPage.module.css';

const defaultFilters: FilterState = {
  categories: [],
  sizes: [],
  priceMin: 0,
  priceMax: 25000,
  colors: [],
  brands: [],
  onSaleOnly: false,
};

const PAGE_SIZE = 9;

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...products];
    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.sizes.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
      list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
    }
    if (filters.onSaleOnly) {
      list = list.filter((p) => p.isOnSale);
    }
    list = list.filter((p) => p.price <= filters.priceMax);

    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'popular':    list.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'sale':       list = list.filter((p) => p.isOnSale); break;
      case 'newest':     list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew)); break;
    }
    return list;
  }, [filters, sort]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} />
        <div className={styles.content}>
          <div className={styles.topBar}>
            <p className={styles.count}>{filtered.length} items found</p>
            <SortDropdown value={sort} onChange={(v) => { setSort(v); setPage(1); }} />
          </div>
          <ProductGrid products={paginated} />
          {hasMore && (
            <div className={styles.loadMore}>
              <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
                Load More →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
