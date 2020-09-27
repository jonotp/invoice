import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  memo,
} from "react";
import { TextField } from "@material-ui/core";
import { IPersonel } from "../types";
import "../styles/components/customer-section.component.scss";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface CustomerSectionProps {
  customer: IPersonel;
  onCustomerUpdate: Dispatch<SetStateAction<IPersonel>>;
  invoiceNo: string;
  onInvoiceNoUpdate: Dispatch<SetStateAction<string>>;
  issueDate: Date;
  onIssueDateUpdate: Dispatch<SetStateAction<Date>>;
}

const CustomerSection: FunctionComponent<CustomerSectionProps> = ({
  customer,
  onCustomerUpdate,
  invoiceNo,
  onInvoiceNoUpdate,
  issueDate,
  onIssueDateUpdate,
}) => {
  const handleInputChange = (property: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    onCustomerUpdate((prevState) => {
      return {
        ...prevState,
        [property]: event.target.value,
      };
    });
  };

  const handleInvoiceNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInvoiceNoUpdate(event.target.value);
  }

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date !== null) {
      onIssueDateUpdate(date);
    }
  };

  return (
    <section className="customer-section">
      <h1>Enter customer & invoice information</h1>
      <TextField
        id="customer-identity"
        label="ABN"
        name="identity"
        variant="outlined"
        margin="none"
        style={{ gridArea: "abn" }}
        value={customer.identity || ""}
        onChange={handleInputChange("identity")}
      />
      <TextField
        id="customer-name"
        label="Name"
        name="name"
        variant="outlined"
        margin="none"
        style={{ gridArea: "name" }}
        value={customer.name || ""}
        onChange={handleInputChange("name")}
      />
      <TextField
        id="customer-address"
        label="Address"
        name="address"
        variant="outlined"
        margin="none"
        style={{ gridArea: "address" }}
        value={customer.address || ""}
        onChange={handleInputChange("address")}
      />
      <TextField
        id="customer-city"
        label="City"
        name="city"
        variant="outlined"
        margin="none"
        style={{ gridArea: "city" }}
        value={customer.city || ""}
        onChange={handleInputChange("city")}
      />
      <TextField
        id="customer-state"
        label="State"
        name="state"
        variant="outlined"
        margin="none"
        style={{ gridArea: "state" }}
        value={customer.state || ""}
        onChange={handleInputChange("state")}
      />
      <TextField
        id="customer-zip"
        label="Zip Code"
        name="zip"
        variant="outlined"
        margin="none"
        style={{ gridArea: "zip" }}
        value={customer.zip || ""}
        onChange={handleInputChange("zip")}
      />
      <TextField
        id="customer-country"
        label="Country"
        name="country"
        variant="outlined"
        margin="none"
        style={{ gridArea: "country" }}
        value={customer.country || ""}
        onChange={handleInputChange("country")}
      />
      <TextField
        id="invoiceNo"
        name="invoiceNo"
        label="Invoice No"
        variant="outlined"
        margin="none"
        style={{ gridArea: "invoice-no" }}
        value={invoiceNo || ""}
        onChange={handleInvoiceNoChange}
      />
      <KeyboardDatePicker
        id="issueDate"
        name="issueDate"
        label="Issue Date"
        margin="none"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        disablePast
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        style={{ gridArea: "issue-date" }}
        value={issueDate}
        onChange={handleDateChange}
      />
    </section>
  );
};

export default memo(CustomerSection);
