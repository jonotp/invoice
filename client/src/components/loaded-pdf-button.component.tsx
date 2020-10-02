import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { FunctionComponent } from "react";

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

export default LoadedPDFButton;