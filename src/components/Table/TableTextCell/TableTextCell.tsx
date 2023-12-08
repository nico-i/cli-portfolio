import { AsciiLine } from '@/components/AsciiLine';
import { getCharWidth } from '@/util/helper';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface TableTextCellProps {
  children: string;
}

export const TableTextCell = ({ children }: TableTextCellProps) => {
  const [textLines, setTextLines] = useState<string[]>([]);
  const cellRef = useRef<HTMLTableCellElement>(null);

  const handleResize = useCallback(() => {
    if (!cellRef?.current) return;
    const charWidth = getCharWidth();
    const cellWidth = cellRef?.current?.offsetWidth || 0;
    const words = children.split(` `);
    let line = ``;
    const lines: string[] = [];
    words.forEach((word, index) => {
      const lineWidthPlusCurrentWordAndEnding =
        (line.length + word.length + 4) * charWidth; // +4 for `| ` and ` |`

      if (lineWidthPlusCurrentWordAndEnding === cellWidth) {
        line += `${word}`;
        lines.push(line);
        line = ``;
        return;
      }

      if (
        lineWidthPlusCurrentWordAndEnding > cellWidth ||
        index === words.length - 1
      ) {
        lines.push(line);
        line = ``;
      }
      line += `${word} `;
    });
    setTextLines(lines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  useEffect(() => {
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!cellRef?.current) return;

    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <td ref={cellRef} className="flex flex-col w-full relative pt-6">
      <AsciiLine verticalAlign="top" withEndCap={true} capChar="v" />
      {textLines.map((line, i) => (
        <div key={i} className="flex justify-between w-full">
          <span>|&nbsp;{line}</span>
          <span className="-translate-x-1.5">|</span>
        </div>
      ))}
    </td>
  );
};
