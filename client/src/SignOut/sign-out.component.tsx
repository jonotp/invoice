import React, { useContext } from "react";
import FirebaseContext from "../Firebase/firebase.context";

const style = {
  width: "100%",
  height: "100%",
};

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);

  const handleClick = async () => {
    try {
      await firebase?.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <span style={style} onClick={handleClick}>
      Sign out
    </span>
  );
};

export default SignOutButton;
