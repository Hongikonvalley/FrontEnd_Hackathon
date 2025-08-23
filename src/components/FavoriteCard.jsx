// src/components/FavoriteCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const FavoriteCard = ({ favorite }) => {
  const navigate = useNavigate();
  console.log('favorite:', favorite);

  return (
    <div className="flex flex-col p-6 border-primary border-2 bg-white shadow-md rounded-2xl mb-4">
      <div className="flex items-center justify-between">
        <div>
          {/* 1. API 데이터로 가게 이름 표시 */}
          <div className="text-xl font-semibold">{favorite.store_name}</div>
          {/* 2. API 데이터로 방문 횟수 표시 */}
          <div className="text-3xl font-black text-secondary">
            {/*{favorite.visit_count}회 방문*/}{' '}
            {/*백엔드 코드 수정시 아랫줄 삭제, 해당 줄 사용*/}
            방문
          </div>
          {/* 5. API 데이터로 할인 정보 표시 */}
          <div className="text-sm font-semibold text-gray-700">
            {favorite.deal_info?.title || '할인 정보 없음'}
          </div>
          {/* 5. API 데이터로 할인 정보 표시 */}
          <div className="text-sm font-semibold text-secondary">
            {favorite.deal_info?.description || ''}
          </div>
        </div>
        <img
          src={favorite.store_image || '/ex.jpg'} // 4. API 데이터로 이미지 표시 (기본 이미지 포함)
          alt={favorite.store_name}
          className="w-2/5 max-w-[120px] h-auto rounded-2xl aspect-square object-cover"
        />
      </div>

      <div className="border-t w-full border-gray-200 my-4" />

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          className="bg-primary rounded-full py-2 px-4 text-sm text-white font-bold hover:bg-secondary transition-colors whitespace-nowrap"
          onClick={() => navigate(`/store/${favorite.store_id}`)} // 6. API 데이터로 상세 페이지 이동
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
};

// props 유효성 검사
FavoriteCard.propTypes = {
  favorite: PropTypes.shape({
    store_id: PropTypes.string.isRequired,
    store_name: PropTypes.string.isRequired,
    store_image: PropTypes.string,
    deal_info: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
};

export default FavoriteCard;
