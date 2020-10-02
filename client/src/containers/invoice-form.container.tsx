import React, { ChangeEvent, useEffect, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import SupplierSection from "../components/supplier-section.component";
import CustomerSection from "../components/customer-section.component";
import ItemsSection from "../components/items-section.component";
import HiddenInvoiceDownloader from "../components/hidden-invoice-downloader.component";
import {
  IPersonel,
  IItem,
  DefaultPersonel,
  DefaultItem,
  IInvoice,
  Colors,
} from "../types";
import DateFnsUtils from "@date-io/date-fns";
import { Button, TextField } from "@material-ui/core";
import "../styles/containers/invoice-form.container.scss";

const colors: Colors = {
  primary: "#29485d",
  secondary: "#95A8AC",
  background: "#FFD962",
  text: "#333",
};

const InvoiceForm = () => {
  const isAuthenticated = false;

  const [logo, setLogo] = useState("");
  const [supplierDetails, setSupplierDetails] = useState<IPersonel>(
    DefaultPersonel
  );

  const [invoiceNo, setInvoiceNo] = useState("");
  const [issueDate, setIssueDate] = useState(new Date());
  const [customerDetails, setCustomerDetails] = useState<IPersonel>(
    DefaultPersonel
  );

  const [hasTax, setHasTax] = useState(true);
  const [taxRatePercentage, setTaxRatePercentage] = useState(10);
  const [items, setItems] = useState<IItem[]>([DefaultItem]);

  const [notes, setNotes] = useState("");
  const [invoice, setInvoice] = useState<IInvoice>();

  useEffect(() => {
    if (isAuthenticated) {
      // Set supplier details
      // Set gst and logo
    }
  }, [isAuthenticated]);

  const onSubmit = () => {
    const submittedInvoice: IInvoice = {
      invoiceNo,
      issueDate,
      logo,
      supplier: supplierDetails,
      customer: customerDetails,
      hasTax,
      taxRatePercentage,
      items,
      notes,
    };

    console.log(submittedInvoice);
    setInvoice(submittedInvoice);
  };

  const handleNotesTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setNotes(event.target.value);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <section className="invoice-form">
        <div className="invoice-grid">
          <div className="invoice-section">
            <SupplierSection
              supplier={supplierDetails}
              onUpdateSupplier={setSupplierDetails}
              logo={logo}
              onUpdateLogo={setLogo}
            />
          </div>
          <div className="invoice-section">
            <CustomerSection
              customer={customerDetails}
              onCustomerUpdate={setCustomerDetails}
              invoiceNo={invoiceNo}
              onInvoiceNoUpdate={setInvoiceNo}
              issueDate={issueDate}
              onIssueDateUpdate={setIssueDate}
            />
          </div>
          <div className="invoice-section">
            <ItemsSection
              items={items}
              onItemsUpdate={setItems}
              hasTax={hasTax}
              onHasTaxUpdate={setHasTax}
              taxRate={taxRatePercentage}
              onTaxRateUpdate={setTaxRatePercentage}
            />
          </div>
          <div className="invoice-section">
            <section className="notes-section">
              <h1>Enter any additional notes</h1>
              <TextField
                id="notes"
                label="Additional notes"
                name="notes"
                margin="none"
                className="notes-field"
                rows={4}
                rowsMax={8}
                multiline={true}
                value={notes}
                onChange={handleNotesTextChange}
              />
            </section>
          </div>
        </div>
        <Button
          className="submit-button"
          color="primary"
          variant="contained"
          onClick={onSubmit}
        >
          Submit
        </Button>
        {invoice !== undefined && invoice !== null ? (
          <HiddenInvoiceDownloader invoice={invoice} colors={colors} />
        ) : null}
      </section>
    </MuiPickersUtilsProvider>
  );
};

export default InvoiceForm;
