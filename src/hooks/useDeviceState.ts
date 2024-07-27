import Device from '@/libs/constants/device';
import { useEffect, useState } from 'react';

const MIN_TABLET_WIDTH = 768;
const MIN_DESKTOP_WIDTH = 1280;

function getDeviceState() {
  if (typeof window === 'undefined') return Device.Mobile;

  const width = window.innerWidth;

  if (width < MIN_TABLET_WIDTH) return Device.Mobile;
  if (width < MIN_DESKTOP_WIDTH) return Device.Tablet;
  return Device.PC;
}

export default function useDeviceState() {
  const [deviceState, setDeviceState] = useState<Device>(Device.Mobile);

  useEffect(() => {
    function handleResize() {
      window.requestAnimationFrame(() => {
        setDeviceState(getDeviceState());
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceState;
}
