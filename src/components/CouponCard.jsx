import React from 'react';
import Header from './Header';

const CouponCard = ({ coupon }) => {
  return (
    <div className="bg-primary shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">쿠폰 이름</h2>
      <p className="text-gray-700 mb-2">쿠폰 설명</p>
      <p className="text-green-600 font-semibold">할인: 10%</p>
      <p className="text-gray-500 text-sm">유효기간: 2023-12-31</p>
    </div>
  );
  {
    /*<div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{coupon.title}</h2>
      <p className="text-gray-700 mb-2">{coupon.description}</p>
      <p className="text-green-600 font-semibold">할인: {coupon.discount}%</p>
      <p className="text-gray-500 text-sm">유효기간: {coupon.expiryDate}</p>
    </div>*/
  }
};
export default CouponCard;
