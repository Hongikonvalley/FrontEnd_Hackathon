// src/pages/Stores_mock.jsx

import React from 'react';
import { stores } from '../data/mockStores';
import StoreCard from '../components/StoreCard';

const Stores = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">전체 매장 목록</h1>

      {/* 카드 목록을 세로로 정렬하고, 중앙에 배치하며 최대 너비를 설정합니다. */}
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default Stores;
