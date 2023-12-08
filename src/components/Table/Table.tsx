import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className }: Readonly<TableProps>) => {
  return (
    <table className={className}>
      <tbody className={className}>{children}</tbody>
    </table>
  );
};
