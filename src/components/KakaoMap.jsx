// src/components/KakaoMap.jsx

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const KakaoMap = ({ lat, lng }) => {
  // lat, lng를 props로 받음
  useEffect(() => {
    const JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${JAVASCRIPT_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          // props로 받은 lat, lng를 지도의 중심좌표로 설정
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커를 생성하고 지도에 표시
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [lat, lng]); // lat, lng가 변경될 때 지도를 다시 그리도록 의존성 배열에 추가

  return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

KakaoMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default KakaoMap;
