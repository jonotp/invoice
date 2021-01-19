import React, { useContext } from "react";
import FirebaseContext from "../Firebase/firebase.context";

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);

  const handleClick = async () => {
    try {
      await firebase?.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return <span onClick={handleClick}>Sign out</span>;
};

export default SignOutButton;
