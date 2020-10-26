import { Button, Paper, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import { FirebaseContext } from "../contexts/firebase.context";
import { AppContext } from "../contexts/app.context";
import { USER_ACTION_TYPE } from "../constants";
import * as ROUTES from "../routes";
import "../styles/containers/sign-in-page.container.scss";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const { dispatch } = useContext(AppContext);

  const onSubmit = async () => {
    try {
      const user = await firebase?.signIn(email, password);
      dispatch({ type: USER_ACTION_TYPE.SAVE_USER_DETAILS, payload: user });
      history.push(ROUTES.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={signInPageTestIds.page} data-testid="sign-in-page">
      <Paper elevation={2} className="paper">
        <section className="sign-in-form">
          <h2 style={{ gridArea: "account-header" }}>Sign in</h2>
          <TextField
            id="email"
            label="Email"
            name="email"
            data-testid={signInPageTestIds.email}
            variant="outlined"
            margin="none"
            style={{ gridArea: "email" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            data-testid={signInPageTestIds.password}
            type="password"
            variant="outlined"
            margin="none"
            style={{ gridArea: "password" }}
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div style={{ gridArea: "sign-in-button", textAlign:"center" }}>
            <Button color="primary" variant="contained" data-testid={signInPageTestIds.submitButton} type="submit" onClick={onSubmit}>
              Sign In
            </Button>
          </div>
        </section>
      </Paper>
    </section>
  );
};

const signInPageTestIds = {
  page: "sign-in-page",
  email: "email",
  password: "password",
  submitButton: "subtmit-button"
}

export default SignInPage;
export { signInPageTestIds }
