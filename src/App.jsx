// src/App.jsx

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login.jsx";
import KakaoRedirect from "./pages/KakaoRedirect.jsx";
import Main from "./pages/Main.jsx";
import "./index.css";

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
          {/* Layout 안에 다른 페이지를 추가하려면 여기에 Route를 추가하세요 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
