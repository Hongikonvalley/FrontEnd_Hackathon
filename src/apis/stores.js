import instance from './axios';

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

    const { data } = await instance.get('/search/stores', {
      // '/api/v1' 제거
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

export const getStoresFiltered = async ({
  name = '',
  time = '',
  category = '',
  sort = '',
  page = 1,
  size = 20,
} = {}) => {
  const params = {};
  if (name.trim()) params.name = name.trim();
  if (time) params.time = time;
  if (category) params.category = category;
  if (sort) params.sort = sort;
  params.page = page;
  params.size = size;

  const { data } = await instance.get('/search/stores', { params });
  return pickList(data); // ← 원본 그대로
};

export const getStoreById = async (id) => {
  try {
    const { data } = await instance.get(`/stores/${id}`); // '/api/v1' 제거
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
    const { data } = await instance.get('/search/stores', {
      // '/api/v1' 제거
      params: { q },
    });
    return pickList(data);
  } catch (e) {
    console.error('[getStoresByName] FAIL:', e);
    return [];
  }
};
