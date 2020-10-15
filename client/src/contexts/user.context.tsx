import React, {
  createContext,
  PropsWithChildren,
  useReducer,
} from "react";
import userReducer from "../reducers/user.reducer";
import { IUser, IUserContextState } from "../types";

type Action =
  | { type: "SAVE_USER_SESSION" }
  | { type: "DELETE_USER_SESSION" }
  | { type: "UPDATE_USER_SESSION" };

type InitialStateType = {
  user: IUser | null;
};

const initialState = {
  user: null,
};

const UserContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IUserContextState, action: Action) => ({
  user: userReducer(state.user, action)
});

const UserContextProvder = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvder };
