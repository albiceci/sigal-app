import { Suspense } from "react";
import { Overlay } from "../../../util/overlay";
import { Button } from "../../ui/button/button";
import { packageType } from "./packageOption";
import React from "react";
import { PopUp } from "../../ui/popUp/popUp";

const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoClose,
  })),
);

export const CoveragesPopUp = ({ packageData, onClose }: { packageData: packageType; onClose: () => void }) => {
  return (
    <PopUp
      onClose={onClose}
      bottomSection={
        <div className="flex items-center justify-center">
          <div className="w-fit">
            <Button
              buttonType="secondary"
              onClick={() => {
                if (packageData.onClick) packageData.onClick();
                onClose();
              }}
            >
              Konfirmo
            </Button>
          </div>
        </div>
      }
    >
      <div className="py-6 flex flex-col gap-3">
        <div className={`flex flex-row gap-3 bg-blue-50 rounded-md p-4`}>
          {/* Icon */}
          <div className={`flex items-center justify-center w-[100px]`}>{packageData.selectedIcon}</div>
          {/* Name */}
          <div className="p-2 pb-5 flex flex-col justify-between">
            <span className={`text-lg font-boldFamily text-primary`}>{packageData.name}</span>
            <span className="font-boldFamily text-green-500">{packageData.priceEstimateText}</span>
          </div>
        </div>
        {/* Coverages */}
        {packageData.coverages ? (
          <div className="flex flex-col py-4 gap-3 bg-blue-50 rounded-md">
            <div className="px-3 text-primary font-boldFamily text-lg">
              <span>Mbulimet</span>
            </div>
            <div className="flex-col px-4 gap-1 flex text-presetblack">
              {packageData.coverages.map((coverage) => {
                return (
                  <div className={`flex items-center gap-1`}>
                    {/* Check Icon */}
                    <div className="h-[15px] w-[15px] min-h-[15px] min-w-[15px]">
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
          </div>
        ) : null}
      </div>
    </PopUp>
  );
};
