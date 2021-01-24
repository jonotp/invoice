import React, { PropsWithChildren } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

interface DialogProps {
  open: boolean;
  onClose(): void;
  onSubmit(): void;
}

const CustomDialog = ({
  open,
  onClose,
  onSubmit,
  children,
}: PropsWithChildren<DialogProps>) => {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{children}</DialogTitle>
      <DialogActions>
        <Button color="primary" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="text" onClick={handleSubmit}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
