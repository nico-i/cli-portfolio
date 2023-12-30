import { useEffect, useState } from 'react';

export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common breakpoint for mobile devices
    };

    window.addEventListener(`resize`, handleResize);
    handleResize(); // Initialize the value

    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  return isMobile;
};
