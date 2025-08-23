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
