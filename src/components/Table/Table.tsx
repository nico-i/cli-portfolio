import { TableRowProps } from '@/components/Table/TableRow';
import { Children, ReactElement, cloneElement, isValidElement } from 'react';

interface TableProps {
  children: ReactElement<TableRowProps>[];
}

export const Table = ({ children }: Readonly<TableProps>) => {
  return (
    <table
      className={`
        w-full
        table-fixed
    `}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            isLast: children.indexOf(child) === children.length - 1,
          });
        }
        return child;
      })}
    </table>
  );
};
