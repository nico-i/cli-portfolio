import { useCharWidth } from '@/hooks';
import clsx from 'clsx';

export interface AsciiLineProps {
  verticalAlign?: `top` | `bottom`;
  withEndCap?: boolean;
  capChar?: string;
}

export const AsciiLine = ({
  verticalAlign = `top`,
  withEndCap,
  capChar = `+`,
}: Readonly<AsciiLineProps>) => {
  const { charWidth } = useCharWidth();

  return (
    <span
      className={clsx(
        `absolute flex w-full justify-between left-0`,
        verticalAlign === `top` ? `top-0` : `bottom-0`,
      )}
    >
      <span>{capChar}</span>
      <svg width={`100%`} height={1} className="self-center">
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="white"
          strokeWidth="1"
          strokeDashoffset={-4.5}
          strokeDasharray={`${charWidth}, ${charWidth}`}
        />
      </svg>

      {withEndCap ? <span className="-translate-x-1.5">{capChar}</span> : null}
    </span>
  );
};
