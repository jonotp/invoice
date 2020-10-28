import React, {
  createContext,
  PropsWithChildren,
  useReducer,
} from "react";
import alertsReducer from "../reducers/alerts.reducer";
import { IAlert } from "../types";

const AlertsContext = createContext<{
  alerts: IAlert[];
  alertsDispatch: React.Dispatch<any>;
}>({
  alerts: [],
  alertsDispatch: () => null,
});

const AlertsContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [alerts, alertsDispatch] = useReducer(alertsReducer, []);
  return (
    <AlertsContext.Provider value={{ alerts, alertsDispatch }}>
      {children}
    </AlertsContext.Provider>
  );
};

export { AlertsContext, AlertsContextProvider };
