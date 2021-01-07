import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./containers/navbar.container";
import InvoiceForm from "./containers/invoice-form.container";
import SignUpPage from "./containers/sign-up-page.container";
import { TestInvoicePDFPreviewer } from "./containers/invoice-pdf-previewer.container";
import * as ROUTES from "./routes";
import "./styles/App.scss";
import { FirebaseContext } from "./contexts/firebase.context";
import { AppContext } from "./contexts/app.context";
import { AUTH_ACTION_TYPE, GENERIC_ACTION_TYPE } from "./types";
import SignInPage from "./containers/sign-in-page.container";
import NotFoundPage from "./containers/not-found.container";
import Alerts from "./containers/alerts.container";
import Preloader from "./components/preloader.component";
import { PreloaderContext } from "./contexts/preloader.context";

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
    <div className="App">
      <Router>
        <Navbar />
        <div className="app-body">
          <Switch>
            <Route exact path={ROUTES.HOME} component={InvoiceForm} />
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
      </Router>
    </div>
  );
};

export default App;
