import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const Navbar = () => {
  const { isLoggedIn, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Zustand 스토어의 상태를 초기화합니다.
    clearAuth();
    alert("로그아웃 되었습니다.");
    // 로그아웃 후 로그인 페이지로 이동합니다.
    navigate("/");
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b">
        <Link to="/main" className="text-xl font-bold">
          My App
        </Link>
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
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
