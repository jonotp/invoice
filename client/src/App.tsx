import React from "react";
import "./styles/App.scss";
import Navbar from "./containers/navbar.container";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="app-body">
      </div>
    </div>
  );
};

export default App;
