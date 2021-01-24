import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, } from "@material-ui/core";
import { ALERT_ACTION_TYPE, ALERT_TYPE, IUser, USER_ACTION_TYPE } from "../types";
import { commonInputChange } from "../Common/input-change";
import SignUpPasswordRequirements, { doesPasswordMatchRequirements } from "./password-requirements";
import SignUpPassword from "./password";
import FirebaseContext from "../Firebase/firebase.context";
import AppContext from "../App/app.context";
import AlertsContext from "../Alert/alerts.context";
import "./sign-up.scss";

interface SignUpPopupProps {
  open: boolean;
  onClose(): void;
  onSuccessfulSubmit(): void;
  getFile(): File | null;
  user: IUser | undefined;
}

const SignUpPopup = ({ open, onClose, onSuccessfulSubmit, getFile, user, }: SignUpPopupProps) => {
  const firebase = useContext(FirebaseContext);
  const { dispatch } = useContext(AppContext);
  const { alertsDispatch } = useContext(AlertsContext);
  const [account, setAccount] = useState({ email: user?.email ?? "", password: "" });
  const [hasError, sethasError] = useState(false);

  const isInvalidEmail = account.email.trim().match(/[\w-.]+@[\w-.]+\.\w+/) === null;
  const isInvalidPassword = !doesPasswordMatchRequirements(account.password);
  const handleChange = commonInputChange(setAccount);
  console.log(user);
  console.log(account);

  useEffect(() => {
    setAccount(prev => {
      return {
        ...prev,
        email: user?.email ?? ""
      }
    });
  }, [user?.email])

  const handleSubmit = async () => {
    try {
      if (user === undefined) throw new Error("Error with user details");
      if (isInvalidEmail || isInvalidPassword) throw new Error("Error in input fields");
      const createdUser = await firebase?.signUp({ ...user, email: account.email }, account.password, getFile());

      dispatch({
        type: USER_ACTION_TYPE.SAVE_USER_DETAILS,
        payload: createdUser,
      })

      onSuccessfulSubmit();
    }
    catch (error) {
      sethasError(true);
      alertsDispatch({
        type: ALERT_ACTION_TYPE.ADD_ALERT,
        payload: {
          message:
            error.code && error.code === "auth/email-already-in-use"
              ? "Email already in use"
              : (isInvalidEmail || isInvalidPassword)
                ? "Bad account details. Please try again"
                : "Unable to create user",
          type: ALERT_TYPE.ERROR,
        },
      });
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Unlock more with an account</DialogTitle>
      <DialogContent className="sign-up-popup-content">
        <p>Save your business details by creating an account now!</p>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="none"
          value={account.email}
          onChange={handleChange}
          error={
            hasError && isInvalidEmail
          }
          fullWidth
          required
        />
        <SignUpPassword password={account.password} onChange={handleChange} hasError={hasError} isInvalidPassword={isInvalidPassword} />
        <SignUpPasswordRequirements password={account.password} hasError={hasError} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="text" onClick={onClose}>
          No Thank you
    </Button>
        <Button color="primary" variant="text" onClick={handleSubmit}>
          Sign Up
    </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignUpPopup