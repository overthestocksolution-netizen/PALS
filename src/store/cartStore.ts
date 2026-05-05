'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  couponCode: string;
  discount: number;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  cartTotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      discount: 0,

      addItem: (product, size) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.size === size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.size === size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, size, quantity: 1 }] };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size === size)
          ),
        }));
      },

      updateQty: (productId, size, qty) => {
        if (qty < 1) {
          get().removeItem(productId, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity: qty }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: '', discount: 0 }),

      applyCoupon: (code) => {
        const validCoupons: Record<string, number> = {
          PALS10: 10,
          PALS20: 20,
          WELCOME: 15,
        };
        const pct = validCoupons[code.toUpperCase()];
        if (pct !== undefined) {
          set({ couponCode: code.toUpperCase(), discount: pct });
          return true;
        }
        return false;
      },

      cartTotal: () => {
        const { items, discount } = get();
        const subtotal = items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        );
        return subtotal - (subtotal * discount) / 100;
      },

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'pals-cart' }
  )
);
