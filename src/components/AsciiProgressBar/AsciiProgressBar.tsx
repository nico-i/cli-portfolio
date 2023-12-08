import useOnScreen from '@/hooks/useOnScreen';
import { getCharWidth } from '@/util/helper';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface AsciiProgressBarProps {
  percentage: number;
  progressChar?: string;
  showPercentage?: boolean;
  emptyChar?: string;
  leftEndCapChar?: string;
  rightEndCapChar?: string;
  duration?: number;
}

export const AsciiProgressBar = ({
  percentage,
  progressChar = `#`,
  emptyChar = `-`,
  leftEndCapChar = `[`,
  rightEndCapChar = `]`,
  showPercentage = true,
  duration,
}: Readonly<AsciiProgressBarProps>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isVisible = useOnScreen(wrapperRef);

  const [progressCharTargetCount, setProgressCharTargetCount] =
    useState<number>(0);
  const [progressCharCount, setProgressCharCount] = useState<number>(0);
  const [widthInChars, setWidthInChars] = useState<number>(0);

  const handleResize = useCallback(() => {
    if (!wrapperRef.current) return;
    const charWidth = getCharWidth();
    setWidthInChars(
      Math.floor(wrapperRef.current.offsetWidth / charWidth) -
        2 -
        (showPercentage ? 4 : 0),
    );
    const progressCharCount = Math.floor((percentage / 100) * widthInChars);

    setProgressCharTargetCount(progressCharCount);
  }, [percentage, showPercentage, widthInChars]);

  useEffect(() => {
    handleResize();
  }, [handleResize, isVisible]);

  useEffect(() => {
    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only update when percentage or showPercentage changes
  }, [percentage, showPercentage]);

  useEffect(() => {
    if (!duration) return;
    const interval = setInterval(() => {
      setProgressCharCount((progressCharCount) => {
        if (progressCharCount === progressCharTargetCount) {
          clearInterval(interval);
          return progressCharTargetCount;
        }
        return progressCharCount + 1;
      });
    }, duration / progressCharTargetCount);
    return () => clearInterval(interval);
  }, [progressCharTargetCount]);

  return (
    <div className="w-full flex" ref={wrapperRef}>
      {leftEndCapChar}
      {progressChar.repeat(progressCharCount)}
      {emptyChar.repeat(progressCharTargetCount - progressCharCount)}
      {emptyChar.repeat(widthInChars - progressCharTargetCount)}
      {rightEndCapChar}
      {showPercentage ? <>&nbsp;{percentage}%</> : null}
    </div>
  );
};
