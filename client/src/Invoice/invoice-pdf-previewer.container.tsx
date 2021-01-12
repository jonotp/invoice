import React from "react";
import { Colors, IInvoice } from "../types";
import { Button } from "@material-ui/core";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import BasicPDF from "../PDFs/basic-pdf.component";
import TestInvoice from "../testData";
import withAuthorization from "../Authorization/with-authorization.container";
import "./invoice-pdf.container.scss";

const colors: Colors = {
  primary: "#29485d",
  secondary: "#95A8AC",
  background: "#FFD962",
  text: "#333",
};

const InvoicePDFPReviewer = (invoice: IInvoice) => {
  return (
    <section className="invoice-pdf-container">
      <PDFViewer width="90%" height="1200">
        <BasicPDF invoice={invoice} colors={colors} />
      </PDFViewer>
      <br />
      <Button color="primary" variant="contained">
        <PDFDownloadLink
          className="pdf-link"
          document={<BasicPDF invoice={invoice} colors={colors} />}
          fileName="invoice.pdf"
        >
          Print PDF
        </PDFDownloadLink>
      </Button>
    </section>
  );
};

const condition = (authUser: firebase.User | null) => !!authUser;

const TestInvoicePDFPreviewer = () =>
  withAuthorization(condition)(InvoicePDFPReviewer(TestInvoice));

export { InvoicePDFPReviewer, TestInvoicePDFPreviewer };
