import React, {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react";
import { Button, Switch, TextField } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IItem, DefaultItem } from "../types";
import "../styles/components/items-section.component.scss";

interface ItemsSectionProps {
  items: IItem[];
  onItemsUpdate: Dispatch<SetStateAction<IItem[]>>;
  hasGST: boolean;
  onGSTUpdate: Dispatch<SetStateAction<boolean>>;
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
  onItemsUpdate,
  hasGST,
  onGSTUpdate,
}) => {
  const handleAddItem = () => {
    onItemsUpdate((prevState) => prevState.concat(DefaultItem));
  };

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

  const handleGSTToggle = () => {
    onGSTUpdate(!hasGST);
  };

  // EPISILON is need to correctly round things like 1.005
  const getToTwoDecimalPlaces = (num: number) =>
    Math.round((num + Number.EPSILON) * 100) / 100;

  const subTotal = getToTwoDecimalPlaces(
    items.reduce((prev, curr) => (prev += curr.price * curr.quantity), 0)
  );

  const taxTotal = hasGST
    ? getToTwoDecimalPlaces(
        items.reduce(
          (prev, curr) => (prev += curr.price * 0.1 * curr.quantity),
          0
        )
      )
    : 0;

  const total = getToTwoDecimalPlaces(subTotal + taxTotal);

  return (
    <section className="items-section">
      <h1>Enter the items you wish to invoice</h1>
      <div style={{ gridArea: "gst" }}>
        <strong>Will your invoice include GST?</strong>
        <Switch checked={hasGST} onChange={handleGSTToggle} />
      </div>
      <Table aria-label="item table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell align="left">Item name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price ($)</TableCell>
            {hasGST ? <TableCell align="right">GST ($)</TableCell> : null}
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
                  onChange={handleTextChangeItems(i, "name")}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  margin="normal"
                  id={`description-${i}`}
                  label="Description"
                  value={x.description}
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
              {hasGST ? (
                <TableCell>
                  <TextField
                    variant="filled"
                    margin="normal"
                    type="number"
                    inputProps={decimalInput}
                    id={`gst-${i}`}
                    label="GST ($)"
                    value={x.price * 0.1}
                    name={`total-${i}`}
                    disabled
                  />
                </TableCell>
              ) : null}
              <TableCell>
                <TextField
                  variant="filled"
                  margin="normal"
                  type="number"
                  inputProps={decimalInput}
                  id={`total-${i}`}
                  label="Total ($)"
                  value={
                    hasGST
                      ? x.quantity * (Number(x.price) + Number(x.price * 0.1))
                      : x.quantity * x.price
                  }
                  name={`total-${i}`}
                  disabled
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={4}></TableCell>
            <TableCell rowSpan={4}></TableCell>
            <TableCell rowSpan={4}></TableCell>
            {hasGST ? <TableCell rowSpan={4}></TableCell> : null}
          </TableRow>
          <TableRow className="tr-bold">
            <TableCell>Subtotal</TableCell>
            <TableCell align="right">$ {subTotal}</TableCell>
          </TableRow>
          <TableRow className="tr-bold">
            <TableCell>Tax</TableCell>
            <TableCell align="right">$ {taxTotal}</TableCell>
          </TableRow>
          <TableRow className="tr-bold">
            <TableCell>Total</TableCell>
            <TableCell align="right">$ {total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        className="button"
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
