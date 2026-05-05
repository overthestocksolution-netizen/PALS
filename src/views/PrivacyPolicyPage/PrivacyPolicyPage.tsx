import React from 'react';
import styles from './PrivacyPolicyPage.module.css';

const SECTIONS = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, phone number, shipping address, and payment information. We also collect information automatically when you use our services, including log data, device information, and cookies.',
  },
  {
    id: 'how-we-use',
    title: 'How We Use Information',
    content: 'We use the information we collect to provide, maintain, and improve our services; process transactions and send related information, including purchase confirmations and invoices; send promotional communications (you may opt out at any time); and respond to your comments, questions, and customer service requests.',
  },
  {
    id: 'data-storage',
    title: 'Data Storage',
    content: 'Your information is stored on secure servers located in Pakistan and, in some cases, internationally. We retain your personal information for as long as necessary to provide our services and comply with our legal obligations. You may request deletion of your data at any time by contacting us.',
  },
  {
    id: 'third-party',
    title: 'Third-Party Services',
    content: 'We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing, data analysis, email delivery, and hosting. We do not sell your personal information to third parties for their own marketing purposes.',
  },
  {
    id: 'cookies',
    title: 'Cookies',
    content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some features of our service may not function properly.',
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: 'You have the right to access, update, or delete the information we hold about you. You may also have the right to restrict or object to certain types of processing of your information. To exercise these rights, please contact us at privacy@palsfashion.pk.',
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: 'If you have any questions about this Privacy Policy, please contact us at privacy@palsfashion.pk or write to us at PALS Fashion, 123 The Mall Road, Lahore, 54000, Pakistan.',
  },
];

export default function PrivacyPolicyPage() {
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
          <h1 className={styles.heading}>Privacy Policy</h1>
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
