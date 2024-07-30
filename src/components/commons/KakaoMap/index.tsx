/* eslint-disable @typescript-eslint/no-explicit-any */
import { kakaoscript } from '@/libs/constants/kakaoscript';
import React, { useEffect, useRef, useState } from 'react';
import 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;
}

/**
 * @example
 * ```tsx
 * import KakaoMap from '@/components/KakaoMap';
 * import DaumPostcode, { Address } from 'react-daum-postcode';
 * 
 * export default function ModalEx() {
 *   const [address, setAddress] = useState<string>('');
 * 
 *   const handleAddressSelect = (e: Address) => {
 *     setAddress(e.address);
 *   };
 *  
 *  return (
 *    <>
        <div className="h-500 w-500">
          <KakaoMap address={address} />
        </div>
        <DaumPostcode onComplete={handleAddressSelect}></DaumPostcode>
 *    </>
 *  )
 * }
 * ```
 * @param {string} address - 원하는 주소를 넣어주세요. daumpostcode 사용 시 도로명 주소로 자동으로 넣어집니다.
 * 
 * @author 배영준
 */

export default function KakaoMap({ address }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [scriptFlag, setScriptFlag] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = kakaoscript;
    script.async = true;
    script.onload = () => {
      setScriptFlag(true);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!scriptFlag) return;

    const { kakao } = window;

    kakao.maps.load(() => {
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new kakao.maps.Map(mapRef.current, options);
      const geocoder = new kakao.maps.services.Geocoder();

      if (!address) {
        const marker = new kakao.maps.Marker({
          map,
        });
        marker.setMap(map);
        return;
      }

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
  }, [address, scriptFlag]);

  return (
    <>
      <div className="flex items-center justify-center pt-2">
        <div ref={mapRef} className="h-500 w-[95%]" />
      </div>
    </>
  );
}
