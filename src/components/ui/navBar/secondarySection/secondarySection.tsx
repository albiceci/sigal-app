import { ScrollPosition } from "../../../../util/scrollPosition";
import { RowMenu } from "../mainMenu/rowMenu/rowMenu";
import { BuyButton } from "./buyButton/buyButton";

type secondarySectionProps = {
  secondaryMenuItems: {
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
  isVisible: boolean;
  isActive: boolean;
  link: string;
  theme: "primary" | "white";
};

export const SecondarySection = ({
  secondaryMenuItems,
  activeKey,
  isVisible,
  isActive,
  link,
  theme,
}: secondarySectionProps) => {
  var scrollPosition: number = ScrollPosition();
  return (
    <div className="flex self-start h-[70px] relative items-center">
      <div className={`hidden h-full items-center justify-center lg:flex `}>
        <RowMenu
          menuItems={secondaryMenuItems}
          activeKey={activeKey}
          theme={theme}
        />
      </div>
    </div>
  );
};
