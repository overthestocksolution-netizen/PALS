'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggle: (product: Product) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isWishlisted(product.id)) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }));
      },

      isWishlisted: (productId) => {
        return get().items.some((i) => i.id === productId);
      },

      toggle: (product) => {
        const { isWishlisted, addItem, removeItem } = get();
        if (isWishlisted(product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },
    }),
    { name: 'pals-wishlist' }
  )
);
