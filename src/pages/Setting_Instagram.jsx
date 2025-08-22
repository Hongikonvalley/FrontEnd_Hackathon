// src/pages/SettingInstagram.jsx

import React from 'react';
import Header from '../components/Header.jsx';
import { FaInstagram } from 'react-icons/fa'; // 아이콘 사용 (npm install react-icons)

const SettingInstagram = () => {
  const INSTAGRAM_URL = 'https://www.instagram.com'; // TODO: 실제 인스타그램 주소로 변경

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header title="인스타그램" showBack={true} />
      <h1 className="text-2xl font-bold text-center my-4">인스타그램</h1>

      <div className="pt-20 p-4 flex flex-col items-center text-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          {/* 인스타그램 아이콘 */}
          <FaInstagram className="text-5xl mx-auto text-gray-800" />

          {/* 페이지 제목 */}
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Follow us on Instagram!
          </h1>

          {/* 설명 문구 */}
          <p className="text-gray-600 mt-2">
            'more;ing'의 공식 인스타그램을 팔로우하고
            <br />
            가장 먼저 새로운 소식과 이벤트를 만나보세요.
          </p>

          {/* 인스타그램으로 이동 버튼 */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            인스타그램 팔로우하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default SettingInstagram;
