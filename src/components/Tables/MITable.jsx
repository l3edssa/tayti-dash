import React, { useMemo } from "react";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

import { DossierColumns } from "./Columns";

import DATA from "../../assets/MI_DATA.json";

const MITable = () => {
  const columns = useMemo(() => DossierColumns, []);
  const data = useMemo(() => DATA, []);

  const history = useNavigate();
  const handleRowClick = (row) => {
    history(`${window.location.pathname}/${row.original.link}`);
  };

  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <table {...getTableProps()} className="row_highlight">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((columns) => (
              <th {...columns.getHeaderProps()}>{columns.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={() => handleRowClick(row)}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MITable;
