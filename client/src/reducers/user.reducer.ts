import { Reducer } from "react";
import { GENERIC_ACTION_TYPE, USER_ACTION_TYPE } from "../constants";
import { IUser } from "../types";

const userReducer: Reducer<IUser | null, any> = (
  state: IUser | null,
  action: any
) => {
  switch (action.type) {
    case USER_ACTION_TYPE.SAVE_USER_DETAILS:
      return {
        ...action.payload,
      };
    case USER_ACTION_TYPE.UPDATE_USER_DETAILS:
      return {
        ...action.payload,
      };
    case USER_ACTION_TYPE.DELETE_USER_DETAILS:
      return null;
    case GENERIC_ACTION_TYPE.DELETE_ALL:
      return null;
    default:
      return state;
  }
};

export default userReducer;
