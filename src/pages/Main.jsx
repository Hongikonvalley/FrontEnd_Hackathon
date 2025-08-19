import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import Header from '../components/Header';

const Main = () => {
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  // 나중엔 메타 API(/search/filter)로 대체 가능
  const timeSlots = ['06:00-07:00', '07:00-08:00', '08:00-09:00'];
  const categories = ['카페', '브런치', '베이커리'];
  const favorites = ['my', 'new'];

  const handleToggle = (type, value) => {
    const table = {
      time: setSelectedTime,
      category: setSelectedCategory,
      favorite: setSelectedFavorite,
    };
    table[type]?.((prev) => (prev === value ? null : value));
  };

  const goToStores = () => {
    const params = {};
    if (selectedTime) params.time = selectedTime;
    if (selectedCategory) params.category = selectedCategory;
    navigate({ pathname: '/stores', search: `?${createSearchParams(params)}` });
  };

  const goToMockStores = () => {
    navigate('/stores_mock');
  };

  const goToCoupon = () => {
    navigate('/coupon');
  };

  return (
    <>
      <Header title="main" showBack={false} />

      <div className="min-h-dvh pb-[calc(80px+env(safe-area-inset-bottom))] pt-2 space-y-4">
        {' '}
        {/* search bar div */}
        <div className="bg-primary rounded-[20px] mx-[30px] my-[16px] p-[28px] flex flex-col">
          <div className="font-bold text-[20px]">
            <p>윤서님,</p>
            <p>좋은 아침이에요</p>
            <p>오늘은 어디에서 시작할까요?</p>
          </div>

          <SearchBar
            selectedTime={selectedTime}
            selectedCategory={selectedCategory}
          />

          {/* 토글 항목 */}
          <div className="flex flex-col gap-[16px] justify-center mt-[16px]">
            {/* Time Group */}
            <div className="flex flex-row items-center gap-[6px]">
              <p className="text-[12px]">Time</p>
              {timeSlots.map((time) => (
                <FilterButton
                  key={time}
                  label={time}
                  selected={selectedTime === time}
                  onClick={() => handleToggle('time', time)}
                />
              ))}
            </div>

            {/* Favorite Group */}
            <div className="flex flex-row items-center gap-[6px]">
              <p className="text-[12px]">Place</p>
              {favorites.map((favorite) => (
                <FilterButton
                  key={favorite}
                  label={favorite}
                  selected={selectedCategory === favorite}
                  onClick={() => handleToggle('favorite', favorite)}
                />
              ))}
            </div>

            {/* Category Group */}
            <div className="flex flex-row items-center justify-between">
              {categories.map((category) => (
                <FilterButton
                  key={category}
                  label={category}
                  selected={selectedCategory === category}
                  onClick={() => handleToggle(' category', category)}
                  disabled={category === '베이커리'} // 예시로 베이커리는 비활성화
                />
              ))}
            </div>
          </div>
        </div>
        {/* 쿠폰 박스 */}
        <div className="border-primary border-2 rounded-[20px] mx-[30px] my-[16px] p-[16px] flex flex-col">
          <p className="font-bold text-[20px]">윤서님 주변의 쿠폰</p>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-[12px] ">
              <img
                src="/hdcafe.png"
                alt="coupon"
                className="w-2/5 h-auto aspect-square rounded-[15px] object-cover mt-[16px]"
              />
              <img
                src="/angel.png"
                alt="coupon"
                className="w-2/5 h-auto aspect-square rounded-[15px] object-cover mt-[16px]"
              />

              <div
                className="flex items-center text-[12px] font-bold"
                onClick={goToMockStores}
              >
                더보기
              </div>

              {/* //               <button
//                 className="bg-primary w-fit p-2 h-[30px] rounded-[30px] flex justify-center items-center hover:cursor-pointer text-[14px] mt-[6px]"
//                 onClick={goToCoupon}
//               />
//                 더보기
//                */}
            </div>
          </div>
        </div>
        {/* HOT 얼리버드 */}
        <div className="border-primary border-2 rounded-[20px] mx-[30px] my-[16px] p-[16px] flex flex-col">
          <p className="font-bold text-[20px]">오늘의 HOT🔥 얼리버드</p>
          <div className="flex flex-row items-center">
            <img
              src="/gabiae.png"
              alt="hot"
              className="w-2/5 h-auto aspect-square rounded-[15px] object-cover my-[16px]"
            />
            <div className="pl-[16px] flex-grow">
              <div className="flex flex-row items-center mt-[16px]">
                <p className="text-[20px] font-black">가비애</p>
                <p className="text-[20px] ml-2">⭐4.9</p>
              </div>
              <p className="text-[14px] font-medium">
                # 모든 자리에 콘센트 있음
              </p>
              <p className="text-[14px] font-medium"># 24시간 오픈</p>
              <p className="text-[12px]">홍대입구역에서 5분</p>
            </div>
          </div>
          <button
            className="bg-primary w-full p-2 h-[30px] rounded-[30px] flex justify-center items-center hover:cursor-pointer text-[14px] font-bold mt-[6px]"
            //onClick={goToStores}
            onClick={goToMockStores}
          >
            얼리버드 되기
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
