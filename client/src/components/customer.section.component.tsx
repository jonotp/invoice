import React, { useContext, FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { InvoiceContext, IPersonel } from "../contexts/invoice.context";

const CustomerSection: FunctionComponent = (props: any) => {
  const { customer, setInvoiceProperty } = useContext(InvoiceContext);
  const { register, handleSubmit } = useForm<IPersonel>({
    defaultValues: customer,
  });
  useEffect(() => {
    console.count("CUSTOMER THE ONE TIME");
  }, []);

  const onSubmit = (data: IPersonel) => {
    setInvoiceProperty("customer", data);
  };

  return (
    <section className="customer-section">
      <h1>Enter customer information</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="customer-identity"
          label="ABN"
          name="identity"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="customer-name"
          label="Customer Name"
          name="name"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="customer-address"
          label="Address"
          name="address"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="customer-city"
          label="City"
          name="city"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="customer-state"
          label="State"
          name="state"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="customer-zip"
          label="Zip Code / Postal Address"
          name="zip"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="customer-country"
          label="Country"
          name="country"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="customer-email"
          label="Email"
          name="email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="customer-phone"
          label="Phone"
          name="phone"
        />
      </form>
    </section>
  );
};

export default CustomerSection;
