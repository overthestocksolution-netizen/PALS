'use client';

import { create } from 'zustand';

interface UIStore {
  cartOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setMobileMenu: (open: boolean) => void;
  setSearch: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cartOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  setMobileMenu: (open) => set({ mobileMenuOpen: open }),
  setSearch: (open) => set({ searchOpen: open }),
}));
