import { MenuItem } from "./menuItem/menuItem";

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
};

export const RowMenu = ({ menuItems, activeKey }: rowMenuProps) => {
  return (
    <div className="hidden h-[70px] lg:flex gap-3 xl:gap-4">
      {menuItems.map((item) => {
        return <MenuItem itemData={item} activeKey={activeKey} />;
      })}
    </div>
  );
};
