// src/components/Layout.jsx

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // 새로 만든 Header import
import Navbar from './Navbar'; // 수정된 Navbar import

export default function Layout() {
  const [showNavBar, setShowNavBar] = useState(true);

  return (
    <div>
      {/* {location.pathname !== '/main' && <Header />} */}

      {showNavBar && <Navbar />}
      <div className="pt-8 pb-8">
        <Outlet context={{ setShowNavBar }} />
      </div>
    </div>
  );
}
