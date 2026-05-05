import React from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal/ScrollReveal';
import styles from './AboutPage.module.css';

const PILLARS = [
  { icon: '◆', title: 'Quality',   text: 'We curate only the finest pieces from the world\'s most respected brands — never compromising on craftsmanship.' },
  { icon: '◈', title: 'Community', text: 'PALS is built on connection. Every transaction is a relationship between people who care about fashion.' },
  { icon: '◇', title: 'Style',     text: 'We believe style is deeply personal — our platform gives you the freedom to express yourself authentically.' },
];

const TEAM = [
  { name: 'Aisha Malik',  role: 'Co-Founder & CEO',         image: '/assets/Pals%20imgs/taylor-dG4Eb_oC5iM-unsplash.jpg' },
  { name: 'Omar Farooq',  role: 'Co-Founder & CTO',         image: '/assets/Pals%20imgs/benjamin-r-ItqFmSxKnIg-unsplash.jpg' },
  { name: 'Sara Ahmed',   role: 'Head of Brand & Editorial', image: '/assets/Pals%20imgs/zoe-NKjIT7u5nXE-unsplash.jpg' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <Image
          src="/assets/Pals%20imgs/priscilla-du-preez-dlxLGIy-2VU-unsplash.jpg"
          alt="PALS brand story — editorial image"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
      </div>

      {/* Pull quote */}
      <ScrollReveal>
        <div className={styles.pullQuote}>
          <p className={styles.quote}>
            &ldquo;Fashion is not just what you wear — it&apos;s how you participate in the world.&rdquo;
          </p>
        </div>
      </ScrollReveal>

      {/* Brand story */}
      <section className={styles.story}>
        <ScrollReveal>
          <div className={styles.storyGrid}>
            <div>
              <h2 className={styles.storyTitle}>Our Story</h2>
              <p className={styles.storyText}>
                PALS began with a simple question: why should fashion be inaccessible? Founded in 2022
                in Lahore, we built a marketplace where Pakistan&apos;s fashion-forward community could
                buy, sell, and connect over the clothes they love.
              </p>
            </div>
            <div>
              <p className={styles.storyText}>
                We believe pre-loved fashion isn&apos;t second-hand — it&apos;s first choice. Every piece
                on PALS has a story, and every sale extends that story to someone new. We&apos;re building
                the future of fashion, one transaction at a time.
              </p>
              <p className={styles.storyText}>
                Today, PALS hosts over 50,000 listings, 24,000 active sellers, and a community of buyers
                who understand that true style is about intention, not price tags.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Pillars */}
      <section className={styles.pillars}>
        <div className={styles.pillarsInner}>
          {PILLARS.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className={styles.pillar}>
                <span className={styles.pillarIcon} aria-hidden="true">{p.icon}</span>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarText}>{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className={styles.team}>
        <div className={styles.teamInner}>
          <ScrollReveal>
            <h2 className={styles.teamHeading}>The Team</h2>
          </ScrollReveal>
          <div className={styles.teamGrid}>
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className={styles.teamCard}>
                  <div className={styles.teamImageWrap}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="33vw"
                      className={styles.teamImage}
                      loading="lazy"
                    />
                  </div>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
