export const trendingSearches = [
  'Oversized Blazer',
  'Linen Shirt',
  'Cargo Pants',
  'Kurta Shalwar',
  'White Sneakers',
  'Denim Jacket',
  'Formal Trousers',
  'Silk Dupatta',
];

export type SuggestionType = 'category' | 'product' | 'brand' | 'style';

export interface SearchSuggestion {
  type: SuggestionType;
  label: string;
  sub: string;
  href: string;
}

export const searchSuggestions: SearchSuggestion[] = [
  // Categories
  { type: 'category', label: 'Men',         sub: '8,421 items',  href: '/shop?cat=men' },
  { type: 'category', label: 'Women',       sub: '12,340 items', href: '/shop?cat=women' },
  { type: 'category', label: 'Accessories', sub: '3,210 items',  href: '/shop?cat=accessories' },
  { type: 'category', label: 'Sale',        sub: '2,103 items',  href: '/shop?cat=sale' },
  { type: 'category', label: 'New In',      sub: 'Just arrived', href: '/shop?sort=newest' },

  // Products
  { type: 'product', label: 'Oversized Linen Blazer',    sub: 'Menswear',    href: '/shop/oversized-linen-blazer' },
  { type: 'product', label: 'Slim Fit Chino Trousers',   sub: 'Menswear',    href: '/shop/slim-fit-chino-trousers' },
  { type: 'product', label: 'Ribbed Turtleneck Sweater', sub: 'Menswear',    href: '/shop/ribbed-turtleneck-sweater' },
  { type: 'product', label: 'Floral Wrap Dress',         sub: 'Womenswear',  href: '/shop/floral-wrap-dress' },
  { type: 'product', label: 'Structured Leather Tote',   sub: 'Accessories', href: '/shop/structured-leather-tote' },
  { type: 'product', label: 'Classic White Kurta',       sub: 'Menswear',    href: '/shop/classic-white-kurta' },
  { type: 'product', label: 'Embroidered Lawn Suit',     sub: 'Womenswear',  href: '/shop/embroidered-lawn-suit' },

  // Styles / edits
  { type: 'style', label: 'Linen Shirts',     sub: 'Style Edit',            href: '/shop?q=linen+shirt' },
  { type: 'style', label: 'Cargo Pants',      sub: 'Style Edit',            href: '/shop?q=cargo+pants' },
  { type: 'style', label: 'White Sneakers',   sub: 'Footwear',              href: '/shop?q=white+sneakers' },
  { type: 'style', label: 'Denim Jacket',     sub: 'Style Edit',            href: '/shop?q=denim+jacket' },
  { type: 'style', label: 'Kurta Shalwar',    sub: 'Pakistani Traditional', href: '/shop?q=kurta+shalwar' },
  { type: 'style', label: 'Shalwar Kameez',   sub: 'Pakistani Traditional', href: '/shop?q=shalwar+kameez' },
  { type: 'style', label: 'Formal Trousers',  sub: "Men's Formals",         href: '/shop?q=formal+trousers' },
  { type: 'style', label: 'Silk Dupatta',     sub: "Women's Ethnic",        href: '/shop?q=silk+dupatta' },
  { type: 'style', label: 'Blazer',           sub: 'Outerwear',             href: '/shop?q=blazer' },
  { type: 'style', label: 'Turtleneck',       sub: 'Tops',                  href: '/shop?q=turtleneck' },

  // Brands
  { type: 'brand', label: 'Bonanza Satrangi', sub: 'Brand', href: '/brands/bonanza' },
  { type: 'brand', label: 'Khaadi',           sub: 'Brand', href: '/brands/khaadi' },
  { type: 'brand', label: 'Outfitters',       sub: 'Brand', href: '/brands/outfitters' },
  { type: 'brand', label: 'Alkaram Studio',   sub: 'Brand', href: '/brands/alkaram' },
  { type: 'brand', label: 'Gul Ahmed',        sub: 'Brand', href: '/brands/gul-ahmed' },
];
