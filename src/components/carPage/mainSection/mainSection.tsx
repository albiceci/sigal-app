import Lottie from "react-lottie";

import MainImage from "../../../assets/lottie/carPageMain.json";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button/button";

function MainSection() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-[100vw] min-h-[800px] max-h-[800px] flex relative overflow-hidden m-0 sm:min-h-[850px] sm:max-h-[1025px]">
      <div className="w-full h-[500px] mt-[50px] flex flex-col items-center justify-center z-[5] absolute">
        <h1 className="max-w-[350px] text-3xl mb-0 text-center font-header text-presetgray font-normal sm:max-w-[600px] sm:text-5xl">
          Catch Phrase For Car
        </h1>
        <div className="mt-[10px] text-[15px] font-normal font-header text-presetgray text-center">
          Sub title for car page!
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
              navigate("/buy?type=car");
            }}
          >
            SHIKO CMIMET
          </Button>
        </div>
      </div>
      <div className="absolute translate-x-[-50%] left-[50%] z-0 bottom-0 w-[1000px] h-[650px] sm:w-[1300px] sm:h-[800px] lg:w-[1800px] lg:h-[1000px]">
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
