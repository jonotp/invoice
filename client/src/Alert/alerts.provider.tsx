import React, { PropsWithChildren, useReducer } from "react";
import alertsReducer from "./alerts.reducer";
import AlertsContext from "./alerts.context";

const AlertsProvider = ({ children }: PropsWithChildren<any>) => {
  const [alerts, alertsDispatch] = useReducer(alertsReducer, []);
  return (
    <AlertsContext.Provider value={{ alerts, alertsDispatch }}>
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
