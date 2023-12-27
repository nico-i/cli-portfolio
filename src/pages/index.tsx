import { Shell } from '@/components/Shell';
import { RunEvent } from '@/util/types';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    window.dispatchEvent(RunEvent(`clear && cat intro.html && top`));
  }, []);
  return <Shell username="guest" domain="localhost" />;
}
