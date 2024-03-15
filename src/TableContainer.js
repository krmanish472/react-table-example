import React, { Fragment, useEffect } from 'react';
import { useTable, useSortBy, useFilters, useExpanded } from 'react-table';
import { Table } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';

const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    useFilters
  );

  return (
    <Table bordered hover {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <div >
                  {column.render('Header')}    
                </div>
                <Filter column={column} />
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Fragment key={row.getRowProps().key}>
              <tr>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableContainer;