import { Cloud } from '@/libs/utils/Icon';
import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1000"
        viewBox="0 0 400 200"
      >
        <defs>
          <path
            id="flightPath"
            d="M 0 100 C 100 50, 300 150, 400 100"
            fill="none"
            stroke="lightgrey"
            strokeWidth="2"
          />
        </defs>
        {/* 비행 경로를 따라 선을 그리기 위한 경로 */}
        <path
          id="line"
          d="M 0 100 C 100 50, 300 150, 400 100"
          fill="none"
          stroke="lightblue"
          strokeWidth="2"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0,400"
            to="440,0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        {/* 비행기 모양 */}
        <path
          id="plane"
          d="M 27,3 H 21 L 13,15 H 9 L 12,3 H 5 L 3,7 H -1 L 1,0 -1,-7 H 3 L 5,-3 H 12 L 9,-15 H 13 L 21,-3 H 27 C 33,-3 33,3 27,3 Z"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
        >
          <animateMotion
            rotate="auto"
            begin="0s"
            dur="2s"
            repeatCount="indefinite"
          >
            <mpath xlinkHref="#flightPath" />
          </animateMotion>
        </path>

        <g transform="translate(50, 20)">
          <Cloud width={40} height={40} />
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="70 0"
            dur="7s"
            repeatCount="indefinite"
            keyTimes="0; 0.5; 1"
            values="0 100; 100 90; 0 100"
          />
        </g>

        <g transform="translate(150, 50)">
          <Cloud width={50} height={50} />
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="90 0"
            dur="3s"
            repeatCount="indefinite"
            keyTimes="0; 0.5; 1"
            values="170 30; 200 35; 170 30"
          />
        </g>

        <g transform="translate(250, 10)">
          <Cloud width={35} height={35} />
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="100 0"
            dur="6s"
            repeatCount="indefinite"
            keyTimes="0; 0.5; 1"
            values="300 140; 280 130; 300 140"
          />
        </g>
      </svg>
    </div>
  );
}
