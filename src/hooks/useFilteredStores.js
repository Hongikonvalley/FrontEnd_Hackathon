import { useQuery } from '@tanstack/react-query';
import { getStoresFiltered } from '../apis/stores';
import { useEffect, useState } from 'react';

const useDebounce = (v, ms = 300) => {
  const [val, setVal] = useState(v);
  useEffect(() => {
    const t = setTimeout(() => setVal(v), ms);
    return () => clearTimeout(t);
  }, [v, ms]);
  return val;
};

// export const useFilteredStores = ({
//   name,
//   time,
//   dayOfWeek,
//   sale,
//   category,
//   page = 1,
//   size = 20,
//   //   sort = 'distance',
// } = {}) => {
//   const debouncedName = useDebounce(name, 300);

//   return useQuery({
//     queryKey: [
//       'stores',
//       {
//         name: debouncedName,
//         time,
//         dayOfWeek,
//         sale,
//         category,
//         page,
//         size,
//         // sort,
//       },
//     ],
//     queryFn: () =>
//       getStoresFiltered({
//         name: debouncedName,
//         time,
//         dayOfWeek,
//         sale,
//         category,
//         page,
//         size,
//         // sort,
//       }),
//     keepPreviousData: true,
//     staleTime: 30_000,
//   });
// };

export function useFilteredStores(params, options) {
  const payload = {
    name: params.name ?? '',
    q: params.name ?? '',
    time: params.time ?? '',
    dayofweek: params.dayofweek ?? '',
    sale: params.sale ?? '',
    category_id: params.category_id ?? '',
    page: params.page ?? 1,
    size: params.size ?? 20,
    sort: params.sort ?? 'rating',
  };
  const key = ['stores', payload];
  return useQuery({
    queryKey: key,
    queryFn: () => getStoresFiltered(payload),
    ...options,
  });
}
