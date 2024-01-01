import { AsciiLine } from '@/components/AsciiLine';
import { useCharDimensions } from '@/hooks';
import clsx from 'clsx';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export interface TableTextCellProps {
  children: string;
  isLastRow?: boolean;
  readMoreHref?: string;
}

export const TableTextCell = ({
  children,
  isLastRow = false,
  readMoreHref,
}: TableTextCellProps) => {
  const [textLines, setTextLines] = useState<string[]>([]);
  const cellRef = useRef<HTMLTableCellElement>(null);
  const { width: charWidth } = useCharDimensions();

  const handleResize = useCallback(() => {
    if (!cellRef?.current) return;
    const cellWidth = cellRef?.current?.offsetWidth || 0;
    const words = children.split(` `);
    let line = ``;
    const lines: string[] = [];
    for (let i = 0; i <= words.length; i++) {
      if (i === words.length) {
        lines.push(line);
        break;
      }
      const lineWidthPlusCurrentWordAndEnding =
        (line.length + words[i].length + 4) * charWidth; // +4 for `| ` and ` |`

      if (lineWidthPlusCurrentWordAndEnding > cellWidth) {
        lines.push(line);
        line = ``;
      }
      line += `${words[i]} `;
    }
    setTextLines(lines);
  }, [charWidth, children]);

  useEffect(() => {
    if (!cellRef?.current) return;

    window.addEventListener(`resize`, handleResize);
    handleResize();

    return () => window.removeEventListener(`resize`, handleResize);
  }, [handleResize]);

  return (
    <td ref={cellRef} className="flex flex-col w-full relative pt-6">
      <AsciiLine verticalAlign="top" withEndCap={true} capChar="v" />
      {textLines.map((line, i) => (
        <Fragment key={i}>
          <div
            key={i}
            className={clsx(
              `flex justify-between w-full`,
              isLastRow && i === textLines.length - 1 && `pb-6`,
            )}
          >
            <span>|&nbsp;{line}</span>
            <span className="-translate-x-1.5">|</span>
          </div>
          {isLastRow ? (
            <AsciiLine verticalAlign="bottom" withEndCap={true} />
          ) : null}
        </Fragment>
      ))}
      {readMoreHref && (
        <a
          href={readMoreHref}
          target="_blank"
          rel="noreferrer"
          className="
          absolute
          bottom-0
          right-5
          opacity-60
          hover:opacity-100"
        >
          <FaExternalLinkAlt className={``} />
        </a>
      )}
    </td>
  );
};
