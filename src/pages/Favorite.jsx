// src/pages/Favorite.jsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFavoriteStores } from '../apis/stores';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

const Favorite = () => {
  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavoriteStores,
  });

  if (isLoading)
    return (
      <div className="p-4 text-center">즐겨찾기 목록을 불러오는 중...</div>
    );
  if (error)
    return (
      <div className="p-4 text-center text-red-500">오류가 발생했습니다.</div>
    );

  return (
    <div>
      <Header title="즐겨찾기" showBack={true} />
      <div className="p-4 md:p-6">
        {favorites.length > 0 ? (
          // 즐겨찾기 목록이 있으면 카드를 나열
          favorites.map((fav) => (
            <FavoriteCard key={fav.store_id} favorite={fav} />
          ))
        ) : (
          // 즐겨찾기 목록이 없으면 안내 메시지 표시
          <div className="flex flex-col items-center justify-center text-center pt-24">
            <div className="text-2xl font-head text-secondary">more;ing</div>
            <div className="mt-2">
              더 많은 more;ing을 즐겨찾기 하고 <br />
              혜택을 받아보세요!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
