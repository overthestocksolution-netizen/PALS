'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className={styles.page}>
      <div className={styles.imagePane}>
        <Image
          src="/assets/Pals%20imgs/alyssa-strohmann-TS--uNw-JqE-unsplash.jpg"
          alt="PALS fashion editorial"
          fill
          priority
          sizes="50vw"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.formPane}>
        <div className={styles.formInner}>
          <Link href="/" className={styles.logo}>PALS</Link>
          <h1 className={styles.heading}>Create account</h1>
          <p className={styles.subtext}>Join the PALS community</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <Input label="Full Name" type="text" id="fullName" underlineOnly placeholder="Jane Smith" required autoComplete="name" />
            <Input label="Email" type="email" id="email" underlineOnly placeholder="you@example.com" required autoComplete="email" />
            <Input label="Password" type="password" id="password" underlineOnly placeholder="Create a password" required autoComplete="new-password" />
            <Input label="Confirm Password" type="password" id="confirmPassword" underlineOnly placeholder="Repeat your password" required autoComplete="new-password" />

            <label className={styles.agreeLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <span>
                I agree to{' '}
                <Link href="/terms-of-service" className={styles.policyLink}>Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy-policy" className={styles.policyLink}>Privacy Policy</Link>
              </span>
            </label>

            <Button type="submit" fullWidth size="lg" disabled={!agreed}>
              Create Account →
            </Button>
          </form>

          <p className={styles.signInLink}>
            Already have an account?{' '}
            <Link href="/login">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
