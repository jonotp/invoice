import React, { createContext } from "react";
import { IAlert } from "../types";

const AlertsContext = createContext<{
  alerts: IAlert[];
  alertsDispatch: React.Dispatch<any>;
}>({
  alerts: [],
  alertsDispatch: () => null,
});

export default AlertsContext;
