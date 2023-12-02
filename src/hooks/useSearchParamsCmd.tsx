import { CustomEvents, SearchParams } from '@/util/types';
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
    window.addEventListener(CustomEvents.macro, handleMacroEvent);
    return () => {
      window.removeEventListener(CustomEvents.macro, handleMacroEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has(SearchParams.cmd)) return;
    const cmdQueryParam = searchParams.get(SearchParams.cmd);
    if (!cmdQueryParam) return;

    callback(decodeURIComponent(cmdQueryParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
};

export default useSearchParamsCmd;
