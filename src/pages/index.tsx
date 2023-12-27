import { Shell } from '@/components/Shell';
import { RunEvent } from '@/util/types';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    const cmdParam = new URLSearchParams(window.location.search).get(`cmd`);
    if (!cmdParam) {
      window.dispatchEvent(RunEvent(`clear && cat intro.html && top`));
    }
  }, []);
  return <Shell username="guest" domain="localhost" />;
}
