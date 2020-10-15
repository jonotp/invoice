import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./containers/navbar.container";
import InvoiceForm from "./containers/invoice-form.container";
import SignUpPage from "./containers/sign-up-page.container";
import { TestInvoicePDFPreviewer } from "./containers/invoice-pdf-previewer.container";
import * as ROUTES from "./routes";
import Providers from "./containers/providers.container";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Providers>
        <Router>
          <Navbar />
          <div className="app-body">
            <Route exact path={ROUTES.HOME} component={InvoiceForm} />
            <Route path={ROUTES.INVOICE_FORM} component={InvoiceForm} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route
              path={ROUTES.INVOICE_PREVIEW}
              component={TestInvoicePDFPreviewer}
            />
          </div>
        </Router>
      </Providers>
    </div>
  );
};

export default App;
