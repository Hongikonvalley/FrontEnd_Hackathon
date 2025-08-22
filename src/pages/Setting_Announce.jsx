// src/pages/setting_announce.jsx

import React from 'react';
import Header from '../components/Header.jsx';

const Setting_Announce = () => {
  // 컴포넌트 이름은 대문자로 시작하는 것이 규칙입니다.
  return (
    <div>
      <Header title="나의 리뷰 모아보기" showBack={true} />
      <h1 className="text-2xl font-bold text-center my-4">
        나의 리뷰 모아보기
      </h1>
      <div className="p-4 md:p-6">
        {myReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Setting_Announce;
