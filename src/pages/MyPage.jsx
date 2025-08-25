// src/pages/MyPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // 1. useQuery import
import { getUserPoints, getCurrentUser } from '../apis/auth'; // getCurrentUser import
import { FaChevronRight } from 'react-icons/fa';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';

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
  const testUserId = 'mutsa@mutsa.shop';
  const navigate = useNavigate();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUser,
    enabled: !!testUserId, // getUserProfile로 변경
  });

  const { data: pointData, isLoading: isPointLoading } = useQuery({
    queryKey: ['userPoints', testUserId], // queryKey에도 고정된 ID를 사용
    queryFn: () => getUserPoints(testUserId),
    enabled: !!testUserId, // 항상 실행되도록 보장
  });

  const goToExchange = () => {
    navigate('/exchange');
  };

  // 4. 로딩 및 에러 상태를 처리합니다.
  if (isPointLoading)
    return <div className="p-4 text-center">사용자 정보를 불러오는 중...</div>;

  return (
    <div>
      <Header title="mypage" showBack={true} />
      <div className="p-4 md:p-6 bg-white font-sans">
        {/* 1. 프로필 영역 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img
              // 2. API로 받은 프로필 이미지 표시 (null일 경우 기본 이미지)
              src={user?.profile_image || '/Profile.png'}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary"
            />
            <div>
              {/* 3. API로 받은 닉네임 표시 */}
              <p className="text-2xl font-bold">{user?.nickname}</p>
            </div>
          </div>
        </div>

        {/* 2. 포인트 박스 */}
        <div className="bg-primary p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-head text-black">more;ing</h1>
            <h1>Point</h1>
          </div>
          <div className="flex justify-between items-end mt-2">
            {/* 4. API 명세서에 맞는 'point_balance'를 사용합니다. */}
            <p className="text-xl font-head text-white">
              {pointData?.point_balance.toLocaleString() ?? 0} 포인트
            </p>
            <button
              onClick={goToExchange}
              className="bg-secondary text-white items-center px-3 py-1 rounded-lg hover:bg-secondary transition-colors font-bold"
            >
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
