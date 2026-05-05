export interface DropdownItem { label: string; href: string }
export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  dropdown?: DropdownItem[];
}

export const navLinks: NavLink[] = [
  {
    label: 'Men',
    href: '/shop?cat=men',
    dropdown: [
      { label: 'New Arrivals',     href: '/shop?cat=men&sort=newest' },
      { label: 'T-Shirts & Tops',  href: '/shop?cat=men&sub=tops' },
      { label: 'Shirts',           href: '/shop?cat=men&sub=shirts' },
      { label: 'Trousers & Chinos',href: '/shop?cat=men&sub=trousers' },
      { label: 'Outerwear',        href: '/shop?cat=men&sub=outerwear' },
      { label: 'Footwear',         href: '/shop?cat=men&sub=footwear' },
    ],
  },
  {
    label: 'Women',
    href: '/shop?cat=women',
    dropdown: [
      { label: 'New Arrivals', href: '/shop?cat=women&sort=newest' },
      { label: 'Dresses',      href: '/shop?cat=women&sub=dresses' },
      { label: 'Tops & Blouses',href: '/shop?cat=women&sub=tops' },
      { label: 'Kurtas',       href: '/shop?cat=women&sub=kurtas' },
      { label: 'Outerwear',    href: '/shop?cat=women&sub=outerwear' },
      { label: 'Footwear',     href: '/shop?cat=women&sub=footwear' },
    ],
  },
  {
    label: 'Accessories',
    href: '/shop?cat=accessories',
    dropdown: [
      { label: 'Bags & Wallets', href: '/shop?cat=accessories&sub=bags' },
      { label: 'Watches',        href: '/shop?cat=accessories&sub=watches' },
      { label: 'Belts',          href: '/shop?cat=accessories&sub=belts' },
      { label: 'Sunglasses',     href: '/shop?cat=accessories&sub=sunglasses' },
      { label: 'Jewellery',      href: '/shop?cat=accessories&sub=jewellery' },
    ],
  },
  { label: 'Brands',  href: '/brands' },
  { label: 'Sale',    href: '/shop?cat=sale',    badge: 'Hot' },
  { label: 'New In',  href: '/shop?sort=newest' },
];

export const footerShopLinks = [
  { label: 'Men',         href: '/shop?cat=men'         },
  { label: 'Women',       href: '/shop?cat=women'       },
  { label: 'Accessories', href: '/shop?cat=accessories' },
  { label: 'Brands',      href: '/brands'               },
  { label: 'Trending',    href: '/shop?cat=trending'    },
  { label: 'Sale',        href: '/shop?cat=sale'        },
  { label: 'New In',      href: '/shop?sort=newest'     },
];

export const footerHelpLinks = [
  { label: 'About',       href: '/about'       },
  { label: 'Contact',     href: '/contact'     },
  { label: 'Size Guide',  href: '/size-guide'  },
  { label: 'Track Order', href: '/track-order' },
  { label: 'FAQ',         href: '/faq'         },
  { label: 'Returns',     href: '/returns'     },
];

export const footerLegalLinks = [
  { label: 'Sustainability',   href: '/sustainability'    },
  { label: 'Press',            href: '/press'             },
  { label: 'Privacy Policy',   href: '/privacy-policy'   },
  { label: 'Terms of Service', href: '/terms-of-service' },
];
