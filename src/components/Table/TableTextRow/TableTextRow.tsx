import { TableTextCellProps } from '@/components/Table/TableTextCell/TableTextCell';
import clsx from 'clsx';
import { ReactElement } from 'react';

export interface TableTextRowProps {
  children: ReactElement<TableTextCellProps>;
  className?: string;
}

export const TableTextRow = ({
  children,
  className,
}: Readonly<TableTextRowProps>) => (
  <tr
    className={clsx(
      `
      flex
      w-full`,
      className,
    )}
  >
    {children}
  </tr>
);
