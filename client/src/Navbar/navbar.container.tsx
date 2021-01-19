import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import SideBarToggleButton from "../SideBar/toggle-button";
import "./nav-bar.scss";

const Navbar = () => {
  return (
    <AppBar position="sticky" className="nav-bar">
      <Toolbar>
        <SideBarToggleButton />
        <NavLink className="nav-header" to="/">
          Invoice Generator
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
