'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { registerSchema, type RegisterValues } from '@/lib/schemas';
import styles from './RegisterPage.module.css';

async function registerUser(data: RegisterValues) {
  await new Promise((r) => setTimeout(r, 900));
  return { success: true, userId: 'u_' + Date.now() };
}

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setTimeout(() => { window.location.href = '/login'; }, 1200);
    },
  });

  if (isSuccess) {
    return (
      <div className={styles.page}>
        <div className={styles.formPane} style={{ width: '100%' }}>
          <div className={styles.formInner}>
            <Link href="/" className={styles.logo}>PALS</Link>
            <h1 className={styles.heading}>Account created!</h1>
            <p className={styles.subtext}>Redirecting you to sign in…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.imagePane}>
        <Image
          src="/assets/Pals%20imgs/alyssa-strohmann-TS--uNw-JqE-unsplash.jpg"
          alt="PALS fashion editorial"
          fill priority sizes="50vw"
          className={styles.bgImage}
        />
      </div>

      <div className={styles.formPane}>
        <div className={styles.formInner}>
          <Link href="/" className={styles.logo}>PALS</Link>
          <h1 className={styles.heading}>Create account</h1>
          <p className={styles.subtext}>Join the PALS community</p>

          {isError && (
            <div className={styles.formError} role="alert">
              {error instanceof Error ? error.message : 'Registration failed. Please try again.'}
            </div>
          )}

          <form onSubmit={handleSubmit((v) => mutate(v))} className={styles.form} noValidate>
            <Input
              label="Full Name"
              type="text"
              id="name"
              underlineOnly
              placeholder="Jane Smith"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Email"
              type="email"
              id="email"
              underlineOnly
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className={styles.passwordWrap}>
              <Input
                label="Password"
                type={showPw ? 'text' : 'password'}
                id="password"
                underlineOnly
                placeholder="Create a password (min 6 chars)"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPw((p) => !p)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </div>

            <Input
              label="Confirm Password"
              type={showPw ? 'text' : 'password'}
              id="confirmPassword"
              underlineOnly
              placeholder="Repeat your password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <label className={styles.agreeLabel}>
              <input
                type="checkbox"
                className={`${styles.checkbox} ${errors.agreed ? styles.checkboxError : ''}`}
                {...register('agreed')}
              />
              <span>
                I agree to{' '}
                <Link href="/terms-of-service" className={styles.policyLink}>Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy-policy" className={styles.policyLink}>Privacy Policy</Link>
              </span>
            </label>
            {errors.agreed && (
              <span className={styles.agreeError}>{errors.agreed.message}</span>
            )}

            <Button type="submit" fullWidth size="lg" disabled={isPending}>
              {isPending ? 'Creating account…' : 'Create Account →'}
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
