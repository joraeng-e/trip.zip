/* eslint-disable @typescript-eslint/no-explicit-any */
import { kakaoscript } from '@/libs/constants/kakaoscript';
import React, { useEffect, useRef } from 'react';
import 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;
}

export default function KakaoMap({ address }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = kakaoscript;
    script.async = true;

    script.onload = () => {
      const { kakao } = window;

      kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new kakao.maps.Map(mapRef.current, options);
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const latitude: number = Number(result[0].y);
            const longitude: number = Number(result[0].x);
            const coords = new kakao.maps.LatLng(latitude, longitude);

            const marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

            marker.setMap(map); // 마커 렌더링
            map.panTo(coords);
          } else {
            console.error('주소 검색 실패:', status);
          }
        });
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  return (
    <>
      <div className="flex items-center justify-center pt-2">
        <div ref={mapRef} className="h-500 w-[95%]" />
      </div>
    </>
  );
}
