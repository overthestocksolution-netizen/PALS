import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '@/lib/api';

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn:  () => fetchProduct(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
}
