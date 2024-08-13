import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from 'styled-components';

export const StyledToastContainer = styled(ToastContainer)`
  margin-top: 60px;
  .Toastify__toast-container {
    display: flex;
    justify-content: center;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 480px) {
      width: 100% !important;
    }
  }
  .Toastify__toast {
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 24px;
    margin: 10px;
  }
  .Toastify__toast--info {
    background-color: #ffffff;
    font-weight: bold;
    color: #1b1b1b;
  }
  .Toastify__toast--success {
    background-color: #ffffff;
    font-weight: bold;
    color: #1b1b1b;
  }
  .Toastify__toast--error {
    background-color: #ffffff;
    font-weight: bold;
    color: #ff472e;
  }
  .Toastify__toast--warning {
    background-color: #ffffff;
    font-weight: bold;
    color: #ffc23d;
  }
`;
