// src/pages/Stores.jsx

import React from 'react';
import { stores } from '../data/mockStores'; // 전체 Mock Data 불러오기
import StoreCard from '../components/StoreCard';

const Stores = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">전체 매장 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* stores 배열의 각 item을 store라는 이름으로 StoreCard에 전달 */}
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default Stores;
