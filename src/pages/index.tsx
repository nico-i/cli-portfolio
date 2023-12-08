import { Table } from '@/components/Table/Table';
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
        <TableRow>
          <TableCell isHeader={true}>Skill</TableCell>
          <TableCell isHeader={true}>Proficiency</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <button onClick={() => setIsOpened((isOpened) => !isOpened)}>
              HTML
            </button>
          </TableCell>
          <TableCell>test&nbsp;0&nbsp;0</TableCell>
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
