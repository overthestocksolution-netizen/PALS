export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'men' | 'women' | 'accessories';
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
  isOnSale: boolean;
  isSoldOut: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  sizeAndFit: string;
  shippingInfo: string;
  careInstructions: string[];
  inStock: number;
}

export interface Category {
  name: string;
  count: string;
  href: string;
  image?: string;
}

export interface Brand {
  name: string;
  slug: string;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

export type SortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'popular'
  | 'sale';

export interface FilterState {
  categories: string[];
  sizes: string[];
  priceMin: number;
  priceMax: number;
  colors: string[];
  brands: string[];
  onSaleOnly: boolean;
}

export interface CheckoutStep {
  id: number;
  label: string;
}

export type PaymentMethod = 'jazzcash' | 'easypaisa' | 'card' | 'cod';
