import React, { useContext, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../Firebase/firebase.context";
import AppContext from "../App/app.context";
import { ALERT_ACTION_TYPE, ALERT_TYPE, USER_ACTION_TYPE } from "../types";
import AlertsContext from "../Alert/alerts.context";
import * as ROUTES from "../routes";
import { commonInputChange } from "../Common/input-change";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import SignUpButton from "../SignUp/button";
import "./sign-in.scss";

const SignInPage = () => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [hasError, setHasError] = useState(false);
  const handleChange = commonInputChange(setUser);

  const { alertsDispatch } = useContext(AlertsContext);
  const { dispatch } = useContext(AppContext);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const data = await firebase?.signIn(user.email, user.password);
      dispatch({ type: USER_ACTION_TYPE.SAVE_USER_DETAILS, payload: data });
      history.push(ROUTES.HOME);
    } catch (error) {
      setHasError(true);
      alertsDispatch({
        type: ALERT_ACTION_TYPE.ADD_ALERT,
        payload: {
          message: "Bad credentials. Please login again.",
          type: ALERT_TYPE.ERROR,
        },
      });
    }
  };

  return (
    <section className="sign-in-page">
      <div className="form-container">
        <form noValidate onSubmit={handleSubmit}>
          <FormControl
            className={`text-input ${hasError ? "error" : ""}`}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              className={`text-input ${hasError ? "error" : ""}`}
              id="email"
              name="email"
              label="Email"
              value={user.email}
              onChange={handleChange}
              required
              error={hasError}
              margin="none"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            className={`text-input ${hasError ? "error" : ""}`}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={handleChange}
              required
              error={hasError}
              margin="none"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </form>
        <div className="sign-in-footer">
          <div>
            Don't have an account?
            <span className="link">
              <SignUpButton />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
