import { useMutation } from '@tanstack/react-query';
import { trackOrder } from '@/lib/api';

export function useOrderTracking() {
  return useMutation({
    mutationFn: trackOrder,
  });
}
