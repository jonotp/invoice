import React, { PropsWithChildren } from "react";
import { FirebaseProvider } from "../contexts/firebase.context";
import { AppContextProvider } from "../contexts/app.context";
import { PreloaderContextProvider } from "../contexts/preloader.context";
import { AlertsContextProvider } from "../contexts/alerts.context";

const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <FirebaseProvider>
      <AppContextProvider>
        <PreloaderContextProvider>
          <AlertsContextProvider>{children}</AlertsContextProvider>
        </PreloaderContextProvider>
      </AppContextProvider>
    </FirebaseProvider>
  );
};

export default Providers;
