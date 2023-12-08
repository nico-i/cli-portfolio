import { getCharWidth } from '@/util/helper';
import { useEffect, useRef, useState } from 'react';

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
  duration = 0,
}: Readonly<AsciiProgressBarProps>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [progressCharTargetCount, setProgressCharTargetCount] =
    useState<number>(0);
  const [progressCharCount, setProgressCharCount] = useState<number>(0);
  const [widthInChars, setWidthInChars] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef?.current === null) return;
      const charWidth = getCharWidth();
      const widthInChars =
        Math.floor(wrapperRef.current.offsetWidth / charWidth) -
        2 - // account for left and right end caps
        (showPercentage ? 4 : 0); // account for percentage
      setWidthInChars(widthInChars);
    };
    window.addEventListener(`resize`, handleResize);
    handleResize();
    return () => window.removeEventListener(`resize`, handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only update when percentage or showPercentage changes
  }, []);

  useEffect(() => {
    const newProgressCharTargetCount = Math.floor(
      (percentage / 100) * widthInChars,
    );
    setProgressCharTargetCount(
      newProgressCharTargetCount === 0 ? 1 : newProgressCharTargetCount,
    );
    if (!duration) {
      setProgressCharCount(newProgressCharTargetCount);
      return;
    }
    for (let i = 0; i <= progressCharTargetCount; i++) {
      setTimeout(
        () => {
          setProgressCharCount(i);
        },
        (duration / newProgressCharTargetCount) * i,
      );
    }
  }, [duration, percentage, progressCharTargetCount, widthInChars]);

  const placeholderCount = progressCharTargetCount - progressCharCount;
  const emptyCharCount = widthInChars - progressCharTargetCount;

  return (
    <div className="w-full flex relative" ref={wrapperRef}>
      <div className="absolute">
        {leftEndCapChar}
        {progressCharCount > 0 ? progressChar.repeat(progressCharCount) : null}
        {placeholderCount > 0 ? emptyChar.repeat(placeholderCount) : null}
        {emptyCharCount > 0 ? emptyChar.repeat(emptyCharCount) : null}
        {rightEndCapChar}
        {showPercentage ? <>&nbsp;{percentage}%</> : null}
      </div>
    </div>
  );
};
