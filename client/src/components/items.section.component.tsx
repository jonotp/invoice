import React, { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from "react";
import { Button, TextField } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IItem, DefaultItem } from "../types";

interface ItemsSectionProps {
  items: IItem[];
  onUpdateItems: Dispatch<SetStateAction<IItem[]>>;
}

const decimalInput = {
  steps: ".01",
  min: 0,
};

const quanityInput = {
  min: 1,
};

const ItemsSection: FunctionComponent<ItemsSectionProps> = ({
  items,
  onUpdateItems,
}) => {
  const handleAddItem = () => {
    onUpdateItems((prevState) => prevState.concat(DefaultItem));
  };

  const handleTextChange = (index: number, property: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    onUpdateItems((prevState) => {
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
  return (
    <section className="items-section">
      <h1>Enter the items you wish to invoice</h1>
      <Table aria-label="item table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell>Item name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Discount (%)</TableCell>
            <TableCell align="right">Price ($)</TableCell>
            <TableCell align="right">Total ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((x, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <TextField
                  variant="outlined"
                  margin="normal"
                  id={`name-${i}`}
                  label="Name"
                  name={`name-${i}`}
                  value={x.name}
                  onChange={handleTextChange(i, "name")}
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
                  onChange={handleTextChange(i, "quantity")}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="number"
                  inputProps={decimalInput}
                  id={`discountPercentage-${i}`}
                  label="Discount (%)"
                  error={
                    !!x.discountPercentage ? x.discountPercentage < 0 : false
                  }
                  value={x.discountPercentage || ""}
                  name={`discountPercentage-${i}`}
                  onChange={handleTextChange(i, "discountPercentage")}
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
                  onChange={handleTextChange(i, "price")}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="filled"
                  margin="normal"
                  type="number"
                  inputProps={decimalInput}
                  id={`total-${i}`}
                  label="Total ($)"
                  value={
                    !!x.discountPercentage
                      ? x.price - x.price * x.discountPercentage * 0.01
                      : x.price
                  }
                  name={`total-${i}`}
                  disabled
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        color="secondary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAddItem}
      >
        Add Item
      </Button>
    </section>
  );
};

export default ItemsSection;
