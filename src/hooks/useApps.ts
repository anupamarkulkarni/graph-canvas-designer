import { useQuery } from '@tanstack/react-query';
import { fetchApps } from '@/mocks/api';

export const useApps = () => {
  return useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
