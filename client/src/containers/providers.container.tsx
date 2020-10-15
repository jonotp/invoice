import React, { PropsWithChildren } from "react";
import { FirebaseProvider } from "../contexts/firebase.context";
import { AppContextProvider } from "../contexts/app.context";

const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <FirebaseProvider>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </FirebaseProvider>
  );
};

export default Providers;
