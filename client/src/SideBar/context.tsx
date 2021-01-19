import { createContext } from "react";

const SideBarContext = createContext<{
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isSideBarOpen: false, setIsSideBarOpen: () => null });

export default SideBarContext;
