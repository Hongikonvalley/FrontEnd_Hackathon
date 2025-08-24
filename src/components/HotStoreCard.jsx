// src/components/HotStoreCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const HotStoreCard = ({ store }) => {
  const navigate = useNavigate();

  return (
    <div className="p-[8px] border-b-1 border-[#DBDBDB] flex w-full bg-white">
      <div className="w-1/2 relative aspect-square m-0 border-white border-[12px] md:w-1/4 flex-shrink-0">
        <img
          src={store.rep_image_url || '/placeholder.png'}
          alt={store.store_name}
          className="w-full h-full rounded-[20px] object-cover"
        />
      </div>

      <div className="py-[12px] pr-[12px] pl-0 flex flex-col flex-grow">
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-[20px] font-black truncate flex-1 min-w-0">
            {store.store_name}
          </h3>
          {/* rating이 있을 때만 별점 표시 */}
          {store.rating && (
            <div className="text-[16px] font-medium flex-shrink-0">
              <FaStar className="text-yellow-400" />
              <span>{store.rating}</span>
            </div>
          )}
        </div>

        {/* business_info가 있을 때만 영업 상태 표시 */}
        {store.business_info?.status_message && (
          <p className="tex-[16px] font-bold">
            {store.business_info.status_message}
          </p>
        )}

        {/* deal_info 또는 display_text가 있을 때 할인 정보 표시 */}
        <div className="mt-2 pt-2 border-t">
          <p className="tex-[16px] font-bold text-secondary">
            {store.deal_info?.title || store.display_text}
          </p>
          <p className="text-xs text-gray-500">
            {store.deal_info?.description}
          </p>
        </div>

        <button
          className="bg-primary text-white mt-auto left-0 w-full p-2 h-[30px] rounded-[30px] flex justify-center items-center hover:cursor-pointer text-[14px] font-bold"
          onClick={() => navigate(`/store/${store.store_id}`)}
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
};

// 두 종류의 API 데이터를 모두 받을 수 있도록 PropTypes 수정
HotStoreCard.propTypes = {
  store: PropTypes.shape({
    store_id: PropTypes.string.isRequired,
    store_name: PropTypes.string.isRequired,
    rep_image_url: PropTypes.string,
    business_info: PropTypes.shape({
      status_message: PropTypes.string,
    }),
    deal_info: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    rating: PropTypes.number,
    display_text: PropTypes.string,
  }).isRequired,
};

export default HotStoreCard;
