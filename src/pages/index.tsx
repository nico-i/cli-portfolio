import { Table } from '@/components/Table/Table';
import { TableCell } from '@/components/Table/TableCell';
import { TableRow } from '@/components/Table/TableRow';
import { TableTextCell } from '@/components/Table/TableTextCell';

export default function Home() {
  return (
    <>
      {/* <Shell username="guest" domain="localhost" /> */}
      <Table>
        <TableRow>
          <TableCell isHeader={true}>Skill</TableCell>
          <TableCell isHeader={true}>Proficiency</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>HTML</TableCell>
          <TableCell>test&nbsp;0&nbsp;0</TableCell>
        </TableRow>
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
        <TableRow>
          <TableCell>HTML</TableCell>
          <TableCell>test&nbsp;1&nbsp;0</TableCell>
        </TableRow>
      </Table>
    </>
  );
}
