import { useQuery } from '@tanstack/react-query';
import { fetchSuggestions } from '@/lib/api';

export function useSearchSuggestions(query: string) {
  return useQuery({
    queryKey: ['search-suggestions', query],
    queryFn:  () => fetchSuggestions(query),
    enabled:  query.trim().length > 0,
    staleTime: 30 * 1000,
  });
}
