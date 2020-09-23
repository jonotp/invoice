import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  createRef,
} from "react";
import { TextField } from "@material-ui/core";
import { IPersonel } from "../types";

interface SupplierSectionProps {
  supplierState: IPersonel;
  setSupplierState: Dispatch<SetStateAction<IPersonel>>;
  logoState: string;
  setLogoState: Dispatch<SetStateAction<string>>;
}

const SupplierSection: FunctionComponent<SupplierSectionProps> = ({
  supplierState,
  setSupplierState,
  logoState,
  setLogoState,
}) => {
  const logoInput = createRef<HTMLInputElement>();
  const handleInputChange = (property: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    setSupplierState((prevState) => {
      return {
        ...prevState,
        [property]: event.target.value,
      };
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Need to consider change events users cancel the upload
    const files = event.target.files;
    if (files !== undefined && files !== null && files.length > 0) {
      setLogoState(URL.createObjectURL(files[0]));
    }
  };

  const onChangeLogo = () => {
    const input = logoInput.current;
    if (input !== undefined && input !== null) {
      input.click();
    }
  };

  return (
    <section className="supplier-section">
      <h1>Enter your company information</h1>
      <TextField
        id="supplier-identity"
        label="ABN"
        name="identity"
        variant="outlined"
        margin="normal"
        value={supplierState.identity || ""}
        onChange={handleInputChange("identity")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="supplier-name"
        label="Name"
        name="name"
        value={supplierState.name || ""}
        onChange={handleInputChange("name")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="supplier-address"
        label="Address"
        name="address"
        value={supplierState.address || ""}
        onChange={handleInputChange("address")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="supplier-city"
        label="City"
        name="city"
        value={supplierState.city || ""}
        onChange={handleInputChange("city")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="supplier-state"
        label="State"
        name="state"
        value={supplierState.state || ""}
        onChange={handleInputChange("state")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="supplier-zip"
        label="Zip Code / Postal Address"
        name="zip"
        value={supplierState.zip || ""}
        onChange={handleInputChange("zip")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="supplier-country"
        label="Country"
        name="country"
        value={supplierState.country || ""}
        onChange={handleInputChange("country")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="supplier-email"
        label="Email"
        name="email"
        value={supplierState.email || ""}
        onChange={handleInputChange("email")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="supplier-phone"
        label="Phone"
        name="phone"
        value={supplierState.phone || ""}
        onChange={handleInputChange("phone")}
      />
      <div>
        <img
          className="logo-img"
          onClick={onChangeLogo}
          src={logoState}
          alt={`Invoice logo`}
        />
        <input
          className="logo-uploader"
          ref={logoInput}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </section>
  );
};

export default SupplierSection;
