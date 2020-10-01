import React from "react";
import {
  AppBar,
  makeStyles,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import * as routes from "../routes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6">
          Invoice Generator
        </Typography>
        <div>
          <Button variant="text">
            <Link to={routes.HOME}>Home</Link>
          </Button>
          <Button variant="text">
            <Link to={routes.INVOICE_FORM}>Form</Link>
          </Button>
          <Button variant="text">
            <Link to={routes.INVOICE_PREVIEW}>Preview</Link>
          </Button>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => alert("Open user profile or dropdown")}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
