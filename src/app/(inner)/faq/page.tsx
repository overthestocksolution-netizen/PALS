import React from 'react';
import styles from './page.module.css';

const FAQS = [
  {
    section: 'Buying',
    items: [
      { q: 'How do I place an order?', a: 'Browse the shop, add items to your cart, and proceed to checkout. We accept JazzCash, EasyPaisa, Visa, and Mastercard.' },
      { q: 'Are all products authentic?', a: 'Yes. Every seller on PALS is verified and all listings go through our quality review process before going live.' },
      { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available in major cities.' },
      { q: 'Can I return an item?', a: 'Yes, returns are accepted within 7 days of delivery for most items. See our Returns Policy for full details.' },
      { q: 'What payment methods do you accept?', a: 'We accept JazzCash, EasyPaisa, Visa, Mastercard, and Cash on Delivery in select cities.' },
    ],
  },
  {
    section: 'Selling',
    items: [
      { q: 'How do I start selling on PALS?', a: 'Click "Start Selling" and complete your seller profile. Once verified, you can list items immediately.' },
      { q: 'What commission does PALS charge?', a: 'PALS charges a 10% commission on each successful sale. There are no listing fees.' },
      { q: 'When do I get paid?', a: 'Payments are released within 3 business days after the buyer confirms receipt of the order.' },
      { q: 'What can I sell on PALS?', a: 'You can sell clothing, footwear, accessories, and bags. All items must be authentic and as described.' },
    ],
  },
  {
    section: 'Account',
    items: [
      { q: 'How do I reset my password?', a: 'Go to Login, click "Forgot Password", and enter your email. You will receive a reset link within minutes.' },
      { q: 'Can I have both a buyer and seller account?', a: 'Yes — your PALS account supports both buying and selling from a single profile.' },
      { q: 'How do I delete my account?', a: 'Contact our support team at support@pals.pk and we will process your request within 48 hours.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Support</p>
        <h1 className={styles.title}>Frequently Asked<em> Questions</em></h1>
        <p className={styles.subtitle}>Everything you need to know about buying and selling on PALS.</p>
      </div>

      <div className={styles.content}>
        {FAQS.map((group) => (
          <div key={group.section} className={styles.group}>
            <h2 className={styles.groupTitle}>{group.section}</h2>
            <div className={styles.items}>
              {group.items.map((item) => (
                <div key={item.q} className={styles.item}>
                  <p className={styles.question}>{item.q}</p>
                  <p className={styles.answer}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
