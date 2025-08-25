// import { useQuery } from '@tanstack/react-query';
// import { getStoresMeta } from '../apis/stores';

// export const useStoresMeta = () =>
//   useQuery({
//     queryKey: ['storesMeta'],
//     queryFn: getStoresMeta,
//   });

// import { useQuery } from '@tanstack/react-query';

// const TIME_SLOT_RE = /^\d{2}:\d{2}-\d{2}:\d{2}$/;

// function normalizeFilters(raw) {
//   const categories = Array.isArray(raw?.categories) ? raw.categories : [];
//   const tags = Array.isArray(raw?.tags) ? raw.tags : [];

//   // 백엔드가 sortOptions 또는 sort_options로 줄 가능성 모두 처리
//   const sortOptionsRaw = raw?.sortOptions ?? raw?.sort_options ?? [];
//   const sortOptions = Array.isArray(sortOptionsRaw) ? sortOptionsRaw : [];

//   // timeSlots 또는 time_slots 모두 처리 + 형식 검증(HH:mm-HH:mm)
//   const timeSlotsRaw = raw?.timeSlots ?? raw?.time_slots ?? [];
//   const timeSlots = Array.isArray(timeSlotsRaw)
//     ? timeSlotsRaw.filter((s) => typeof s === 'string' && TIME_SLOT_RE.test(s))
//     : [];

//   return { categories, tags, sortOptions, timeSlots };
// }

// /**
//  * /api/v1/search/filters에서 categories, tags, sortOptions, timeSlots를 가져와
//  * camelCase로 정규화해서 반환.
//  *
//  * 사용 예:
//  *   const { data: meta } = useStoresMeta();
//  *   // meta.timeSlots => ["05:00-06:00", ...]
//  */
// export function useStoresMeta() {
//   return useQuery({
//     queryKey: ['search-filters'],
//     queryFn: async () => {
//       const res = await fetch('/api/v1/search/filters', {
//         credentials: 'include',
//       });
//       if (!res.ok) {
//         const text = await res.text().catch(() => '');
//         throw new Error(`Failed to load filters: ${res.status} ${text}`);
//       }
//       const json = await res.json();
//       return normalizeFilters(json);
//     },
//     staleTime: 5 * 60 * 1000, // 5분 캐시
//     gcTime: 30 * 60 * 1000, // 30분 가비지 컬렉션
//     retry: 1,
//   });
// }

// export default useStoresMeta;

import { useQuery } from '@tanstack/react-query';
import { getStoresMeta } from '../apis/stores';

const TIME_SLOT_RE = /^\d{2}:\d{2}-\d{2}:\d{2}$/;

// axios/비표준 래핑까지 전부 풀어주는 언래핑
function unwrap(payload) {
  // axios 전체 응답을 받았을 수도, .data만 받을 수도, 더 깊이 감싸졌을 수도 있음
  const a = payload?.data ?? payload;
  const b = a?.data ?? a?.result ?? a?.filters ?? a;
  return b ?? {};
}

function normalizeFilters(raw) {
  const body = unwrap(raw);

  // categories, tags
  const categories = Array.isArray(body.categories) ? body.categories : [];
  const tags = Array.isArray(body.tags) ? body.tags : [];

  // sortOptions (snake/camel 둘 다 대응)
  const sortOptionsRaw = body.sortOptions ?? body.sort_options ?? [];
  const sortOptions = Array.isArray(sortOptionsRaw) ? sortOptionsRaw : [];

  // timeSlots (snake/camel 둘 다 + 형식 검증)
  const timeSlotsRaw =
    body.timeSlots ??
    body.time_slots ??
    body?.filters?.timeSlots ??
    body?.filters?.time_slots ??
    [];
  const timeSlots = Array.isArray(timeSlotsRaw)
    ? timeSlotsRaw.filter((s) => typeof s === 'string' && TIME_SLOT_RE.test(s))
    : [];

  return { categories, tags, sortOptions, timeSlots };
}

/**
 * 서버 응답 형태가 {data:{...}}/ {result:{...}}/ {filters:{...}} 등이어도
 * 최종적으로 { categories, tags, sortOptions, timeSlots } (camelCase)로 반환.
 */
export const useStoresMeta = () =>
  useQuery({
    queryKey: ['storesMeta'],
    queryFn: getStoresMeta, // ✅ 기존에 잘 되던 axios 함수를 그대로 사용
    select: normalizeFilters, // 여기서 형태만 표준화
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

export default useStoresMeta;
