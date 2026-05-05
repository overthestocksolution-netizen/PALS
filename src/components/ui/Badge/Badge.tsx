import React from 'react';
import styles from './Badge.module.css';

type BadgeType = 'new' | 'sale' | 'soldOut' | 'status';

interface BadgeProps {
  type: BadgeType;
  label?: string;
}

const defaultLabels: Record<BadgeType, string> = {
  new: 'NEW',
  sale: 'SALE',
  soldOut: 'SOLD OUT',
  status: 'STATUS',
};

export default function Badge({ type, label }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[type]}`}>
      {label ?? defaultLabels[type]}
    </span>
  );
}
