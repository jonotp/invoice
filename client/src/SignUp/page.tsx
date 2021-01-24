import React, { FormEvent, useState, useContext } from "react";
import { Button, TextField, } from "@material-ui/core";
import {
  ALERT_ACTION_TYPE,
  ALERT_TYPE,
  DefaultUser,
  USER_ACTION_TYPE,
} from "../types";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../Firebase/firebase.context";
import AppContext from "../App/app.context";
import AlertsContext from "../Alert/alerts.context";
import { commonInputChange } from "../Common/input-change";
import * as ROUTES from "../routes";
import SignUpPasswordRequirements, { doesPasswordMatchRequirements } from "./password-requirements";
import SignUpPassword from "./password";
import SignInButton from "../SignIn/button";
import "./sign-up.scss";

function SignUpPage() {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const { dispatch } = useContext(AppContext);
  const { alertsDispatch } = useContext(AlertsContext);

  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = commonInputChange(setUser);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault()
      if (hasErrors()) {
        throw new Error("Error in input fields");
      }

      const createdUser = await firebase?.signUp(
        {
          ...DefaultUser,
          name: user.name,
          email: user.email,
        },
        user.password,
        null
      );

      dispatch({
        type: USER_ACTION_TYPE.SAVE_USER_DETAILS,
        payload: createdUser,
      });

      history.push(ROUTES.HOME);
    } catch (error) {
      setHasError(true);
      alertsDispatch({
        type: ALERT_ACTION_TYPE.ADD_ALERT,
        payload: {
          message:
            error.code && error.code === "auth/email-already-in-use"
              ? "Email already in use"
              : "Bad account details. Please try again.",
          type: ALERT_TYPE.ERROR,
        },
      });
    }
  };

  const hasErrors = () => {
    return (
      user.name.trim().length === 0 ||
      user.email.trim().match(/\w+@\w+\.\w+/) === null ||
      isInvalidPassword
    );
  };

  const isInvalidPassword = !doesPasswordMatchRequirements(user.password);

  return (
    <div className="sign-up-page">
      <div className="form-container">
        <form noValidate={true} onSubmit={handleSubmit} autoComplete="off">
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            margin="none"
            value={user.name}
            onChange={handleChange}
            error={hasError && user.name.trim().length === 0}
            required
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="none"
            value={user.email}
            onChange={handleChange}
            error={
              hasError && user.email.trim().match(/\w+@\w+\.\w+/) === null
            }
            required
            helperText=""
          />
          <SignUpPassword password={user.password} onChange={handleChange} hasError={hasError} isInvalidPassword={isInvalidPassword} />
          <div>
            <SignUpPasswordRequirements
              password={user.password}
              hasError={hasError}
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
        <div className="sign-up-footer">
          <div>
            Have an account?
            <span className="link">
              <SignInButton />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
