import { AsciiProgressBar } from '@/components/AsciiProgressBar/AsciiProgressBar';
import { Table } from '@/components/Table';
import { TableCell } from '@/components/Table/TableCell';
import { TableRow } from '@/components/Table/TableRow';
import { TableTextCell } from '@/components/Table/TableTextCell';
import { useState } from 'react';

export default function Home() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <>
      {/* <Shell username="guest" domain="localhost" /> */}
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
              quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, quibusdam. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quibusdam. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quibusdam. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.
            </TableTextCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell>HTML</TableCell>
          <TableCell>test&nbsp;1&nbsp;0</TableCell>
        </TableRow>
      </Table>
    </>
  );
}
