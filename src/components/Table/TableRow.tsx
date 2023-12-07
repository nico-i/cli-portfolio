import { TableCellProps } from '@/components/Table/TableCell';
import { FC, ForwardedRef, ReactElement, forwardRef } from 'react';

export interface TableRowProps {
  children: ReactElement<TableCellProps>[] | ReactElement<TableCellProps>;
  ref?: ForwardedRef<HTMLTableRowElement>;
}

export const TableRow: FC<TableRowProps> = forwardRef(
  (props: TableRowProps, ref: ForwardedRef<HTMLTableRowElement>) => {
    return (
      <tr ref={ref} className={`flex w-full `}>
        {props.children}
      </tr>
    );
  },
);

TableRow.displayName = `TableRow`;
