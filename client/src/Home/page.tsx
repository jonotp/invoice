import React, { useContext } from "react";
import AppContext from "../App/app.context";
import HomeUnauthenticatedPage from "./unauthenticated-page";
import "./home.scss";

const HomePage = () => {
  const {
    state: { user },
  } = useContext(AppContext);
  return user ? <h1>Home Page</h1> : <HomeUnauthenticatedPage />;
};

export default HomePage;
