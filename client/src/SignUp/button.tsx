import React, { MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { CommonButtonProps } from "../Common/button.interface";
import * as ROUTES from "../routes";

const SignUpButton = ({ label, className }: CommonButtonProps) => {
  const history = useHistory();

  const handleClick = async (event: MouseEvent<any>) => {
    event?.stopPropagation();
    history.push(ROUTES.SIGN_UP);
  };
  return (
    <span className={className ? className : ""} onClick={handleClick}>
      {label ? label : "Sign Up"}
    </span>
  );
};

export default SignUpButton;
