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

export const signIn = async (id, password) => {
  // 백엔드와 약속된 주소 (예: /api/v1/auth/signin)로 요청을 보냅니다.
  const res = await instance.post('/api/v1/auth/signin', {
    id,
    password,
  });
  return res.data;
};
