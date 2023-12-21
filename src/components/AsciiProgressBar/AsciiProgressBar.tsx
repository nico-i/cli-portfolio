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
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  useEffect(() => {
    const currentRef = wrapperRef.current;
    // find target width in chars
    const observer = new ResizeObserver((entries) => {
      if (entries?.[0]?.contentRect) {
        setProgressCharCount(0);
        const { width } = entries[0].contentRect;
        setWidthInChars(0);
        const charWidth = getCharWidth();
        const widthInChars =
          Math.floor(width / charWidth) -
          2 - // account for left and right end caps
          (showPercentage ? 4 : 0); // account for percentage
        setWidthInChars(widthInChars);
        const newProgressCharTargetCount = Math.floor(
          (percentage / 100) * widthInChars,
        );
        setProgressCharTargetCount(
          newProgressCharTargetCount === 0 ? 1 : newProgressCharTargetCount,
        );
      }
    });
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentInterval) {
      clearInterval(currentInterval);
    }
    const interval = setInterval(() => {
      if (progressCharCount >= progressCharTargetCount) {
        clearInterval(interval);
        return;
      }
      setProgressCharCount((prev) => {
        if (prev < progressCharTargetCount) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, duration / widthInChars);
    setCurrentInterval(interval);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressCharTargetCount, duration]);

  const placeholderCount = progressCharTargetCount - progressCharCount;
  const emptyCharCount = widthInChars - progressCharTargetCount;

  return (
    <div className="flex grow relative" ref={wrapperRef}>
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
