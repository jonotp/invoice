import React, { FunctionComponent } from "react";
import { Colors, IInvoice } from "../types";
import { Button } from "@material-ui/core";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import BasicPDF from "../components/pdfs/basic-pdf.component";
import TestInvoice from "../testData";
import "../styles/containers/invoice-pdf.container.scss";

const colors: Colors = {
  primary: "#29485d",
  secondary: "#95A8AC",
  background: "#FFD962",
  text: "#333",
};

const InvoicePDFPReviewer: FunctionComponent<IInvoice> = (
  invoice: IInvoice
) => {
  return (
    <section className="invoice-pdf-container">
      <PDFViewer width="90%" height="1200">
        <BasicPDF
          invoice={invoice}
          colors={colors}
        />
      </PDFViewer>
      <br />
      <Button color="primary" variant="contained">
        <PDFDownloadLink
          className="pdf-link"
          document={
            <BasicPDF
              invoice={invoice}
              colors={colors}
            />
          }
          fileName="invoice.pdf"
        >
          Print PDF
        </PDFDownloadLink>
      </Button>
    </section>
  );
};

const InvoiceDownloadButton: FunctionComponent<IInvoice> = (invoice) => {
  return (
    <Button color="primary" variant="contained">
      <PDFDownloadLink
        className="pdf-link"
        document={
          <BasicPDF
            invoice={invoice}
            colors={colors}
            getLineTax={getLineTax}
            getLineTotal={getLineTotal}
            getTaxTotal={getTaxTotal}
            getSubTotal={getSubTotal}
          />
        }
        fileName="invoice.pdf"
      >
        Print PDF
      </PDFDownloadLink>
    </Button>
  );
};

export const TestInvoicePDFPreviewer: FunctionComponent = () => {
  return InvoicePDFPReviewer(TestInvoice);
};

export default InvoicePDFPReviewer;
