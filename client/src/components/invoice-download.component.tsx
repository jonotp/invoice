import { Button } from "@material-ui/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { createRef, memo, useEffect } from "react";
import { FunctionComponent } from "react";
import { Colors, IInvoice } from "../types";
import BasicPDF from "./pdfs/basic-pdf.component";

interface InvoiceDownloadButtonProps {
  invoice: IInvoice;
  colors: Colors;
}

interface LoadedPDFButtonProps {
  loading: boolean;
  onLoaded?: (x: boolean) => void;
}

// Component to style the PDFDownloadLink
const LoadedPDFButton: FunctionComponent<LoadedPDFButtonProps> = ({
  loading,
  onLoaded,
}) => {
  useEffect(() => {
    // trigger the onLoaded callback to indicate that the loading state has changed
    if (onLoaded !== undefined) {
      onLoaded(loading);
    }
  }, [loading, onLoaded]);

  return (
    <Button color="primary" variant="contained" disabled={loading}>
      Print PDF
    </Button>
  );
};

// Hidden Downloader is a hidden HTML element that will download the pdf as soon as it is
// loaded nd rendered. Implemented this way because react-pdf provides a download link
// component (PDFDownloadLink) which will load the document first and only download the pdf on click.
// There will be use cases where we want the download to occur as soon as the
// document has loaded successfully
const HiddenInvoiceDownloader: FunctionComponent<InvoiceDownloadButtonProps> = memo(({
  invoice,
  colors,
}) => {
  console.log("Download", invoice);
  const downloadLink = createRef<any>();
  const document = <BasicPDF invoice={invoice} colors={colors} />;

  const onLoaded = (isLoading: boolean) => {
    if (!isLoading) {
      // Timeout is required so the DOM can update. 
      // isLoading indicates whether react-pdf has finished processing the pdf
      setTimeout(() => {
        if (
          downloadLink.current !== null &&
          downloadLink.current !== undefined
        ) {
          downloadLink.current.firstChild.click();
        }
      }, 250);
    }
  };

  return (
    <div style={{ display: "none" }} ref={downloadLink}>
      <PDFDownloadLink
        className="pdf-download-link"
        document={document}
        fileName="invoice.pdf"
      >
        {({ loading }) => (
          <LoadedPDFButton loading={loading} onLoaded={onLoaded} />
        )}
      </PDFDownloadLink>
    </div>
  );
});

// Invoice download button. Will load 
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
export { HiddenInvoiceDownloader };
