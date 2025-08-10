// src/components/StoreCard.jsx

import React, { use } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { stores } from '../data/mockStores'; // Mock Data 불러오기
import PropTypes from 'prop-types';

const StoreCard = ({ store }) => {
  const representativeMenu =
    store.menu && store.menu.length > 0 ? store.menu[0] : null;

  const nav = useNavigate();
  const onClickStore = () => {
    nav(`/store/${store.id}`);
  };

  return (
    <div className="flex w-full items-stretch rounded-[20px] border-2 border-yellow-400 overflow-hidden bg-white">
      {/* 가게 썸네일 이미지 (왼쪽) */}

      <div className="w-1/2 relative aspect-square m-0 border-white border-[12px] md:w-1/4 flex-shrink-0">
        <img
          src={store.thumbnailImage}
          alt={store.name}
          className="w-full h-full  rounded-[20px] object-cover"
        />
      </div>

      {/* 가게 정보 (오른쪽) */}
      <div className="py-[12px] pr-[12px] pl-0 flex flex-col flex-grow">
        <div className="flex flex-row items-center gap-2">
          <p className="text-[20px] font-black truncate flex-1 min-w-0">
            {store.name}
          </p>
          <p className="text-[16px] font-medium flex-shrink-0">⭐별점</p>
        </div>
        {/* <p className="text-sm text-gray-600 mt-1">📞 {store.phone}</p>
        <p className="text-sm text-gray-600">⏰ 오픈: {store.openTime}</p> */}

        {/* AI추천 메시지 */}
        <div className="flex flex-col">
          <p className="text-[10px] font-semibold">🤖 AI 추천 메시지</p>
          <p className="tex-[16px] font-bold">어쩌고저쩌고</p>
        </div>

        <button
          className="bg-[#FCE6A4] mt-auto left-0 w-full p-2 h-[30px] rounded-[30px] flex justify-center items-center hover:cursor-pointer text-[14px] font-bold"
          onClick={() => onClickStore()}
        >
          얼리버드 되기
        </button>

        {/* 대표 메뉴 정보 (대표 메뉴가 있을 경우에만 표시)
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
        )} */}
      </div>
    </div>
  );
};

StoreCard.propTypes = {
  store: PropTypes.object.isRequired,
};

export default StoreCard;
