import { useContext } from "react";
import { MenuItem } from "./menuItem/menuItem";
import { sessionContext } from "../../../../../util/sessionContainer";

type rowMenuProps = {
  menuItems: {
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
  activeKey?: string | null;
  theme: "primary" | "white";
};

export const RowMenu = ({ menuItems, activeKey, theme }: rowMenuProps) => {
  const { sessionData } = useContext(sessionContext);
  return (
    <div className="hidden h-[70px] lg:flex gap-5 xl:gap-6">
      {menuItems.map((item) => {
        return <MenuItem itemData={item} activeKey={activeKey} theme={theme} />;
      })}
    </div>
  );
};
