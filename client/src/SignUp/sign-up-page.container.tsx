import { Button, Paper, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { ChangeEvent, useContext, useState } from "react";
import { LogoUploader, getFile } from "../LogoUploader/logo-uploader.component";
import { ALERT_ACTION_TYPE, ALERT_TYPE, DefaultUser, IUser } from "../types";
import FirebaseContext from "../Firebase/firebase.context";
import { AppContext } from "../App/app.context";
import { USER_ACTION_TYPE } from "../types";
import * as ROUTES from "../routes";
import { AlertsContext } from "../Alert/alerts.context";
import "./sign-up-page.container.scss";

const SignUpPage = () => {
  const [hasErrors, setHasErrors] = useState(false);
  const [user, setUser] = useState<IUser>(DefaultUser);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const { dispatch } = useContext(AppContext);
  const { alertsDispatch } = useContext(AlertsContext);

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

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const file = getFile();
      const createdUser = await firebase?.signUp(user, password, file);
      dispatch({
        type: USER_ACTION_TYPE.SAVE_USER_DETAILS,
        payload: createdUser,
      });
      history.push(ROUTES.HOME);
    } catch (error) {
      setHasErrors(true);
      alertsDispatch({
        type: ALERT_ACTION_TYPE.ADD_ALERT,
        payload: {
          message:
            error.code === "auth/email-alread-in-use"
              ? "Email already in use"
              : "Bad account details. Please try again.",
          type: ALERT_TYPE.ERROR,
        },
      });
    }
  };

  const isValidName = user.name.match(/^[a-zA-Z -]+$/);
  const isValidEmail = user.email.match(/^[\w_.+-]+@[\w-]+\.[\w.]+$/) !== null;
  const isValidPassword =
    password.match(/^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/) !== null;
  const confirmPasswordError =
    (hasErrors && !isValidPassword) ||
    ((hasErrors || passwordConfirmation.length) > 0 &&
      password !== passwordConfirmation);

  const helperText = {
    name:
      hasErrors && !isValidName
        ? "Enter your full name"
        : "We will need your first and last name",
    email:
      hasErrors && !isValidEmail
        ? "Enter a valid email"
        : "We'll use this when you log in",
    password:
      "Your password must be 6 - 20 characters \nYou password must have at least one digit",
    businessId: "Your business identifier given to you by your government",
    phone: "Your contact number with your region code",
  };

  return (
    <section className="sign-up-page">
      <Paper elevation={2} className="paper">
        <h1>Sign Up</h1>
        <form
          className="sign-up-form"
          onSubmit={onSubmit}
          noValidate={true}
          autoComplete="off"
        >
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
            error={hasErrors && !isValidName}
            helperText={helperText.name}
            required
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="none"
            style={{ gridArea: "email" }}
            value={user.email || ""}
            error={hasErrors && !isValidEmail}
            helperText={helperText.email}
            onChange={handleInputChange("email")}
            required
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            variant="outlined"
            margin="none"
            style={{ gridArea: "password" }}
            value={password || ""}
            error={hasErrors && !isValidPassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            id="password-confirmation"
            label="Password Confirmation"
            placeholder="Password Confirmation"
            name="password-confirmation"
            type="password"
            variant="outlined"
            margin="none"
            style={{ gridArea: "password-confirmation" }}
            error={confirmPasswordError}
            helperText={helperText.password}
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
            helperText={helperText.businessId}
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
            helperText={helperText.phone}
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
            <Button color="primary" variant="contained" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </Paper>
    </section>
  );
};

export default SignUpPage;
