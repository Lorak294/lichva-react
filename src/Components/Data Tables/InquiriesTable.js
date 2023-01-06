import React, { useEffect, useMemo, useState } from "react";
import { useTable, useFilters, useSortBy, usePagination, useRowSelect } from "react-table";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { format } from "date-fns";

import { ColumnFilter } from "./ColumnFilter";

import "./Table.css";

const INQCOLUMNS = [
  {
    Header: "Created on",
    accessor: "creation_date",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  { Header: "Ammount", accessor: "ammount" },
  { Header: "Installments", accessor: "installments" },
];

const InquiriesTable = (props) => {
  const [filterMode, setFilterMode] = useState(false);
  const onSwitchAction = () => {
    setFilterMode(!filterMode);
  };

  const columns = useMemo(() => INQCOLUMNS, []);
  const data = useMemo(() => props.inqData, [props.inqData]);
  console.log(`table render: FILTERINGI IS  ${filterMode ? "ON" : "OFF"}`);
  const defaultColumn = useMemo(() => {
    return { Filter: ColumnFilter, disableFilters: filterMode };
  }, [filterMode]);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      defaultColumn,
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  useEffect(() => setPageSize(10), []);

  return (
    <div>
      <Form>
        <Form.Switch
          onChange={onSwitchAction}
          id="custom-switch"
          label="column filtering"
          checked={filterMode}
          className="filtering-switch"
        />
      </Form>

      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <AiOutlineArrowUp />
                      ) : (
                        <AiOutlineArrowDown />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <Button
          onClick={() => previousPage()}
          variant="primary"
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <span>
          <strong>
            Page {pageIndex + 1} of {pageOptions.length}{" "}
          </strong>
        </span>
        <Button
          onClick={() => nextPage()}
          variant="primary"
          disabled={!canNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InquiriesTable;
