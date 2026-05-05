import React from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';
import styles from './SustainabilityPage.module.css';

const STATS = [
  { number: '70%',  label: 'Of our sellers choose sustainable packaging' },
  { number: '100%', label: 'Carbon-offset shipping by 2026' },
  { number: '2030', label: 'Our year to become fully circular' },
];

const PILLARS = [
  {
    title: 'Materials',
    text: 'We encourage sellers to disclose material composition and favor natural, organic, and recycled textiles. Our dedicated "Sustainable" filter makes it easy for buyers to shop consciously.',
  },
  {
    title: 'Production',
    text: 'Every brand on PALS is vetted for labor practices. We have zero tolerance for exploitative supply chains and actively partner with brands that pay fair wages.',
  },
  {
    title: 'Packaging',
    text: 'We\'ve partnered with EcoPack to provide our sellers with biodegradable packaging at cost. Over 70% of PALS deliveries now arrive in compostable mailers.',
  },
];

export default function SustainabilityPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <Image
          src="/assets/Pals%20imgs/omar-prestwich-jLEGurepDco-unsplash.jpg"
          alt="Sustainability — PALS commitment to the planet"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Fashion Forward,<br />Planet First.</h1>
        </div>
      </div>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <div className={styles.stat}>
                <p className={styles.statNumber}>{s.number}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className={styles.pillars}>
        <div className={styles.pillarsInner}>
          <ScrollReveal>
            <h2 className={styles.pillarsTitle}>Our Commitments</h2>
          </ScrollReveal>
          <div className={styles.pillarsGrid}>
            {PILLARS.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className={styles.pillar}>
                  <div className={styles.pillarBorder} />
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarText}>{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className={styles.quoteSection}>
        <blockquote className={styles.blockquote}>
          &ldquo;The most sustainable garment is the one already in someone&apos;s wardrobe.&rdquo;
        </blockquote>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <ScrollReveal>
          <Link href="/assets/sustainability-report.pdf" target="_blank">
            <Button variant="outline" size="lg">
              Read our Full Report →
            </Button>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
