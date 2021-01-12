import React, { PropsWithChildren, useReducer } from "react";
import authReducer from "../Authorization/auth.reducer";
import userReducer from "../User/user.reducer";
import AppContext from "./app.context";
import { IAppContext } from "../types";

type Action =
  | { type: "SAVE_USER_SESSION" }
  | { type: "DELETE_USER_SESSION" }
  | { type: "UPDATE_USER_SESSION" };

const initialState: IAppContext = {
  user: null,
  auth: null,
};

const reducer = (state: IAppContext, action: Action) => ({
  user: userReducer(state.user, action),
  auth: authReducer(state.auth, action),
});

const AppProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
