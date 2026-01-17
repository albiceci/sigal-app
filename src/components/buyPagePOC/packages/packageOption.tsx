import { useState } from "react";
import { WindowDimensions } from "../../../util/windowDimensions";
import { CoveragesPopUp } from "./coveragePopUp";

export type packageType = {
  name: string;
  icon: JSX.Element;
  selectedIcon?: JSX.Element;
  isSelected?: boolean;
  focus?: boolean;
  colorTheme?: string;
  coverages?: string[];
  priceEstimateText?: string;
  onClick?: () => void;
};

export const PackageOption = ({
  packageData,
  isVisible,
  activeIndex,
}: {
  packageData: packageType;
  isVisible?: boolean;
  activeIndex?: number;
}) => {
  const [isCoverageOverlayOpen, setIsCoverageOverlayOpen] = useState(false);

  const openCoverageOverlay = () => {
    setIsCoverageOverlayOpen(true);
  };

  const closeCoverageOverlay = () => {
    setIsCoverageOverlayOpen(false);
  };

  var windowDimensions = WindowDimensions();
  const colors = {
    color: `rgb(${packageData.colorTheme})`,
    boxShadow: packageData.isSelected ? `0 4px 6px -1px rgb(${packageData.colorTheme})` : undefined,
    backgroundColor: packageData.isSelected ? `rgba(${packageData.colorTheme},0.1)` : undefined,
  };
  return (
    <>
      {/* Scroll view transformations */}
      <div
        className={`${packageData.coverages ? "lg:px-3" : ""}  transition-transform`}
        style={{
          transform: activeIndex ? `translateX(-${String(activeIndex * 100)}%)` : "",
          opacity: isVisible === undefined || isVisible === true ? "100%" : "0%",
          pointerEvents: isVisible === false ? "none" : undefined,
        }}
      >
        {/* Main container, click and color props */}
        <div
          className={`h-fit w-32 sm:w-32 bg-opacity-50  min-w-32 sm:min-w-32 rounded-md  shadow-md flex flex-col hover:scale-105 cursor-pointer transition-[all] ${
            packageData.isSelected ? `shadow-primary bg-blue-50` : "bg-white"
          } ${
            packageData.focus !== undefined && !packageData.focus
              ? "opacity-50 hover:opacity-100"
              : "opacity-100 scale-105"
          } text-primary
      ${packageData.coverages ? "lg:h-full lg:w-48 lg:min-w-48" : "lg:w-40 lg:min-w-40"}`}
          onClick={
            !packageData.coverages
              ? packageData.onClick
              : windowDimensions.width >= 1024
              ? packageData.onClick
              : openCoverageOverlay
          }
          style={{
            ...(packageData.colorTheme ? colors : {}),
          }}
        >
          {/* Check box */}
          <div className="flex justify-end p-2 pb-0">
            <div className={`flex items-center justify-center `}>
              {packageData.isSelected ? (
                <div className="h-[23px] w-[23px]">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M8.5 12.5L10.5 14.5L15.5 9.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>
                    </g>
                  </svg>
                </div>
              ) : (
                <div
                  className={`w-5 h-5 border rounded-md ${
                    packageData.isSelected ? "border-primary" : "border-presetgray"
                  }`}
                  style={{
                    borderColor:
                      packageData.colorTheme && packageData.isSelected ? `rgb(${packageData.colorTheme})` : undefined,
                  }}
                ></div>
              )}
            </div>
          </div>
          <div className={`flex flex-col ${packageData.coverages ? "lg:flex-row lg:px-2" : ""}`}>
            {/* Icon */}
            <div
              className={`px-2 flex-grow flex items-center justify-center ${
                packageData.coverages ? "lg:flex-grow-0 lg:w-[60px] lg:min-w-[40px] lg:px-0" : ""
              }`}
            >
              {packageData.isSelected && packageData.selectedIcon !== undefined
                ? packageData.selectedIcon
                : packageData.icon}
            </div>
            {/* Name */}
            <div
              className={`p-2 pb-5 flex flex-col items-center justify-center ${
                packageData.coverages ? "lg:p-0 lg:pr-2" : ""
              }`}
            >
              <span
                className={`text-lg font-boldFamily ${
                  packageData.selectedIcon === undefined ? "" : packageData.isSelected ? "" : "text-presetgray"
                } text-center`}
              >
                {packageData.name}
              </span>
              {packageData.priceEstimateText ? (
                <span
                  className={`text-sm hidden lg:block text-center ${
                    packageData.selectedIcon === undefined
                      ? "text-green-500"
                      : packageData.isSelected
                      ? "text-green-500"
                      : "text-presetgray"
                  }`}
                >
                  {packageData.priceEstimateText}
                </span>
              ) : null}
            </div>
          </div>
          {/* Coverages */}
          {packageData.coverages ? (
            <>
              <div className="w-full hidden lg:flex justify-center mt-3">
                <hr
                  style={{
                    backgroundColor:
                      packageData.colorTheme && packageData.isSelected ? `rgb(${packageData.colorTheme})` : undefined,
                  }}
                  className={`w-[80%] h-[1px] ${packageData.isSelected ? "bg-primary" : "bg-presetgray"}`}
                />
              </div>
              <div className="hidden flex-col px-2 py-3 gap-1 lg:flex">
                {packageData.coverages.map((coverage) => {
                  return (
                    <div
                      className={`flex gap-1 ${
                        packageData.selectedIcon === undefined ? "" : packageData.isSelected ? "" : "text-presetgray"
                      }`}
                      style={{
                        color:
                          packageData.colorTheme && packageData.isSelected
                            ? `rgb(${packageData.colorTheme})`
                            : undefined,
                      }}
                    >
                      {/* Check Icon */}
                      <div className="h-[15px] w-[15px] min-h-[15px] min-w-[15px] mt-1">
                        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M8.5 12.5L10.5 14.5L15.5 9.5"
                              stroke="inherit"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                              stroke="inherit"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <span>{coverage}</span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
      {isCoverageOverlayOpen ? <CoveragesPopUp packageData={packageData} onClose={closeCoverageOverlay} /> : null}
    </>
  );
};
