import { Reducer } from "react";
import { IAlert, GENERIC_ACTION_TYPE, ALERT_ACTION_TYPE  } from "../types";

const alertsReducer: Reducer<IAlert[], any> = (
  state: IAlert[],
  action: any
) => {
  switch (action.type) {
    case ALERT_ACTION_TYPE.ADD_ALERT:
      return state.concat([{id: Date.now(), ...action.payload}]);
    case ALERT_ACTION_TYPE.DELETE_ALERT:
      return state.filter(x => x.id !==  action.payload);
    case ALERT_ACTION_TYPE.CLEAR_ALERTS: 
    case GENERIC_ACTION_TYPE.DELETE_ALL:
      return [];
    default:
      return state;
  }
};

export default alertsReducer;
