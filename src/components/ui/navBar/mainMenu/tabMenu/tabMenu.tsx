import { useState } from "react";
import OutsideAlerter from "./outsideAlerter/outsideAlerter";
import { MenuIcon } from "./menuIcon/menuIcon";
import { MenuItem } from "./menuItem/menuItem";
import { navBarValues } from "../../navBarData";
import LanguageSelector from "../../../languageSelector/LanguageSelector";

type tabMenuProps = {
  menuItems: typeof navBarValues;
  activeKey?: string | null;
  theme: "primary" | "white";
};

export const TabMenu = ({ menuItems, activeKey, theme }: tabMenuProps) => {
  const [sideBarActive, setsideBarActive] = useState(false);

  return (
    <OutsideAlerter clickHandle={setsideBarActive}>
      <div className="flex h-full items-center justify-center xl:hidden">
        <MenuIcon onClick={setsideBarActive} sideBarActive={sideBarActive} theme={theme} />
        <div className="px-3">
          <LanguageSelector />
        </div>
        <div
          className={`fixed h-[100vh] bg-primary w-[250px] top-0 left-0 z-[100] transition-transform duration-[0.5s] ${
            sideBarActive ? "translate-x-[0] shadow-[0px_0px_25px_1px_rgba(0,102,179,255)]" : "translate-x-[-100%]"
          }`}
        >
          <nav className="pt-[70px] flex flex-col">
            {menuItems.primary.map((item, index) => {
              return <MenuItem key={index} itemData={item} activeKey={activeKey} />;
            })}
          </nav>
          <nav className="pt-[70px] flex flex-col">
            {menuItems.secondary.map((item, index) => {
              return <MenuItem key={index} itemData={item} activeKey={activeKey} />;
            })}
          </nav>
        </div>
      </div>
    </OutsideAlerter>
  );
};
