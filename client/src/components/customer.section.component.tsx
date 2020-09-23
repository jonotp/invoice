import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { TextField } from "@material-ui/core";
import { IPersonel } from "../types";

interface CustomerSectionProps {
  state: IPersonel;
  setState: Dispatch<SetStateAction<IPersonel>>;
}

const CustomerSection: FunctionComponent<CustomerSectionProps> = ({
  state,
  setState,
}) => {
  const handleInputChange = (property: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    setState((prevState) => {
      return {
        ...prevState,
        [property]: event.target.value,
      };
    });
  };

  return (
    <section className="customer-section">
      <h1>Enter customer information</h1>
      <TextField
        id="customer-identity"
        label="ABN"
        name="identity"
        variant="outlined"
        margin="normal"
        value={state.identity || ""}
        onChange={handleInputChange("identity")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-name"
        label="Name"
        name="name"
        value={state.name || ""}
        onChange={handleInputChange("name")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-address"
        label="Address"
        name="address"
        value={state.address || ""}
        onChange={handleInputChange("address")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-city"
        label="City"
        name="city"
        value={state.city || ""}
        onChange={handleInputChange("city")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-state"
        label="State"
        name="state"
        value={state.state || ""}
        onChange={handleInputChange("state")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-zip"
        label="Zip Code / Postal Address"
        name="zip"
        value={state.zip || ""}
        onChange={handleInputChange("zip")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-country"
        label="Country"
        name="country"
        value={state.country || ""}
        onChange={handleInputChange("country")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-email"
        label="Email"
        name="email"
        value={state.email || ""}
        onChange={handleInputChange("email")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-phone"
        label="Phone"
        name="phone"
        value={state.phone || ""}
        onChange={handleInputChange("phone")}
      />
    </section>
  );
};

export default CustomerSection;
