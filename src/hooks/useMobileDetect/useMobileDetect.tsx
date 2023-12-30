import { useEffect, useState } from 'react';

export const useTouchDetect = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(`ontouchstart` in window);
    };

    window.addEventListener(`resize`, handleResize);
    handleResize(); // Initialize the value

    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  return isMobile;
};
