import { useNavigate } from "react-router-dom";

import heroImage from "./heroImage.svg";
import { Button } from "../../ui/button/button";
import Lottie from "lottie-react";
import React from "react";
import { ScrollPosition } from "../../../util/scrollPosition";

function MainSection() {
  const navigate = useNavigate();
  var scrollPosition: number = ScrollPosition();
  return (
    <article className="w-[100vw] min-h-[800px] relative overflowx-hidden m-0 sm:min-h-[max(100vh,800px)] flex justify-center">
      <div className="h-fit w-full flex items-center justify-center bottom-0 absolute">
        <img src={heroImage} className="min-w-[1000px] sm:min-w-[1300px] lg:w-[100%] h-auto" alt="heroImage" />
      </div>
      <div className="absolute mt-[150px] flex flex-col gap-6 items-center z-10 max-w-[350px] md:max-w-[500px] lg:max-w-[600px]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="h2 text-primary text-center">Të sigurt, çdo herë, në çdo moment</h1>
          <p className="text-center text-[15px] sm:text-[18px] font-medium font-subheader text-presetblack max-w-[300px] md:max-w-[450px] lg:max-w-[550px]">
            Sigurimet e mjeteve lundruese dhe mallit gjatë transportit
          </p>
        </div>
        <div className="w-fit">
          <Button
            buttonType="primary"
            fontStyle="font-regularFamily font-black tracking-widest"
            onClick={() => {
              navigate("/buy?type=marina");
            }}
          >
            SIGUROHU
          </Button>
        </div>
      </div>
      <div
        className={`flex w-full items-center justify-center bottom-14 lg:bottom-8 z-10  ${
          scrollPosition > 50 ? "hidden" : "fixed"
        }`}
      >
        <Lottie
          style={{
            pointerEvents: "none",
            height: 80,
            width: 80,
          }}
          animationData={require("../../../assets/lottieFlow/icons/downArrowPresetBlack.json")}
          autoplay={true}
          loop={true}
        />
      </div>
    </article>
  );
}

export default MainSection;
