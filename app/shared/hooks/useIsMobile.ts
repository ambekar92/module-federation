import { useLayoutEffect, useState } from 'react';
import * as _ from 'lodash';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    if (!window) {return;}
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 1100);
    };
    updateSize();
    window.addEventListener('resize', _.debounce(updateSize, 250));
    return (): void => window.removeEventListener('resize', updateSize);
  }, [window && window?.innerWidth]);
  return isMobile;
};

export default useIsMobile;
