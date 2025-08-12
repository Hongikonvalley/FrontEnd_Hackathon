import instance from './axios';

export const fetchAllStores = async () => {
  const res = await instance.get('/search/stores');
  const data = res.data?.result?.items;
  console.log('fetchAllStores called');
  return Array.isArray(data) ? data : [];
};

export const getStoresById = async (id) => {
  const res = await instance.get(`/search/stores/${id}`);
  return res.data;
};

export const getStoresByName = async (q) => {
  const name = (q ?? '').trim();
  if (!name) return [];
  const res = await instance.get('/search/stores', { params: { name } });
  const data = res.data;
  return Array.isArray(data) ? data : [];
};
