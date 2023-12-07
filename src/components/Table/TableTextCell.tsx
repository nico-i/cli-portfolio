import { getCharWidth } from '@/util/helper';
import { ReactNode, RefObject, useEffect, useState } from 'react';

export interface TableTextCellProps {
  children: string;
  rowRef: RefObject<HTMLTableRowElement>;
}

export const TableTextCell = ({ children, rowRef }: TableTextCellProps) => {
  const [lines, setLines] = useState<ReactNode[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const charWidth = getCharWidth();
      const rowWidth = rowRef.current?.offsetWidth || 0;
      const words = children.split(` `);
      let line = `| `;
      const lines: string[] = [];
      words.forEach((word, index) => {
        const lineWidthPlusCurrentWordAndEnding =
          (line.length + word.length + 2) * charWidth; // +2 for \w + ` |`

        if (lineWidthPlusCurrentWordAndEnding === rowWidth) {
          line += `${word}&nbsp;|`;
          lines.push(line);
          line = `| `;
          return;
        }

        if (
          lineWidthPlusCurrentWordAndEnding > rowWidth ||
          index === words.length - 1
        ) {
          const lineWidth = (line.length + 2) * charWidth; // +1 for ` |`
          const remainingWidth = rowWidth - lineWidth;
          const remainingChars = Math.floor(remainingWidth / charWidth);
          lines.push(
            line +
              (remainingChars > 0 ? `&nbsp;`.repeat(remainingChars) : ``) +
              `&nbsp;|`,
          );
          line = `| `;
        }
        line += `${word} `;
      });
      // consistent line length
      const linesWithSpace = lines.map((line) => line.replace(/&nbsp;/g, ` `));
      const lineLengths = linesWithSpace.map((line) => line.length);
      const mostCommonLineLength = lineLengths.reduce((a, b, i, arr) => {
        const aCount = arr.filter((item) => item === a).length;
        const bCount = arr.filter((item) => item === b).length;
        return aCount > bCount ? a : b;
      });
      linesWithSpace
        .filter((line) => line.length !== mostCommonLineLength)
        .forEach((line) => {
          const indexes: number[] = [];
          for (let i = 0; i < linesWithSpace.length; i++)
            if (linesWithSpace[i] === line) indexes.push(i);

          const diff = mostCommonLineLength - line.length;
          const nbspCount = (line.match(/&nbsp;/g) || []).length;

          let editFunction = (line: string) => line;
          if (diff > 0) {
            if (nbspCount === 0) {
              editFunction = (line: string) =>
                line.replace(`&nbsp;|`, `&nbsp;`.repeat(diff) + `|`);
            } else {
              editFunction = (line: string) =>
                line.replace(` |`, `&nbsp;`.repeat(diff) + `|`);
            }
          } else if (nbspCount === 0) {
            editFunction = (line: string) => line.replace(`&nbsp;|`, `|`);
          } else {
            editFunction = (line: string) =>
              line.replace(`&nbsp;`.repeat(Math.abs(diff)) + `|`, ``);
          }

          indexes.forEach((index) => {
            lines[index] = editFunction(lines[index]);
          });
        });

      const content = lines.map((line, index) => (
        <span
          className={`
        flex
        max-w-full
        w-full
        `}
          key={index}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ));

      setLines(content);
    };

    // Add the event listener
    window.addEventListener(`resize`, handleResize);

    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener(`resize`, handleResize);
  }, [children, rowRef]);

  return <td>{lines}</td>;
};
