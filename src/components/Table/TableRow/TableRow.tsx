import { TableCellProps } from '@/components/Table/TableCell';
import clsx from 'clsx';
import { ReactElement } from 'react';

export interface TableRowProps {
  children: ReactElement<TableCellProps>[] | ReactElement<TableCellProps>;
  className?: string;
}

export const TableRow = ({ children, className }: Readonly<TableRowProps>) => (
  <tr
    className={clsx(
      `inline-grid
        w-full`,
      className,
    )}
    style={{
      gridTemplateColumns:
        className === undefined
          ? Array.isArray(children)
            ? `1fr `.repeat(children.length)
            : `1fr`
          : undefined,
    }}
  >
    {children}
  </tr>
);
