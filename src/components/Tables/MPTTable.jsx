import React, { useMemo } from "react";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectMPTFactures } from "../../redux/Factures/Factures.selectors";
import { selectMPTSalaires } from "../../redux/Salaires/salaires.selectors";
import { selectMPTMachineries } from "../../redux/Machineries/machineries.selectors";

import { useTable } from "react-table";
import { useNavigate, useParams } from "react-router-dom";

import { DossierColumns } from "./Columns";

import DATA from "../../assets/MPT_DATA.json";

const MPTTable = ({ factures, salaires, machineries }) => {
  const params = useParams();

  if (factures[params.dossierId]) {
    const facturesTotal = factures[params.dossierId].reduce(
      (acc, facture) => acc + facture.montant_rec,
      0
    );
    DATA[0].mr = `$${facturesTotal}`;
  }

  if (salaires[params.dossierId]) {
    const salairesTotal = salaires[params.dossierId].reduce(
      (acc, salaire) => acc + salaire.montant_rec,
      0
    );
    DATA[2].mr = `$${salairesTotal}`;
  }

  if (machineries[params.dossierId]) {
    const machineriesTotal = machineries[params.dossierId].reduce(
      (acc, machinerie) => acc + machinerie.cout,
      0
    );
    DATA[1].mr = `$${machineriesTotal}`;
  }

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
const mapStateToProps = createStructuredSelector({
  factures: selectMPTFactures,
  salaires: selectMPTSalaires,
  machineries: selectMPTMachineries,
});

export default connect(mapStateToProps)(MPTTable);
