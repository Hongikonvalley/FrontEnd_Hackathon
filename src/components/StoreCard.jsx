// src/components/StoreCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StoreCard = ({ store }) => {
  const representativeMenu =
    store.menu && store.menu.length > 0 ? store.menu[0] : null;

  return (
    // w-full 클래스를 추가하여 부모 컨테이너 너비에 맞게 설정합니다.
    <Link
      to={`/store/${store.id}`}
      className="block w-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex"
    >
      {/* 가게 썸네일 이미지 (왼쪽) */}
      <div className="w-1/3 md:w-1/4 flex-shrink-0">
        <img
          src={store.thumbnailImage}
          alt={store.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 가게 정보 (오른쪽) */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold truncate">{store.name}</h3>
        <p className="text-sm text-gray-600 mt-1">📞 {store.phone}</p>
        <p className="text-sm text-gray-600">⏰ 오픈: {store.openTime}</p>

        {/* 대표 메뉴 정보 (대표 메뉴가 있을 경우에만 표시) */}
        {representativeMenu && (
          <div className="mt-auto pt-4 border-t">
            <p className="text-sm font-semibold text-gray-800">대표 메뉴</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{representativeMenu.name}</span>
              <span className="font-bold text-blue-600">
                {representativeMenu.price.toLocaleString()}원
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

StoreCard.propTypes = {
  store: PropTypes.object.isRequired,
};

export default StoreCard;
