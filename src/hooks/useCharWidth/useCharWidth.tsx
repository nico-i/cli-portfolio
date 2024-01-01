import { getCharDimensions } from '@/util/helper';
import { useEffect, useState } from 'react';

export const useCharDimensions = () => {
  const [charWidth, setCharWidth] = useState<number>(0);
  const [charHeight, setCharHeight] = useState<number>(0);
  useEffect(() => {
    if (typeof window === `undefined`) return;
    const { width, height } = getCharDimensions();
    setCharWidth(width);
    setCharHeight(height);
  }, []);

  return { width: charWidth, height: charHeight };
};
