import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import Header from '../components/Header';
import DropdownMenu from '../components/DropdownMenu';

const Main = () => {
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  // 나중엔 메타 API(/search/filter)로 대체 가능
  const timeSlots = ['06:00-07:00', '07:00-08:00', '08:00-09:00'];
  const typeSlots = [
    'Coffee',
    'Bakery',
    'Hamburger',
    'Soup_Plate',
    'View_More',
  ];

  const handleToggle = (type, value) => {
    const table = {
      time: setSelectedTime,
      category: setSelectedCategory,
      favorite: setSelectedFavorite,
      type: setSelectedType,
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
        <div className="bg-primary rounded-[20px] mx-[30px] my-[16px] p-[22px] flex flex-col">
          <div className="font-bold text-[20px]">
            <p>윤서님,</p>
            <p>좋은 아침이에요</p>
            <p>오늘은 어디에서 시작할까요?</p>
          </div>

          <SearchBar
            variant="main"
            holder="지금 떠오르는 메뉴를 검색해보세요."
            selectedTime={selectedTime}
            selectedCategory={selectedCategory}
          />

          {/* 토글 항목 */}
          <div className="flex flex-col gap-[16px] justify-center mt-[16px]">
            {/* Time Group */}
            <div className="flex flex-row justify-center items-start gap-[6px]">
              <div className="flex flex-row gap-[6px]">
                <p className="text-[12px] flex mt-[4px]">시간대</p>
                {/* select */}
                {/* <select
                  key="시간대"
                  className="w-auto shadow-lg flex p-[2px] m-[8px] rounded-[20px] text-[12px] bg-white"
                >
                  {timeSlots.map((time) => (
                    <option value={time}>{time}</option>
                  ))}
                </select> */}
                <div className="flex justify-items-start">
                  <DropdownMenu
                    options={timeSlots}
                    placeholder={timeSlots[0]}
                    value={selectedTime}
                    onChange={setSelectedTime}
                    type=" rounded-[20px] shadow-md border-0 h-min py-0"
                    font="medium"
                    rounded="[20px]"
                  />
                </div>
              </div>

              <FilterButton
                label="모닝세일"
                selected={selectedCategory}
                onClick={() => handleToggle('favorite', favorite)}
              />
            </div>
          </div>
        </div>
        <div className="mx-[30px] mt-[30px]">
          {' '}
          <div className="font-semibold ">메뉴가 고민이라면?</div>
          <div className="grid grid-cols-5 gap-[10px] m-[5px]">
            {typeSlots.map((type) => (
              <FilterButton
                iconOnly={true}
                isrc={`./${type}.svg`}
                key="type"
                onClick={handleToggle()}
              />
            ))}
          </div>
        </div>
        {/* HOT 모닝세일 */}
        <div className="border-b-1 border-[#DBDBDB] mx-[20px] mt-[8px] mb-0 p-[16px] flex flex-col">
          <p className="font-extrabold text-[20px]">오늘의 HOT 모닝세일</p>
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
            </div>
          </div>
        </div>
        {/* 인기매장 */}
        <div className="mx-[20px] p-[16px] flex flex-col">
          <p className="font-extrabold text-[20px]">오늘의 인기 매장</p>
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
              <p className="text-[14px] font-medium">24시간 오픈</p>
              <p className="text-[14px] font-medium text-secondary">
                오전시간 사이즈업
              </p>
              <button
                className="bg-primary text-white w-full p-2 h-[30px] rounded-[30px] flex justify-center items-center hover:cursor-pointer text-[14px] font-bold mt-[6px]"
                //onClick={goToStores}
                onClick={goToMockStores}
              >
                자세히 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
