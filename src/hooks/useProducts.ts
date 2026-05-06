import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type ProductsParams } from '@/lib/api';

export function useProducts(params: ProductsParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn:  () => fetchProducts(params),
    placeholderData: (prev) => prev, // keep previous data while new results load
  });
}
