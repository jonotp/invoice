import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { memo } from "react";
import { FunctionComponent } from "react";
import { Colors, IInvoice } from "../types";
import LoadedPDFButton from "./loaded-pdf-button.component";
import BasicPDF from "./pdfs/basic-pdf.component";

interface InvoiceDownloadButtonProps {
  invoice: IInvoice;
  colors: Colors;
}

// Invoice download button. If loading will display a disabled button
const InvoiceDownloadButton: FunctionComponent<InvoiceDownloadButtonProps> = ({
  invoice,
  colors,
}) => {
  const document = <BasicPDF invoice={invoice} colors={colors} />;

  return (
    <PDFDownloadLink
      className="pdf-download-link"
      document={document}
      fileName="invoice.pdf"
    >
      {({ loading }) => <LoadedPDFButton loading={loading} />}
    </PDFDownloadLink>
  );
};

export default memo(InvoiceDownloadButton);
