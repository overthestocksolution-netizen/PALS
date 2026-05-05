import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  variant?: 'line' | 'card' | 'circle' | 'rect';
  className?: string;
}

export default function Skeleton({ variant = 'line', className }: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className ?? ''}`}
      aria-hidden="true"
    />
  );
}
