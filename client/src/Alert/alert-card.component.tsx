import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { IAlert } from "../types";
import { capitalizeFirstLetter } from "../constants";
import "./alert-card.component.scss";

interface IAlertItem {
  alert: IAlert;
  onClose: (id: string) => void;
}

const AlertCard = ({ alert, onClose }: IAlertItem) => {
  const [isMounted, setIsMounted] = useState(false);
  const [show, setShow] = useState(false);
  const title = capitalizeFirstLetter(alert.title ?? alert.type);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(alert.id), 600);
  };

  useEffect(() => {
    // Need to wait for the Alert component to render before assigning the show class
    // or the paint could miss the transition on render of the Alert component
    if (isMounted) {
      setShow(true);
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  return (
    <div
      data-testid={`${alertCardTestIds.component}-${alert.id}`}
      className={`alert-card ${show ? "show" : ""}`}
    >
      <Alert
        data-testid={`${alertCardTestIds.type}-${alert.type}-${alert.id}`}
        severity={alert.type}
        onClose={handleClose}
      >
        <AlertTitle>
          <strong role="heading" aria-level={2} data-testid={`${alertCardTestIds.title}-${alert.id}`}>
            {title}
          </strong>
        </AlertTitle>
        <div data-testid={`${alertCardTestIds.message}-${alert.id}`}>
          {alert.message}
        </div>
      </Alert>
    </div>
  );
};

const alertCardTestIds = {
  component: "alert-card-component",
  title: "alert-card-title",
  message: "alert-card-message",
  type: "alert-card-type",
};

export default AlertCard;
export { alertCardTestIds };
