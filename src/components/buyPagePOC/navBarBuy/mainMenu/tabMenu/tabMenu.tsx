import { createPortal } from "react-dom";
import OutsideAlerter from "./outsideAlerter/outsideAlerter";
import { MenuIcon } from "./menuIcon/menuIcon";
import { MenuItem } from "./menuItem/menuItem";
import { useContext } from "react";

import { SidebarContext } from "../../../../containers/buyPageContainer";
import LanguageSelector from "../../../../ui/languageSelector/LanguageSelector";

type tabMenuProps = {
  menuItems: {
    products: {
      name: string;
      link: string | null;
      icons: {
        primary: JSX.Element;
        secondary: JSX.Element;
      };
      key: string;
      subCategories:
        | {
            name: string;
            link: string;

            key: string;
          }[]
        | null;
    }[];
    secondary: {
      name: string;
      link: string | null;
      icons: {
        primary: JSX.Element;
        secondary: JSX.Element;
      };
      key: string;
      subCategories:
        | {
            name: string;
            link: string;

            key: string;
          }[]
        | null;
    }[];
  };
  activeKey?: string | null;
};

export const TabMenu = ({ menuItems, activeKey }: tabMenuProps) => {
  const { sideBarActive, setsideBarActive } = useContext(SidebarContext);
  const pageContainer = document.getElementById("buyPageContainer");

  return (
    <div className="flex h-[70px] lg:hidden">
      <div className="flex h-full items-center justify-center lg:hidden">
        <MenuIcon onClick={setsideBarActive} sideBarActive={sideBarActive} />
        {pageContainer
          ? createPortal(
              <OutsideAlerter clickHandle={setsideBarActive}>
                <div
                  className={`z-[1] absolute top-[5vh] left-[5vw] py-10 bg-primary w-[250px] rounded-md transition-[transform,box-shadow] duration-[1s] delay-500 ${
                    sideBarActive ? "translate-x-[0] shadow-[0px_0px_25px_1px_rgba(0,102,179,255)]" : "translate-x-[0]"
                  }`}
                >
                  <div className="flex flex-col">
                    {menuItems.products.map((item, index) => {
                      return <MenuItem key={index} itemData={item} activeKey={activeKey} />;
                    })}
                  </div>
                  <div className="pt-[70px] flex flex-col">
                    {menuItems.secondary.map((item, index) => {
                      return <MenuItem key={index} itemData={item} activeKey={activeKey} />;
                    })}
                  </div>
                </div>
              </OutsideAlerter>,
              pageContainer
            )
          : null}
      </div>
    </div>
  );
};
