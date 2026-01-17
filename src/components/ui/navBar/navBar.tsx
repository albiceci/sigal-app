import { ScrollPosition } from "../../../util/scrollPosition";
import { AccountItem } from "./accountItem/accountItem";
import BottomBar from "./bottomBar/bottomBar";

import { Logo } from "./logo/logo";
import { MainMenu } from "./mainMenu/mainMenu";
import { navBarValues } from "./navBarData";
import { BuyButton } from "./secondarySection/buyButton/buyButton";
import { SecondarySection } from "./secondarySection/secondarySection";

type navBarProps = {
  buyButton: {
    isActive: boolean;
    isVisible: boolean;
    link: string;
  };
  logo?: {
    isMovable: boolean;
  };
  activeKey?: string | null;
  theme?: "primary" | "white";
};

function NavBar({ buyButton, logo = { isMovable: true }, activeKey, theme = "white" }: navBarProps) {
  var scrollPosition: number = ScrollPosition();
  return (
    <>
      <header
        className={`will-change-[height] flex px-[20px] justify-between fixed w-full h-[70px] z-40 border-b transition-[height] duration-[.2s] ${
          scrollPosition < 50 && logo.isMovable
            ? "xl:h-[100px] bg-transparent border-b-transparent"
            : "xl:h-[70px] border-b-gray-300 shadow-navbar transition-[background-color] duration-[.5s] bg-white"
        }`}
      >
        <MainMenu menuItems={navBarValues} activeKey={activeKey} theme={scrollPosition < 50 ? theme : "white"} />
        <Logo isMovable={logo.isMovable} theme={scrollPosition < 50 ? theme : "white"} />
        <div className={`flex h-[70px] self-start relative items-center justify-center`}>
          <div
            className={`flex absolute items-center gap-5 xl:gap-6 ${
              (scrollPosition > 500 || buyButton.isVisible) && buyButton.isActive ? "right-full pr-6" : "right-0"
            }`}
          >
            <SecondarySection
              isVisible={buyButton.isVisible}
              isActive={buyButton.isActive}
              link={buyButton.link}
              secondaryMenuItems={navBarValues.secondary}
              activeKey={activeKey}
              theme={scrollPosition < 50 ? theme : "white"}
            />
            {/* <AccountItem
            activeKey={activeKey}
            theme={scrollPosition < 50 ? theme : "white"}
          /> */}
          </div>
          <BuyButton isVisible={buyButton.isVisible} isActive={buyButton.isActive} link={buyButton.link} />
        </div>
      </header>
      <BottomBar activeKey={activeKey} />
    </>
  );
}

export default NavBar;
