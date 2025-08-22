// src/pages/MyPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import Header from '../components/Header.jsx';

// 메뉴 아이템을 위한 재사용 가능한 컴포넌트
const MenuItem = ({ to, children, iconSrc }) => (
  <Link
    to={to}
    className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center gap-4">
      <img src={iconSrc} alt="" className="w-6 h-6" />
      <span className="font-semibold">{children}</span>
    </div>
    <FaChevronRight className="text-gray-400" />
  </Link>
);

const MyPage = () => {
  return (
    <div>
      <Header title="mypage" showBack={true} />
      <div className="p-4 md:p-6 bg-gray-50 font-sans">
        {/* 1. 프로필 영역 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img
              src="/Profile.png" // 임시 프로필 이미지
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <p className="text-2xl font-bold">잉뉴</p>
            </div>
          </div>
        </div>

        {/* 2. 포인트 박스 */}
        <div className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <div className="flex itmes-center gap-2">
            <h1 className="text-lg font-head text-black">more;ing</h1>
            <h1>Point</h1>
          </div>
          <div className="flex justify-between items-end mt-2">
            <p className="text-xl font-head text-white">1,250 포인트</p>
            <button className="bg-secondary text-white items-center px-3 py-1 rounded-lg hover:bg-secondary transition-colors font-bold">
              환전하기
            </button>
          </div>
        </div>

        {/* 메뉴 목록 */}
        <div className="bg-white rounded-lgoverflow-hidden">
          {/* 2. 각 MenuItem에 맞는 iconSrc를 전달 */}
          <MenuItem to="/setting_profile" iconSrc="/Human Head.png">
            프로필 설정
          </MenuItem>
          <MenuItem to="/setting_myreviews" iconSrc="/Popular.png">
            나의 리뷰 모아보기
          </MenuItem>
        </div>

        <div className="bg-white rounded-lg overflow-hidden mt-6">
          <MenuItem to="/setting_announce" iconSrc="/Noticeboard.png">
            공지사항
          </MenuItem>
          <MenuItem to="/setting_chatting" iconSrc="/Online Support.png">
            지원팀과 채팅하기
          </MenuItem>
          <MenuItem to="/setting_instagram" iconSrc="/Instagram.png">
            인스타그램
          </MenuItem>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
