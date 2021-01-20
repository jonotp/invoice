import React, { MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { CommonButtonProps } from "../Common/button.interface";
import * as ROUTES from "../routes";

const InvoiceButton = ({ label, className }: CommonButtonProps) => {
  const history = useHistory();

  const handleClick = async (event: MouseEvent<any>) => {
    event?.stopPropagation();
    console.count("Invoice");
    history.push(ROUTES.INVOICE_FORM);
  };
  return (
    <span className={className ? className : ""} onClick={handleClick}>
      {label ? label : "New Invoice"}
    </span>
  );
};

export default InvoiceButton;
