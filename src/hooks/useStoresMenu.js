import { useQuery } from '@tanstack/react-query';
import { getStoresFiltered, getStoreById } from '../apis/stores';

export function useStoresByMenuKeyword(
  {
    q = '',
    time,
    dayofweek,
    sale,
    category_id,
    page = 1,
    size = 20,
    sort = 'rating',
    limit = 6, // 매칭된 메뉴 미리보기 개수
    concurrency = 5, // 동시 상세조회 제한(과도한 호출 방지)
  } = {},
  options = {}
) {
  return useQuery({
    queryKey: [
      'stores-by-menu',
      { q, time, dayofweek, sale, category_id, page, size, sort },
    ],
    enabled: !!q, // 키워드 없으면 실행 안 함
    queryFn: async () => {
      const keyword = String(q).trim().toLowerCase();
      if (!keyword) return [];

      // 1) 후보 매장 목록: q는 제외(페이지 단위로)
      const listResp = await getStoresFiltered({
        q,
        time,
        dayofweek,
        sale,
        category_id,
        page,
        size,
        sort,
      });

      const rawItems =
        listResp?.items ??
        listResp?.result?.items ??
        (Array.isArray(listResp) ? listResp : []);

      const stores = Array.isArray(rawItems) ? rawItems : [];
      const results = [];

      // 동시 호출 제한 유틸
      const pool = [];
      const runWithLimit = async (fn) => {
        while (pool.length >= concurrency) {
          await Promise.race(pool);
        }
        const p = fn().finally(() => {
          const i = pool.indexOf(p);
          if (i >= 0) pool.splice(i, 1);
        });
        pool.push(p);
        return p;
      };

      await Promise.all(
        stores.map((s) =>
          runWithLimit(async () => {
            const storeId = s.id ?? s.store_id ?? s.storeId;
            if (!storeId) return;

            try {
              const detail = await getStoreById(storeId);
              const menus =
                (Array.isArray(detail?.menus) && detail.menus) ||
                (Array.isArray(detail?.result?.menus) && detail.result.menus) ||
                [];

              const matched = menus.filter((m) => {
                if (!m) return false;
                const avail =
                  m.available ?? m.is_available ?? m.onSale ?? m.active;
                // 메뉴명/설명 키워드 매칭
                const name = String(m.name ?? '').toLowerCase();
                const desc = String(
                  m.description ?? m.desc ?? ''
                ).toLowerCase();
                return name.includes(keyword) || desc.includes(keyword);
              });

              if (matched.length > 0) {
                results.push({
                  ...s,
                  matchedMenus: matched.slice(0, limit),
                });
              }
            } catch (e) {
              // 실패는 무시
            }
          })
        )
      );

      return results;
    },
    staleTime: 30_000,
    keepPreviousData: true,
    ...options,
  });
}
