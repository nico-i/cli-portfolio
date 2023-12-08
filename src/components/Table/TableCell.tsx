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
      <span className="absolute flex w-full justify-between left-0 top-0">
        <span>+</span>
        <hr className="w-full mt-3 border-dashed" />
        {isLastChild ? <span className="-translate-x-1.5">+</span> : null}
      </span>
      <div className={clsx(`flex w-full justify-between`, isLastRow && `pb-6`)}>
        <span>|&nbsp;{children}</span>
        {isLastChild ? <span className="-translate-x-1.5">|</span> : null}
      </div>
      {isLastRow ? (
        <span className="absolute flex w-full justify-between left-0 bottom-0">
          <span>+</span>
          <hr className="w-full mt-3 border-dashed" />
          {isLastChild ? <span className="-translate-x-1.5">+</span> : null}
        </span>
      ) : null}
    </>
  );

  if (isHeader) {
    return <th className={clsx(`font-bold`, commonClasses)}>{content}</th>;
  }

  return <td className={commonClasses}>{content}</td>;
};
