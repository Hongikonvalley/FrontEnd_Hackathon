// src/pages/Main.jsx

import React from 'react';
import SearchBar from '../components/SearchBar';

const Main = () => {
  return (
    // 페이지 전체 배경 설정
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 모든 컨텐츠를 감싸는 메인 컨테이너 */}
      <div className="w-full max-w-5xl mx-auto">
        {/* 상단 브랜드명 박스 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col items-center">
          <h1 className="text-5xl font-bold text-gray-800">more;ing</h1>
          <h2 className="text-xl text-gray-600 mt-2">
            나의 위치 OO동(api기반으로 바꾸면됨)
          </h2>
          <SearchBar />
          <p className="text-gray-500 mt-4">
            현재 위치를 기반으로 주변의 맛집과 카페를 찾아보세요!{' '}
          </p>
          <p className="text-gray-500 mt-2">Open Hour .6~7 .7~8</p>
          <p className="text-gray-500 mt-2">
            Category ☕카페 🍞베이커리 🍱식당
          </p>
        </div>

        {/* 중단 2개 박스 컨테이너 (Flexbox) */}
        <div className="flex gap-6 mb-6">
          {/* 첫 번째 정보 박스 */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              🔥오늘의 인기 얼리버드
            </h2>
            <p>첫 번째 정보를 보여주는 영역입니다.</p>
          </div>

          {/* 두 번째 정보 박스 */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🥇이달의 미라클 모너</h2>
            <p>두 번째 정보를 보여주는 영역입니다.</p>
          </div>
        </div>

        {/* 하단 메인 컨텐츠 박스 */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <p>⛅오늘 날씨 추천 장소</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
