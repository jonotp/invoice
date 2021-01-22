import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TextField, TableCell, TableRow } from "@material-ui/core";
import { IItem } from "../../types";

const decimalInput = {
  steps: ".01",
  min: 0,
};

const quanityInput = {
  min: 1,
};

interface InvoiceItemsTableRowProps {
  items: IItem[];
  onItemsUpdate: Dispatch<SetStateAction<IItem[]>>;
  hasTax: boolean;
  taxRate: number;
}

const InvoiceItemsTableRow = ({
  items,
  onItemsUpdate,
  hasTax,
  taxRate,
}: InvoiceItemsTableRowProps) => {
  const handleTextChangeItems = (index: number, property: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    onItemsUpdate((prevState) => {
      return prevState.map((item: IItem, i: number) =>
        i === index
          ? {
              ...item,
              [property]: event.target.value,
            }
          : item
      );
    });
  };

  const getTax = (item: IItem): string =>
    (item.quantity * item.price * 0.01 * taxRate).toFixed(2);

  const getLineTotal = (item: IItem): string =>
    (
      item.quantity *
      (Number(item.price) + Number(item.price * taxRate * 0.01))
    ).toFixed(2);

  return (
    <>
      {items.map((x, i) => (
        <TableRow key={i}>
          <TableCell>
            <TextField
              variant="outlined"
              margin="normal"
              id={`description-${i}`}
              label="Description"
              value={x.description}
              fullWidth={true}
              name={`description-${i}`}
              onChange={handleTextChangeItems(i, "description")}
            />
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              inputProps={quanityInput}
              label="Quantity"
              name={`quantity-${i}`}
              error={x.quantity <= 0}
              value={x.quantity}
              onChange={handleTextChangeItems(i, "quantity")}
            />
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              inputProps={decimalInput}
              id={`price-${i}`}
              label="Price ($)"
              error={x.price < 0}
              value={x.price}
              name={`price-${i}`}
              onChange={handleTextChangeItems(i, "price")}
            />
          </TableCell>
          {hasTax ? (
            <TableCell className="tax-row-cell">
              <TextField
                variant="filled"
                margin="normal"
                type="number"
                inputProps={decimalInput}
                id={`tax-${i}`}
                label="Tax ($)"
                value={getTax(x)}
                name={`total-${i}`}
                disabled
              />
            </TableCell>
          ) : null}
          <TableCell className="total-row-cell">
            <TextField
              variant="filled"
              margin="normal"
              type="number"
              inputProps={decimalInput}
              id={`total-${i}`}
              label="Total ($)"
              value={getLineTotal(x)}
              name={`total-${i}`}
              disabled
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default InvoiceItemsTableRow;
