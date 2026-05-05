'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { navLinks } from '@/data/navigation';
import SearchOverlay from '@/components/layout/SearchOverlay/SearchOverlay';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const { setCartOpen, mobileMenuOpen, setMobileMenu } = useUIStore();
  const itemCount = useCartStore((s) => s.itemCount());
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) setMobileMenu(false);
  }, [searchOpen, setMobileMenu]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="PALS — go to homepage">
            <Image
              src="/assets/logos/pals Logo black.svg"
              alt="PALS"
              width={110}
              height={30}
              className={styles.logoImage}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href} className={styles.navItem}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className={styles.badge}>{link.badge}</span>
                    )}
                    {link.dropdown && (
                      <span className={styles.chevron} aria-hidden="true">
                        <ChevronSvg />
                      </span>
                    )}
                  </Link>

                  {link.dropdown && (
                    <div className={styles.dropdown}>
                      <ul className={styles.dropdownList}>
                        {link.dropdown.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className={styles.dropdownLink}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                        <li className={styles.dropdownFooter}>
                          <Link href={link.href} className={styles.dropdownViewAll}>
                            View all {link.label} →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Icon actions */}
          <div className={styles.icons}>
            <button
              className={`${styles.iconBtn} ${searchOpen ? styles.iconBtnActive : ''}`}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? <XSvg /> : <SearchSvg />}
            </button>
            <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
              <HeartSvg />
            </Link>
            <Link href="/account" className={styles.iconBtn} aria-label="My account">
              <UserSvg />
            </Link>
            <button
              className={styles.iconBtn}
              aria-label={`Open cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
              onClick={() => setCartOpen(true)}
            >
              <CartSvg />
              {itemCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Divider before login */}
            <span className={styles.iconDivider} aria-hidden="true" />

            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>

            <button
              className={`${styles.iconBtn} ${styles.hamburger}`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenu(!mobileMenuOpen)}
            >
              <HamburgerSvg open={mobileMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <button
              className={styles.mobileClose}
              onClick={() => setMobileMenu(false)}
              aria-label="Close menu"
            >
              <XSvg />
            </button>

            <Link href="/" className={styles.mobileLogo} onClick={() => setMobileMenu(false)} aria-label="PALS">
              <Image
                src="/assets/logos/pals Logo black.svg"
                alt="PALS"
                width={100}
                height={28}
                className={styles.logoImage}
              />
            </Link>

            {/* Mobile search bar */}
            <button
              className={styles.mobileSearchBtn}
              onClick={() => { setMobileMenu(false); setSearchOpen(true); }}
            >
              <SearchSvg />
              <span>Search styles, brands…</span>
            </button>

            <nav>
              <ul className={styles.mobileNavList}>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className={styles.mobileNavLink}
                      onClick={() => setMobileMenu(false)}
                    >
                      <span>{link.label}</span>
                      {link.badge && <span className={styles.mobileBadge}>{link.badge}</span>}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.08 }}
                >
                  <Link href="/login" className={styles.mobileNavLink} onClick={() => setMobileMenu(false)}>
                    Login
                  </Link>
                </motion.li>
              </ul>
            </nav>

            <div className={styles.mobileCard}>
              <Image
                src="/assets/Pals%20imgs/alyssa-strohmann-TS--uNw-JqE-unsplash.jpg"
                alt="PALS fashion edit"
                width={320}
                height={380}
                className={styles.mobileCardImage}
              />
              <div className={styles.mobileCardBody}>
                <p className={styles.mobileCardEyebrow}>PALS Edit — SS 2025</p>
                <p className={styles.mobileCardTitle}>Curated looks, cleaner resale.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setMobileMenu(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── SVG icons ─── */
function SearchSvg() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function XSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function HeartSvg() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function UserSvg() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function CartSvg() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

function ChevronSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function HamburgerSvg({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      {open ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16"/>
          <line x1="16" y1="4" x2="4" y2="16"/>
        </>
      ) : (
        <>
          <line x1="2" y1="5" x2="18" y2="5"/>
          <line x1="2" y1="10" x2="18" y2="10"/>
          <line x1="2" y1="15" x2="18" y2="15"/>
        </>
      )}
    </svg>
  );
}
