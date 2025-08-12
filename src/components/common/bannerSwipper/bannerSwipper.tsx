import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./bannerSwipper.css";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import React from "react";

const BannerItem = ({ children, state, onClick }: { children: JSX.Element; state: string; onClick: () => void }) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`${state} swipper-item min-w-[60%] max-w-[60%] h-[75%] cursor-pointer border border-transparent flex items-center justify-center`}
      >
        <div className="absolute w-full h-full z-[-1] flex items-center">
          {/* <div className="absolute right-[7px] w-full h-[95%] border-2 border-white rounded-md z-[-1]"></div>
          <div className="absolute left-[7px] w-full h-[95%] border-2 border-white rounded-md z-[-1]"></div> */}
        </div>
        <div className="absolute w-full h-full z-[-1] flex justify-center">
          {/* <div className="absolute top-[7px] w-[96%] sm:w-[97%] md:w-[98%] lg:w-[98%] xl:w-[99%] h-full border-2 border-white rounded-md z-[-1]"></div>
          <div className="absolute bottom-[7px] w-[96%] sm:w-[97%] md:w-[98%] lg:w-[98%] xl:w-[99%] h-full border-2 border-white rounded-md z-[-1]"></div> */}
        </div>
        {children}
      </div>
    </>
  );
};

const bannerItems = [
  {
    element: (
      <div className="w-full h-full overflow-hidden flex flex-col sm:flex-row items-center justify-between relative rounded-md">
        <div className="absolute text-center sm:text-left text-white z-20 font-bold sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] md:text-lg lg:text-xl p-6">
          Siguroni makinën dhe shtëpinë tuaj në Sigal IG dhe përfitoni ulje!
        </div>
        <div className="h-[50%] w-full sm:w-[50%] sm:h-full absolute z-10 bg-black bg-opacity-30 bannerBlur"></div>
        <img
          className="h-full object-cover w-full"
          src={require("./../../../assets/freepik/bannerSwipper/img1.jpg")}
          alt=""
        />
      </div>
    ),
    link: "/buy?type=form&subtype=tpl,fire",
    id: 0,
  },
  {
    element: (
      <div className="w-full h-full overflow-hidden flex flex-col sm:flex-row items-center justify-between relative rounded-md">
        <div className="absolute text-center sm:text-left text-white z-20 font-bold sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] md:text-lg lg:text-xl p-6">
          Siguroni makinën dhe shtëpinë tuaj në Sigal IG dhe përfitoni ulje!
        </div>
        <div className="h-[50%] w-full sm:w-[50%] sm:h-full absolute z-10 bg-black bg-opacity-30 bannerBlur"></div>
        <img
          className="h-full object-cover w-full"
          src={require("./../../../assets/freepik/bannerSwipper/img1.jpg")}
          alt=""
        />
      </div>
    ),
    link: "/buy",
    id: 1,
  },
  {
    element: (
      <div className="w-full h-full overflow-hidden flex flex-col sm:flex-row items-center justify-between relative rounded-md">
        <div className="absolute text-center sm:text-left text-white z-20 font-bold sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] md:text-lg lg:text-xl p-6">
          Siguroni makinën dhe shtëpinë tuaj në Sigal IG dhe përfitoni ulje!
        </div>
        <div className="h-[50%] w-full sm:w-[50%] sm:h-full absolute z-10 bg-black bg-opacity-30 bannerBlur"></div>
        <img
          className="h-full object-cover w-full"
          src={require("./../../../assets/freepik/bannerSwipper/img1.jpg")}
          alt=""
        />
      </div>
    ),
    link: "/buy",
    id: 2,
  },
  {
    element: (
      <div className="w-full h-full overflow-hidden flex flex-col sm:flex-row items-center justify-between relative rounded-md">
        <div className="absolute text-center sm:text-left text-white z-20 font-bold sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] md:text-lg lg:text-xl p-6">
          Siguroni makinën dhe shtëpinë tuaj në Sigal IG dhe përfitoni ulje!
        </div>
        <div className="h-[50%] w-full sm:w-[50%] sm:h-full absolute z-10 bg-black bg-opacity-30 bannerBlur"></div>
        <img
          className="h-full object-cover w-full"
          src={require("./../../../assets/freepik/bannerSwipper/img1.jpg")}
          alt=""
        />
      </div>
    ),
    link: "/buy",
    id: 3,
  },
];

export default function BannerSwipper() {
  const navigate = useNavigate();
  const [activeBannerItemState, setActiveBannerItemState] = useState([
    {
      state: "secondary-hidden-l",
      index: -2,
    },
    {
      state: "secondary-l",
      index: -1,
    },
    {
      state: "primary",
      index: 0,
    },
    {
      state: "secondary-r",
      index: 1,
    },
    {
      state: "secondary-hidden-r",
      index: 2,
    },
  ]);
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timer | null>(null);

  const lottieRef1 = React.useRef<LottieRefCurrentProps>(null);
  const lottieRef2 = React.useRef<LottieRefCurrentProps>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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
        onControllerClick(1);
      } else {
        onControllerClick(-1);
      }
    }

    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const resetInterval = () => {
    if (currentInterval) clearTimeout(currentInterval);

    const intervalId = setTimeout(function () {
      onControllerClick(1);
    }, 10000);

    setCurrentInterval((prev) => {
      return intervalId;
    });
  };

  useEffect(() => {
    console.log("test");
    resetInterval();
  }, [activeBannerItemState]);

  const onControllerClick = (value: number) => {
    setActiveBannerItemState((prev) => {
      return prev.map((item) => {
        var newIndex = item.index + value;

        if (newIndex === bannerItems.length) {
          newIndex = newIndex * -1;
        }

        if (newIndex === (bannerItems.length + 1) * -1) {
          newIndex = bannerItems.length + value;
        }
        return {
          state: item.state,
          index: newIndex,
        };
      });
    });
  };

  return (
    <div className="banner-container w-full flex items-center justify-center">
      <div className="h-[420px] sm:h-[350px] lg:h-[300px] w-[100%] lg:w-[90%] xl:w-[80%] flex items-center justify-center">
        <div className="hidden md:block md:pl-5 lg:pl-0">
          <Lottie
            onClick={() => {
              onControllerClick(-1);
            }}
            style={{
              height: 60,
              width: 60,
              cursor: "pointer",
            }}
            lottieRef={lottieRef1}
            animationData={require("../../../assets/lottie/icons/leftArrowWhite.json")}
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
          className="swipper-wapper flex-grow h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {activeBannerItemState.map((item) => {
            return (
              <BannerItem
                key={item.index}
                state={item.state}
                onClick={() => {
                  if (item.state === "primary") {
                    navigate(bannerItems[0].link);
                  } else if (item.state === "secondary-r") {
                    onControllerClick(1);
                  } else if (item.state === "secondary-l") {
                    onControllerClick(-1);
                  }
                }}
              >
                <>
                  {bannerItems.at(item.index) !== undefined
                    ? (bannerItems.at(item.index)?.element as JSX.Element)
                    : bannerItems[0].element}
                </>
              </BannerItem>
            );
          })}
        </div>
        <div className="hidden md:block md:pr-5 lg:pr-0">
          <Lottie
            onClick={() => {
              onControllerClick(1);
            }}
            style={{
              height: 60,
              width: 60,
              cursor: "pointer",
            }}
            lottieRef={lottieRef2}
            animationData={require("../../../assets/lottie/icons/rightArrowWhite.json")}
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
    </div>
  );
}
