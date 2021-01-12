
import React, {
  ChangeEvent,
  FunctionComponent,
  useState,
  useEffect,
} from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
} from "@material-ui/core";
import "./items-section.component.scss";

interface TaxRateDialogueProps {
  open: boolean;
  value: number | string;
  onClose(): void;
  onSubmit(num: number | string): void;
  error(num: number | string): boolean;
}

const TaxRateDialogue: FunctionComponent<TaxRateDialogueProps> = ({
  open,
  value,
  onClose,
  onSubmit,
  error,
}) => {
  const [input, setInput] = useState(value);
  const [isValid, setIsValid] = useState(!error(value));

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setIsValid(!error(inputValue));
    setInput(inputValue);
  };

  useEffect(() => {
    if (open && Number(input) !== value) {
      setIsValid(!error(value));
      setInput(value);
    }
  // eslint-disable-next-line
  }, [open]);

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(input);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>Please enter your tax rate</DialogContentText>
        <FormControl>
          <TextField
            variant="standard"
            margin="none"
            type="number"
            label="Tax Rate (%)"
            id={`tax`}
            error={!isValid}
            value={input}
            name={`tax`}
            size="small"
            helperText="Please enter a value between 0 - 100"
            onChange={handleInputChange}
          />
        </FormControl>
      </DialogContent>
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

export default TaxRateDialogue;