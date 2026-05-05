'use client';

import React, { forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  underlineOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, underlineOnly = false, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className={`${styles.wrapper} ${underlineOnly ? styles.underline : styles.boxed} ${className ?? ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${styles.input} ${error ? styles.hasError : ''}`}
          {...props}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
