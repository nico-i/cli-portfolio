import { TableRowProps } from '@/components/Table/TableRow';
import { Children, ReactNode, cloneElement, isValidElement } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
  rowClassName?: string;
}

export const Table = ({
  children,
  className,
  rowClassName,
}: Readonly<TableProps>) => {
  const childrenIsArray = Array.isArray(children);
  return (
    <table className={className}>
      <tbody className={className}>
        {Children.map(children, (child) => {
          // @ts-expect-error
          if (isValidElement(child) && child.type?.name === `TableRow`) {
            return cloneElement(child, {
              isLast: childrenIsArray
                ? children?.indexOf(child) === children?.length - 1
                : true,
              className: rowClassName,
            } as TableRowProps);
          }
          return child;
        })}
      </tbody>
    </table>
  );
};
