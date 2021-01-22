import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import SideBarToggleButton from "../SideBar/toggle-button";
import logoImagePath from "../Icon/light.svg";
import "./nav-bar.scss";

const Navbar = () => {
  return (
    <AppBar position="sticky" className="nav-bar">
      <Toolbar>
        <SideBarToggleButton />
        <NavLink className="nav-header" to="/">
          <img className="nav-logo" src={logoImagePath} />
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
