import React, { createContext } from "react";
import { IAppContext } from "../types";
const initialState: IAppContext = {
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

export default AppContext;
