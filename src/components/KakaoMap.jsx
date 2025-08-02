import React, { useEffect, useRef } from "react";

const KakaoMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const JAVASCRIPT_KEY = "9bd4f5813fb93d5f902b9084883d430a"; // 테스트용 직접 입력

    // 이미 스크립트가 있으면 추가하지 않음
    if (!document.getElementById("kakao-map-script")) {
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${JAVASCRIPT_KEY}&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
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
      // 이미 로드된 경우 바로 실행
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = mapRef.current;
          const options = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3,
          };
          new window.kakao.maps.Map(container, options);
        });
      }
    }
  }, []);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{
        width: "100%",
        height: "400px",
      }}
    ></div>
  );
};

export default KakaoMap;
