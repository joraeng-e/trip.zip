import { useDarkMode } from '@/context/DarkModeContext';
import React from 'react';

export default function DarkMode() {
  const { isDarkMode, toggleMode } = useDarkMode();

  return (
    <div
      className="toggle-button cursor-pointer rounded-md border-[1.5px] border-custom-black bg-white p-2 transition-transform duration-500 dark:border-white dark:bg-custom-black"
      onClick={toggleMode}
    >
      <svg width="30" height="30" viewBox="0 0 100 100" className="relative">
        <path
          id="moon"
          d="M50 15A35 35 0 1 0 85 50A35 45 0 0 1 50 15Z"
          className={`transform transition-transform duration-500 ${
            isDarkMode ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          } fill-custom-black`}
        />
        <g
          id="sun"
          className={`transform transition-transform duration-500 ${
            isDarkMode ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <circle cx="50" cy="50" r="20" fill="white" />
          <line x1="50" y1="5" x2="50" y2="20" stroke="white" strokeWidth="4" />
          <line
            x1="50"
            y1="80"
            x2="50"
            y2="95"
            stroke="white"
            strokeWidth="4"
          />
          <line x1="5" y1="50" x2="20" y2="50" stroke="white" strokeWidth="4" />
          <line
            x1="80"
            y1="50"
            x2="95"
            y2="50"
            stroke="white"
            strokeWidth="4"
          />
          <line
            x1="20"
            y1="20"
            x2="30"
            y2="30"
            stroke="white"
            strokeWidth="4"
          />
          <line
            x1="70"
            y1="70"
            x2="80"
            y2="80"
            stroke="white"
            strokeWidth="4"
          />
          <line
            x1="20"
            y1="80"
            x2="30"
            y2="70"
            stroke="white"
            strokeWidth="4"
          />
          <line
            x1="70"
            y1="30"
            x2="80"
            y2="20"
            stroke="white"
            strokeWidth="4"
          />
        </g>
      </svg>
    </div>
  );
}
