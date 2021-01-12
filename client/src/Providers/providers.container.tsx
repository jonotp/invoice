import React, { PropsWithChildren } from "react";
import FirebaseProvider from "../Firebase/firebase.provider";
import { AppContextProvider } from "../App/app.context";
import { PreloaderContextProvider } from "../Preloader/preloader.context";
import AlertsProvider from "../Alert/alerts.provider";

const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <FirebaseProvider>
      <AppContextProvider>
        <PreloaderContextProvider>
          <AlertsProvider>{children}</AlertsProvider>
        </PreloaderContextProvider>
      </AppContextProvider>
    </FirebaseProvider>
  );
};

export default Providers;
