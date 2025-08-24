// src/pages/setting_myreviews.jsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyReviews } from '../apis/auth'; // API 함수 import
import Header from '../components/Header.jsx';
import ReviewCard from '../components/ReviewCard.jsx';

const SettingMyReviews = () => {
  const testUserId = 'mutsa@mutsa.shop';

  // 2. user_id가 성공적으로 로드되면, 그 ID를 사용해 리뷰 목록을 요청합니다.
  const {
    data: myReviews = [],
    isLoading: areReviewsLoading,
    error,
  } = useQuery({
    queryKey: ['myReviews', testUserId],
    queryFn: () => getMyReviews(testUserId),
    enabled: !!testUserId, // user 데이터가 있을 때만 이 쿼리를 실행합니다.
  });

  if (areReviewsLoading)
    return <div className="p-4 text-center">리뷰를 불러오는 중...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">오류가 발생했습니다.</div>
    );

  return (
    <div>
      <Header title="나의 리뷰 모아보기" showBack={true} />
      <div className="p-4 md:p-6 pt-20">
        {myReviews.length > 0 ? (
          myReviews.map((review) => (
            <ReviewCard key={review.review_id} review={review} />
          ))
        ) : (
          <div className="text-center text-gray-500 pt-16">
            작성한 리뷰가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingMyReviews;
