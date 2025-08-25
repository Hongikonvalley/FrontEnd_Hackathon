// src/pages/ExchangePage.jsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, getUserPoints } from '../apis/auth';
import Header from '../components/Header.jsx';
import { FaMoneyBillWave } from 'react-icons/fa';

const Exchange = () => {
  const testUserId = 'mutsa@mutsa.shop';

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUser,
    enabled: !!testUserId, // getUserProfile로 변경
  });

  const { data: pointData, isLoading: isPointLoading } = useQuery({
    queryKey: ['userPoints', testUserId], // queryKey에도 고정된 ID를 사용
    queryFn: () => getUserPoints(testUserId),
    enabled: !!testUserId, // 항상 실행되도록 보장
  });

  const pointHistory = [
    { id: 1, reason: '리뷰 등록', amount: 10 },
    { id: 2, reason: '10번째 리뷰 등록', amount: 50 },
    { id: 3, reason: '20번째 리뷰 등록', amount: 100 },
  ];

  if (isUserLoading || isPointLoading) {
    return <div className="p-4 text-center">사용자 정보를 불러오는 중...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header title="포인트 환전" showBack={true} />
      <div className="p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          {/* 2. 환전 신청 폼 */}
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
                placeholder="은행과 계좌번호를 입력하세요"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors">
              환전 신청하기
            </button>
          </div>
          {/* 2. 포인트 적립 내역 섹션 추가 */}
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
                  <p className="text-gray-600">{item.reason}</p>
                  <p className="font-semibold text-green-600">
                    + {item.amount.toLocaleString()} P
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

export default Exchange;
