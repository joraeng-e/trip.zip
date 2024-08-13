import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { styled } from 'styled-components';

export const CalendarStyle = styled(Calendar)`
  border: none;
  width: 100%;
  margin: 10px 0px;
  padding: 6px;

  .react-calendar__tile {
    border-radius: 99px;
  }

  .react-calendar__navigation {
    font-weight: bold;
  }

  .react-calendar__navigation button:hover {
    background-color: transparent;
  }

  .react-calendar__navigation button:focus {
    background-color: white;
  }

  .react-calendar__navigation button:disabled {
    background-color: white;
    color: black;
  }

  .react-calendar__tile--now {
    background-color: white;
    color: black;
  }

  .react-calendar__tile--now:hover {
    background-color: #e6e6e6;
    color: black;
  }

  .not-scheduled {
    color: #cbc9cf;
    text-decoration-line: line-through;
    pointer-events: none;
  }
`;
