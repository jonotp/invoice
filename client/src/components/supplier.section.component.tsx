import React, { useContext, FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { InvoiceContext, IPersonel } from "../contexts/invoice.context";

const SupplierSection: FunctionComponent = (props: any) => {
  const { supplier, setInvoiceProperty } = useContext(InvoiceContext);
  const { register, handleSubmit } = useForm<IPersonel>({
    defaultValues: supplier,
  });

  const onSubmit = (data: IPersonel) => {
    setInvoiceProperty("supplier", data);
  };

  return (
    <section className="supplier-section">
      <h1>Enter your company information</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="supplier-identity"
          label="ABN"
          name="identity"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="supplier-name"
          label="Name"
          name="name"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="supplier-address"
          label="Address"
          name="address"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="supplier-city"
          label="City"
          name="city"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="supplier-state"
          label="State"
          name="state"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="supplier-zip"
          label="Zip Code / Postal Address"
          name="zip"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="supplier-country"
          label="Country"
          name="country"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="supplier-email"
          label="Email"
          name="email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="supplier-phone"
          label="Phone"
          name="phone"
        />
      </form>
    </section>
  );
};

export default SupplierSection;
