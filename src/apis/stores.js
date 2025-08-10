import axiosInstance from './axios';

export const fetchAllStores = async () => {
  const res = await axiosInstance.get('/stores');
  const data = res.data;
  return Array.isArray(data) ? data : (data?.items ?? []);
};

export const getStoresById = async (id) => {
  const res = await axiosInstance.get(`/stores/${id}`);
  return res.data;
};

export const getStoresByName = async (q) => {
  const name = (q ?? '').trim();
  if (!name) return [];
  const res = await axiosInstance.get('/stores', { params: { name } });
  const data = res.data;
  return Array.isArray(data) ? data : [];
};
