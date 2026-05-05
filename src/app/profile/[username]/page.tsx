'use client';
import Link from 'next/link';
import { useState } from 'react';
import { palsImageLibrary } from '@/constants/palsImageLibrary';
import { palsProducts, palsSellers } from '@/data/palsProducts';
import ProductCard from '@/components/pals/ProductCard/ProductCard';
import styles from './page.module.css';

const FILTER_TABS = ['Store', 'Likes'] as const;
const FILTER_BTNS = ['Category', 'Brand', 'Price', 'Size', 'Condition'] as const;
type Tab = typeof FILTER_TABS[number];

export default function ProfilePage({ params }: { params: { username: string } }) {
  const seller = palsSellers.find((item) => item.username === params.username) ?? {
    username: params.username,
    displayName: params.username,
    location: 'Pakistan',
    isPro: false,
    rating: 0,
    sold: 0,
    followers: 0,
    following: 0,
    bio: '',
    avatar: '',
    products: [],
  };

  const sellerProducts = palsProducts.filter((product) => product.seller === params.username);
  const [tab, setTab] = useState<Tab>('Store');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [following, setFollowing] = useState(false);

  return (
    <div>
      <div className={styles.borderSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              {seller.avatar ? (
                <img src={seller.avatar} alt={seller.displayName} className={styles.avatarImage} />
              ) : (
                <div className={styles.avatarFallback}>{seller.displayName[0].toUpperCase()}</div>
              )}
            </div>

            <div className={styles.info}>
              <div className={styles.titleRow}>
                <h1 className={styles.name}>{seller.displayName}</h1>
                {seller.isPro && <span className="badge-new">PRO</span>}
                <span className={styles.location}>{seller.location}</span>
              </div>

              <div className={styles.stats}>
                {[
                  { label: 'sold', value: seller.sold },
                  { label: 'rating', value: seller.rating > 0 ? `${seller.rating.toFixed(1)}*` : '-' },
                  { label: 'followers', value: seller.followers >= 1000 ? `${(seller.followers / 1000).toFixed(1)}k` : seller.followers },
                  { label: 'following', value: seller.following },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className={styles.statValue}>{stat.value}</p>
                    <p className={styles.statLabel}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {seller.bio && <p className={styles.bio}>{seller.bio}</p>}
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => setFollowing(!following)}
                className={`${styles.followButton} ${following ? styles.followButtonActive : ''}`}
              >
                {following ? 'FOLLOWING' : 'FOLLOW'}
              </button>
              {seller.isPro && <span className={styles.proBadge}>PRO</span>}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.borderSection}>
        <div className={styles.container}>
          <div className={styles.tabs}>
            {FILTER_TABS.map((value) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={`${styles.tabButton} ${tab === value ? styles.tabButtonActive : ''}`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab === 'Store' && (
        <div className={styles.filterSection}>
          <div className={styles.container}>
            <div className={styles.filters}>
              {FILTER_BTNS.map((button) => (
                <button
                  key={button}
                  onClick={() => setActiveFilter(activeFilter === button ? null : button)}
                  className={`${styles.filterButton} ${activeFilter === button ? styles.filterButtonActive : ''}`}
                >
                  {button} {activeFilter === button ? '▲' : '▼'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.containerContent}>
        {tab === 'Store' && (
          <>
            {sellerProducts.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyMedia}>
                  <img src={palsImageLibrary.content.story1} alt="Empty store" className={styles.emptyImage} />
                </div>
                <p className={styles.emptyTitle}>No items listed yet</p>
                {params.username === 'me' && (
                  <Link href="/sell" className={`btn-pals-primary ${styles.emptyButton}`}>LIST YOUR FIRST ITEM -&gt;</Link>
                )}
              </div>
            ) : (
              <>
                <p className={styles.itemCount}>{sellerProducts.length} items</p>
                <div className={styles.grid}>
                  {sellerProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              </>
            )}
          </>
        )}

        {tab === 'Likes' && (
          <div className={styles.emptyState}>
            <div className={styles.emptyMedia}>
              <img src={palsImageLibrary.content.story3} alt="No liked items" className={styles.emptyImage} />
            </div>
            <p className={styles.likesTitle}>No liked items</p>
          </div>
        )}
      </div>
    </div>
  );
}
