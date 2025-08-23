// src/pages/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CommonInput from '../components/CommonInput.jsx';
import CommonButton from '../components/CommonButton.jsx';
import { signIn } from '../apis/auth'; // 1. signIn 함수 import
import { useAuthStore } from '../stores/useAuthStore'; // 2. Zustand 스토어 import

const Login = () => {
  const navigate = useNavigate();
  const { setTokens } = useAuthStore(); // 3. setTokens 함수 가져오기

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const isFormComplete =
    formData.username.trim() !== '' && formData.password.trim() !== '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 4. handleSubmit 함수를 async로 변경하고 API 호출 로직 추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(formData.username, formData.password);

      // 5. 서버로부터 받은 토큰을 Zustand에 저장
      setTokens(response.accessToken, response.refreshToken);

      alert('로그인 성공!');
      navigate('/main');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      {/* Register.jsx와 동일한 배경 및 카드 스타일 적용 */}
      <div className="relative min-h-screen bg-gradient-to-br flex items-center justify-center px-4 md:hidden">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-indigo-100">
          <div className="flex items-center justify-center mb-6 gap-2">
            <h2 className="text-3xl md:text-4xl font-head text-gray-800">
              more;ing
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* ID와 Password 입력 필드만 남김 */}
            <CommonInput
              label="ID"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
            <CommonInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />

            <CommonButton
              type="submit"
              disabled={!isFormComplete}
              variant="signin"
            >
              Sign In
            </CommonButton>
          </form>

          {/* 회원가입 페이지로 이동하는 링크 */}
          <p className="text-sm md:text-base text-center mt-6 text-gray-600">
            Don’t have an account?{' '}
            <span
              onClick={handleGoToRegister}
              className="text-secondary hover:underline cursor-pointer font-medium"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
