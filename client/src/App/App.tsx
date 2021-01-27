import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "../Navbar/navbar";
import InvoiceForm from "../Invoice/form";
import SignUpPage from "../SignUp/page";
import { TestInvoicePDFPreviewer } from "../Invoice/pdf-previewer";
import * as ROUTES from "../routes";
import FirebaseContext from "../Firebase/firebase.context";
import AppContext from "./app.context";
import { AUTH_ACTION_TYPE, GENERIC_ACTION_TYPE } from "../types";
import SignInPage from "../SignIn/page";
import NotFoundPage from "../NotFound/not-found.container";
import Alerts from "../Alert/alerts.container";
import Preloader from "../Preloader/preloader.component";
import { PreloaderContext } from "../Preloader/preloader.context";
import { PermanentSideBar, CollapsibleSideBar } from "../SideBar/side-bar";
import HomePage from "../Home/page";
import "./App.scss";

const App = () => {
  const firebase = useContext(FirebaseContext);
  const { dispatch } = useContext(AppContext);
  const { setIsLoading } = useContext(PreloaderContext);

  useEffect(() => {
    setIsLoading(true);
    const listener = firebase?.auth.onAuthStateChanged((authUser) => {
      setIsLoading(true);
      if (!!authUser) {
        dispatch({
          type: AUTH_ACTION_TYPE.SAVE_AUTH_SESSION,
          payload: authUser,
        });
      } else {
        dispatch({ type: GENERIC_ACTION_TYPE.DELETE_ALL });
      }
      setIsLoading(false);
    });

    return () => {
      if (listener !== undefined) listener();
    };
  }, [firebase, dispatch, setIsLoading]);

  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="app-body">
          <PermanentSideBar />
          <CollapsibleSideBar />
          <div className="app-content">
            <Switch>
              <Route exact path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.INVOICE_FORM} component={InvoiceForm} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route
                path={ROUTES.INVOICE_PREVIEW}
                component={TestInvoicePDFPreviewer}
              />
              <Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
              <Redirect from="*" to={ROUTES.NOT_FOUND} />
            </Switch>
            <Alerts />
            <Preloader />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
