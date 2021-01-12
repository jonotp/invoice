import React, { PropsWithChildren } from "react";
import FirebaseProvider from "../Firebase/firebase.provider";
import AppProvider from "../App/app.provider";
import { PreloaderContextProvider } from "../Preloader/preloader.context";
import AlertsProvider from "../Alert/alerts.provider";

const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <FirebaseProvider>
      <AppProvider>
        <PreloaderContextProvider>
          <AlertsProvider>{children}</AlertsProvider>
        </PreloaderContextProvider>
      </AppProvider>
    </FirebaseProvider>
  );
};

export default Providers;
