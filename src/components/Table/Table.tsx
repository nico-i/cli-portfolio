import { TableRowProps } from '@/components/Table/TableRow';
import { Children, ReactNode, cloneElement, isValidElement } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
  gridTemplateColumns?: string;
}

export const Table = ({
  children,
  className,
  gridTemplateColumns,
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
              gridTemplateColumns,
            } as TableRowProps);
          }
          return child;
        })}
      </tbody>
    </table>
  );
};
