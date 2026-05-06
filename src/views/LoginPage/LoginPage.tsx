'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { loginSchema, type LoginValues } from '@/lib/schemas';
import styles from './LoginPage.module.css';

async function loginUser(data: LoginValues) {
  await new Promise((r) => setTimeout(r, 800));
  if (data.email === 'error@test.com') throw new Error('Invalid credentials');
  return { success: true };
}

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      window.location.href = '/';
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.imagePane}>
        <Image
          src="/assets/Pals%20imgs/sincerely-media-9ShY-Tq70Mc-unsplash.jpg"
          alt="PALS fashion editorial"
          fill priority sizes="50vw"
          className={styles.bgImage}
        />
      </div>

      <div className={styles.formPane}>
        <div className={styles.formInner}>
          <Link href="/" className={styles.logo}>PALS</Link>
          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.subtext}>Sign in to your account</p>

          {isError && (
            <div className={styles.formError} role="alert">
              {error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
            </div>
          )}

          <form onSubmit={handleSubmit((v) => mutate(v))} className={styles.form} noValidate>
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
                placeholder="Your password"
                autoComplete="current-password"
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

            <div className={styles.row}>
              <label className={styles.rememberLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={isPending}>
              {isPending ? 'Signing in…' : 'Sign In →'}
            </Button>
          </form>

          <div className={styles.dividerRow}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>or</span>
            <span className={styles.dividerLine} />
          </div>

          <div className={styles.socialRow}>
            <button className={styles.socialBtn} aria-label="Continue with Google" type="button">
              <GoogleIcon /> Google
            </button>
            <button className={styles.socialBtn} aria-label="Continue with Facebook" type="button">
              <FacebookIcon /> Facebook
            </button>
          </div>

          <p className={styles.registerLink}>
            Don&apos;t have an account?{' '}
            <Link href="/register">Register →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
