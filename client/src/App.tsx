import React from "react";
import "./styles/App.scss";
import Navbar from "./containers/navbar.container";
import InvoiceFormContainer from "./containers/invoice-form.container";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="app-body">
        <InvoiceFormContainer />
      </div>
    </div>
  );
};

export default App;
