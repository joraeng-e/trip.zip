import React from 'react';

type LoadingProps = {
  width?: number;
};

/**
 * Loading 컴포넌트는 비행기가 비행 경로를 따라 이동하는 로딩 애니메이션을 표시합니다.
 *
 * @param {LoadingProps} props - props로 width를 써주세요. 안 쓰면 기본값
 * @param {number} [props.width=1000] - 로딩 애니메이션의 너비(기본값 1000)
 * @author 김보미
 */

export default function Loading({ width = 1000 }: LoadingProps) {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
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
      </svg>
    </div>
  );
}
