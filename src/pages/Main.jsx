import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import Header from '../components/Header';
import DropdownTime from '../components/DropdownTime';

const Main = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSale, setSelectedSale] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 나중엔 메타 API(/search/filter)로 대체 가능
  // const timeSlots = ['06:00-07:00', '07:00-08:00', '08:00-09:00'];
  const typeSlots = [
    { code: 'Coffee', label: '카페', icon: './Coffee.svg' },
    { code: 'Bakery', label: '베이커리', icon: './Bakery.svg' },
    { code: 'Hamburger', label: '양식', icon: './Hamburger.svg' },
    { code: 'Soup_Plate', label: '한식', icon: './Soup_Plate.svg' },
    { code: 'View_More', label: '더보기', icon: './View_More.svg' },
  ];

  const handleTimeChange = (label) => {
    // timeSlots가 '07:00-08:00' 형식이면 그대로 저장
    setSelectedTime(label);
  };

  const handleTypeSelect = (label) => {
    console.log('누름!');
    setSelectedCategory(label);
    console.log({ selectedCategory });
  };

  const goToStores = () => {
    const params = {};
    if (selectedTime) params.time = selectedTime;
    if (selectedSale) params.sale = '1';
    if (selectedCategory) params.category = selectedCategory;
    navigate({ pathname: '/stores', search: `?${createSearchParams(params)}` });
  };

  const goToMockStores = () => {
    navigate('/stores_mock');
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
            selectedSale={selectedSale}
          />

          {/* 토글 항목 */}
          <div className="flex flex-col gap-[16px] justify-center mt-[16px]">
            {/* Time Group */}
            <div className="flex flex-row justify-center items-start gap-[6px]">
              <div className="flex flex-row gap-[6px] mr-[8px]">
                <p className="text-[12px] font-semibold mt-[2px]">오픈시간</p>
                <div className="flex justify-items-start">
                  <DropdownTime
                    placeholder="오픈시간 선택"
                    value={selectedTime}
                    // onChange={handleTimeChange}
                    design=" rounded-[20px] shadow-md border-0 h-min py-0"
                    font="medium"
                    rounded="[20px]"
                    onChange={handleTimeChange}
                  />
                </div>
              </div>

              <FilterButton
                label="모닝세일"
                selected={selectedSale}
                onClick={() => {
                  setSelectedSale((v) => !v);
                  console.log('got');
                }}
                design=" shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="mx-[30px] mt-[30px]">
          {' '}
          <div className="font-semibold ">메뉴가 고민이라면?</div>
          <div className="grid grid-cols-5 gap-[10px] m-[5px]">
            {typeSlots.map(({ code, label, icon }) => (
              <FilterButton
                iconOnly={true}
                isrc={icon}
                key={code}
                onClick={() => {
                  handleTypeSelect(code);
                  goToStores();
                }}
                label={label}
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
                onClick={() => navigate('/hot_sale')}
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
