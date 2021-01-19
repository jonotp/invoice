import React, { useContext } from "react";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AppContext from "../App/app.context";
import SideBarContext from "../SideBar/context";
import "./side-bar.scss";

const SideBarToggleButton = () => {
  const { setIsSideBarOpen } = useContext(SideBarContext);
  const {
    state: { user },
  } = useContext(AppContext);

  return !!user ? (
    <IconButton
      className="side-bar-toggle-button"
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={() => {
        setIsSideBarOpen((state) => !state);
      }}
    >
      <MenuIcon />
    </IconButton>
  ) : null;
};

export default SideBarToggleButton;
