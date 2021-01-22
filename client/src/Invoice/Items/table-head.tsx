import React from "react";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

interface InvoiceItemsTableHeadProps {
  hasTax: boolean;
}

const InvoiceItemsTableHead = ({ hasTax }: InvoiceItemsTableHeadProps) => {
  return (
    <TableHead className="table-head">
      <TableRow>
        <TableCell style={{ width: "40%" }} align="left">
          Description
        </TableCell>
        <TableCell align="right">Quantity</TableCell>
        <TableCell align="right">Price ($)</TableCell>
        {hasTax ? <TableCell className="tax-header-cell" align="right">Tax ($)</TableCell> : null}
        <TableCell className="tax-header-cell" align="right">Total ($)</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default InvoiceItemsTableHead;