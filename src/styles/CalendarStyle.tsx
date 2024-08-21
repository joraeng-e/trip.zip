import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { styled } from 'styled-components';

export const CalendarStyle = styled(Calendar)`
  border: none;
  width: 100%;
  margin: 10px 0px;
  padding: 6px;

  .dark & {
    background-color: #1b1b1b;
    color: #fff;
  }

  .react-calendar__tile {
    border-radius: 99px;
  }

  .react-calendar__navigation {
    background-color: white;
    color: black;
  }

  .react-calendar__navigation {
    background-color: #fff;
    color: black;
  }

  .dark & .react-calendar__navigation {
    background-color: #1b1b1b !important;
    color: white !important;
  }

  .dark & .react-calendar__navigation__label {
    background-color: #1b1b1b !important;
    color: white !important;
  }

  .react-calendar__navigation__arrow {
    color: inherit !important;
    border: none !important;
    background: transparent !important;
  }

  .dark & .react-calendar__navigation__arrow {
    color: white !important;
  }

  .react-calendar__navigation button:hover {
    background-color: transparent;
  }

  .dark & .react-calendar__navigation button:hover {
    background-color: #4b4b4b !important;
  }

  .react-calendar__navigation button:focus {
    background-color: white;
    color: black;
  }

  .dark & .react-calendar__navigation button:focus {
    background-color: #1b1b1b !important;
    color: white !important;
  }

  .react-calendar__navigation button:disabled {
    background-color: white;
    color: black;
  }

  .dark & .react-calendar__navigation button:disabled {
    background-color: #1b1b1b !important;
    color: #4b4b4b !important;
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
    color: black;
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
