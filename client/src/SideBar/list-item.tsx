import { ListItem, SvgIconProps } from "@material-ui/core";
import React, { createRef } from "react";
import { NavLink } from "react-router-dom";
import UIMaterialButton from "../UI/material-button";

interface SideBarListItemProps {
  route?: string;
  label: React.ReactElement<any> | string;
  Icon: React.ReactElement<SvgIconProps>;
}

const SideBarListItem = ({ route, label, Icon }: SideBarListItemProps) => {
  const buttonEl = createRef<any>();
  const handleClick = () => {
    buttonEl.current.firstChild.click();
  }

  return (
    <ListItem>
      <UIMaterialButton fullWidth>
        {route ? (
          <NavLink to={route} className="side-bar-list-item">
            {Icon}
            <span>{label}</span>
          </NavLink>
        ) : (
            <div className="side-bar-list-item" onClick={handleClick}>
              {Icon}
              <span ref={buttonEl}>{label}</span>
            </div>
          )}
      </UIMaterialButton>
    </ListItem>
  );
};

export default SideBarListItem;
