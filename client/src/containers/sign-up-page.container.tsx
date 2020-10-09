import { Button, Paper, TextField } from "@material-ui/core";
import React, { ChangeEvent, useContext, useState } from "react";
import LogoUploader from "../components/logo-uploader.component";
import { DefaultUser, IUser } from "../types";
import "../styles/containers/sign-up-page.container.scss";

const SignUpPage = () => {
  const [user, setUser] = useState<IUser>(DefaultUser);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleInputChange = (property: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    setUser((prevState) => {
      return {
        ...prevState,
        [property]: event.target.value,
      };
    });
  };

  const handleLogoChange = (value: string) => {
    setUser((prevState) => {
      return {
        ...prevState,
        logo: value,
      };
    });
  };

  const onSubmit = async () => {
    try {
      console.log("Sign up the user now");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sign-up-page">
      <Paper elevation={2} className="paper">
        <section className="sign-up-form">
          <h2 style={{ gridArea: "account-header" }}>Account</h2>
          <TextField
            id="name"
            label="Name"
            name="name"
            variant="outlined"
            margin="none"
            style={{ gridArea: "name" }}
            value={user.name || ""}
            onChange={handleInputChange("name")}
            required
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            margin="none"
            style={{ gridArea: "email" }}
            value={user.email || ""}
            onChange={handleInputChange("email")}
            required
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="none"
            style={{ gridArea: "password" }}
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            id="password-confirmation"
            label="Password Confirmation"
            name="password-confirmation"
            type="password"
            variant="outlined"
            margin="none"
            style={{ gridArea: "password-confirmation" }}
            error={
              passwordConfirmation.length > 0 &&
              password !== passwordConfirmation
            }
            value={passwordConfirmation || ""}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <h2 style={{ gridArea: "additional-details-header" }}>
            Additional details
          </h2>
          <TextField
            id="business-identity"
            label="Business Identifier"
            name="identity"
            variant="outlined"
            margin="none"
            style={{ gridArea: "business-id" }}
            value={user.businessId || ""}
            onChange={handleInputChange("businessId")}
          />
          <TextField
            id="phone"
            label="Phone"
            name="phone"
            variant="outlined"
            margin="none"
            style={{ gridArea: "phone" }}
            value={user.phone || ""}
            onChange={handleInputChange("phone")}
          />
          <TextField
            id="address"
            label="Address"
            name="address"
            variant="outlined"
            margin="none"
            style={{ gridArea: "address" }}
            value={user.address || ""}
            onChange={handleInputChange("address")}
          />
          <TextField
            id="city"
            label="City"
            name="city"
            variant="outlined"
            margin="none"
            style={{ gridArea: "city" }}
            value={user.city || ""}
            onChange={handleInputChange("city")}
          />
          <TextField
            id="state"
            label="State"
            name="state"
            variant="outlined"
            margin="none"
            style={{ gridArea: "state" }}
            value={user.state || ""}
            onChange={handleInputChange("state")}
          />
          <TextField
            id="zip"
            label="Zip Code"
            name="zip"
            variant="outlined"
            margin="none"
            style={{ gridArea: "zip" }}
            value={user.zip || ""}
            onChange={handleInputChange("zip")}
          />
          <TextField
            id="country"
            label="Country"
            name="country"
            variant="outlined"
            margin="none"
            style={{ gridArea: "country" }}
            value={user.country || ""}
            onChange={handleInputChange("country")}
          />
          <LogoUploader
            logo={user.logo || ""}
            onUpdateLogo={handleLogoChange}
            style={{ gridArea: "logo" }}
          />
          <div style={{ gridArea: "sign-up-button" }}>
            <Button color="primary" variant="contained" onClick={onSubmit}>
              Sign up
            </Button>
          </div>
        </section>
      </Paper>
    </section>
  );
};

export default SignUpPage;
