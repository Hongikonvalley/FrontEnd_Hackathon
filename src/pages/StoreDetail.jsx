// src/pages/StoreDetail.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { stores } from '../data/mockStores';

const StoreDetail = () => {
  // URL의 파라미터(예: /store/102)에서 id 값을 가져옵니다.
  const { id } = useParams();

  // id 값과 일치하는 가게 데이터를 mockStores에서 찾습니다.
  // URL 파라미터는 문자열이므로 숫자로 변환(parseInt)해서 비교합니다.
  const store = stores.find((s) => s.id === parseInt(id));

  // 만약 해당하는 가게 정보가 없으면 메시지를 표시합니다.
  if (!store) {
    return <div className="p-6">해당하는 가게 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-2">{store.name}</h1>
      <p className="text-lg text-gray-600 mb-4">{store.address}</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {store.galleryImages.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`${store.name} 갤러리 이미지 ${index + 1}`}
            className="rounded-lg object-cover w-full h-48"
          />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">매장 정보</h2>
        <ul>
          <li>
            <strong>전화번호:</strong> {store.phone}
          </li>
          <li>
            <strong>영업시간:</strong> {store.openTime} ~ {store.closeTime}
          </li>
          <li>
            <strong>현재상태:</strong> {store.isOpen ? '영업 중' : '영업 종료'}
          </li>
          <li>
            <strong>카테고리:</strong> {store.category}
          </li>
        </ul>
        {/* 여기에 메뉴, 쿠폰 등 다른 정보들을 추가로 표시할 수 있습니다. */}
      </div>
    </div>
  );
};

export default StoreDetail;
