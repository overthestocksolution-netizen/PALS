'use client';

import React, { useState } from 'react';
import FilterSidebar from '@/components/shop/FilterSidebar/FilterSidebar';
import ProductGrid from '@/components/shop/ProductGrid/ProductGrid';
import SortDropdown from '@/components/shop/SortDropdown/SortDropdown';
import Button from '@/components/ui/Button/Button';
import { useProducts } from '@/hooks/useProducts';
import type { FilterState, SortOption } from '@/types';
import styles from './ShopPage.module.css';

const defaultFilters: FilterState = {
  categories: [],
  sizes:       [],
  priceMin:    0,
  priceMax:    25000,
  colors:      [],
  brands:      [],
  onSaleOnly:  false,
};

const PAGE_SIZE = 9;

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort,    setSort]    = useState<SortOption>('newest');
  const [page,    setPage]    = useState(1);

  const { data, isFetching, isError } = useProducts({ filters, sort, page, pageSize: PAGE_SIZE });

  const items   = data?.items   ?? [];
  const total   = data?.total   ?? 0;
  const hasMore = data?.hasMore ?? false;

  function handleFilterChange(f: FilterState) {
    setFilters(f);
    setPage(1);
  }

  function handleSortChange(v: SortOption) {
    setSort(v);
    setPage(1);
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <FilterSidebar filters={filters} onChange={handleFilterChange} />

        <div className={styles.content}>
          <div className={styles.topBar}>
            <p className={styles.count}>
              {isFetching ? (
                <span className={styles.countLoading}>Loading…</span>
              ) : (
                <>{total} item{total !== 1 ? 's' : ''} found</>
              )}
            </p>
            <SortDropdown value={sort} onChange={handleSortChange} />
          </div>

          {isError ? (
            <div className={styles.errorState}>
              <p>Something went wrong loading products.</p>
              <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : (
            <>
              <div className={isFetching ? styles.gridFading : ''}>
                <ProductGrid products={items} />
              </div>

              {hasMore && (
                <div className={styles.loadMore}>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={isFetching}
                  >
                    {isFetching ? 'Loading…' : 'Load More →'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
