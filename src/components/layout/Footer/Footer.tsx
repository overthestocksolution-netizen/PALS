import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { footerShopLinks, footerHelpLinks, footerLegalLinks } from '@/data/navigation';
import { paymentLogos } from '@/data/payment';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ghostBrand} aria-hidden="true">PALS</div>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="PALS - go to homepage">
              <Image
                src="/assets/logos/pals logo white.svg"
                alt="PALS"
                width={128}
                height={34}
                className={styles.logoImage}
              />
            </Link>
            <p className={styles.tagline}>
              Buy for Less. Sell for True.<br />
              Pakistan&apos;s premier fashion marketplace.
            </p>
            <div className={styles.brandImageWrap}>
              <Image
                src="/assets/Pals%20imgs/caio-coelho-QRN47la37gw-unsplash.jpg"
                alt="PALS fashion editorial"
                width={420}
                height={520}
                className={styles.brandImage}
              />
            </div>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
                <InstagramIcon />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={styles.socialLink}>
                <TikTokIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className={styles.socialLink}>
                <TwitterIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div className={styles.col}>
            <h3 className={styles.colHeading}>Shop</h3>
            <ul className={styles.linkList}>
              {footerShopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help column */}
          <div className={styles.col}>
            <h3 className={styles.colHeading}>Help</h3>
            <ul className={styles.linkList}>
              {footerHelpLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div className={styles.col}>
            <h3 className={styles.colHeading}>Legal</h3>
            <ul className={styles.linkList}>
              {footerLegalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>(c) 2025 PALS. All rights reserved.</p>
          <div className={styles.paymentLogos}>
            {paymentLogos.map((logo) => (
              <div key={logo.name} className={styles.paymentBadge}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={60}
                  height={26}
                  className={styles.paymentLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.93a8.22 8.22 0 0 0 4.83 1.55V7.04a4.85 4.85 0 0 1-1.07-.35z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
