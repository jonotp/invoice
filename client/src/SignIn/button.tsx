import React, { MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { CommonButtonProps } from "../Common/button.interface";
import * as ROUTES from "../routes";

const SignInButton = ({ label, className }: CommonButtonProps) => {
  const history = useHistory();

  const handleClick = async (event: MouseEvent<any>) => {
    event?.stopPropagation();
    console.count("Signed In");
    history.push(ROUTES.SIGN_IN);
  };
  return (
    <span className={className ? className : ""} onClick={handleClick}>
      {label ? label : "Sign In"}
    </span>
  );
};

export default SignInButton;
