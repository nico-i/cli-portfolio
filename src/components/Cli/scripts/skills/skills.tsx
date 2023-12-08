import { AsciiProgressBar } from '@/components/AsciiProgressBar/AsciiProgressBar';
import { Table, TableCell, TableRow, TableTextCell } from '@/components/Table';
import { useState } from 'react';

export const Skills = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Table className="w-1/2" gridTemplateColumns="5rem auto">
      <TableRow isHeader={true}>
        <TableCell>Skill</TableCell>
        <TableCell>Proficiency</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <button onClick={() => setIsOpened((isOpened) => !isOpened)}>
            HTML
          </button>
        </TableCell>
        <TableCell>
          <AsciiProgressBar percentage={40} duration={200} />
        </TableCell>
      </TableRow>
      {isOpened ? (
        <TableRow>
          <TableTextCell>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quibusdam. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quibusdam. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quibusdam. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quisquam, quibusdam.
          </TableTextCell>
        </TableRow>
      ) : null}
      <TableRow>
        <TableCell>C</TableCell>
        <TableCell>
          <AsciiProgressBar percentage={68} duration={200} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Python</TableCell>
        <TableCell>
          <AsciiProgressBar percentage={80} duration={200} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Java</TableCell>
        <TableCell>
          <AsciiProgressBar percentage={13} duration={200} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>CSS</TableCell>
        <TableCell>
          <AsciiProgressBar percentage={46} duration={200} />
        </TableCell>
      </TableRow>
    </Table>
  );
};
