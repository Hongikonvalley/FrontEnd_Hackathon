// src/pages/Stores.jsx

import React from 'react';
import { useEffect } from 'react';
import { stores } from '../data/mockStores'; // 전체 Mock Data 불러오기
import StoreCard from '../components/StoreCard';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Stores = () => {
  const { setShowNavBar } = useOutletContext();
  useEffect(() => {
    setShowNavBar(false); // 페이지 들어올 때 숨김
    return () => setShowNavBar(true); // 페이지 나갈 때 복구
  }, [setShowNavBar]);

  const nav = useNavigate();
  const onClickBack = () => {
    nav('/');
  };

  return (
    <div className="p-6 bg-white min-h-screen ">
      <div className="flex flex-row items-center content-center justify-between mb-6">
        <img
          src="/Back.svg"
          alt="Back"
          className="w-[36px] h-[36px]"
          onClick={() => onClickBack()}
        />
        <p className="text-[30px]">more;ing</p>
        <img src="/Menu.png" alt="Menu" className="w-[40px] h-[40px]" />
      </div>
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
        {/* stores 배열의 각 item을 store라는 이름으로 StoreCard에 전달 */}
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default Stores;
