// src/pages/StoreDetail.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stores } from '../data/mockStores'; // Mock Data
import KakaoMap from '../components/KakaoMap'; // 지도 컴포넌트

import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaRegImage,
  FaTimes,
} from 'react-icons/fa';

const StoreDetail = () => {
  // URL의 파라미터(예: /store/102)에서 id 값을 가져옵니다.
  const { id } = useParams();
  const navigate = useNavigate();

  // id 값과 일치하는 가게 데이터를 mockStores에서 찾습니다.
  // URL 파라미터는 문자열이므로 숫자로 변환(parseInt)해서 비교합니다.
  const store = stores.find((s) => s.id === parseInt(id));

  //메뉴 모달의 열림/닫힘 상태를 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- 가상의 추가 데이터 (나중에 API로 대체) ---
  const augmentedStore = {
    ...store,
    menuImageUrl: 'https://example.com/images/menu_full.jpg', // 전체 메뉴판 이미지
    keywords: [
      '카공하기 좋은 곳',
      '전좌석 콘센트',
      '테라스',
      '디저트 맛집',
      '조용한',
    ],
    aiSummary:
      '이곳은 조용한 분위기에서 공부나 작업을 하기에 최적화된 카페입니다. 모든 좌석에 콘센트가 마련되어 있으며, 맛있는 디저트와 함께 여유를 즐길 수 있는 테라스 좌석도 인기입니다.',
    featuredReview: {
      author: '멋쟁이사자',
      rating: 5,
      text: '여기 정말 좋아요! 노트북 들고 와서 작업하기 너무 편하고, 특히 치즈케이크가 정말 맛있습니다. 재방문 의사 100%!',
    },
  };
  // -----------------------------------------

  // 만약 해당하는 가게 정보가 없으면 메시지를 표시합니다.
  if (!store) {
    return <div className="p-6">해당하는 가게 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-6">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-600 hover:text-black"
      >
        &larr; 목록으로 돌아가기
      </button>

      {/* 1. 헤더: 매장 이름과 별점 */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl font-extrabold">{augmentedStore.name}</h1>
        <div className="flex items-center gap-1 text-xl font-bold">
          <FaStar className="text-yellow-400" />
          <span>{augmentedStore.reviewSummary.averageRating}</span>
          <span className="text-sm font-normal text-gray-500">
            ({augmentedStore.reviewSummary.totalReviews})
          </span>
        </div>
      </div>

      {/* 2. 정보: 위치와 영업시간 */}
      <div className="flex flex-wrap justify-between items-center text-gray-600 border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <span>{augmentedStore.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock />
          <span>
            {augmentedStore.openTime} ~ {augmentedStore.closeTime}
          </span>
        </div>
      </div>

      {/* 3. 카카오 지도 */}
      <div className="mb-6 h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
        <KakaoMap
          lat={augmentedStore.location.latitude}
          lng={augmentedStore.location.longitude}
        />
      </div>

      {/* 4. 메뉴 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">메뉴</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{augmentedStore.menu[0].name}</p>
              <p className="text-gray-600">
                {augmentedStore.menu[0].price.toLocaleString()}원
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              <FaRegImage />
              메뉴판 이미지로 보기
            </button>
          </div>
        </div>
      </div>

      {/* 5. 포토리뷰 (사이드 스크롤) */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">포토 리뷰</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {augmentedStore.galleryImages.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-40 h-40">
              <img
                src={src}
                alt={`포토리뷰 ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 6. 방문자 리뷰 키워드 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">방문자 리뷰</h2>
        <div className="flex flex-wrap gap-2">
          {augmentedStore.keywords.map((keyword) => (
            <span
              key={keyword}
              className="bg-white text-black text-sm font-medium px-3 py-1 rounded-full shadow-md"
            >
              # {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* 7. AI 리뷰 요약 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 border-l-4 border-yellow-400">
        <h3 className="text-lg font-bold mb-2">🤖 AI 리뷰 요약</h3>
        <p className="text-gray-700">{augmentedStore.aiSummary}</p>
      </div>

      {/* 8. 대표 리뷰 */}
      <div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">
              {augmentedStore.featuredReview.author}
            </span>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span>{augmentedStore.featuredReview.rating}</span>
            </div>
          </div>
          <p className="text-gray-800">{augmentedStore.featuredReview.text}</p>
        </div>
      </div>

      {/* 메뉴판 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-lg w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-2xl text-white bg-black rounded-full p-1"
            >
              <FaTimes />
            </button>
            <img
              src={augmentedStore.menuImageUrl}
              alt="메뉴판"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetail;
