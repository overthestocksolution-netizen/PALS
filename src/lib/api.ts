import { products } from '@/data/products';
import { searchSuggestions } from '@/data/search';
import type { Product, FilterState, SortOption } from '@/types';
import type { SearchSuggestion } from '@/data/search';

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/* ─── Products ─── */

export interface ProductsParams {
  filters: FilterState;
  sort:    SortOption;
  page:    number;
  pageSize?: number;
}

export interface ProductsResult {
  items:   Product[];
  total:   number;
  hasMore: boolean;
}

export async function fetchProducts(params: ProductsParams): Promise<ProductsResult> {
  await delay(320);
  const { filters, sort, page, pageSize = 9 } = params;

  let list = [...products];

  if (filters.categories.length)
    list = list.filter((p) => filters.categories.includes(p.category));
  if (filters.sizes.length)
    list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
  if (filters.colors.length)
    list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
  if (filters.brands?.length)
    list = list.filter((p) => filters.brands!.includes(p.brand ?? ''));
  if (filters.onSaleOnly)
    list = list.filter((p) => p.isOnSale);

  list = list.filter((p) => p.price >= (filters.priceMin ?? 0) && p.price <= filters.priceMax);

  switch (sort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'popular':    list.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)); break;
    case 'sale':       list = list.filter((p) => p.isOnSale); break;
    case 'newest':
      list = [...list.filter((p) => p.isNew), ...list.filter((p) => !p.isNew)]; break;
  }

  const total = list.length;
  const items = list.slice(0, page * pageSize);
  return { items, total, hasMore: items.length < total };
}

/* ─── Single product ─── */

export async function fetchProduct(slug: string): Promise<Product | null> {
  await delay(200);
  return products.find((p) => p.slug === slug) ?? null;
}

/* ─── Order tracking ─── */

export interface TrackOrderParams  { orderId: string }
export interface TrackStep         { label: string; done: boolean; timestamp?: string }
export interface TrackOrderResult  {
  orderId: string;
  status:  'found' | 'not_found';
  steps:   TrackStep[];
}

export async function trackOrder(params: TrackOrderParams): Promise<TrackOrderResult> {
  await delay(900);

  if (!params.orderId.match(/^PALS-/i)) {
    return { orderId: params.orderId, status: 'not_found', steps: [] };
  }

  return {
    orderId: params.orderId,
    status:  'found',
    steps: [
      { label: 'Order Placed',          done: true,  timestamp: '2 days ago'  },
      { label: 'Payment Confirmed',     done: true,  timestamp: '2 days ago'  },
      { label: 'Packed & Dispatched',   done: true,  timestamp: 'Yesterday'   },
      { label: 'Out for Delivery',      done: false                            },
      { label: 'Delivered',             done: false                            },
    ],
  };
}

/* ─── Newsletter ─── */

export async function subscribeNewsletter(email: string): Promise<{ success: boolean }> {
  await delay(650);
  return { success: true };
}

/* ─── Contact ─── */

export interface ContactPayload {
  name: string; email: string; subject: string; message: string;
}

export async function submitContact(data: ContactPayload): Promise<{ success: boolean }> {
  await delay(700);
  return { success: true };
}

/* ─── Search suggestions ─── */

export async function fetchSuggestions(query: string): Promise<SearchSuggestion[]> {
  await delay(140);
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return searchSuggestions
    .filter((s) => s.label.toLowerCase().includes(q) || s.sub.toLowerCase().includes(q))
    .slice(0, 8);
}
