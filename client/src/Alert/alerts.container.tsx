import React, { useContext } from "react";
import { ALERT_ACTION_TYPE } from "../types";
import { AlertsContext } from "./alerts.context";
import AlertCard, {alertCardTestIds} from "./alert-card.component";
import "./alerts.container.scss";

const Alerts = () => {
  const { alerts, alertsDispatch } = useContext(AlertsContext);

  const handleClick = (id: string) => {
    alertsDispatch({
      type: ALERT_ACTION_TYPE.DELETE_ALERT,
      payload: id,
    });
  };

  return (
    <div className="alerts-section">
      <div className="alerts-container">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} onClose={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
export { alertCardTestIds };
