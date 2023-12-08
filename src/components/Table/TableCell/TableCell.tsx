import { AsciiLine } from '@/components/AsciiLine';
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

  const content = (
    <>
      <AsciiLine withEndCap={isLastChild} />
      <div className={clsx(`flex w-full justify-between`, isLastRow && `pb-6`)}>
        <div className="flex w-full">
          <span>|&nbsp;</span>
          {children}
        </div>
        {isLastChild ? <span className="-translate-x-1.5">|</span> : null}
      </div>
      {isLastRow ? (
        <AsciiLine verticalAlign="bottom" withEndCap={isLastChild} />
      ) : null}
    </>
  );

  if (isHeader) {
    return <th className={clsx(`font-bold`, commonClasses)}>{content}</th>;
  }

  return <td className={commonClasses}>{content}</td>;
};
