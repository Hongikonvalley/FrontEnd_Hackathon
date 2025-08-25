// src/components/KakaoMap.jsx

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const KakaoMap = ({ lat, lng, name }) => {
  useEffect(() => {
    // window.kakao 객체가 로드되었는지 확인 후 지도 생성
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

      const content = `<div style="padding:5px; background:white; border:1px solid black; border-radius: 8px; font-size:12px; font-weight:bold;">${name}</div>`;
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        yAnchor: 2.2,
      });
      customOverlay.setMap(map);
    }
  }, [lat, lng, name]);

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
  name: PropTypes.string.isRequired,
};

export default KakaoMap;
