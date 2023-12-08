import { TableCellProps } from '@/components/Table/TableCell';
import { TableTextCellProps } from '@/components/Table/TableTextCell';
import clsx from 'clsx';
import {
  Children,
  FC,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';

export interface TableRowProps {
  children:
    | ReactElement<TableCellProps>[]
    | ReactElement<TableCellProps | TableTextCellProps>;
  className?: string;
  isHeader?: boolean;
  isLast?: boolean;
}

export const TableRow: FC<TableRowProps> = ({
  children,
  isHeader = false,
  isLast,
  className,
}: Readonly<TableRowProps>) => {
  const childrenIsArray = Array.isArray(children);
  if (
    !childrenIsArray &&
    isValidElement(children) &&
    // @ts-expect-error
    children?.type?.name === `TableTextCell`
  ) {
    return (
      <tr
        className={`
        flex
        w-full
        `}
      >
        {cloneElement(children, {
          isLastChild: true,
          isLastRow: isLast,
        })}
      </tr>
    );
  }

  return (
    <tr
      className={clsx(
        `
        inline-grid
        w-full
        `,
        className,
      )}
      style={{
        gridTemplateColumns:
          className === undefined
            ? childrenIsArray
              ? `1fr `.repeat(children.length)
              : `1fr`
            : undefined,
      }}
    >
      {Children.map(children, (child) => {
        // @ts-expect-error
        if (isValidElement(child) && child.type.name === `TableCell`) {
          return cloneElement(child, {
            isLastChild: childrenIsArray
              ? children.indexOf(child) === children.length - 1
              : true,
            isLastRow: isLast,
            isHeader,
          });
        }
        return child;
      })}
    </tr>
  );
};
