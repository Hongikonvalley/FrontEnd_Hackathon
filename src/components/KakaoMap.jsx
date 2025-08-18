// src/components/KakaoMap.jsx

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const KakaoMap = ({ lat, lng, name }) => {
  // 1. name을 props로 받습니다.
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 2. 커스텀 오버레이에 표시할 내용(HTML)을 정의합니다.
      const content = `<div style="padding:5px; background:white; border:1px solid black; border-radius: 8px; font-size:12px; font-weight:bold;">${name}</div>`;

      // 3. 커스텀 오버레이를 생성합니다.
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        yAnchor: 2.2, // 마커 위에 오버레이가 오도록 y축 위치를 조정합니다.
      });

      // 4. 커스텀 오버레이를 지도에 표시합니다.
      customOverlay.setMap(map);
    }
  }, [lat, lng, name]); // name이 변경될 때도 다시 그리도록 의존성에 추가

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
};

KakaoMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired, // name prop에 대한 유효성 검사 추가
};

export default KakaoMap;
