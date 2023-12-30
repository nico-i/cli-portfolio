import { getCharWidth } from '@/util/helper';
import { useEffect, useState } from 'react';

export const useCharWidth = () => {
  const [charWidth, setCharWidth] = useState<number>(0);
  useEffect(() => {
    if (charWidth > 0) return;
    if (typeof window === `undefined`) return;
    setCharWidth(getCharWidth());
  }, [charWidth]);

  return { charWidth };
};
