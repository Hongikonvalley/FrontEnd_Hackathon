// src/pages/KakaoRedirect.jsx

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { login } from '../apis/auth';

const KakaoRedirect = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { setTokens } = useAuthStore();

  const handleOAuthKakao = async (code) => {
    try {
      console.log('3. 백엔드에 코드를 보내서 토큰을 요청합니다.');

      const response = await login(code); //이게문제인듯

      console.log('✅ login() 응답 성공'); // ❌ 안 나올 거야
      // --- 🧐 4단계: 백엔드 응답 확인 ---
      // 백엔드가 보내준 데이터의 전체 구조를 확인합니다.
      // 여기서 accessToken, refreshToken이 올바르게 들어있는지 봐야 합니다.
      console.log('4. 백엔드로부터 받은 응답:', response);

      setTokens(response.accessToken, response.refreshToken);
      alert('로그인 성공!');
      nav('/main');
    } catch (error) {
      console.error('로그인 최종 실패:', error);
      alert('로그인에 실패하였습니다.');
      nav('/');
    }
  };

  useEffect(() => {
    // --- 🤔 1단계: 전체 URL 확인 ---
    // 카카오로부터 돌아온 주소 전체를 확인합니다. code=... 가 잘 붙어있는지 보세요.
    console.log('1. 리다이렉트된 전체 URL:', window.location.href);

    const code = new URLSearchParams(location.search).get('code');

    // --- 🤔 2단계: code 추출 확인 ---
    // URL에서 code 값이 올바르게 추출되었는지 확인합니다.
    // 여기서 null이 나오면 카카오 설정(Redirect URI 등)에 문제가 있는 것입니다.
    console.log('2. URL에서 추출한 code:', code);

    if (code) {
      handleOAuthKakao(code);
    } else {
      alert('로그인에 필요한 코드를 받지 못했습니다.');
      nav('/');
    }
  }, [location, nav, setTokens]);

  return <>카카오 로그인 처리 중...</>;
};

export default KakaoRedirect;
