// src/App.jsx

import React, { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login.jsx';
import KakaoRedirect from './pages/KakaoRedirect.jsx';
import Main from './pages/Main.jsx';
import MyPage from './pages/MyPage.jsx';
import Coupon from './pages/Coupon.jsx';
import Stores from './pages/Stores.jsx';
import Favorite from './pages/Favorite.jsx';
import StoreDetail from './pages/StoreDetail.jsx';
import './index.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout이 적용되지 않는 단독 경로 */}
        <Route path="/auth/callback" element={<KakaoRedirect />} />

        {/* Layout이 적용되는 경로들 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/store" element={<Stores />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/store/:id" element={<StoreDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
