import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { Switch, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { IInvoiceDetails } from "../types";

const defaultDate = new Date();

interface InvoiceDetailSectionProps {
  invoiceDetails: IInvoiceDetails;
  onUpdateInvoiceDetails: Dispatch<SetStateAction<IInvoiceDetails>>;
}

const InvoiceDetailsSection: FunctionComponent<InvoiceDetailSectionProps> = ({
  invoiceDetails,
  onUpdateInvoiceDetails,
}: InvoiceDetailSectionProps) => {
  const handleInputChange = (property: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    if (onUpdateInvoiceDetails === undefined) return;
    onUpdateInvoiceDetails((prevState) => {
      return {
        ...prevState,
        [property]: event.target.value,
      };
    });
  };

  const handleDateChange = (property: string) => (
    date: MaterialUiPickersDate
  ) => {
    onUpdateInvoiceDetails((prevState) => {
      return {
        ...prevState,
        [property]: date,
      };
    });
  };

  const handleGSTToggle = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    onUpdateInvoiceDetails((prevState) => {
      return {
        ...prevState,
        hasGST: checked,
      };
    });
  };

  return (
    <section className="payment-section">
      <h1>Enter Invoice details</h1>
      <TextField
        id="invoiceNo"
        name="invoiceNo"
        label="Invoice No"
        variant="outlined"
        margin="normal"
        value={invoiceDetails.invoiceNo || ""}
        onChange={handleInputChange("invoiceNo")}
      />
      <KeyboardDatePicker
        id="issueDate"
        name="issueDate"
        label="Issue Date"
        margin="normal"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        disablePast
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        value={invoiceDetails.issueDate || defaultDate}
        onChange={handleDateChange("issueDate")}
      />
      <div>
        <strong>Will your invoice include GST?</strong>
        <Switch checked={invoiceDetails.hasGST} onChange={handleGSTToggle} />
      </div>
    </section>
  );
};

export default InvoiceDetailsSection;
