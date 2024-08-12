import CheckLottie from '@/../public/lottie/check.json';
import ErrorLottie from '@/../public/lottie/error.json';
import { StyledToastContainer } from '@/styles/ToastStyle';
import Lottie from 'lottie-react';
import React from 'react';
import { ToastOptions, ToastPosition, Zoom, toast } from 'react-toastify';

/**
 * Toast 옵션 설정
 * @type {Object}
 * @property {ToastPosition} position - 토스트의 위치
 * @property {number} autoClose - 자동으로 닫히는 시간 (밀리초)
 * @property {boolean} hideProgressBar - 진행 표시줄 숨기기 여부(보임)
 * @property {boolean} closeOnClick - 클릭 시 닫기 여부(가능)
 * @property {boolean} pauseOnHover - 호버 시 일시정지 여부(가능)
 * @property {boolean} draggable - 드래그 가능 여부(가능)
 * @property {boolean} pauseOnFocusLoss - 백그라운드 알림 자동 닫힘 여부
 * @property {boolean} closeButton - 알림에 닫기 버튼 표시
 */
const option: ToastOptions = {
  position: 'top-center' as ToastPosition,
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  closeButton: false,
};

export const notify = (
  type: 'success' | 'error' | 'info' | 'warning',
  message: string,
  onClose?: () => void,
) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        ...option,
        onClose,
        icon: <Lottie animationData={CheckLottie} />,
      });
      break;
    case 'error':
      toast.error(message, {
        ...option,
        onClose,
        icon: <Lottie animationData={ErrorLottie} />,
      });
      break;
    case 'info':
      toast.info(message, {
        ...option,
        onClose,
      });
      break;
    case 'warning':
      toast.warn(message, { ...option, onClose });
      break;
    default:
      break;
  }
};

/**
 * type에 따른 알림 메시지를 표시하는 함수
 * @param {string} type - 알림 유형 (success, error, info, warning).
 * @param {string} message - 표시할 메시지 내용.
 * @param {void} onClose - 닫힐 떄 원하는 함수 추가해주세요
 * @example
 * - 함수명은 자유입니다.
 * - !필수) notify('타입', '메세지')를 적어주세요.
 * 
 * const handleSuccessToast = () => {
    notify('success', 'success');
  };

 * <button onClick={handleSuccessToast}>
      success 토스트 알림
   </button>
 * @author 김보미 
 */
export default function Toast() {
  return <StyledToastContainer {...option} />;
}
