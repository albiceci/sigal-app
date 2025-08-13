import { useState } from "react";
import { ScrollPosition } from "../../../util/scrollPosition";
import { WindowDimensions } from "../../../util/windowDimensions";
import { ContentContainer } from "../../containers/contentContainer";
import { ItemComponent } from "./itemComponent/itemComponent";
import { ReactComponent as LogoWhite } from "../../../assets/sigal/logo/logoSigalWhite.svg";
import { ReactComponent as LogoWhitePartial } from "../../../assets/sigal/logo/logoSigalPartialWhite.svg";

import { ComputerSVG } from "./icons/computer";
import { GroupSVG } from "./icons/group";
import { HeartSVG } from "./icons/heart";
import { Button } from "../../ui/button/button";
import { AnimatedNumber } from "../../../util/animatedNumber";

const BACKGROUND_EFFECT_THRESHHOLD = 1500;

const ITEM_DATA = [
  {
    icon: <GroupSVG />,
    bgColor: "bg-sapphire",
    mainTitle: <AnimatedNumber value={15.5} marginBottom="-30" />,
    subTitle: "million customers",
    description:
      "SIGAL IG is a leading insurer in Central and Eastern Europe. With its experience of over two centuries of insurance tradition, today, it serves more than 15.5 million customers in 18 European countries.",
  },
  {
    icon: <HeartSVG />,
    bgColor: "bg-orange-600",
    mainTitle: <AnimatedNumber value={30} marginBottom="-30" />,
    subTitle: "years of experience",
    description:
      "SIGAL IG provides Albanian consumers with modern insurance solutions based on a broad product portfolio in all areas of general insurance and life insurance.",
  },
  {
    icon: <ComputerSVG />,
    bgColor: "bg-cyan-500",
    mainTitle: (
      <>
        <AnimatedNumber value={24} marginBottom="-30" />/<AnimatedNumber value={7} marginBottom="-30" />
      </>
    ),
    subTitle: "service",
    description:
      "You contract and manage your insurance entirely online. Anytime, anywhere in Albania. Sign up to the SIGAL Incsurance Group portal and benefit from the advantages of the MedSIGAL medical application.",
  },
];

const calculatePercentage = (screenHeight: number, top: number, bottom: number) => {
  const elHeight = bottom - top;
  const elMiddle = top + elHeight / 2 - screenHeight / 2;

  if (screenHeight > BACKGROUND_EFFECT_THRESHHOLD) return 0;

  if (elMiddle >= 0 && elHeight / 2 - elMiddle > 0) {
    return (elHeight / 2 - elMiddle) / (elHeight / 4) > 1 ? 1 : (elHeight / 2 - elMiddle) / (elHeight / 4);
  } else if (elMiddle < 0 && elHeight / 2 + elMiddle > 0) {
    return (elHeight / 2 + elMiddle) / (elHeight / 4) > 1 ? 1 : (elHeight / 2 + elMiddle) / (elHeight / 4);
  }

  return 0;
};

function PseSigalSection() {
  const [bottomPosition, setBottomPosition] = useState<number | null>(null);
  const [topPosition, setTopPosition] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var scrollPosition: number = ScrollPosition();
  var windowDimensions = WindowDimensions();

  return (
    <div
      ref={(el) => {
        if (el) {
          setBottomPosition(el.getBoundingClientRect().bottom);
          setTopPosition(el.getBoundingClientRect().top);
        }
      }}
      className=""
    >
      <div
        style={{
          opacity:
            bottomPosition !== null && topPosition !== null
              ? calculatePercentage(windowDimensions.height, Number(topPosition), Number(bottomPosition))
              : "0",
        }}
        className={`flex sm:items-center sm:justify-center fixed h-[100vh] w-[100vw] bg-primary z-[-1] top-0 will-change-[opacity]`}
      >
        <div className="hidden w-full h-full items-center justify-center opacity-10 z-[1] md:flex blur-[2px]">
          <LogoWhite width={"inherit"} />
        </div>
        <div className="flex w-full h-full items-center justify-center opacity-10 z-[1] md:hidden blur-[2px]">
          <LogoWhitePartial width={"inherit"} />
        </div>
      </div>
      <div
        style={{
          color:
            bottomPosition !== null && topPosition !== null
              ? `rgb(${
                  calculatePercentage(windowDimensions.height, Number(topPosition), Number(bottomPosition)) * 255
                }, ${
                  calculatePercentage(windowDimensions.height, Number(topPosition), Number(bottomPosition)) * 255
                }, ${calculatePercentage(windowDimensions.height, Number(topPosition), Number(bottomPosition)) * 255})`
              : `rgb(0, 0, 0)`,
        }}
        className={`flex align-middle justify-center`}
      >
        <ContentContainer>
          <div className="flex flex-col items-center py-10">
            <div>
              <h2 className="h2">Pse te zgjedh SIGAL?</h2>
            </div>
            <div className="mt-16 flex flex-col w-full p-2 md:mt-20 md:flex-row sm:px-20">
              {ITEM_DATA.map((item, index) => {
                return (
                  <ItemComponent
                    key={index}
                    icon={item.icon}
                    bgColor={item.bgColor}
                    mainTitle={item.mainTitle}
                    subTitle={item.subTitle}
                    description={item.description}
                  />
                );
              })}
            </div>
            <div className="mt-24 h-fit flex flex-col md:flex-row">
              <div className="mx-0 my-1 md:mx-1 md:my-0">
                <Button
                  buttonType="secondaryAlt"
                  style={{
                    fontSize: "17px",
                    letterSpacing: "1px",
                  }}
                >
                  Click here for smth
                </Button>
              </div>
              <div className="mx-0 my-1 md:mx-1 md:my-0">
                <Button
                  buttonType="secondary"
                  style={{
                    fontSize: "17px",
                    letterSpacing: "1px",
                  }}
                >
                  Click here for smth
                </Button>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}

export default PseSigalSection;
