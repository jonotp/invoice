import React, {
  createContext,
  PropsWithChildren,
  useReducer,
} from "react";
import userReducer from "../reducers/user.reducer";
import { IUser, IAppContext } from "../types";

type Action =
  | { type: "SAVE_USER_SESSION" }
  | { type: "DELETE_USER_SESSION" }
  | { type: "UPDATE_USER_SESSION" };

const initialState = {
  user: null,
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
