import React, { PropsWithChildren } from "react";
import { useState } from "react";
import SideBarContext from "./context";

const SideBarProvider = ({ children } : PropsWithChildren<any>) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
