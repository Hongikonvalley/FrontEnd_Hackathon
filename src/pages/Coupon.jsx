import React from 'react';
import CouponCard from '../components/CouponCard';
import Header from '../components/Header';

const Coupon = () => {
  return (
    <div>
      <Header title="쿠폰" showBack={true} />
      <CouponCard />
    </div>
  );
};

export default Coupon;
