// src/pages/ExchangePage.jsx

import React, { useState } from 'react'; // 1. useState import
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, getUserPoints, getPointHistory } from '../apis/auth';
import Header from '../components/Header.jsx';
import { FaMoneyBillWave } from 'react-icons/fa';

const ExchangePage = () => {
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUser,
  });

  const { data: pointData, isLoading: isPointLoading } = useQuery({
    queryKey: ['userPoints', user?.user_id],
    queryFn: () => getUserPoints(user.user_id),
    enabled: !!user,
  });

  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['pointHistory', user?.user_id],
    queryFn: () => getPointHistory(user.user_id),
    enabled: !!user,
  });

  // 2. 입력값을 관리할 state 추가
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [accountInfo, setAccountInfo] = useState('');

  // 환전 신청 버튼 클릭 핸들러
  const handleExchangeSubmit = () => {
    // TODO: 환전 신청 API 호출 로직 추가
    alert(`${exchangeAmount}P 환전 신청이 완료되었습니다.`);
  };

  if (isUserLoading || isPointLoading || isHistoryLoading) {
    return <div className="p-4 text-center">사용자 정보를 불러오는 중...</div>;
  }

  const pointHistory = historyData?.history || [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header title="포인트 환전" showBack={true} />
      <div className="p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          {/* 3. 환전 신청 폼 UI 및 state 연동 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-500">
                보유 포인트
              </label>
              <p className="text-2xl font-bold text-primary">
                {pointData?.point_balance.toLocaleString() ?? 0} P
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-lg font-semibold mb-2 text-gray-700"
              >
                환전할 금액
              </label>
              <input
                type="number"
                id="amount"
                value={exchangeAmount}
                onChange={(e) => setExchangeAmount(e.target.value)}
                placeholder="금액 입력"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="account"
                className="block text-lg font-semibold mb-2 text-gray-700"
              >
                계좌번호
              </label>
              <input
                type="text"
                id="account"
                value={accountInfo}
                onChange={(e) => setAccountInfo(e.target.value)}
                placeholder="은행과 계좌번호를 입력하세요"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={handleExchangeSubmit}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              환전 신청하기
            </button>
          </div>

          {/* 포인트 적립 내역 섹션 */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              포인트 적립 내역
            </h2>
            <div className="space-y-4">
              {pointHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  <div>
                    <p className="text-gray-600">{item.reason}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${item.type === 'EARN' ? 'text-green-600' : 'text-red-500'}`}
                  >
                    {item.type === 'EARN' ? '+' : '-'}{' '}
                    {item.points.toLocaleString()} P
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangePage;
