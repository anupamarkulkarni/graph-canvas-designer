import { useQuery } from '@tanstack/react-query';
import { fetchGraph } from '@/mocks/api';

export const useGraph = (appId: string | null) => {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId!),
    enabled: !!appId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
