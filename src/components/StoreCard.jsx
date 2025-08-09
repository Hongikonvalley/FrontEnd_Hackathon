import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StoreCard = ({ store }) => {
  // 대표 메뉴는 menu 배열의 첫 번째 아이템으로 가정합니다.
  const representativeMenu =
    store.menu && store.menu.length > 0 ? store.menu[0] : null;

  return (
    // Link 컴포넌트로 카드 전체를 감싸서 클릭 시 상세 페이지로 이동하게 합니다.
    <Link
      to={`/store/${store.id}`}
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      {/* 가게 썸네일 이미지 */}
      <div className="w-full h-48">
        <img
          src={store.thumbnailImage}
          alt={store.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 가게 정보 */}
      <div className="p-4">
        <h3 className="text-xl font-bold truncate">{store.name}</h3>
        <p className="text-sm text-gray-600 mt-1">📞 {store.phone}</p>
        <p className="text-sm text-gray-600">⏰ 오픈: {store.openTime}</p>

        {/* 대표 메뉴 정보 (대표 메뉴가 있을 경우에만 표시) */}
        {representativeMenu && (
          <div className="mt-4 pt-4 border-t">
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

// props 유효성 검사
StoreCard.propTypes = {
  store: PropTypes.object.isRequired,
};

export default StoreCard;
