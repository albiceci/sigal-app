import { ScrollPosition } from "../../../../util/scrollPosition";
import LanguageSelector from "../../languageSelector/LanguageSelector";
import { RowMenu } from "../mainMenu/rowMenu/rowMenu";
import { NavBarItem } from "../navBarData";

type secondarySectionProps = {
  secondaryMenuItems: NavBarItem[];
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
      <div className={`hidden h-full items-center justify-center xl:flex gap-5`}>
        <LanguageSelector />
        <RowMenu menuItems={secondaryMenuItems} activeKey={activeKey} theme={theme} />
      </div>
    </div>
  );
};
