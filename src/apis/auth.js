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
  const res = await instance.get('/api/v1/auth/me');
  return res.data;
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

export const getUserProfile = async () => {
  try {
    // API 명세서에 나온 URI '/api/user/me'를 사용합니다.
    const { data } = await instance.get('/api/user/me');
    return data?.result ?? null; // API 응답의 result 객체를 반환
  } catch (e) {
    console.error('[getUserProfile] API 요청 실패:', e);
    return null;
  }
};

export const getUserPoints = async () => {
  try {
    // 백엔드와 약속된 포인트 조회 URI (예시)
    const { data } = await instance.get('/api/user/points');
    return data?.result ?? null; // API 응답의 result 객체를 반환
  } catch (e) {
    console.error('[getUserPoints] API 요청 실패:', e);
    return null;
  }
};
