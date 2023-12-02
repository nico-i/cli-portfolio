import { useLocation } from '@reach/router';
import { useEffect } from 'react';

export const useSearchParamsCmd = (
  callback: (cmdFromSearchParams: string) => void,
) => {
  const location = useLocation();

  useEffect(() => {
    const handleMacroEvent = (event: any) => {
      callback(event.detail.cmd);
    };
    window.addEventListener(`macroEvent`, handleMacroEvent);
    return () => {
      window.removeEventListener(`myCustomEvent`, handleMacroEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has(`cmd`)) return;
    const myQueryParam = searchParams.get(`cmd`);
    if (!myQueryParam) return;

    callback(decodeURIComponent(myQueryParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
};

export default useSearchParamsCmd;
