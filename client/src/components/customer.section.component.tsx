import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { TextField } from "@material-ui/core";
import { IPersonel } from "../types";

interface CustomerSectionProps {
  customer: IPersonel;
  onCustomerUpdate: Dispatch<SetStateAction<IPersonel>>;
}

const CustomerSection: FunctionComponent<CustomerSectionProps> = ({
  customer,
  onCustomerUpdate,
}) => {
  const handleInputChange = (property: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    onCustomerUpdate((prevState) => {
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
        value={customer.identity || ""}
        onChange={handleInputChange("identity")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-name"
        label="Name"
        name="name"
        value={customer.name || ""}
        onChange={handleInputChange("name")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-address"
        label="Address"
        name="address"
        value={customer.address || ""}
        onChange={handleInputChange("address")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-city"
        label="City"
        name="city"
        value={customer.city || ""}
        onChange={handleInputChange("city")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-customer"
        label="customer"
        name="customer"
        value={customer.state || ""}
        onChange={handleInputChange("state")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-zip"
        label="Zip Code / Postal Address"
        name="zip"
        value={customer.zip || ""}
        onChange={handleInputChange("zip")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-country"
        label="Country"
        name="country"
        value={customer.country || ""}
        onChange={handleInputChange("country")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-email"
        label="Email"
        name="email"
        value={customer.email || ""}
        onChange={handleInputChange("email")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="customer-phone"
        label="Phone"
        name="phone"
        value={customer.phone || ""}
        onChange={handleInputChange("phone")}
      />
    </section>
  );
};

export default CustomerSection;
