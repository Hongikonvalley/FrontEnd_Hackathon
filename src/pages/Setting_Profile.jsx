// src/pages/ProfileSettings.jsx

import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import Header from '../components/Header';

const Setting_Profile = () => {
  // 현재 사용자 정보 (나중에는 API로 불러옵니다)
  const [nickname, setNickname] = useState('잉뉴');
  const [profileImage, setProfileImage] = useState('/Profile.png');

  // 파일 입력을 위한 ref
  const fileInputRef = useRef(null);

  // 프로필 이미지 변경 버튼 클릭 시, 숨겨진 파일 입력창을 클릭합니다.
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 파일이 선택되면 이미지 미리보기를 업데이트합니다.
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 닉네임 입력 변경 핸들러
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 저장 버튼 클릭 핸들러
  const handleSubmit = () => {
    // TODO: 여기에 닉네임과 프로필 이미지를 서버에 저장하는 API 호출 로직 추가
    alert('프로필이 저장되었습니다!');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header title="프로필 설정" showBack={true} />
      <h1 className="text-2xl font-bold text-center my-4">프로필 설정</h1>
      <div className="p-4 md:p-6 pt-20">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* 프로필 사진 변경 섹션 */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
              <button
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full hover:bg-primary transition-colors"
                aria-label="Change profile picture"
              >
                <FaCamera />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden" // 화면에는 보이지 않음
              />
            </div>
          </div>

          {/* 닉네임 변경 섹션 */}
          <div className="mb-6">
            <label
              htmlFor="nickname"
              className="block text-lg font-semibold mb-2 text-gray-700"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* 저장 버튼 */}
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors"
          >
            변경사항 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting_Profile;
