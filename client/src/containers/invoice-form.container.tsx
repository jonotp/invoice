import React, { useEffect, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import SupplierSection from "../components/supplier-section.component";
import CustomerSection from "../components/customer-section.component";
import ItemsSection from "../components/items-section.component";
import {
  IPersonel,
  IItem,
  DefaultPersonel,
  DefaultItem,
  IInvoice,
} from "../types";
import "../styles/containers/invoice-form.container.scss";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";

const InvoiceFormContainer = () => {
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

  const [hasGST, setHasGST] = useState(false);
  const [items, setItems] = useState<IItem[]>([DefaultItem]);

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      // Set supplier details
      // Set gst and logo
    }
  }, [isAuthenticated]);

  const onSubmit = () => {
    const invoice: IInvoice = {
      invoiceNo,
      issueDate,
      logo,
      supplier: supplierDetails,
      customer: customerDetails,
      hasGST,
      items,
      notes,
    };

    console.log(invoice);
  };

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
            hasGST={hasGST}
            onGSTUpdate={setHasGST}
          />
        </div>
      </div>
      <Button onClick={onSubmit}>Submit</Button>
    </MuiPickersUtilsProvider>
  );
};

export default InvoiceFormContainer;
