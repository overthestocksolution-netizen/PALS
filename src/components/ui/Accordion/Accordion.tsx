'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Accordion.module.css';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
}

export default function Accordion({ items, defaultOpen = -1 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  return (
    <div className={styles.wrapper}>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <button
            className={styles.trigger}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            aria-expanded={openIndex === i}
          >
            <span className={styles.title}>{item.title}</span>
            <span className={`${styles.icon} ${openIndex === i ? styles.iconOpen : ''}`}>
              —
            </span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className={styles.contentWrapper}
              >
                <div className={styles.content}>{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
