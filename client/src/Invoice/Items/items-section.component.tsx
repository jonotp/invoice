import React, {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  memo,
  useState,
  useEffect,
} from "react";
import {
  Button,
  Switch,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IItem, DefaultItem } from "../../types";
import "./items-section.component.scss";

interface ItemsSectionProps {
  items: IItem[];
  onItemsUpdate: Dispatch<SetStateAction<IItem[]>>;
  hasTax: boolean;
  onHasTaxUpdate: Dispatch<SetStateAction<boolean>>;
  taxRate: number;
  onTaxRateUpdate: Dispatch<SetStateAction<any>>;
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
  hasTax,
  onHasTaxUpdate,
  taxRate,
  onTaxRateUpdate,
}) => {
  const [isTaxDialogOpen, setIsTaxDialogOpen] = useState(false);
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

  const handleTaxToggle = () => {
    const value = !hasTax;
    onHasTaxUpdate(value);

    if (value) {
      onTaxRateUpdate(10);
    } else {
      onTaxRateUpdate(0);
    }
  };

  const getTax = (item: IItem): string =>
    (item.quantity * item.price * 0.01 * taxRate).toFixed(2);

  const getLineTotal = (item: IItem): string =>
    (
      item.quantity *
      (Number(item.price) + Number(item.price * taxRate * 0.01))
    ).toFixed(2);

  // EPISILON is needed to correctly round things like 1.005
  const getToTwoDecimalPlaces = (num: number) =>
    (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);

  const subTotal = getToTwoDecimalPlaces(
    items.reduce((prev, curr) => (prev += curr.price * curr.quantity), 0)
  );

  const taxTotal = hasTax
    ? getToTwoDecimalPlaces(
        items.reduce(
          (prev, curr) => (prev += curr.price * 0.1 * curr.quantity),
          0
        )
      )
    : getToTwoDecimalPlaces(0);

  const total = getToTwoDecimalPlaces(Number(subTotal) + Number(taxTotal));

  return (
    <section className="items-section">
      <h1>Enter the items you wish to invoice</h1>
      <div style={{ gridArea: "gst" }}>
        <strong>Will your invoice include tax?</strong>
        <Switch color="primary" checked={hasTax} onChange={handleTaxToggle} />
      </div>
      <Table aria-label="item table">
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
        <TableBody>
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
                <TableCell>
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
              <TableCell>
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
          {/* Used to shift the spanned table to the end */}
          <TableRow>
            <TableCell rowSpan={4}></TableCell>
            <TableCell rowSpan={4}></TableCell>
            {hasTax ? <TableCell rowSpan={4}></TableCell> : null}
          </TableRow>
          <TableRow className="tr-bold">
            <TableCell>Subtotal</TableCell>
            <TableCell align="right">$ {subTotal}</TableCell>
          </TableRow>
          {hasTax ? (
            <TableRow className="tr-bold">
              <TableCell
                className="tax-label"
                onClick={() => setIsTaxDialogOpen(true)}
              >
                Tax ({taxRate}%)
                <span className="tax-helper">Click to change tax</span>
              </TableCell>
              <TableCell align="right">$ {taxTotal}</TableCell>
            </TableRow>
          ) : null}
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
      <TaxRateDialogue
        open={isTaxDialogOpen}
        onClose={() => setIsTaxDialogOpen(false)}
        value={taxRate}
        onSubmit={(x) => onTaxRateUpdate(x)}
        error={(x) => x < 0 || x > 100}
      />
    </section>
  );
};

interface TaxRateDialogueProps {
  open: boolean;
  value: number | string;
  onClose(): void;
  onSubmit(num: number | string): void;
  error(num: number | string): boolean;
}

const TaxRateDialogue: FunctionComponent<TaxRateDialogueProps> = ({
  open,
  value,
  onClose,
  onSubmit,
  error,
}) => {
  const [input, setInput] = useState(value);
  const [isValid, setIsValid] = useState(!error(value));

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setIsValid(!error(inputValue));
    setInput(inputValue);
  };

  useEffect(() => {
    if (open && Number(input) !== value) {
      setIsValid(!error(value));
      setInput(value);
    }
  // eslint-disable-next-line
  }, [open]);

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(input);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>Please enter your tax rate</DialogContentText>
        <FormControl>
          <TextField
            variant="standard"
            margin="none"
            type="number"
            label="Tax Rate (%)"
            id={`tax`}
            error={!isValid}
            value={input}
            name={`tax`}
            size="small"
            helperText="Please enter a value between 0 - 100"
            onChange={handleInputChange}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="text" onClick={handleSubmit}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ItemsSection);
