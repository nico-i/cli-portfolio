import { Table } from '@/components/Table/Table';
import { TableCell } from '@/components/Table/TableCell';
import { TableRow } from '@/components/Table/TableRow';
import { TableTextCell } from '@/components/Table/TableTextCell';
import { useRef } from 'react';

export default function Home() {
  const rowRef = useRef<HTMLTableRowElement>(null);
  return (
    <>
      {/* <Shell username="guest" domain="localhost" /> */}
      <Table>
        <TableRow>
          <TableCell isFirst={true}>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell isLast={true}>Description</TableCell>
        </TableRow>
        <TableRow ref={rowRef}>
          <TableTextCell rowRef={rowRef}>
            The latest version of the HTML standard, used for structuring and
            presenting content on the World Wide Web. Read more The latest
            version of the HTML standard, used for structuring and presenting
            content on the World Wide Web. Read more The latest version of the
            HTML standard, used for structuring and presenting content on the
            World Wide Web. Read more
          </TableTextCell>
        </TableRow>
      </Table>
    </>
  );
}
