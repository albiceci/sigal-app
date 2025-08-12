import { useContext } from "react";
import { MenuItem } from "./menuItem/menuItem";
import { sessionContext } from "../../../../../util/sessionContainer";

type bottomRowMenuProps = {
  menuItems: {
    name: string;
    link: string | null;
    icons: {
      primary: JSX.Element;
      secondary: JSX.Element;
    };
    key: string;
  }[];
  activeKey?: string | null;
};

export const BottomRowMenu = ({ menuItems, activeKey }: bottomRowMenuProps) => {
  const { sessionData } = useContext(sessionContext);
  return (
    <div className="h-[50px] flex justify-between w-[90%] md:w-[80%]">
      {menuItems.map((item) => {
        if (item.name === "LLOGARIA IME" && sessionData.userId) {
          item.name = sessionData.user?.email as string;
        }
        return <MenuItem itemData={item} activeKey={activeKey} />;
      })}
    </div>
  );
};
