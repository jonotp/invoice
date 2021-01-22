import { ListItem, SvgIconProps } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import UIMaterialButton from "../UI/material-button";

interface SideBarListItemProps {
  route?: string;
  label: React.ReactElement<any> | string;
  Icon: React.ReactElement<SvgIconProps>;
}

const SideBarListItem = ({ route, label, Icon }: SideBarListItemProps) => {
  return (
    <ListItem>
      <UIMaterialButton fullWidth>
        {route ? (
          <NavLink to={route} className="side-bar-list-item">
            {Icon}
            <span>{label}</span>
          </NavLink>
        ) : (
          <div className="side-bar-list-item">
            {Icon}
            {label}
          </div>
        )}
      </UIMaterialButton>
    </ListItem>
  );
};

export default SideBarListItem;
