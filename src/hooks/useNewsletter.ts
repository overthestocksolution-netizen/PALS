import { useMutation } from '@tanstack/react-query';
import { subscribeNewsletter } from '@/lib/api';

export function useNewsletter() {
  return useMutation({
    mutationFn: (email: string) => subscribeNewsletter(email),
  });
}
