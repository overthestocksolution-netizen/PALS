'use client';

import React, { useState } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';
import ProductCard from '@/components/shop/ProductCard/ProductCard';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { formatDate } from '@/utils/formatters';
import { formatPKR } from '@/utils/currency';
import styles from './AccountPage.module.css';

type Tab = 'orders' | 'wishlist' | 'profile' | 'addresses';

const MOCK_ORDERS = [
  { id: 'a1b2c3d4', date: new Date('2025-04-10'), items: 3, total: 18900, status: 'Delivered' },
  { id: 'e5f6g7h8', date: new Date('2025-03-22'), items: 1, total: 9800,  status: 'In Transit' },
  { id: 'i9j0k1l2', date: new Date('2025-02-05'), items: 2, total: 12500, status: 'Processing' },
];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('orders');
  const wishlistItems = useWishlistStore((s) => s.items);

  const statusClass = (s: string) => {
    if (s === 'Delivered')  return styles.statusDelivered;
    if (s === 'In Transit') return styles.statusTransit;
    return styles.statusProcessing;
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <aside className={styles.sidebar}>
          <h1 className={styles.heading}>My Account</h1>
          <nav className={styles.nav}>
            {(['orders', 'wishlist', 'profile', 'addresses'] as Tab[]).map((t) => (
              <button
                key={t}
                className={`${styles.navBtn} ${tab === t ? styles.navBtnActive : ''}`}
                onClick={() => setTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </nav>
        </aside>
        <div className={styles.content}>
          {tab === 'orders' && (
            <section>
              <h2 className={styles.tabTitle}>Orders</h2>
              <div className={styles.table}>
                <div className={styles.tableHeader}>
                  <span>Order #</span>
                  <span>Date</span>
                  <span>Items</span>
                  <span>Total</span>
                  <span>Status</span>
                </div>
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className={styles.tableRow}>
                    <span className={styles.orderId}>PALS-{order.id.slice(0, 8).toUpperCase()}</span>
                    <span>{formatDate(order.date)}</span>
                    <span>{order.items} items</span>
                    <span>{formatPKR(order.total)}</span>
                    <span className={`${styles.status} ${statusClass(order.status)}`}>{order.status}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === 'wishlist' && (
            <section>
              <h2 className={styles.tabTitle}>Wishlist</h2>
              {wishlistItems.length === 0 ? (
                <p className={styles.empty}>Your wishlist is empty.</p>
              ) : (
                <div className={styles.wishlistGrid}>
                  {wishlistItems.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </section>
          )}

          {tab === 'profile' && (
            <section>
              <h2 className={styles.tabTitle}>Profile</h2>
              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGrid}>
                  <Input label="Full Name"     type="text"  underlineOnly placeholder="Jane Smith"    />
                  <Input label="Email"         type="email" underlineOnly placeholder="you@email.com" />
                  <Input label="Phone"         type="tel"   underlineOnly placeholder="+92 300 0000000" />
                  <Input label="Date of Birth" type="date"  underlineOnly                              />
                </div>
                <h3 className={styles.subsection}>Change Password</h3>
                <div className={styles.formGrid}>
                  <Input label="Current Password" type="password" underlineOnly placeholder="••••••••" />
                  <Input label="New Password"      type="password" underlineOnly placeholder="••••••••" />
                </div>
                <Button type="submit">Save Changes →</Button>
              </form>
            </section>
          )}

          {tab === 'addresses' && (
            <section>
              <h2 className={styles.tabTitle}>Addresses</h2>
              <div className={styles.addressGrid}>
                <div className={styles.addressCard}>
                  <p className={styles.addressName}>Home</p>
                  <p className={styles.addressText}>123 Fashion Lane, Gulberg III</p>
                  <p className={styles.addressText}>Lahore, 54000</p>
                  <div className={styles.addressActions}>
                    <button className={styles.addressBtn}>Edit</button>
                    <button className={styles.addressBtn}>Delete</button>
                  </div>
                </div>
                <button className={styles.addAddress}>
                  + Add New Address
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
