import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { styled } from 'styled-components';

export const CalendarStyle = styled(Calendar)`
  border: none;
  width: 100%;
  margin: 10px 0px;
  padding: 6px;

  /* 기본 배경 색상 */
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};

  /* 다크 모드 배경 색상 */
  .dark & {
    background-color: #1b1b1b;
    color: #ffffff;
  }

  .react-calendar__tile {
    border-radius: 99px;
  }

  .react-calendar__navigation {
    background-color: white;
    color: black;
  }

  /* 다크 모드 양옆 화살표 버튼 스타일 */
  .dark .react-calendar__navigation {
    background-color: #1b1b1b !important; /* !important 추가 */
    color: white !important; /* !important 추가 */
  }

  .react-calendar__navigation__arrow {
    color: inherit !important; /* !important 추가 */
    border: none !important; /* !important 추가 */
    background: transparent !important; /* !important 추가 */
  }

  .dark .react-calendar__navigation__arrow {
    color: white !important; /* !important 추가 */
  }

  .react-calendar__navigation button:hover {
    background-color: transparent;
  }

  .dark .react-calendar__navigation button:hover {
    background-color: #333333 !important; /* !important 추가 */
  }

  .react-calendar__navigation button:focus {
    background-color: white;
    color: black;
  }

  .dark .react-calendar__navigation button:focus {
    background-color: #1b1b1b !important; /* !important 추가 */
    color: white !important; /* !important 추가 */
  }

  .react-calendar__navigation button:disabled {
    background-color: white;
    color: black;
  }

  .dark .react-calendar__navigation button:disabled {
    background-color: #1b1b1b !important; /* !important 추가 */
    color: #666666 !important; /* !important 추가 */
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='일요일'] {
    color: #ff472e;
  }

  .react-calendar__tile--now {
    background-color: white;
    color: black;
  }

  .react-calendar__tile--now:hover {
    background-color: #e6e6e6;
  }

  .react-calendar__tile--active {
    background: #00ac07;
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #00ac07;
  }

  .not-scheduled {
    color: #cbc9cf;
    text-decoration-line: line-through;
    pointer-events: none;
  }
`;
