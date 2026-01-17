import { useState } from "react";
import { Reveal } from "../../../util/reveal";
import { PackageOption, packageType } from "./packageOption";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { WindowDimensions } from "../../../util/windowDimensions";
import React from "react";

export const PackageList = ({ packageList }: { packageList: packageType[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  var windowDimensions = WindowDimensions();

  const containerRef = React.useRef(null);
  const lottieRef = React.useRef(null);
  const lottieRef1 = React.useRef<LottieRefCurrentProps>(null);
  const lottieRef2 = React.useRef<LottieRefCurrentProps>(null);

  //@ts-ignore
  const controllerClick = (type: 1 | -1) => {
    setActiveIndex((prev) => {
      return prev + type;
    });
  };

  //Scroll View
  if (windowDimensions.width >= 1024 && packageList[0].coverages) {
    return (
      <Reveal width="100%" height="100%">
        <div className="flex justify-center items-center w-full xl:gap-5 h-full py-6">
          {/* Back Button */}
          <div className="w-[60px] z-10 hidden sm:block">
            <Lottie
              onClick={() => {
                controllerClick(-1);
              }}
              style={{
                height: 60,
                width: 60,
                cursor: "pointer",
                display: activeIndex === 0 ? "none" : "block",
              }}
              lottieRef={lottieRef1}
              animationData={require("../../../assets/lottie/icons/leftArrowPresetBlack.json")}
              autoplay={true}
              loop={false}
              onComplete={(e) => {
                setTimeout(() => {
                  lottieRef1.current?.goToAndPlay(0); // Go to frame 0 and play again
                }, 2000);
              }}
            />
          </div>
          {/* Package list */}
          <div className="flex h-fit w-[430px]">
            {packageList.map((packageData, index) => {
              return (
                <PackageOption
                  packageData={packageData}
                  key={index}
                  isVisible={activeIndex === index || activeIndex + 1 === index}
                  activeIndex={activeIndex}
                />
              );
            })}
          </div>
          {/* Next Button */}
          <div className="w-[60px] z-10 hidden sm:block">
            <Lottie
              onClick={() => {
                controllerClick(1);
              }}
              style={{
                height: 60,
                width: 60,
                cursor: "pointer",
                zIndex: 10,
                display: windowDimensions.width >= 1024 && activeIndex + 1 < packageList.length - 1 ? "block" : "none",
              }}
              lottieRef={lottieRef2}
              animationData={require("../../../assets/lottie/icons/rightArrowPresetBlack.json")}
              autoplay={true}
              loop={false}
              onComplete={(e) => {
                setTimeout(() => {
                  lottieRef2.current?.goToAndPlay(0); // Go to frame 0 and play again
                }, 2000);
              }}
            />
          </div>
        </div>
      </Reveal>
    );
  } else {
    //List view
    return (
      <div className="w-full h-full flex items-center justify-center gap-5 py-1">
        <div className="max-w-full relative h-fit md:w-[400px] md:max-w-fit lg:w-fit">
          <div
            ref={containerRef}
            className="flex w-full items-center lg:justify-center gap-5 overflow-scroll lg:overflow-hidden lg:flex-wrap  px-5 py-3"
            onScroll={() => {
              //@ts-ignore
              lottieRef.current.setAttribute("hidden", "");
            }}
          >
            {packageList.map((packageData, index) => {
              return <PackageOption packageData={packageData} key={index} />;
            })}
          </div>

          {/* Left fade */}
          <div
            className="pointer-events-none absolute top-0 left-0 h-full w-10 
                  bg-gradient-to-r from-white to-transparent"
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute top-0 right-0 h-full w-10 
                  bg-gradient-to-l from-white to-transparent"
          />
        </div>

        <div
          className="w-full absolute flex lg:hidden items-end bottom-5 justify-center min-h-20 pointer-events-none"
          style={{
            display:
              //@ts-ignore
              containerRef.current && packageList.length * 148 + 10 < containerRef.current?.offsetWidth
                ? "none"
                : undefined,
          }}
        >
          <div ref={lottieRef} className=" opacity-50">
            <Lottie
              style={{
                pointerEvents: "none",
                height: 80,
                width: 80,
              }}
              animationData={require("../../../assets/lottie/icons/swipeLeftRightIconPrimary.json")}
              autoplay={true}
              loop={true}
            />
          </div>
        </div>
      </div>
    );
  }
};
