import { TableRowProps } from '@/components/Table/TableRow';
import { ReactElement } from 'react';

interface TableProps {
  children: ReactElement<TableRowProps>[] | ReactElement<TableRowProps>;
}

export const Table = ({ children }: Readonly<TableProps>) => {
  return (
    <table
      className={`
        w-full
        max-w-screen
    `}
    >
      {children}
    </table>
  );
};
