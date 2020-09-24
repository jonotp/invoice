import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  createRef,
} from "react";
import { TextField } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { IPersonel } from "../types";
import "../styles/components/supplier-section.component.scss";

interface SupplierSectionProps {
  supplier: IPersonel;
  onUpdateSupplier: Dispatch<SetStateAction<IPersonel>>;
  logo: string;
  onUpdateLogo: Dispatch<SetStateAction<string>>;
}

const SupplierSection: FunctionComponent<SupplierSectionProps> = ({
  supplier,
  onUpdateSupplier,
  logo,
  onUpdateLogo,
}) => {
  const logoInput = createRef<HTMLInputElement>();
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Need to consider change events users cancel the upload
    const files = event.target.files;
    if (files !== undefined && files !== null && files.length > 0) {
      onUpdateLogo(URL.createObjectURL(files[0]));
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
        margin="none"
        style={{ gridArea: "abn" }}
        value={supplier.identity || ""}
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
      <div
        className="logo-section"
        onClick={onChangeLogo}
        style={{ gridArea: "logo" }}
      >
        {logo.trim().length > 0 ? (
          <div className="logo-container">
            <img className="logo-img" src={logo} alt={`Invoice logo`} />
            <span>Click to change logo</span>
          </div>
        ) : (
          <div className="logo-container">
            <ImageIcon />
            <span>Click to add logo</span>
          </div>
        )}
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
