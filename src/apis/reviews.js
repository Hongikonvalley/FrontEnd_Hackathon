// src/apis/reviews.js

import instance from './axios';

/**
 * 새로운 리뷰를 작성하는 함수 (POST)
 * @param {object} reviewData - { storeId, rating, content, userId }
 */
export const createReview = async ({ storeId, rating, content, userId }) => {
  const { data } = await instance.post(
    // API 명세서에 따라 URI와 쿼리 파라미터를 조합합니다.
    `/api/v1/stores/reviews?userId=${userId}`,
    {
      store_id: storeId,
      rating,
      content,
      image_urls: [], // 이미지 업로드는 추후 구현
    }
  );
  return data;
};

/**
 * 기존 리뷰를 수정하는 함수 (PUT)
 * @param {object} reviewData - { reviewId, rating, content, userId }
 */
export const updateReview = async ({ reviewId, rating, content, userId }) => {
  const { data } = await instance.put(
    `/api/v1/stores/reviews/${reviewId}?userId=${userId}`,
    {
      rating,
      content,
    }
  );
  return data;
};

/**
 * 리뷰를 삭제하는 함수 (DELETE)
 * @param {object} params - { reviewId, userId }
 */
export const deleteReview = async ({ reviewId, userId }) => {
  const { data } = await instance.delete(
    `/api/v1/stores/reviews/${reviewId}?userId=${userId}`
  );
  return data;
};
