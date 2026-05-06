import { useMutation } from '@tanstack/react-query';
import { submitContact, type ContactPayload } from '@/lib/api';

export function useContact() {
  return useMutation({
    mutationFn: (data: ContactPayload) => submitContact(data),
  });
}
