import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  memo,
  useState,
} from "react";
import {
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TaxRateDialogue from "./tax-rate-dialogue.component";
import { IItem, DefaultItem } from "../../types";
import "./items-section.component.scss";
import ItemsTableHead from "./items-table-head.component";
import ItemsTableRow from "./items-table-row.component";

interface ItemsSectionProps {
  items: IItem[];
  onItemsUpdate: Dispatch<SetStateAction<IItem[]>>;
  hasTax: boolean;
  onHasTaxUpdate: Dispatch<SetStateAction<boolean>>;
  taxRate: number;
  onTaxRateUpdate: Dispatch<SetStateAction<any>>;
}

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

  const handleTaxToggle = () => {
    const value = !hasTax;
    onHasTaxUpdate(value);

    if (value) {
      onTaxRateUpdate(10);
    } else {
      onTaxRateUpdate(0);
    }
  };

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
        <ItemsTableHead hasTax={hasTax} />
        <TableBody>
          <ItemsTableRow
            items={items}
            onItemsUpdate={onItemsUpdate}
            hasTax={hasTax}
            taxRate={taxRate}
          />
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

export default memo(ItemsSection);
