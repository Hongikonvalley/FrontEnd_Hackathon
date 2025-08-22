// src/pages/SettingAnnounce.jsx

import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import { FaChevronDown } from 'react-icons/fa'; // 아이콘 사용

// 가상 공지사항 데이터 (나중에는 API로 불러옵니다)
const announcements = [
  {
    id: 1,
    title: 'more;ing 서비스 정식 출시 안내',
    content:
      '안녕하세요, more;ing입니다. 드디어 저희 서비스가 정식으로 출시되었습니다! 여러분의 아침을 더 활기차게 만들어드릴 다양한 가게 정보와 혜택을 지금 바로 만나보세요.',
  },
  {
    id: 2,
    title: '개인정보처리방침 개정 안내 (2025년 8월)',
    content:
      '2025년 8월 22일부터 개인정보처리방침이 개정됩니다. 변경되는 내용에 대한 자세한 사항은 이메일을 통해 안내드렸으니 확인 부탁드립니다. 주요 변경 사항은 OOO입니다.',
  },
  {
    id: 3,
    title: '시스템 점검 안내 (오전 2시 ~ 4시)',
    content:
      '보다 안정적인 서비스 제공을 위해 시스템 점검을 실시합니다. 점검 시간 동안에는 서비스 이용이 원활하지 않을 수 있으니 양해 부탁드립니다. 점검 시간: 오전 2시 ~ 4시 (2시간)',
  },
];

const SettingAnnounce = () => {
  // 현재 열려있는 아코디언 아이템의 id를 저장하는 state
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    // 이미 열려있는 아이템을 다시 클릭하면 닫고, 다른 아이템을 클릭하면 엽니다.
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header title="공지사항" showBack={true} />
      <h1 className="text-2xl font-bold text-center my-4">공지사항</h1>
      <div className="p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {announcements.map((item) => (
              <div key={item.id} className="border-b last:border-b-0">
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex justify-between items-center p-4 text-left"
                >
                  <span className="font-semibold text-lg">{item.title}</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openId === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === item.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-4 pt-0 text-gray-600">{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingAnnounce;
