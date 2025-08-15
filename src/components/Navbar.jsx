import React from 'react';
import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useState } from 'react';

const Navbar = () => {
  const { isLoggedIn, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Zustand 스토어의 상태를 초기화합니다.
    clearAuth();
    alert('로그아웃 되었습니다.');
    // 로그아웃 후 로그인 페이지로 이동합니다.
    navigate('/');
  };

  return (
    <div>
      <header className="fixed bottom-0 bg-white w-full flex justify-between items-center pb-[20px] pt-[16px] px-[40px] border-b inset-shadow-sm">
        <NavLink
          to="/main"
          className={({ isActive }) =>
            isActive ? 'filter contrast-500' : 'filter contrast-50'
          }
        >
          <img
            src="/Home.svg"
            alt="Main"
            className="w-[40px] h-[40px] object-cover"
          />
        </NavLink>

        <NavLink
          to="/favorite"
          className={({ isActive }) =>
            isActive ? 'filter contrast-500' : 'filter contrast-50'
          }
        >
          <img
            src="/Heart.svg"
            alt="Favorite"
            className="w-[40px] h-[40px] object-cover"
          />
        </NavLink>

        <NavLink
          to="/coupon"
          className={({ isActive }) =>
            isActive ? 'filter contrast-500' : 'filter contrast-50'
          }
        >
          <img
            src="/Loyalty-Card.svg"
            alt="Cupon"
            className="w-[40px] h-[40px] object-cover"
          />
        </NavLink>

        <NavLink
          to="/mypage"
          className={({ isActive }) =>
            isActive ? 'filter contrast-500' : 'filter contrast-50'
          }
        >
          <img
            src="/Human-Head.svg"
            alt="MyPage"
            className="w-[40px] h-[40px] object-cover"
          />
        </NavLink>
      </header>
    </div>
  );
};

export default Navbar;

{
  /*
  <nav>
  {isLoggedIn ? (
    // 로그인 상태일 때 'Logout' 버튼을 보여줍니다.
    <button onClick={handleLogout} className="font-semibold">
      Logout
    </button>
  ) : (
    // 로그아웃 상태일 때 'Login' 링크를 보여줍니다.
    <Link to="/" className="font-semibold">
      Login
    </Link>
  )}
</nav>;
*/
}
