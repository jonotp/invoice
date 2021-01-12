import React, { PropsWithChildren } from "react";
import FirebaseProvider from "../Firebase/firebase.provider";
import { AppContextProvider } from "../App/app.context";
import { PreloaderContextProvider } from "../Preloader/preloader.context";
import { AlertsContextProvider } from "../Alert/alerts.context";

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
