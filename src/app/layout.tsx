import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer/CartDrawer';

export const metadata: Metadata = {
  title: 'PALS — Buy for Less. Sell for True.',
  description:
    "Pakistan's premier fashion marketplace. Buy and sell preloved designer pieces, streetwear, and vintage finds.",
  keywords:
    'fashion, marketplace, preloved, Pakistan, buy sell clothes, streetwear, designer',
  openGraph: {
    title: "PALS — Pakistan's Fashion Marketplace",
    description: 'Buy for Less. Sell for True. Comment for fashion.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main-content" className="skipLink">Skip to content</a>
        <Header />
        <CartDrawer />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
