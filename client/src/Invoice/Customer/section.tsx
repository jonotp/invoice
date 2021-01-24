import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  memo,
} from "react";
import { TextField } from "@material-ui/core";
import { ICustomer } from "../../types";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { commonInputChange } from "../../Common/input-change";
import "./invoice-customer-section.scss";

interface InvoiceFormCustomerSectionProps {
  customer: ICustomer;
  onCustomerUpdate: Dispatch<SetStateAction<ICustomer>>;
  invoiceNo: string;
  onInvoiceNoUpdate: Dispatch<SetStateAction<string>>;
  issueDate: Date;
  onIssueDateUpdate: Dispatch<SetStateAction<Date>>;
}

const InvoiceFormCustomerSection: FunctionComponent<InvoiceFormCustomerSectionProps> = ({
  customer,
  onCustomerUpdate,
  invoiceNo,
  onInvoiceNoUpdate,
  issueDate,
  onIssueDateUpdate,
}) => {
  const handleInputChange = commonInputChange(onCustomerUpdate);

  const handleInvoiceNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInvoiceNoUpdate(event.target.value);
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date !== null) {
      onIssueDateUpdate(date);
    }
  };

  return (
    <section className="customer-section">
      <h1>Enter customer & invoice information</h1>
      <TextField
        id="customer-business-id"
        label="Business Identifier"
        name="businessId"
        variant="outlined"
        margin="none"
        style={{ gridArea: "businessId" }}
        value={customer.businessId}
        onChange={handleInputChange}
      />
      <TextField
        id="customer-name"
        label="Name"
        name="name"
        variant="outlined"
        margin="none"
        style={{ gridArea: "name" }}
        value={customer.name}
        onChange={handleInputChange}
      />
      <TextField
        id="customer-address"
        label="Address"
        name="address"
        variant="outlined"
        margin="none"
        style={{ gridArea: "address" }}
        value={customer.address}
        onChange={handleInputChange}
      />
      <TextField
        id="customer-email"
        label="Email"
        name="email"
        variant="outlined"
        margin="none"
        style={{ gridArea: "email" }}
        value={customer.email}
        onChange={handleInputChange}
      />
      <TextField
        id="customer-phone"
        label="Phone"
        name="phone"
        variant="outlined"
        margin="none"
        style={{ gridArea: "phone" }}
        value={customer.phone}
        onChange={handleInputChange}
      />
      <TextField
        id="invoiceNo"
        name="invoiceNo"
        label="Invoice No"
        variant="outlined"
        margin="none"
        style={{ gridArea: "invoice-no" }}
        value={invoiceNo}
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

export default memo(InvoiceFormCustomerSection);
