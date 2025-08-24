// src/pages/Hot.jsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMorningSaleStores } from '../apis/stores'; // 1. API 함수 import
import Header from '../components/Header';
import HotStoreCard from '../components/HotStoreCard'; // 2. HotStoreCard 컴포넌트 import

const Hot = () => {
  // 3. useQuery를 사용해 모닝세일 매장 목록을 불러옵니다.
  const {
    data: saleStores = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['morningSaleStores'],
    queryFn: getMorningSaleStores,
  });

  if (isLoading)
    return <div className="p-4 pt-20 text-center">목록을 불러오는 중...</div>;
  if (error)
    return (
      <div className="p-4 pt-20 text-center text-red-500">
        오류가 발생했습니다.
      </div>
    );

  return (
    <>
      <Header showBack={true} />
      <div className="">
        <div className="text-[18px] font-black flex flex-row justify-center mx-[16px] mb-4">
          <div>오늘의</div>
          <div className="text-secondary">&nbsp;HOT</div>
          <div>&nbsp;모닝세일</div>
        </div>

        {/* 4. StoreCard 대신 HotStoreCard를 사용합니다. */}
        <div className="flex flex-col items-center gap-2 w-full max-w-4xl mx-auto p-4">
          {saleStores.length > 0 ? (
            // API 응답 데이터의 키 이름(store_id)을 사용해야 합니다.
            saleStores.map((store) => (
              <HotStoreCard key={store.store_id} store={store} />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-8">
              진행중인 모닝세일 정보가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hot;
