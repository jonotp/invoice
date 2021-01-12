import React from "react";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

interface ItemsTableHead {
  hasTax: boolean;
}

const ItemsTableHead = ({ hasTax }: ItemsTableHead) => {
  return (
    <TableHead className="table-head">
      <TableRow>
        <TableCell style={{ width: "40%" }} align="left">
          Description
        </TableCell>
        <TableCell align="right">Quantity</TableCell>
        <TableCell align="right">Price ($)</TableCell>
        {hasTax ? <TableCell align="right">Tax ($)</TableCell> : null}
        <TableCell align="right">Total ($)</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ItemsTableHead;