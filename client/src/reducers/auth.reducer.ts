import { Reducer } from "react";
import { AUTH_ACTION_TYPE, GENERIC_ACTION_TYPE } from "../constants";

const authReducer: Reducer<firebase.User | boolean | null, any> = (
  state: firebase.User | boolean | null,
  action: any
) => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.SAVE_AUTH_SESSION:
      return {
        ...action.payload,
      };
    case AUTH_ACTION_TYPE.DELETE_AUTH_SESSION:
      return null;
    case GENERIC_ACTION_TYPE.DELETE_ALL:
      return null;
    default:
      return state;
  }
};

export default authReducer;
