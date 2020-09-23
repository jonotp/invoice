import React, { useContext, FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { InvoiceContext } from "../contexts/invoice.context";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface PaymentDetails {
  invoiceNo: string;
  issueDate: Date;
  paymentTerm: string;
  dueDate: Date;
}

const defaultDate = new Date();

const PaymentSection: FunctionComponent = () => {
  const {
    invoiceNo,
    issueDate,
    paymentTerm,
    dueDate,
    setInvoicePropertyViaSpread,
  } = useContext(InvoiceContext);

  const onSubmit = (data: PaymentDetails) => {
    console.log(data);
    setInvoicePropertyViaSpread(data);
  };

  const { register, handleSubmit, setValue, watch } = useForm<PaymentDetails>({
    defaultValues: {
      invoiceNo: invoiceNo,
      issueDate: issueDate,
      paymentTerm: paymentTerm,
      dueDate: dueDate,
    },
  });

  useEffect(() => {
    register({ name: "issueDate", type: "text" });
    register({ name: "dueDate", type: "text" });
  }, [register]);

  const handleDateChange = (property: string) => (
    date: MaterialUiPickersDate
  ) => {
    // handleSubmit((data)=>console.log(data))();
    setValue(property, date);
  };

  const watchIssueDate = watch("issueDate");
  const watchDueDate = watch("dueDate");

  return (
    <section className="payment-section">
      <h1>Enter payment details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="invoiceNo"
          name="invoiceNo"
          label="Invoice No"
          variant="outlined"
          margin="normal"
          inputRef={register}
        />
        <KeyboardDatePicker
          id="issueDate"
          name="issueDate"
          label="Issue Date"
          margin="normal"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          disablePast
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          value={watchIssueDate || defaultDate}
          onChange={handleDateChange("issueDate")}
        />
        <TextField
          id="paymentTerm"
          name="paymentTerm"
          label="Payment Term"
          variant="outlined"
          margin="normal"
          inputRef={register}
        />
        <KeyboardDatePicker
          margin="normal"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          id="dueDate"
          name="dueDate"
          label="Due Date"
          disablePast
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          value={watchDueDate || defaultDate}
          onChange={handleDateChange("dueDate")}
        />
      </form>
    </section>
  );
};

export default PaymentSection;
