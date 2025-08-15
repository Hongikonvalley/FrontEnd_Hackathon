// src/components/KakaoMap.jsx

import React, { useEffect } from 'react';

const KakaoMap = () => {
  useEffect(() => {
    // window.kakao 객체가 로드되었는지 확인 후 지도 생성
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      new window.kakao.maps.Map(container, options);
    }
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '400px',
      }}
    ></div>
  );
};

export default KakaoMap;
