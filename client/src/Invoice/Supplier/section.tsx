import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  memo,
} from "react";
import { TextField } from "@material-ui/core";
import { IUser } from "../../types";
import { LogoUploader } from "../../LogoUploader/logo-uploader";
import { commonInputChange } from "../../Common/input-change";
import "./invoice-supplier-section.scss";

interface InvoiceSupplierSectionProps {
  supplier: IUser;
  onUpdateSupplier: Dispatch<SetStateAction<IUser>>;
}

const InvoiceSupplierSection: FunctionComponent<InvoiceSupplierSectionProps> = ({
  supplier,
  onUpdateSupplier,
}) => {
  const handleInputChange = commonInputChange(onUpdateSupplier);
  const handleLogoChange = (value: string) => {
    onUpdateSupplier((prevState) => {
      return {
        ...prevState,
        logo: value,
      };
    });
  };

  return (
    <section className="supplier-section">
      <h1>Enter your company information</h1>
      <TextField
        id="businessId"
        label="Business Identifier"
        name="businessId"
        variant="outlined"
        margin="none"
        style={{ gridArea: "businessId" }}
        value={supplier.businessId}
        onChange={handleInputChange}
      />
      <TextField
        id="supplier-name"
        label="Name"
        name="name"
        variant="outlined"
        margin="none"
        style={{ gridArea: "name" }}
        value={supplier.name}
        onChange={handleInputChange}
      />
      <TextField
        id="supplier-address"
        label="Address"
        name="address"
        variant="outlined"
        margin="none"
        style={{ gridArea: "address" }}
        value={supplier.address}
        placeholder="Street Address, City, State, Zipcode, Country"
        onChange={handleInputChange}
      />
      <TextField
        id="supplier-email"
        label="Email"
        name="email"
        variant="outlined"
        margin="none"
        style={{ gridArea: "email" }}
        value={supplier.email}
        onChange={handleInputChange}
      />
      <TextField
        id="supplier-phone"
        label="Phone"
        name="phone"
        variant="outlined"
        margin="none"
        style={{ gridArea: "phone" }}
        value={supplier.phone}
        onChange={handleInputChange}
      />
      <LogoUploader
        logo={supplier.logo}
        onUpdateLogo={handleLogoChange}
        style={{ gridArea: "logo" }}
      />
    </section>
  );
};

export default memo(InvoiceSupplierSection);
