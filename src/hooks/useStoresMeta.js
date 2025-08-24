import { useQuery } from '@tanstack/react-query';
import { getStoresMeta } from '../apis/stores';

export const useStoresMeta = () =>
  useQuery({
    queryKey: ['storesMeta'],
    queryFn: getStoresMeta,
    // staleTime: 5 * 60 * 1000,
    retry: 0,
  });
