import { Reducer } from "react";
import { USER_ACTION_TYPE } from "../constants";
import { IUser } from "../types";

const userReducer: Reducer<IUser | null, any> = (
  state: IUser | null,
  action: any
) => {
  switch (action.type) {
    case USER_ACTION_TYPE.SAVE_USER_SESSION:
      return {
        ...action.payload,
      };
    case USER_ACTION_TYPE.UPDATE_USER_SESSION:
      return {
        ...action.payload,
      };
    case USER_ACTION_TYPE.DELETE_USER_SESSION:
      return null;
    default:
      throw new Error();
  }
};

export default userReducer;
