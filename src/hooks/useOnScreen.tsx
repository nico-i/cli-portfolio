import { RefObject, useEffect, useMemo, useState } from 'react';

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref],
  );

  useEffect(() => {
    if (!ref.current) return;
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
