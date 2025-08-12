import { RowMenu } from "./rowMenu/rowMenu";
import { TabMenu } from "./tabMenu/tabMenu";

type mainMenuProps = {
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
  theme: "primary" | "white";
};

export const MainMenu = ({ menuItems, activeKey, theme }: mainMenuProps) => {
  return (
    <div>
      <RowMenu
        menuItems={menuItems.products}
        activeKey={activeKey}
        theme={theme}
      />
      <TabMenu menuItems={menuItems} activeKey={activeKey} theme={theme} />
    </div>
  );
};
