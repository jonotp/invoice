import React, { PropsWithChildren } from "react";
import FirebaseProvider from "../Firebase/firebase.provider";
import AppProvider from "../App/app.provider";
import { PreloaderContextProvider } from "../Preloader/preloader.context";
import AlertsProvider from "../Alert/alerts.provider";
import SideBarProvider from "../SideBar/provider";
import { ThemeProvider } from "@material-ui/core";
import theme from "../Theme/theme";

const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <FirebaseProvider>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <PreloaderContextProvider>
            <SideBarProvider>
              <AlertsProvider>{children}</AlertsProvider>
            </SideBarProvider>
          </PreloaderContextProvider>
        </ThemeProvider>
      </AppProvider>
    </FirebaseProvider>
  );
};

export default Providers;
