// src/components/FavoriteCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const FavoriteCard = ({ favorite }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-6 border-primary border-2 bg-white shadow-md rounded-2xl mb-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">{favorite.store_name}</div>

          {/* 👇 'buisness_status'를 'business_status'로 수정했습니다. */}
          <div className="text-lg font-semibold text-secondary mt-1">
            {favorite.business_status}
          </div>

          <div className="text-sm font-semibold text-black mt-2">
            지금 방문하면
          </div>

          <div className="text-sm font-semibold text-secondary">
            {favorite.deal_info?.title || '진행중인 혜택이 없습니다.'}
          </div>
        </div>
        <img
          src={favorite.store_image || '/ex.jpg'}
          alt={favorite.store_name}
          className="w-2/5 max-w-[120px] h-auto rounded-2xl aspect-square object-cover"
        />
      </div>

      <div className="border-t w-full border-gray-200 my-4" />

      <div className="flex items-center justify-end">
        <button
          type="button"
          className="bg-primary rounded-full py-2 px-4 text-sm text-white font-bold hover:bg-secondary transition-colors whitespace-nowrap"
          onClick={() => navigate(`/store/${favorite.store_id}`)}
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
};

// props 유효성 검사에도 business_status를 추가하고 수정합니다.
FavoriteCard.propTypes = {
  favorite: PropTypes.shape({
    store_id: PropTypes.string.isRequired,
    store_name: PropTypes.string.isRequired,
    store_image: PropTypes.string,
    business_status: PropTypes.string.isRequired, // 👈 수정된 부분
    deal_info: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
};

export default FavoriteCard;
