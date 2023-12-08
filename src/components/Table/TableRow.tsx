import { TableCellProps } from '@/components/Table/TableCell';
import { TableTextCellProps } from '@/components/Table/TableTextCell';
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
  isLast?: boolean;
}

export const TableRow: FC<TableRowProps> = ({
  children,
  isLast,
}: Readonly<TableRowProps>) => {
  const childrenIsArray = Array.isArray(children);
  if (
    !childrenIsArray &&
    isValidElement(children) &&
    // @ts-expect-error
    children?.type?.name === `TableTextCell`
  ) {
    console.log(`TableTextCell`);
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
      className={`
        grid
        w-full
        `}
      style={{
        gridTemplateColumns: childrenIsArray
          ? `1fr `.repeat(children.length)
          : `1fr`,
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
          });
        }
        return child;
      })}
    </tr>
  );
};
