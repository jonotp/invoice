import { Button, Paper, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import FirebaseContext from "../Firebase/firebase.context";
import { AppContext } from "../App/app.context";
import { ALERT_ACTION_TYPE, ALERT_TYPE, USER_ACTION_TYPE } from "../types";
import * as ROUTES from "../routes";
import { AlertsContext } from "../Alert/alerts.context";
import "./sign-in-page.container.scss";

const SignInPage = () => {
  const [hasErrors, setHasErrors] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const { alertsDispatch } = useContext(AlertsContext);
  const { dispatch } = useContext(AppContext);

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const user = await firebase?.signIn(email, password);
      dispatch({ type: USER_ACTION_TYPE.SAVE_USER_DETAILS, payload: user });
      history.push(ROUTES.HOME);
    } catch (error) {
      setHasErrors(true);
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
      <Paper elevation={2} className="paper">
        <form
          className="sign-in-form"
          onSubmit={onSubmit}
          noValidate={true}
          autoComplete="off"
        >
          <h1 style={{ gridArea: "account-header" }}>Sign in</h1>
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="none"
            style={{ gridArea: "email" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={hasErrors}
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
            error={hasErrors}
            required
          />
          <div style={{ gridArea: "sign-in-button", textAlign: "center" }}>
            <Button color="primary" variant="contained" type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </Paper>
    </section>
  );
};

export default SignInPage;
