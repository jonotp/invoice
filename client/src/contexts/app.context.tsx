import React, {
  createContext,
  PropsWithChildren,
  useReducer,
} from "react";
import authReducer from "../reducers/auth.reducer";
import userReducer from "../reducers/user.reducer";
import { IAppContext } from "../types";

type Action =
  | { type: "SAVE_USER_SESSION" }
  | { type: "DELETE_USER_SESSION" }
  | { type: "UPDATE_USER_SESSION" };

const initialState : IAppContext= {
  user: null,
  auth: null,
};

const AppContext = createContext<{
  state: IAppContext;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IAppContext, action: Action) => ({
  user: userReducer(state.user, action),
  auth: authReducer(state.auth, action),
});

const AppContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
