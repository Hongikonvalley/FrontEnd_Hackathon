// apis/auth.js

import axios from 'axios';

import instance from './axios';

export const login = async (code) => {
  console.log('👉 axios 보낼 코드 값:', code);
  console.log('👉 요청 URL:', instance.defaults.baseURL + '/auth/kakao');
  const res = await instance.post('/auth/kakao', {
    code,
  });
  return res.data;
};

export const getCurrentUser = async () => {
  try {
    const { data } = await instance.get('/api/users/1/profile');
    return data?.result ?? null;
  } catch (e) {
    console.error('[getCurrentUser] API 요청 실패:', e);
    return null;
  }
};

export const signIn = async (username, password) => {
  const form = new URLSearchParams(); // x-www-form-urlencoded 본문
  form.append('username', username); // ← 서버 스펙과 동일
  form.append('password', password);

  const res = await instance.post('/api/auth/login', form, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return res.data;
};

export const getUserPoints = async (userId) => {
  try {
    // API 명세서에 나온 URI와 쿼리 파라미터를 사용합니다.
    const { data } = await instance.get(`/api/v1/users/points`, {
      params: { userId },
    });
    return data?.result ?? null; // API 응답의 result 객체를 반환
  } catch (e) {
    console.error('[getUserPoints] API 요청 실패:', e);
    return null;
  }
};

export const getMyReviews = async (userId) => {
  try {
    const { data } = await instance.get('/api/v1/stores/reviews/my', {
      params: { userId }, // 쿼리 파라미터로 userId 전달
    });
    // API 응답 구조에 맞춰 result.reviews 배열을 반환
    console.log('리뷰 api 연결 성공');
    console.log(data);
    return data?.result?.reviews ?? [];
  } catch (e) {
    console.error('[getMyReviews] API 요청 실패:', e);
    return [];
  }
};

export const getPointHistory = async (userId) => {
  try {
    // API 명세서에 나온 URI를 사용합니다.
    const { data } = await instance.get(
      `/api/v1/users/${userId}/points/history`
    );
    return data?.result ?? null;
  } catch (e) {
    console.error('[getPointHistory] API 요청 실패:', e);
    return null;
  }
};
