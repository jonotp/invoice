import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../Firebase/firebase.context";
import * as ROUTES from "../routes";

const SignOutButton = () => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const handleClick = async () => {
    try {
      await firebase?.signOut();
      history.push(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };
  return <span onClick={handleClick}>Sign out</span>;
};

export default SignOutButton;
