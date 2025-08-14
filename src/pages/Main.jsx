import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import Header from '../components/Header';

const Main = () => {
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 나중엔 메타 API(/search/filter)로 대체 가능
  const timeSlots = ['06:00-07:00', '07:00-08:00', '08:00-09:00'];
  const categories = ['카페', '브런치', '베이커리'];

  const handleTimeSelect = (timeRange) => {
    setSelectedTime((prev) => (prev === timeRange ? null : timeRange));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
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

  return (
    <>
      <Header title="main" showBack={false} />

      {/* search bar div */}
      <div className="bg-[#FCE6A4]  rounded-[20px] mx-[30px] my-[16px] p-[28px] flex flex-col">
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
        <div className="flex flex-row justify-between mt-[16px]">
          {/* Time Group */}
          <div className="flex flex-row items-center gap-[6px]">
            <p className="text-[12px]">Time</p>
            {timeSlots.map((time) => (
              <FilterButton
                key={time}
                label={time}
                selected={selectedTime === time}
                onClick={() => handleTimeSelect(time)}
              />
            ))}
          </div>

          {/* Category Group */}
          <div className="flex flex-row items-center gap-[6px]">
            <p className="text-[12px]">Category</p>
            {categories.map((category) => (
              <FilterButton
                key={category}
                label={category}
                selected={selectedCategory === category}
                onClick={() => handleCategorySelect(category)}
                disabled={category === '베이커리'} // 예시로 베이커리는 비활성화
              />
            ))}
          </div>
        </div>

        {/* menu */}
        <div className="flex flex-row justify-between mt-[16px]">
          {' '}
          <button className="bg-white w-fit p-2 h-[20px] rounded-[20px] flex justify-center items-center hover:cursor-pointer text-[12px]">
            menu 1
          </button>
          <button className="bg-white w-fit p-2 h-[20px] rounded-[20px] flex justify-center items-center hover:cursor-pointer text-[12px]">
            other menu
          </button>
          <button className="bg-white w-fit p-2 h-[20px] rounded-[20px] flex justify-center items-center hover:cursor-pointer text-[12px]">
            the other one !
          </button>
        </div>
      </div>

      {/* 쿠폰 박스 */}
      <div className="border-[#FCE6A4] border-2 rounded-[20px] mx-[30px] my-[16px] p-[18px] flex flex-col">
        <p className="font-bold text-[20px]">윤서님 주변의 쿠폰</p>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-[16px] ">
            <img
              src="/hdcafe.png"
              alt="coupon"
              className="w-[120px] h-[120px] rounded-[15px] object-cover mt-[16px]"
            />
            <img
              src="/angel.png"
              alt="coupon"
              className="w-[120px] h-[120px] rounded-[15px] object-cover mt-[16px]"
            />
            <p className="flex items-end text-[12px] font-bold">더보기</p>
          </div>
        </div>
      </div>

      {/* HOT 얼리버드 */}
      <div className="border-[#FCE6A4] border-2 rounded-[20px] mx-[30px] my-[16px] p-[18px] flex flex-col">
        <p className="font-bold text-[20px]">오늘의 HOT🔥 얼리버드</p>
        <div className="flex flex-row items-center">
          <img
            src="/gabiae.png"
            alt="hot"
            className="w-[120px] h-[120px] rounded-[15px] object-cover mt-[16px]"
          />
          <div className="pl-[16px] flex-grow">
            <div className="flex flex-row items-center mt-[16px]">
              <p className="text-[20px] font-black">가비애</p>
              <p className="text-[20px] ml-2">⭐4.9</p>
            </div>
            <p className="text-[14px] font-medium"># 모든 자리에 콘센트 있음</p>
            <p className="text-[14px] font-medium"># 24시간 오픈</p>
            <p className="text-[12px]">홍대입구역에서 5분</p>
          </div>
        </div>
        <button
          className="bg-[#FCE6A4] w-full p-2 h-[30px] rounded-[30px] flex justify-center items-center hover:cursor-pointer text-[14px] font-bold mt-[6px]"
          onClick={goToMockStores}
          //onClick={goToStores}
        >
          얼리버드 되기
        </button>
      </div>
    </>
  );
};

export default Main;
