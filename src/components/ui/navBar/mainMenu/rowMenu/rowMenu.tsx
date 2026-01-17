import { useContext } from "react";
import { MenuItem } from "./menuItem/menuItem";
import { sessionContext } from "../../../../../util/sessionContainer";
import { NavBarItem } from "../../navBarData";

type rowMenuProps = {
  menuItems: NavBarItem[];
  activeKey?: string | null;
  theme: "primary" | "white";
};

export const RowMenu = ({ menuItems, activeKey, theme }: rowMenuProps) => {
  const { sessionData } = useContext(sessionContext);
  return (
    <nav className="hidden h-[70px] xl:flex xl:gap-3 2xl:gap-5">
      {menuItems.map((item, index) => {
        return <MenuItem key={index} itemData={item} activeKey={activeKey} theme={theme} />;
      })}
    </nav>
  );
};
