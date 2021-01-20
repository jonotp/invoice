import React, { createRef } from "react";
import { Button } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core";

const UIMaterialButton = (props: ButtonProps) => {
  const buttonEl = createRef<any>();
  const handleClick = () => {
    buttonEl.current.firstChild.click();
  };

  return (
    <Button {...props} color="primary" onClick={handleClick}>
      <span ref={buttonEl}>{props.children}</span>
    </Button>
  );
};

export default UIMaterialButton;
