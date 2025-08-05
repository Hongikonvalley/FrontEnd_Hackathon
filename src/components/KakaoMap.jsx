import React, { useEffect, useRef } from 'react';

const KakaoMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
    console.log('Kakao Map JavaScript Key:', JAVASCRIPT_KEY);

    // 이미 스크립트가 있으면 추가하지 않음
    if (!document.getElementById('kakao-map-script')) {
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${JAVASCRIPT_KEY}&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps)
          console.log('Kakao Maps API loaded successfully');
        {
          window.kakao.maps.load(() => {
            const container = mapRef.current;
            const options = {
              center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
              level: 3,
            };
            new window.kakao.maps.Map(container, options);
          });
        }
      };
    } else {
      console.log('Kakao Maps API script already loaded');
      // 이미 로드된 경우 바로 실행, 없으면 재시도
      const tryLoadMap = () => {
        if (window.kakao && window.kakao.maps) {
          console.log('Kakao Maps API is ready');
          window.kakao.maps.load(() => {
            const container = mapRef.current;
            const options = {
              center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
              level: 3,
            };
            new window.kakao.maps.Map(container, options);
          });
        } else {
          setTimeout(tryLoadMap, 100); // 100ms 후 재시도
        }
      };
      tryLoadMap();
    }
  }, []);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{
        width: '100%',
        height: '400px',
      }}
    ></div>
  );
};

export default KakaoMap;
