import type { Config } from 'tailwindcss';

const px0_10 = Object.fromEntries(
  Array.from(Array(11)).map((_, i) => [`${i}`, `${i}px`]),
);
const px0_100 = Object.fromEntries(
  Array.from(Array(101)).map((_, i) => [`${i}`, `${i}px`]),
);
const px0_200 = Object.fromEntries(
  Array.from(Array(201)).map((_, i) => [`${i}`, `${i}px`]),
);
const px0_2000 = Object.fromEntries(
  Array.from(Array(2001)).map((_, i) => [`${i}`, `${i}px`]),
);

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_2000,
      minHeight: px0_2000,
      spacing: px0_200,
      maxWidth: px0_2000,
      maxHeight: px0_2000,
      width: px0_2000,
      height: px0_2000,
      colors: {
        'custom-gray': {
          100: '#FAFAFA',
          200: '#EEEEEE',
          300: '#DDDDDD',
          400: '#CBC9CF',
          500: '#ADAEB8',
          600: '#A4A1AA',
          700: '#79747E',
          800: '#4B4B4B',
        },
        'nomad-black': '#112211',
        'custom-black': '#1B1B1B',
        'custom-green': {
          100: '#CED8D5',
          200: '#0B3B2D',
          300: '#00AC07',
        },
        'custom-red': {
          100: '#FFE4E0',
          200: '#FF472E',
        },
        'custom-orange': {
          100: '#FFF4E8',
          200: '#FF7C1D',
        },
        'custom-yellow': '#FFC23D',
        'custom-blue': {
          100: '#E5F3FF',
          200: '#2EB4FF',
          300: '#0085FF',
        },
      },
    },
    fontSize: {
      '3xl-bold': ['32px', { lineHeight: '46px', fontWeight: 'bold' }],

      '2xl-bold': ['24px', { lineHeight: '32px', fontWeight: 'bold' }],
      '2xl-semibold': ['24px', { lineHeight: '32px', fontWeight: '600' }],
      '2xl-medium': ['24px', { lineHeight: '32px', fontWeight: '500' }],
      '2xl-regular': ['24px', { lineHeight: '32px', fontWeight: '400' }],

      'xl-bold': ['20px', { lineHeight: '32px', fontWeight: 'bold' }],
      'xl-semibold': ['20px', { lineHeight: '32px', fontWeight: '600' }],
      'xl-medium': ['20px', { lineHeight: '32px', fontWeight: '500' }],
      'xl-regular': ['20px', { lineHeight: '32px', fontWeight: '400' }],

      '2lg-bold': ['18px', { lineHeight: '26px', fontWeight: 'bold' }],
      '2lg-semibold': ['18px', { lineHeight: '26px', fontWeight: '600' }],
      '2lg-medium': ['18px', { lineHeight: '26px', fontWeight: '500' }],
      '2lg-regular': ['18px', { lineHeight: '26px', fontWeight: '400' }],

      'lg-bold': ['16px', { lineHeight: '26px', fontWeight: 'bold' }],
      'lg-semibold': ['16px', { lineHeight: '26px', fontWeight: '600' }],
      'lg-medium': ['16px', { lineHeight: '26px', fontWeight: '500' }],
      'lg-regular': ['16px', { lineHeight: '26px', fontWeight: '400' }],

      'md-bold': ['14px', { lineHeight: '24px', fontWeight: 'bold' }],
      'md-semibold': ['14px', { lineHeight: '24px', fontWeight: '600' }],
      'md-medium': ['14px', { lineHeight: '24px', fontWeight: '500' }],
      'md-regular': ['14px', { lineHeight: '24px', fontWeight: '400' }],

      'sm-semibold': ['13px', { lineHeight: '22px', fontWeight: '600' }],
      'sm-medium': ['13px', { lineHeight: '22px', fontWeight: '500' }],

      'xs-semibold': ['12px', { lineHeight: '20px', fontWeight: '600' }],
      'xs-medium': ['12px', { lineHeight: '18px', fontWeight: '500' }],
      'xs-regular': ['12px', { lineHeight: '18px', fontWeight: '400' }],
    },
    keyframes: {
      vibration: {
        from: { transform: 'rotate(0.5deg)' },
        to: { transform: 'rotate(-0.5deg)' },
      },
      shimmer: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(100%)' },
      },
      fadeout: {
        '0%': {
          opacity: '1',
          transform: 'translateX(0)',
        },
        '100%': {
          opacity: '0',
          transform: 'translateX(-20px)',
        },
      },
      ping: {
        '75%, 100%': {
          transform: 'scale(2)',
          opacity: '0',
        },
      },
    },
    animation: {
      vibration: 'vibration .1s ease-in-out 5',
      shimmer: 'shimmer 2s infinite',
      fadeout: 'fadeout 0.3s forwards',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) 10',
    },
  },
  plugins: [],
};
export default config;
