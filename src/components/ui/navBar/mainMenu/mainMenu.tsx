import { navBarValues } from "../navBarData";
import { RowMenu } from "./rowMenu/rowMenu";
import { TabMenu } from "./tabMenu/tabMenu";

type mainMenuProps = {
  menuItems: typeof navBarValues;
  activeKey?: string | null;
  theme: "primary" | "white";
};

export const MainMenu = ({ menuItems, activeKey, theme }: mainMenuProps) => {
  return (
    <>
      <RowMenu menuItems={menuItems.primary} activeKey={activeKey} theme={theme} />
      <TabMenu menuItems={menuItems} activeKey={activeKey} theme={theme} />
    </>
  );
};
