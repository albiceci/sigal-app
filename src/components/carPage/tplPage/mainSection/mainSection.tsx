import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button/button";

function MainSection() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-[100vw] min-h-[900px] max-h-[900px] flex items-center justify-center relative overflow-hidden m-0 sm:min-h-[900px] sm:max-h-[1025px] bgGradientCustom">
      <div className="flex flex-col lg:flex-row items-center justify-end lg:justify-between h-[80%] lg:h-full w-[95%] lg:w-[85%] xl:w-[75%]">
        <div className="z-[5] max-w-[350px] lg:max-w-[45%] sm:max-w-[70%] flex flex-col justify-center items-center lg:items-start absolute lg:static top-36">
          <h1 className="h1 mb-0 text-center lg:text-left text-presetgray drop-shadow-lg max-w-[90%]">
            Siguracioni i detyrueshëm i makinës "TPL"
          </h1>
          <div className="mt-[10px] text-center lg:text-left text-[15px] sm:text-[18px] font-medium font-subheader text-presetgray">
            Bashkë me siguracionin e makinës, përfitoni siguracione dhe shërbime të tjera. Përfitoni nga ofertat e SIGAL
            UNIQA me blerjen e sigurimit TPL
          </div>
          <div className="mt-[50px] py-[8px] w-fit">
            <Button
              buttonType="primary"
              fontStyle="font-regularFamily font-black tracking-widest"
              onClick={() => {
                navigate("/buy?type=form&subtype=tpl");
              }}
            >
              SHIKO CMIMET
            </Button>
          </div>
        </div>
        <div className="z-0 lg:flex-grow bottom-0 max-w-[600px] lg:max-w-[55%]">
          <img className="imgBlur" src={require("./../../../../assets/freepik/carPage/tplPage/mainImage.png")} alt="" />
        </div>
      </div>
      <div className="absolute flex w-full items-center justify-center bottom-8">
        <Lottie
          style={{
            pointerEvents: "none",
            height: 80,
            width: 80,
          }}
          animationData={require("../../../../assets/lottieFlow/icons/downArrowBlack.json")}
          autoplay={true}
          loop={true}
        />
      </div>
    </div>
  );
}

export default MainSection;
