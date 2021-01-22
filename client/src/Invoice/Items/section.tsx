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
import InvoiceItemsTaxPopup from "./tax-popup";
import { IItem, DefaultItem } from "../../types";
import InvoiceItemsTableHead from "./table-head";
import InvoiceItemsTableRow from "./table-row";
import "./invoice-items-section.scss";

interface InvoiceItemsSectionProps {
  items: IItem[];
  onItemsUpdate: Dispatch<SetStateAction<IItem[]>>;
  hasTax: boolean;
  onHasTaxUpdate: Dispatch<SetStateAction<boolean>>;
  taxRate: number;
  onTaxRateUpdate: Dispatch<SetStateAction<any>>;
}

const InvoiceItemsSection: FunctionComponent<InvoiceItemsSectionProps> = ({
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
          (prev, curr) => (prev += curr.price * taxRate * 0.01 * curr.quantity),
          0
        )
      )
    : getToTwoDecimalPlaces(0);

  const total = getToTwoDecimalPlaces(Number(subTotal) + Number(taxTotal));

  return (
    <section className="items-section">
      <h1>Enter the items you wish to invoice</h1>
      <div style={{ gridArea: "gst" }}>
        <strong className="tax-query">Will your invoice include tax?</strong>
        <Switch className="has-tax-toggle" color="primary" checked={hasTax} onChange={handleTaxToggle} />
      </div>
      <Table aria-label="item table" className="item-table">
        <InvoiceItemsTableHead hasTax={hasTax} />
        <TableBody>
          <InvoiceItemsTableRow
            items={items}
            onItemsUpdate={onItemsUpdate}
            hasTax={hasTax}
            taxRate={taxRate}
          />
          {/* Used to shift the spanned table to the end */}
          <TableRow>
            <TableCell className="footer-spacing-cell" rowSpan={4}></TableCell>
            <TableCell className="footer-spacing-cell" rowSpan={4}></TableCell>
            {hasTax ? <TableCell className="footer-spacing-cell" rowSpan={4}></TableCell> : null}
          </TableRow>
          <TableRow className="tr-bold item-table-footer">
            <TableCell>Subtotal</TableCell>
            <TableCell align="right" colSpan={2}>$ {subTotal}</TableCell>
          </TableRow>
          {hasTax ? (
            <TableRow className="tr-bold item-table-footer">
              <TableCell
                className="tax-label-cell"
                onClick={() => setIsTaxDialogOpen(true)}
              >
                <span className="transparent-text">T </span>
                <span className="tax-label">Tax ({taxRate}%)</span>
                <span className="tax-helper">Click to change tax</span>
              </TableCell>
              <TableCell className="tax-total-cell" align="right" colSpan={2}><span className="tax-total">$ {taxTotal}</span></TableCell>
            </TableRow>
          ) : null}
          <TableRow className="tr-bold item-table-footer">
            <TableCell>Total</TableCell>
            <TableCell align="right" colSpan={2}>$ {total}</TableCell>
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
      <InvoiceItemsTaxPopup
        open={isTaxDialogOpen}
        onClose={() => setIsTaxDialogOpen(false)}
        value={taxRate}
        onSubmit={(x) => onTaxRateUpdate(x)}
        error={(x) => x < 0 || x > 100}
      />
    </section>
  );
};

export default memo(InvoiceItemsSection);
