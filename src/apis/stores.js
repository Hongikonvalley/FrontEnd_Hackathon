import instance from './axios';
import qs from 'qs';

const pickList = (data) =>
  Array.isArray(data?.result?.items) ? data.result.items : [];

// export const fetchAllStores = async () => {
//   const { data } = await instance.get('/search/stores');
//   return pickList(data);
// };

// 확인용 전체 매장 조회
export const fetchAllStores = async () => {
  try {
    const requestUrl = instance.defaults.baseURL + '/search/stores';
    // --- 🤔 1단계: API 요청 직전의 전체 URL 확인 ---
    console.log('1. [fetchAllStores] API 요청 URL:', requestUrl);

    const { data } = await instance.get('api/v1/search/stores', {
      params: { page: 1, size: 50 },
    });

    const items = Array.isArray(data?.result?.items) ? data.result.items : [];

    // --- 🤔 2단계: 백엔드가 보낸 원본 데이터 전체 확인 ---
    // 이 로그를 통해 백엔드가 어떤 구조로 데이터를 보냈는지 정확히 알 수 있습니다.
    console.log('2. [fetchAllStores] 백엔드로부터 받은 원본 데이터:', data);

    // --- 🤔 3단계: 실제 파싱된 아이템 개수 확인 ---
    console.log('3. [fetchAllStores] 파싱된 아이템 개수:', items.length);

    if (!items.length) {
      console.warn(
        '4. [fetchAllStores] 빈 목록 수신. 백엔드 DB에 데이터가 없거나, 로그인 토큰이 필요한 API일 수 있습니다.'
      );
    }

    return pickList(data);
  } catch (e) {
    console.error('[fetchAllStores] FAIL:', e);
    return [];
  }
};

const slotToStartTime = (slot) => (slot ? slot.split('-')[0] : '');
const DAY_KR_TO_EN = {
  일: 6,
  월: 0,
  화: 1,
  수: 2,
  목: 3,
  금: 4,
  토: 5,
};

export const getStoresFiltered = async ({
  name,
  time, // '06:00-07:00' (UI 값)
  dayofweek, // '월' | '화' | ... | ''  (UI 값)
  sale,
  category_id,
  page = 1,
  size = 20,
  // sort = 'distance',
} = {}) => {
  const timeStart = slotToStartTime(time);
  const day_en = dayofweek ? DAY_KR_TO_EN[dayofweek] : undefined;
  // const safeSort =
  //   sort === 'distance' && (lat == null || lng == null) ? 'rating' : sort;

  const params = {
    ...(name && { name }),
    ...(timeStart && { time: slotToStartTime(time) }), // ★ 서버는 HH:mm만 받음
    ...(dayofweek && { day_of_week: day_en }), // ★ 요일 파라미터
    ...(sale === true && { sale: 1 }),
    ...(category_id && { category_id }),
    // ...(safeSort === 'distancae' && { lat, lng }),
    page,
    size,
    // sort: safeSort,
  };

  const res = await instance.get('/api/v1/search/stores', {
    params,
    paramsSerializer: (p) =>
      qs.stringify(p, { arrayFormat: 'repeat', encode: true }),
  });
  // 백 응답이 { result: { items: [...] } } 또는 { items: [...] } 둘 다 커버
  const data = res?.data;
  return {
    items: data?.result?.items ?? data?.items ?? [],
    pageInfo: data?.result?.pageInfo ?? data?.pageInfo ?? null,
  };
};

// 매장별 메뉴 검색 (존재 여부만 확인용, size=1)
export const searchMenusInStore = async (
  storeId,
  { q, availableOnly = true }
) => {
  const res = await instance.get(`/api/v1/stores/${storeId}/menus`, {
    params: {
      q,
      ...(availableOnly ? { available: true } : {}),
      size: 1, // 존재 여부만 알면 되니까 1
      page: 0,
    },
  });
  const data = res?.data?.data ?? res?.data?.result ?? res?.data;
  // 표준화: 총 개수/첫 페이지 content 존재 여부를 체크
  const content = data?.content ?? [];
  const total = data?.total_elements ?? data?.totalElements ?? content.length;
  return total > 0 || content.length > 0;
};

export const getStoreById = async (id) => {
  try {
    const { data } = await instance.get(`api/v1/stores/${id}`);
    return data?.result ?? null;
  } catch (e) {
    console.error('[getStoreById] FAIL:', e);
    return null;
  }
};

export const getStoresByName = async (query) => {
  const q = (query ?? '').trim();
  if (!q) return [];
  try {
    const { data } = await instance.get('api/v1/search/stores', {
      // '/api/v1' 제거
      params: { q },
    });
    return pickList(data);
  } catch (e) {
    console.error('[getStoresByName] FAIL:', e);
    return [];
  }
};

export const getStoreReviews = async (storeId) => {
  try {
    const { data } = await instance.get(`/api/v1/stores/${storeId}/reviews`);
    return data?.result ?? null; // API 응답의 result 객체를 반환
  } catch (e) {
    console.error('[getStoreReviews] FAIL:', e);
    return null;
  }
};

export const getFavoriteStores = async () => {
  try {
    const { data } = await instance.get('/api/v1/stores/favorites');
    // API 응답 구조에 맞춰 result.favorite_stores 배열을 반환
    return data?.result?.favorite_stores ?? [];
  } catch (e) {
    console.error('[getFavoriteStores] API 요청 실패:', e);
    return [];
  }
};

// 메타
export const getStoresMeta = async () => {
  const res = await instance.get('/api/v1/search/filters'); // 실제 경로 확인!
  // ✅ 응답: { is_success, code, result: { time_slots, ... } }
  const result = res?.data?.result ?? {};
  return {
    categories: result.categories ?? [],
    tags: result.tags ?? [],
    sort_options: result.sort_options ?? [],
    time_slots: result.time_slots ?? [],
  };
};

// 메뉴
export async function getStoreMenus({
  q = '',
  time,
  dayofweek,
  sale,
  category_id,
  page = 1,
  size = 20,
  sort = 'rating',
  menuAvailable,
  limit = 6,
  concurrency = 5,
} = {}) {
  const keyword = String(q).trim().toLowerCase();

  const listResp = await getStoresFiltered({
    name: '',
    time,
    dayofweek,
    sale,
    category_id,
    page,
    size,
    sort,
  });

  const items =
    listResp?.items ??
    listResp?.result?.items ??
    (Array.isArray(listResp) ? listResp : []);
  const stores = Array.isArray(items) ? items : [];

  const results = [];
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
          const detail = await getStoreDetail(storeId);
          const menus =
            (Array.isArray(detail?.menus) && detail.menus) ||
            (Array.isArray(detail?.result?.menus) && detail.result.menus) ||
            [];

          const matched = menus.filter((m) => {
            if (!m) return false;

            if (typeof menuAvailable === 'boolean') {
              const avail =
                m.available ?? m.is_available ?? m.onSale ?? m.active;
              if (Boolean(avail) !== menuAvailable) return false;
            }

            if (keyword) {
              const name = String(m.name ?? '').toLowerCase();
              const desc = String(m.description ?? m.desc ?? '').toLowerCase();
              if (!name.includes(keyword) && !desc.includes(keyword)) {
                return false;
              }
            }

            return true;
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

  // ✅ 이 return은 반드시 함수 안에!
  return {
    items: results,
    count: results.length,
    page,
    size,
  };
}

// export const getStoreMenus = async ({
//   storeId,
//   category, // '음료' | '디저트' ... 혹은 카테고리 id
//   available, // true | false
//   q, // 메뉴 키워드
//   sort = 'name,asc', // name,asc|name,desc|price,asc|price,desc|createdAt,desc
//   page = 0, // 0-based
//   size = 20,
// }) => {
//   // 1) 상세조회 (menus 포함)
//   const res = await instance.get(`/api/v1/search/stores`);
//   const root = res?.data ?? {};
//   const menus = root?.result?.menus ?? root?.menus ?? [];

//   // 안전장치
//   const list = Array.isArray(menus) ? menus : [];

//   // 2) 필터링
//   const term = (q ?? '').trim().toLowerCase();
//   let filtered = list.filter((m) => {
//     if (!m) return false;

//     // 카테고리 매칭: 문자열(한글명) 또는 id 둘 다 대비
//     if (category) {
//       const mc = m.category ?? m.menuCategory ?? m.category_id ?? m.categoryId;
//       const matchById = String(mc?.id ?? mc) === String(category);
//       const matchByName = String(mc?.name ?? mc) === String(category);
//       if (!matchById && !matchByName) return false;
//     }

//     // 판매여부 매칭
//     if (typeof available === 'boolean') {
//       const av = Boolean(m.available ?? m.is_available ?? m.onSale ?? m.active);
//       if (av !== available) return false;
//     }

//     // 키워드 매칭: name/desc에 부분일치(대소문자 무시)
//     if (term) {
//       const name = String(m.name ?? '').toLowerCase();
//       const desc = String(m.description ?? m.desc ?? '').toLowerCase();
//       if (!name.includes(term) && !desc.includes(term)) return false;
//     }

//     return true;
//   });

//   // 3) 정렬
//   const parseSort = (s) => {
//     const [kRaw = 'name', dRaw = 'asc'] = String(s).split(',');
//     const key = kRaw.trim();
//     const dir = dRaw.trim().toLowerCase() === 'desc' ? -1 : 1;
//     return { key, dir };
//   };

//   const { key, dir } = parseSort(sort);

//   const getKeyVal = (m, k) => {
//     switch (k) {
//       case 'name':
//         return String(m.name ?? '');
//       case 'price':
//         return Number(m.price ?? m.sale_price ?? m.base_price ?? 0);
//       case 'createdAt':
//         return new Date(
//           m.createdAt ?? m.created_at ?? m.created ?? 0
//         ).getTime();
//       default:
//         return String(m[k] ?? '');
//     }
//   };

//   filtered.sort((a, b) => {
//     const va = getKeyVal(a, key);
//     const vb = getKeyVal(b, key);

//     // 문자열 vs 숫자 정렬 처리
//     if (typeof va === 'number' && typeof vb === 'number') {
//       return (va - vb) * dir;
//     }
//     if (typeof va === 'string' && typeof vb === 'string') {
//       return va.localeCompare(vb, 'ko') * dir;
//     }
//     // 타입 섞이면 숫자 우선
//     return String(va).localeCompare(String(vb), 'ko') * dir;
//   });

//   // 4) 페이지네이션 (0-based page)
//   const total = filtered.length;
//   const start = page * size;
//   const end = start + size;
//   const items = filtered.slice(start, end);

//   return {
//     items,
//     page,
//     size,
//     total,
//     totalPages: Math.max(1, Math.ceil(total / size)),
//     // 필요하면 원본도 함께
//     // all: filtered,
//   };
// };

/**
 * 매장 내 메뉴 카테고리 메타
 * GET /api/v1/stores/{storeId}/menus/meta/categories
 */
export const getStoreMenuCategoriesMeta = async (storeId) => {
  const res = await instance.get(
    `/api/v1/stores/${storeId}/menus/meta/categories`
  );
  return res?.data?.data ?? []; // [{category:'음료', count:12}, ...]
};

export const getPopularStore = async () => {
  try {
    const { data } = await instance.get('/api/v1/stores/popular/today');
    return data?.result ?? null; // API 응답의 result 객체를 반환
  } catch (e) {
    console.error('[getPopularStore] API 요청 실패:', e);
    return null;
  }
};

export const toggleFavoriteStore = async ({ storeId, isFavorite }) => {
  try {
    const uri = `/api/v1/stores/${storeId}/favorite`;

    // isFavorite 값에 따라 DELETE 또는 POST 요청
    const response = isFavorite
      ? await instance.delete(uri)
      : await instance.post(uri);

    return response.data;
  } catch (e) {
    console.error('[toggleFavoriteStore] API 요청 실패:', e);
    throw e;
  }
};

export const getMorningSaleStores = async () => {
  try {
    const { data } = await instance.get('/api/v1/stores/morning-sale');
    // API 응답 구조에 맞춰 result.stores 배열을 반환
    return data?.result?.stores ?? [];
  } catch (e) {
    console.error('[getMorningSaleStores] API 요청 실패:', e);
    return [];
  }
};
