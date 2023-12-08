import { getCharWidth } from '@/util/helper';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface TableCellProps {
  children: ReactNode;
  isHeader?: boolean;
  isLastChild?: boolean;
  isLastRow?: boolean;
}

export const TableCell = ({
  children,
  isHeader,
  isLastChild = false,
  isLastRow = false,
}: TableCellProps) => {
  const commonClasses = `
  flex-auto
  relative
  text-left
  flex
  flex-col
  w-full
  pt-6
 `;

  const charWidth = getCharWidth();

  const borderLine = (isTop: boolean = true) => (
    <span
      className={clsx(
        `absolute flex w-full justify-between left-0`,
        isTop ? `top-0` : `bottom-0`,
      )}
    >
      <span>+</span>
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

      {isLastChild ? <span className="-translate-x-1.5">+</span> : null}
    </span>
  );

  const content = (
    <>
      {borderLine()}
      <div className={clsx(`flex w-full justify-between`, isLastRow && `pb-6`)}>
        <span>|&nbsp;{children}</span>
        {isLastChild ? <span className="-translate-x-1.5">|</span> : null}
      </div>
      {isLastRow ? borderLine(false) : null}
    </>
  );

  if (isHeader) {
    return <th className={clsx(`font-bold`, commonClasses)}>{content}</th>;
  }

  return <td className={commonClasses}>{content}</td>;
};
