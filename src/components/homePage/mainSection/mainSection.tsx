import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";
import { ReactComponent as LogoWhite } from "../../../assets/sigal/logo/logoSigalPrimary.svg";
import { ReactComponent as LogoWhitePartial } from "../../../assets/sigal/logo/logoSigalPartialWhite.svg";
import { useNavigate } from "react-router-dom";
// import { ScrollPosition } from "../../../util/scrollPosition";
// import { WindowDimensions } from "../../../util/windowDimensions";
import BannerSwipper from "../../common/bannerSwipper/bannerSwipper";
import { Button } from "../../ui/button/button";

function MainSection() {
  const { t } = useTranslation();

  // var scrollPosition: number = ScrollPosition();
  // var windowDimensions = WindowDimensions();

  const navigate = useNavigate();
  return (
    <section className="h-[100vh] w-[100vw] min-h-[1000px] max-h-[1000px] flex relative overflow-hidden m-0 sm:min-h-[950px] sm:max-h-[1025px]">
      <div className="absolute w-full h-full z-[-3] bg-gray-100"></div>
      <div
        // style={{
        //   opacity:
        //     1 -
        //     (scrollPosition * 1.5) /
        //       (windowDimensions.height < 800 ? 800 : windowDimensions.height),
        // }}
        className="w-full h-full z-[-1] relative"
      >
        <div className="hidden w-full h-full items-center justify-center opacity-5 z-[1] md:flex blur-[3px]">
          <LogoWhite width={"inherit"} />
        </div>
        <div className="flex w-full h-full items-center justify-center opacity-10 z-[1] md:hidden blur-sm">
          <LogoWhitePartial width={"inherit"} />
        </div>
      </div>
      <div className="absolute z-[-2] w-full h-full opacity-50 flex justify-center">
        <div className="w-[1200px] h-[900px] backgroundBlur overflow-hidden">
          {/* <BackgroundImage color="#000000" width={"inherit"} height={"inherit"} /> */}
        </div>
      </div>
      {/* <div
        style={{ opacity: 1 - (scrollPosition * 2) / windowDimensions.height }}
        className="w-full h-full z-[-1] bgGradientCustom"
      ></div> */}
      <div className="w-full h-[500px] mt-[70px] md:mt-[100px] flex flex-col items-center justify-center z-[5] absolute">
        <div className="flex flex-col items-center justify-center">
          <h1 className="max-w-[80%] h1 mb-0 text-center text-primary sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] drop-shadow-lg">
            {t("home.main.title")}
          </h1>
          <div className="max-w-[300px] sm:max-w-[500px] mt-[10px] text-[15px] sm:text-[18px] font-semibold font-subheader text-presetgray text-center">
            {t("home.main.subtitle")}
          </div>
          <div className="mt-[20px] relative sm:mt-[30px] py-[8px]">
            <Button
              buttonType="primary"
              padding="px-14 py-3"
              fontStyle="font-regularFamily font-black tracking-widest"
              style={{
                textTransform: "uppercase",
              }}
              onClick={() => {
                navigate("/buy");
              }}
            >
              {t("button.insure.long")}
            </Button>
          </div>
          <div className="mt-[7px] py-[5px]">
            <Button
              buttonType="secondaryAlt"
              padding="px-7 py-2"
              fontStyle="font-regularFamily font-black text-sm tracking-wide"
              style={{
                textTransform: "uppercase",
              }}
              onClick={() => {
                navigate("/file-claim");
              }}
            >
              {t("button.fileClaim.long")}
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute flex w-full items-center justify-center bottom-24 z-5">
        <BannerSwipper />
      </div>
      <div className="absolute flex w-full items-center justify-center bottom-8">
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

      {/* <div
        className={`imgBlur absolute translate-x-[-50%] left-[50%] z-[0] bottom-0 w-[700px] h-[450px] sm:w-[1000px] sm:h-[600px] lg:w-[1600px] lg:h-[700px] cursor-not-allowed transition-[filter] duration-1000 ${
          isMouseOver ? "blur-sm" : ""
        }`}
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
      </div> */}
    </section>
  );
}

export default MainSection;
