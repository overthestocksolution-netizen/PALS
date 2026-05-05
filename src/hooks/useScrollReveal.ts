'use client';

import { useIntersectionObserver } from './useIntersectionObserver';

export function useScrollReveal<T extends Element>(threshold = 0.15) {
  return useIntersectionObserver<T>({ threshold, once: true });
}
