import instance from './axios';

export const hasMenuForStore = async ({
  storeId,
  q, // 메뉴 키워드
  available = true, // 판매중만 보고싶으면 true
}) => {
  try {
    const { data } = await instance.get(`/api/v1/stores/${storeId}/menus`, {
      params: { q, available, page: 0, size: 1, sort: 'name,asc' }, // ← 가볍게 1개만
    });
    const content = data?.data?.content ?? [];
    return content.length > 0;
  } catch (e) {
    // 404/500 등은 “없는 것”으로 처리
    return false;
  }
};
