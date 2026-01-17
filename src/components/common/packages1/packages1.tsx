import { useNavigate } from "react-router-dom";
import { ContentContainer } from "../../containers/contentContainer";
import { Button } from "../../ui/button/button";

import check from "./check.svg";
import { useEffect, useRef, useState } from "react";
import { WindowDimensions } from "../../../util/windowDimensions";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import React from "react";
import { Reveal } from "../../../util/reveal";

type packageItemType = {
  name: string;
  coverages: string[];
  link: string;
  isBest: boolean;
};

const PackageItem = ({
  packageItem,
  isVisible,
  activeIndex,
}: {
  packageItem: packageItemType;
  isVisible: boolean;
  activeIndex: number;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col min-w-full lg:min-w-[50%] px-4 transition-all"
      style={{
        transform: `translateX(-${String(activeIndex * 100)}%)`,
        opacity: isVisible ? "100%" : "0%",
        pointerEvents: isVisible === false ? "none" : undefined,
      }}
    >
      <div
        className={`h-full flex justify-between gap-7 flex-col bg-white border border-primary px-5 py-3 rounded-3xl ${
          packageItem.isBest ? "shadow-xl shadow-green-100" : ""
        }`}
      >
        {packageItem.isBest ? (
          <div className="fixed bg-green-500 px-4 py-1 text-white font-bold rounded-md right-2 top-5">Top Sales</div>
        ) : (
          <></>
        )}
        <div className="flex flex-col gap-3 flex-grow">
          <div className="flex items-center justify-center ">
            <div className="w-fit bg-primary rounded-full px-4 py-2 -translate-y-8">
              <div className="text-white text-lg font-semibold">{packageItem.name}</div>
            </div>
          </div>
          <div className="flex flex-grow flex-col gap-5 bg-blue-50 px-6 py-6 rounded-lg shadow-md">
            <div className="text-center text-primary font-semibold">Mbulimet</div>
            <div className="flex flex-col gap-3">
              {packageItem.coverages.map((coverage) => {
                return (
                  <div className="flex gap-3 items-center">
                    <div className="min-w-6 min-h-6 w-6 h-6">
                      <img src={check} alt="" />
                    </div>
                    <div>{coverage}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="w-fit">
            <Button
              buttonType="primary"
              padding="px-6 py-2"
              style={{ padding: "12px", paddingTop: "8px", paddingBottom: "8px", fontSize: "14px" }}
              onClick={() => {
                navigate(packageItem.link);
              }}
            >
              SIGUROHU
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Packages1({ packageData }: { packageData: packageItemType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  var windowDimensions = WindowDimensions();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const lottieRef = React.useRef(null);
  const lottieRef1 = React.useRef<LottieRefCurrentProps>(null);
  const lottieRef2 = React.useRef<LottieRefCurrentProps>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        if (
          (windowDimensions.width >= 1024 && activeIndex + 1 < packageData.length - 1) ||
          (windowDimensions.width < 1024 && activeIndex < packageData.length - 1)
        ) {
          controllerClick(1);
        }
      } else {
        if (activeIndex > 0) {
          controllerClick(-1);
        }
      }
    }

    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const controllerClick = (type: 1 | -1) => {
    if (lottieRef.current) {
      //@ts-ignore
      lottieRef.current.setAttribute("hidden", "");
    }
    setActiveIndex((prev) => {
      return prev + type;
    });
  };

  return (
    <Reveal marginBottom="-10" width="100%">
      <div className="flex justify-center items-center py-16 w-full">
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
        <div
          className="flex h-fit w-[95%] sm:w-[80%] xl:w-[1180px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {packageData.map((packageItem, index) => {
            return (
              <PackageItem
                packageItem={packageItem}
                key={index}
                isVisible={
                  windowDimensions.width >= 1024
                    ? activeIndex === index || activeIndex + 1 === index
                    : activeIndex === index
                }
                activeIndex={activeIndex}
              />
            );
          })}
        </div>

        <div className="w-full absolute flex md:hidden items-end justify-center min-h-20 pointer-events-none">
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
              display:
                windowDimensions.width >= 1024 && activeIndex + 1 < packageData.length - 1
                  ? "block"
                  : windowDimensions.width < 1024 && activeIndex < packageData.length - 1
                  ? "block"
                  : "none",
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
}
