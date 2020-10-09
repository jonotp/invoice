import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./containers/navbar.container";
import InvoiceForm from "./containers/invoice-form.container";
import SignUpPage from "./containers/sign-up-page.container";
import { TestInvoicePDFPreviewer } from "./containers/invoice-pdf-previewer.container";
import * as routes from "./routes";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="app-body">
          <Route exact path={routes.HOME} component={InvoiceForm} />
          <Route path={routes.INVOICE_FORM} component={InvoiceForm} />
          <Route path={routes.SIGN_UP} component={SignUpPage} />
          <Route
            path={routes.INVOICE_PREVIEW}
            component={TestInvoicePDFPreviewer}
          />
        </div>
      </Router>
    </div>
  );
};

export default App;
