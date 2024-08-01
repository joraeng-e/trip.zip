import Device from '@/libs/constants/device';
import { useEffect, useState } from 'react';

import { useMediaQuery } from './useMediaQeury';

export default function useDeviceState() {
  const [deviceState, setDeviceState] = useState(Device.Mobile);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isPC = useMediaQuery('(min-width: 1280px)');

  useEffect(() => {
    if (isMobile) {
      setDeviceState(Device.Mobile);
    } else if (isTablet) {
      setDeviceState(Device.Tablet);
    } else if (isPC) {
      setDeviceState(Device.PC);
    }
  }, [isMobile, isTablet, isPC]);

  return deviceState;
}
