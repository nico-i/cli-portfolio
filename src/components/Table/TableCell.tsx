import { getCharWidth } from '@/util/helper';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

export interface TableCellProps {
  children: string;
  isHeader?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export const TableCell = ({
  children,
  isHeader,
  isFirst = false,
  isLast = false,
}: TableCellProps) => {
  const [content, setContent] = useState<string>(``);
  const cellRef = useRef<HTMLTableCellElement>(null);

  const commonClasses = `flex w-1/3`;

  useEffect(() => {
    const handleResize = () => {
      const charWidth = getCharWidth();
      const cellWidth = cellRef.current?.offsetWidth || 0;
      console.log(`cellWidth`, cellWidth);
      const chars = children.split(``);
      const remainingSpace =
        cellWidth - (chars.length + (!isFirst || !isLast ? 1 : 3)) * charWidth;
      console.log(`remainingSpace`, remainingSpace);
      const spaces = Math.floor(remainingSpace / charWidth);
      console.log(`spaces`, spaces);
      if (isFirst) {
        setContent(
          `|&nbsp;${children}${spaces > 0 ? `&nbsp;`.repeat(spaces) : ``}|`,
        );
        return;
      }
      if (isLast) {
        setContent(
          `&nbsp;${children}${
            spaces > 0 ? `&nbsp;`.repeat(spaces) : ``
          }&nbsp;|`,
        );
        return;
      }
      setContent(
        `&nbsp;${children}${spaces > 0 ? `&nbsp;`.repeat(spaces) : ``}|`,
      );
    };

    // Add the event listener
    window.addEventListener(`resize`, handleResize);

    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener(`resize`, handleResize);
  }, [children, isFirst]);

  if (isHeader) {
    return (
      <th
        ref={cellRef}
        className={clsx(commonClasses, `font-bold`)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <td
      className={commonClasses}
      ref={cellRef}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
