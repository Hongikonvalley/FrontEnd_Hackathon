// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, showBack }) => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-row itmes-center justify-between  bg-white text-[25px] m-[16px]">
      {showBack && (
        <img
          src="/Back.svg"
          alt="Back"
          className="w-[34px] h-[34px] cursor-pointer"
          onClick={() => navigate(-1)} // 뒤로가기
        />
      )}
      <div className="flex">
        {title === 'fav' || title === 'mypage' ? (
          <div className="font-semibold ">my</div>
        ) : (
          <></>
        )}
        {title === 'setting' ? (
          <div className="px-[10px]"> 설정 </div>
        ) : (
          <Link to="/main" className="font-head px-[10px]">
            more;ing
          </Link>
        )}
      </div>

      <img
        src="/Settings.png"
        alt="Settings"
        className="w-8 h-8 cursor-pointer" // 아이콘 크기 예시
        onClick={() => navigate('/settings')}
      />
    </header>
  );
};

export default Header;
