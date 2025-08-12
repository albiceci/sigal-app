import { ReactNode, Suspense } from "react";
import { ContentContainer } from "../../containers/contentContainer";
import { Reveal } from "../../../util/reveal";
import { WindowDimensions } from "../../../util/windowDimensions";
import Lottie from "lottie-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button/button";

const FaLink = React.lazy(() =>
  import("react-icons/fa6").then((module) => ({
    default: module.FaLink,
  }))
);

type insuranceTypesType = {
  title: string;
  subTitle: string;
  image?: ReactNode;
  link: string;
};

const InsuranceTypesItem = ({ insuranceType }: { insuranceType: insuranceTypesType }) => {
  const navigate = useNavigate();
  return (
    <div className="w-52 min-w-52 h-80 border rounded-md shadow-lg p-4 bg-white flex flex-col hover:scale-105">
      <div className="h-1/2 overflow-hidden">{insuranceType.image}</div>
      <div className="py-4 flex flex-col items-center justify-center">
        <div>
          <div className="font-bold text-presetgray text-lg uppercase">{insuranceType.title}</div>
        </div>
        <div>
          <div className="text-presetgray text-sm font-medium">{insuranceType.subTitle}</div>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-fit">
          <Button
            buttonType="primary"
            style={{
              paddingLeft: 12,
              paddingRight: 12,
              fontSize: 14,
              paddingTop: 6,
              paddingBottom: 6,
            }}
            onClick={() => {
              navigate(insuranceType.link);
            }}
          >
            <div className="flex gap-2 justify-center items-center">
              <Suspense fallback={<div style={{ height: "16px", width: "16px" }}></div>}>
                <FaLink size={16} />
              </Suspense>
              Meso me shume
            </div>
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default function InsuranceTypes({ insuranceTypes }: { insuranceTypes: insuranceTypesType[] }) {
  const lottieRef = React.useRef(null);
  var windowDimensions = WindowDimensions();

  return (
    <div className="w-full flex items-center justify-center py-10">
      <ContentContainer>
        <Reveal type={"x"} width="100%">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="h2 text-presetgray">TITLE FOR SECTION</div>
            <div className="h5 font-semibold text-presetgray">SUBTITLE FOR SECTION</div>
          </div>
        </Reveal>
        <div
          className="flex md:justify-center overflow-x-auto overflow-y-hidden md:flex-wrap gap-9 mt-10 py-6"
          onScroll={() => {
            //@ts-ignore
            lottieRef.current?.setAttribute("hidden", "");
          }}
        >
          {insuranceTypes.map((type, index) => {
            return (
              <Reveal delay={windowDimensions.width > 768 ? index * 0.25 : 0}>
                <InsuranceTypesItem insuranceType={type} key={index} />
              </Reveal>
            );
          })}
        </div>
        <div className="w-full flex md:hidden items-end justify-center min-h-20">
          <div ref={lottieRef} className="-translate-y-12 opacity-50">
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
      </ContentContainer>
    </div>
  );
}
