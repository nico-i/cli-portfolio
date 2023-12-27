import { Shell } from '@/components/Shell';
import { RunEvent } from '@/util/types';
import { useEffect, useState } from 'react';

export default function Index() {
  const [domain, setDomain] = useState(`localhost`);

  useEffect(() => {
    setDomain(window.location.hostname);
  }, []);

  useEffect(() => {
    const cmdParam = new URLSearchParams(window.location.search).get(`cmd`);
    if (!cmdParam) {
      window.dispatchEvent(RunEvent(`clear && cat intro.html && top`));
    }
  }, []);
  return <Shell username="guest" domain={domain} />;
}
