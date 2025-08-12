import { ScrollRestoration } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import "./buyPageContainer.css";

export const SidebarContext = createContext<{
  sideBarActive: boolean;
  setsideBarActive: React.Dispatch<React.SetStateAction<boolean>> | (() => {});
}>({ sideBarActive: false, setsideBarActive: () => {} });

export const BuyPageContainer = ({ children }: { children: React.ReactNode }) => {
  const [sideBarActive, setsideBarActive] = useState(false);

  useEffect(() => {
    setsideBarActive(false);
  }, [window.location.href]);

  return (
    <div className="w-[100%] overflow-hidden">
      <div id="overlayContainer" className="fixed z-[11] left-0 top-[0]"></div>
      <div id="alerterContainer" className="fixed z-[12] w-full top-[10vh]"></div>
      <ScrollRestoration />
      <div className="animate-[fadein_1s]">
        <div
          id="buyPageContainer"
          className="max-w-full w-full min-h-[100vh] bgGradientCustom flex items-center z-[-100] justify-center"
        >
          <div
            className={`buyPageInnerContainer relative z-[2] w-[90%] my-[5vh] min-h-[90vh] bg-white shadow-2xl rounded-md flex transition-transform duration-[0.7s] ${
              sideBarActive ? "translate-x-[250px] overflow-hidden" : "translate-x-0"
            }`}
            style={{
              transform: sideBarActive ? "rotateY(20deg) translate(250px, -50px)" : "rotateY(0deg) translate(0px, 0px)",
              pointerEvents: sideBarActive ? "none" : "auto",
            }}
          >
            <SidebarContext.Provider value={{ sideBarActive, setsideBarActive }}>{children}</SidebarContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};
