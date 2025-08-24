// import { useQuery } from '@tanstack/react-query';
// import { getStoreMenus, getStoreMenuCategoriesMeta } from '../apis/stores';

// export const useStoresMenus = (params) =>
//   useQuery({
//     queryKey: ['storeMenus', params],
//     queryFn: () => getStoreMenus(params),
//     keepPreviousData: true,
//     staleTime: 30_000,
//   });

// export const useStoresMenuCategoriesMeta = (storeId) =>
//   useQuery({
//     queryKey: ['storeMenuCats', storeId],
//     queryFn: () => getStoreMenuCategoriesMeta(storeId),
//     enabled: !!storeId,
//     staleTime: 5 * 60_000,
//   });

import { useQuery } from '@tanstack/react-query';
import { getStoresFiltered } from '../apis/stores';
import { hasMenuForStore } from '../apis/menus';

/** 간단한 동시성 제한 실행기 */
const runWithLimit = async (limit, tasks) => {
  const results = new Array(tasks.length);
  let idx = 0,
    running = 0;
  return new Promise((resolve, reject) => {
    const runNext = () => {
      if (idx >= tasks.length && running === 0) return resolve(results);
      while (running < limit && idx < tasks.length) {
        const cur = idx++;
        running++;
        tasks[cur]()
          .then((r) => {
            results[cur] = r;
          })
          .catch((e) => {
            results[cur] = e;
          })
          .finally(() => {
            running--;
            runNext();
          });
      }
    };
    runNext();
  });
};

export const useStoresByMenuKeyword = ({
  q, // 메뉴 키워드
  time,
  dayOfWeek,
  sale,
  category,
  page = 1,
  size = 20,
  sort = 'distance',
  availableOnly = true, // 메뉴 판매중만 고려할지
  candidateFromName = true, // 후보 뽑을 때 매장명 q도 같이 쓸지
}) => {
  return useQuery({
    queryKey: [
      'storesByMenu',
      {
        q,
        time,
        dayOfWeek,
        sale,
        category,
        page,
        size,
        sort,
        availableOnly,
        candidateFromName,
      },
    ],
    enabled: true,
    keepPreviousData: true,
    staleTime: 30_000,
    queryFn: async () => {
      // 1) 후보 매장 불러오기
      const candidateFilters = {
        q: candidateFromName ? q : undefined, // 매장명으로도 줄이고 싶으면 true
        time,
        dayOfWeek,
        sale,
        category,
        page,
        size,
        sort,
      };
      const base = await getStoresFiltered(candidateFilters);
      const items = base?.result?.items ?? base?.items ?? [];

      if (!q) return items; // 메뉴 키워드 없으면 후보 그대로

      // 2) 각 매장에 대해 메뉴 존재여부 병렬 검사(동시 4개)
      const tasks = items.map((s) => {
        const storeId = s.id ?? s.store_id;
        return () => hasMenuForStore({ storeId, q, available: availableOnly });
      });
      const checks = await runWithLimit(4, tasks);

      // 3) 메뉴가 존재하는 매장만 반환
      return items.filter((_, i) => checks[i] === true);
    },
  });
};
