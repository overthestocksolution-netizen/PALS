import React from 'react';
import HeroSlider from '@/components/home/HeroSlider/HeroSlider';
import MarqueeTicker from '@/components/home/MarqueeTicker/MarqueeTicker';
import CategoryStrips from '@/components/home/CategoryStrips/CategoryStrips';
import FeaturedGrid from '@/components/home/FeaturedGrid/FeaturedGrid';
import EditorialStrip from '@/components/home/EditorialStrip/EditorialStrip';
import BrandsRow from '@/components/home/BrandsRow/BrandsRow';
import SellOnPals from '@/components/home/SellOnPals/SellOnPals';
import TrendingSection from '@/components/home/TrendingSection/TrendingSection';
import NewsletterBanner from '@/components/home/NewsletterBanner/NewsletterBanner';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <main id="main-content" className={styles.page}>
      <HeroSlider />
      <MarqueeTicker />
      <CategoryStrips />
      <FeaturedGrid />
      <EditorialStrip />
      <BrandsRow />
      <SellOnPals />
      <TrendingSection />
      <NewsletterBanner />
    </main>
  );
}
