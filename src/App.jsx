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
import Setting from './pages/Setting.jsx';
import Setting_Announce from './pages/Setting_Announce.jsx';
import Setting_Chatting from './pages/Setting_Chatting.jsx';
import Setting_Instagram from './pages/Setting_Instagram.jsx';
import Setting_MyReviews from './pages/Setting_MyReviews.jsx';
import Setting_Profile from './pages/Setting_Profile.jsx';
//import StoreDetail_mock from './pages/StoreDetail_mock.jsx';
import Stores_mock from './pages/Stores_mock.jsx';
import './index.css';
import Register from './pages/Register.jsx';
import Hot from './pages/Hot.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout이 적용되지 않는 단독 경로 */}
        <Route path="/auth/callback" element={<KakaoRedirect />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        {/* Layout이 적용되는 경로들 */}
        <Route element={<Layout />}>
          <Route path="/stores_mock" element={<Stores_mock />} />
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/store" element={<Stores />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/setting_announce" element={<Setting_Announce />} />
          <Route path="/setting_chatting" element={<Setting_Chatting />} />
          <Route path="/setting_instagram" element={<Setting_Instagram />} />
          <Route path="/setting_myreviews" element={<Setting_MyReviews />} />
          <Route path="/setting_profile" element={<Setting_Profile />} />
          <Route path="/hot_sale" element={<Hot />} />
          {/* <Route path="/store/:id/mock" element={<StoreDetail_mock />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
