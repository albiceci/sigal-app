import MainImage from "../../../assets/lottie/lifePageMain.json";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../ui/button/button";

function MainSection() {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-[100vw] min-h-[800px] max-h-[800px] flex relative overflow-hidden m-0 sm:min-h-[850px] sm:max-h-[1025px] bgGradientCustom">
      <div className="w-full h-[500px] mt-[50px] flex flex-col items-center justify-center z-[5] absolute">
        <div
          className="flex flex-col items-center justify-center"
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
        >
          <h1 className="max-w-[350px] text-3xl mb-0 text-center font-header text-presetgray font-normal sm:max-w-[600px] sm:text-5xl">
            Catch Phrase For Life
          </h1>
          <div className="mt-[10px] text-[15px] font-normal font-header text-presetgray text-center">
            Sub title for life page!
          </div>
          <div className="mt-[50px] py-[8px]">
            <Button
              buttonType="primary"
              style={{
                fontWeight: "550",
                fontSize: "17px",
                letterSpacing: "1px",
              }}
              onClick={() => {
                navigate("/buy?type=life");
              }}
            >
              SHIKO CMIMET
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`imgBlur absolute translate-x-[-50%] left-[50%] z-0 bottom-0 w-[900px] h-[650px] sm:w-[1200px] sm:h-[800px] lg:w-[1400px] lg:h-[900px] transition-opacity duration-1000 ${
          isMouseOver ? "opacity-50" : ""
        }
        `}
      >
        <Lottie
          style={{ cursor: "default" }}
          options={{
            loop: true,
            autoplay: true,
            animationData: MainImage,
          }}
          isClickToPauseDisabled={true}
        />
      </div>
    </div>
  );
}

export default MainSection;
