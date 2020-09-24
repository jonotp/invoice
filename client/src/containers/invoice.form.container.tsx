import React, { useEffect, useState  } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import SupplierSection from "../components/supplier.section.component";
import CustomerSection from "../components/customer.section.component";
import InvoiceDetailsSection from "../components/invoice-details.section.component";
import ItemsSection from "../components/items.section.component";
import {
  IPersonel,
  IItem,
  IInvoiceDetails,
  DefaultPersonel,
  DefaultItem,
  DefaultInvoiceDetails,
} from "../types";
import "../styles/invoice-form.scss";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";

const InvoiceFormContainer = () => {
  const isAuthenticated = false;
  const [supplierDetails, setSupplierDetails] = useState<IPersonel>(
    DefaultPersonel
  );
  const [logo, setLogo] = useState("");
  const [customerDetails, setCustomerDetails] = useState<IPersonel>(
    DefaultPersonel
  );
  const [invoiceDetails, setInvoiceDetails] = useState<IInvoiceDetails>(
    DefaultInvoiceDetails
  );
  const [items, setItems] = useState<IItem[]>([DefaultItem]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      // Set supplier details
      // Set gst and logo
    }
  }, [isAuthenticated]);

  const onSubmit = () => {
    console.log("Supplier Details", supplierDetails);
    console.log("logo", logo);
    console.log("Customer Details", customerDetails);
    console.log("Invoice Details", invoiceDetails);
    console.log("Items", items);
    console.log("Notes", notes)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          />
        </div>
        <div className="invoice-section">
          <InvoiceDetailsSection
            invoiceDetails={invoiceDetails}
            onUpdateInvoiceDetails={setInvoiceDetails}
          />
        </div>
        <div className="invoice-section">
          <ItemsSection items={items} onUpdateItems={setItems} />
        </div>
      </div>
      <Button onClick={onSubmit}>
        Submit
      </Button>
    </MuiPickersUtilsProvider>
  );
};

export default InvoiceFormContainer;
