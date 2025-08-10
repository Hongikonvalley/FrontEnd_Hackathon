// src/components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // 새로 만든 Header import
import Navbar from './Navbar'; // 수정된 Navbar import

export default function Layout() {
  return (
    <div>
      {/* {location.pathname !== '/main' && <Header />} */}

      {/* pt-16과 pb-16을 모두 적용하여 위아래 공간을 확보합니다. */}
      <div className="pt-8 pb-8">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}
