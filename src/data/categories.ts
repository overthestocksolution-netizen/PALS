import type { Category } from '@/types';

const P = '/assets/Pals%20imgs';

export const categories: Category[] = [
  { name: 'Men',         count: '8,421',  href: '/shop?cat=men',         image: `${P}/dom-hill-nimElTcTNyY-unsplash.jpg`           },
  { name: 'Women',       count: '12,340', href: '/shop?cat=women',       image: `${P}/irene-kredenets-dwKiHoqqxk8-unsplash.jpg`    },
  { name: 'Accessories', count: '3,210',  href: '/shop?cat=accessories', image: `${P}/heather-ford-5gkYsrH_ebY-unsplash.jpg`       },
  { name: 'Brands',      count: '245',    href: '/brands',               image: `${P}/burgess-milner-OYYE4g-I5ZQ-unsplash.jpg`     },
  { name: 'Trending',    count: '1,890',  href: '/shop?sort=newest',     image: `${P}/milada-vigerova-p8Drpg_duLw-unsplash.jpg`    },
  { name: 'Sale',        count: '2,103',  href: '/shop?cat=sale',        image: `${P}/anomaly-WWesmHEgXDs-unsplash.jpg`            },
];
