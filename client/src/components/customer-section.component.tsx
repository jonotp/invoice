import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { TextField } from "@material-ui/core";
import { IPersonel } from "../types";
import "../styles/components/customer-section.component.scss";

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
        margin="none"
        style={{ gridArea: "abn" }}
        value={customer.identity || ""}
        onChange={handleInputChange("identity")}
      />
      <TextField
        id="customer-name"
        label="Name"
        name="name"
        variant="outlined"
        margin="none"
        style={{ gridArea: "name" }}
        value={customer.name || ""}
        onChange={handleInputChange("name")}
      />
      <TextField
        id="customer-address"
        label="Address"
        name="address"
        variant="outlined"
        margin="none"
        style={{ gridArea: "address" }}
        value={customer.address || ""}
        onChange={handleInputChange("address")}
      />
      <TextField
        id="customer-city"
        label="City"
        name="city"
        variant="outlined"
        margin="none"
        style={{ gridArea: "city" }}
        value={customer.city || ""}
        onChange={handleInputChange("city")}
      />
      <TextField
        id="customer-state"
        label="State"
        name="state"
        variant="outlined"
        margin="none"
        style={{ gridArea: "state" }}
        value={customer.state || ""}
        onChange={handleInputChange("state")}
      />
      <TextField
        id="customer-zip"
        label="Zip Code"
        name="zip"
        variant="outlined"
        margin="none"
        style={{ gridArea: "zip" }}
        value={customer.zip || ""}
        onChange={handleInputChange("zip")}
      />
      <TextField
        id="customer-country"
        label="Country"
        name="country"
        variant="outlined"
        margin="none"
        style={{ gridArea: "country" }}
        value={customer.country || ""}
        onChange={handleInputChange("country")}
      />
      {/* For now we do not need contact information for the customer */}
      {/* <TextField
        variant="outlined"
        margin="none"
        id="customer-email"
        label="Email"
        name="email"
        value={customer.email || ""}
        onChange={handleInputChange("email")}
      />
      <TextField
        variant="outlined"
        margin="none"
        id="customer-phone"
        label="Phone"
        name="phone"
        value={customer.phone || ""}
        onChange={handleInputChange("phone")}
      /> */}
    </section>
  );
};

export default CustomerSection;
