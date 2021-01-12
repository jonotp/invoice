import React, { useContext } from "react";
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
import * as ROUTES from "../routes";
import SignOutButton from "../SignOut/sign-out.component";
import { AppContext } from "../App/app.context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

interface NavItemProps {
  route: string;
  label: string;
}

function NavItem({ route, label }: NavItemProps) {
  return (
    <Button variant="text">
      <Link to={route}>{label}</Link>
    </Button>
  );
}

const Navbar = () => {
  const classes = useStyles();
  const { state } = useContext(AppContext);

  const handleIconClick = () => {
    console.log(state);
  }

  return (
    <AppBar className={classes.root} position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6">
          Invoice Generator
        </Typography>
        <div>
          <NavItem route={ROUTES.SIGN_IN} label="Sign In" />
          <NavItem route={ROUTES.HOME} label="Home" />
          <NavItem route={ROUTES.INVOICE_FORM} label="Form" />
          <NavItem route={ROUTES.SIGN_UP} label="Sign up" />
          <NavItem route={ROUTES.INVOICE_PREVIEW} label="Preview" />
          <Button>
            <SignOutButton />
          </Button>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleIconClick}
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
