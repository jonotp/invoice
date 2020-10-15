import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  memo,
} from "react";
import { TextField } from "@material-ui/core";
import { IUser } from "../types";
import "../styles/components/supplier-section.component.scss";
import { LogoUploader } from "./logo-uploader.component";

interface SupplierSectionProps {
  supplier: IUser;
  onUpdateSupplier: Dispatch<SetStateAction<IUser>>;
}

const SupplierSection: FunctionComponent<SupplierSectionProps> = ({
  supplier,
  onUpdateSupplier,
}) => {
  const handleInputChange = (property: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    onUpdateSupplier((prevState) => {
      return {
        ...prevState,
        [property]: event.target.value,
      };
    });
  };

  const handleLogoChange = (value: string) => {
    onUpdateSupplier((prevState) => {
      return {
        ...prevState,
        logo: value
      }
    });
  }

  return (
    <section className="supplier-section">
      <h1>Enter your company information</h1>
      <TextField
        id="supplier-identity"
        label="Business Identifier"
        name="identity"
        variant="outlined"
        margin="none"
        style={{ gridArea: "businessId" }}
        value={supplier.businessId || ""}
        onChange={handleInputChange("identity")}
      />
      <TextField
        id="supplier-name"
        label="Name"
        name="name"
        variant="outlined"
        margin="none"
        style={{ gridArea: "name" }}
        value={supplier.name || ""}
        onChange={handleInputChange("name")}
      />
      <TextField
        id="supplier-address"
        label="Address"
        name="address"
        variant="outlined"
        margin="none"
        style={{ gridArea: "address" }}
        value={supplier.address || ""}
        onChange={handleInputChange("address")}
      />
      <TextField
        id="supplier-country"
        label="Country"
        name="country"
        variant="outlined"
        margin="none"
        style={{ gridArea: "country" }}
        value={supplier.country || ""}
        onChange={handleInputChange("country")}
      />
      <TextField
        id="supplier-city"
        label="City"
        name="city"
        variant="outlined"
        margin="none"
        style={{ gridArea: "city" }}
        value={supplier.city || ""}
        onChange={handleInputChange("city")}
      />
      <TextField
        id="supplier-state"
        label="State"
        name="state"
        variant="outlined"
        margin="none"
        style={{ gridArea: "state" }}
        value={supplier.state || ""}
        onChange={handleInputChange("state")}
      />
      <TextField
        id="supplier-zip"
        label="Zip Code"
        name="zip"
        variant="outlined"
        margin="none"
        style={{ gridArea: "zip" }}
        value={supplier.zip || ""}
        onChange={handleInputChange("zip")}
      />
      <TextField
        id="supplier-email"
        label="Email"
        name="email"
        variant="outlined"
        margin="none"
        style={{ gridArea: "email" }}
        value={supplier.email || ""}
        onChange={handleInputChange("email")}
      />
      <TextField
        id="supplier-phone"
        label="Phone"
        name="phone"
        variant="outlined"
        margin="none"
        style={{ gridArea: "phone" }}
        value={supplier.phone || ""}
        onChange={handleInputChange("phone")}
      />
      <LogoUploader
        logo={supplier.logo}
        onUpdateLogo={handleLogoChange}
        style={{ gridArea: "logo" }}
      />
    </section>
  );
};

export default memo(SupplierSection);
