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

      {title === 'setting' ? (
        <div className="w-1/12" />
      ) : title === 'mypage' ? (
        <img
          src="/Settings.png"
          alt="Settings"
          onClick={() => {
            navigate('/settings');
          }}
        />
      ) : (
        <img
          src="/Menu.png"
          alt="hmb"
          onClick={() => {
            navigate('/settings');
          }}
        />
      )}
    </header>
  );
};

export default Header;
