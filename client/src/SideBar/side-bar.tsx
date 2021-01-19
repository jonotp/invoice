import React, { useContext } from "react";
import { Drawer, List } from "@material-ui/core";
import * as ROUTES from "../routes";
import SignOutButton from "../SignOut/buton";
import ExploreIcon from "@material-ui/icons/Explore";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import StoreIcon from "@material-ui/icons/Store";
import SideBarListItem from "./list-item";
import SideBarContext from "./context";
import AppContext from "../App/app.context";
import "./side-bar.scss";

interface SideBarProps {
  className?: string;
  variant: "temporary" | "permanent" | "persistent";
}

const SideBar = ({ className, variant }: SideBarProps) => {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext);
  const {
    state: { user },
  } = useContext(AppContext);
  return !!user ? (
    <Drawer
      variant={variant}
      open={isSideBarOpen}
      onClose={() => setIsSideBarOpen(false)}
      className={className}

    >
      <List className="side-bar">
        <SideBarListItem
          route={ROUTES.INVOICE_FORM}
          label="New Invoice"
          Icon={<AddIcon />}
        />
        <SideBarListItem
          route={ROUTES.CUSTOMERS}
          label="Customers"
          Icon={<PeopleIcon />}
        />
        <SideBarListItem
          route={ROUTES.ITEMS}
          label="Items"
          Icon={<StoreIcon />}
        />
        <SideBarListItem
          route={ROUTES.INVOICE_PREVIEW}
          label="Preview"
          Icon={<ExploreIcon />}
        />
        <SideBarListItem
          route={ROUTES.SETTINGS}
          label="Settings"
          Icon={<SettingsIcon />}
        />
        <hr className="divider" />
        <SideBarListItem
          label={<SignOutButton />}
          Icon={<ExitToAppIcon />}
        />
      </List>
    </Drawer>
  ) : null;
};

// Used for small viewports (tablets & phones)
export const CollapsibleSideBar = () => (
  <SideBar className="side-bar-collapsible" variant="temporary" />
);

export const PermanentSideBar = () => (
  <SideBar className="side-bar-permanent" variant="permanent" />
);
