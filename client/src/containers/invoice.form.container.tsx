import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { InvoiceProvider } from "../contexts/invoice.context";
import SupplierSection from "../components/supplier.section.component";
import CustomerSection from "../components/customer.section.component";
import PaymentSection from "../components/payment.section.component";
import ItemsSection from "../components/items.section.component";
import "../styles/invoice-form.scss";
import DateFnsUtils from "@date-io/date-fns";

const InvoiceFormContainer = () => {
  console.log("Invoice form provider");
  return (
    <InvoiceProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="invoice-grid">
          <div className="invoice-section">
            <SupplierSection />
          </div>
          <div className="invoice-section">
            <CustomerSection />
          </div>
          <div className="invoice-section">
            <PaymentSection />
          </div>
          <div className="invoice-section">
            <ItemsSection />
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </InvoiceProvider>
  );
};

export default InvoiceFormContainer;
