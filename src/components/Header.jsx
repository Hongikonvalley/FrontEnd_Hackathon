// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, showBack }) => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-row itmes-center justify-between p-[20px] bg-white text-[20px]">
      {showBack && (
        <img
          src="/Back.svg"
          alt="Back"
          className="w-[36px] h-[36px] cursor-pointer"
          onClick={() => navigate(-1)} // 뒤로가기
        />
      )}
      <div className="flex">
        {' '}
        {title === 'fav' ? <div>my</div> : <></>}
        <Link to="/main">more;ing</Link>
      </div>

      <img
        src="/Menu.png"
        alt="hmb"
        onClick={() => {
          navigate('/mypage');
        }}
      />
    </header>
  );
};

export default Header;
