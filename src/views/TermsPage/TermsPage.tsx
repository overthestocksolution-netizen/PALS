import React from 'react';
import styles from './TermsPage.module.css';

const SECTIONS = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: 'By accessing or using PALS, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use our services. We reserve the right to update these terms at any time.',
  },
  {
    id: 'use-of-service',
    title: 'Use of Service',
    content: 'You may use PALS only for lawful purposes and in accordance with these Terms. You agree not to use our platform to engage in any activity that is harmful, fraudulent, or illegal. Accounts found to be in violation will be suspended without notice.',
  },
  {
    id: 'purchases',
    title: 'Purchases & Payments',
    content: 'All purchases on PALS are final unless the item materially differs from its description. Payment is processed at the time of purchase through our approved payment partners. Prices are listed in PKR and are subject to change. We are not responsible for currency conversion fees charged by your bank.',
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    content: 'We offer a 7-day return window for items that are significantly not as described. To initiate a return, contact our support team within 7 days of receiving your order. Refunds are processed within 5–7 business days back to the original payment method.',
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: 'All content on PALS, including but not limited to text, graphics, logos, and software, is the property of PALS or its content suppliers and is protected by Pakistani and international copyright laws. You may not reproduce or redistribute any content without our express written permission.',
  },
  {
    id: 'limitation',
    title: 'Limitation of Liability',
    content: 'PALS shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, our services. Our total liability to you for any damages shall not exceed the amount you paid to PALS in the 12 months preceding the claim.',
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: 'These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be submitted to the exclusive jurisdiction of the courts of Lahore, Pakistan.',
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days notice prior to any new terms taking effect. Your continued use of the service after such changes constitutes your acceptance of the new Terms.',
  },
  {
    id: 'contact',
    title: 'Contact',
    content: 'For questions about these Terms, please contact us at legal@palsfashion.pk.',
  },
];

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <aside className={styles.toc}>
          <h2 className={styles.tocTitle}>Contents</h2>
          <nav>
            <ul className={styles.tocList}>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={styles.tocLink}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className={styles.content}>
          <h1 className={styles.heading}>Terms of Service</h1>
          <p className={styles.updated}>Last updated: May 1, 2025</p>
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{s.title}</h2>
              <p className={styles.sectionText}>{s.content}</p>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
