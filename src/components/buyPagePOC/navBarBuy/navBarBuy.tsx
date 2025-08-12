import { SecondarySection } from "./secondarySection/secondarySection";
import { Logo } from "./logo/logo";
import { MainMenu } from "./mainMenu/mainMenu";
import { navBarBuyValues } from "./navBarBuyData";

type navBarProps = {
  activeKey?: string | null;
};

export const NavBarBuy = ({ activeKey }: navBarProps) => {
  return (
    <div className="h-[70px] lg:h-[100px] px-[20px] lg:px-[25px] w-full flex justify-between items-center">
      <MainMenu menuItems={navBarBuyValues} activeKey={activeKey} />
      <Logo />
      <SecondarySection
        secondaryMenuItems={navBarBuyValues.secondary}
        activeKey={activeKey}
      />
    </div>
  );
};
