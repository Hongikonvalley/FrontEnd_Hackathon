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
    const { data, status } = await instance.get('/search/stores', {
      params: { page: 1, size: 50 }, // ← 강제 지정
    });
    console.log('[DEBUG][fetchAllStores] status:', status);
    console.log('[DEBUG][fetchAllStores] raw:', data);

    const items = Array.isArray(data?.result?.items) ? data.result.items : [];
    console.log('[DEBUG][fetchAllStores] items.length:', items.length);
    if (!items.length) {
      console.warn(
        '[DEBUG][fetchAllStores] 빈 목록. 쿼리/권한/도메인/프록시 확인 필요'
      );
    }
    return items; // 정규화 안 쓰는 버전
  } catch (e) {
    console.error('[DEBUG][fetchAllStores] FAIL:', e);
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

export const getStoresById = async (id) => {
  const { data } = await instance.get(`/stores/${id}`);
  return data?.result ?? null;
};

export const getStoresByName = async (q) => {
  const name = (q ?? '').trim();
  if (!name) return [];
  const { data } = await instance.get('/search/stores', { params: { name } });
  return pickList(data);
};
