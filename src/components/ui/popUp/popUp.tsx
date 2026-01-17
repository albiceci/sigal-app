import React, { Suspense, useEffect, useRef } from "react";
import { Reveal } from "../../../util/reveal";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

import closeSvg from "./close.svg";
import { WindowDimensions } from "../../../util/windowDimensions";

export const PopUp = ({
  title,
  onClose,
  bottomSection,
  children,
}: {
  title?: string;
  onClose: () => void;
  bottomSection?: JSX.Element;
  children: JSX.Element;
}) => {
  const { t } = useTranslation();
  const overlayContainer = document.getElementById("overlayContainer");

  var windowDimensions = WindowDimensions();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <>
      {overlayContainer
        ? createPortal(
            <div className={`w-full h-[100dvh] top-0 fixed flex items-end sm:items-center justify-center z-[100]`}>
              <div className="absolute h-full w-full bg-presetgray opacity-50 z-[-1] touch-pan-x"></div>
              <Reveal
                width="fit-content"
                height="fit-content"
                duration={0.3}
                distance={90}
                opacityTransition={windowDimensions.width >= 640}
                distanceType={windowDimensions.width < 640 ? "%" : "px"}
              >
                <div
                  ref={containerRef}
                  className="w-[100vw] sm:w-[85vw] md:w-[71vw] lg:w-[51vw] rounded-t-3xl sm:rounded-md flex flex-col bg-white shadow-lg"
                >
                  <div
                    className={`text-primary py-5 sm:py-3 flex justify-between items-center px-6 ${
                      title ? "border-b" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-2">
                      <div className="h4 font-semibold">{title ? t(title) : ""}</div>
                    </div>
                    <div onClick={onClose} className="cursor-pointer text-white rounded-full">
                      <img src={closeSvg} alt="Close Icon" className="w-[25px]" />
                    </div>
                  </div>
                  {/* Top fade */}

                  <div className="px-6 relative">
                    <div
                      className="pointer-events-none absolute top-0 left-0 h-[30px] w-full 
                  bg-gradient-to-b from-white to-transparent z-50 "
                    />
                    <div
                      className={`${
                        bottomSection ? "max-h-[60dvh]" : "max-h-[70dvh]"
                      } overflow-y-scroll overscroll-y-auto overscroll-contain touch-pan-y`}
                    >
                      <div className="h-fit -mb-px sm:mb-0">{children}</div>
                    </div>
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 h-[30px] w-full 
                  bg-gradient-to-t from-white to-transparent z-50"
                    />
                  </div>

                  {/* Bottom fade */}

                  {bottomSection && <div className="px-6 py-6">{bottomSection}</div>}
                </div>
              </Reveal>
            </div>,
            overlayContainer
          )
        : null}
    </>
  );
};
