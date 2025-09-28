import React from "react";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";

import { MainMenu } from "../accountPage/mainMenu/mainMenu";
import { tabType } from "../../pages/accountPage/accountPage";

const FaChevronLeft = React.lazy(() =>
  import("react-icons/fa6").then((module) => ({
    default: module.FaChevronLeft,
  }))
);

export const AccountContainer = ({
  tabData,
  activeTab,
  children,
}: {
  tabData: tabType[];
  activeTab: string | null;
  children: React.ReactNode;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    //BottomBar padding
    <div className="w-[100vw] max-w-[100vw] min-h-[650px] h-[100dvh] flex flex-col items-center justify-center bgGradientCustom pb-[50px] lg:pb-0">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] h-[85%] md:h-[80%] mt-[70px] flex gap-1 lg:gap-0">
        <div
          className={`w-full md:w-[250px] md:translate-x-[0] transition-transform duration-500 ${
            activeTab !== null ? "translate-x-[-20%]" : "translate-x-[0]"
          }`}
        >
          <MainMenu tabData={tabData} activeTab={activeTab} />
        </div>
        <div
          className={`bg-gray-100 flex flex-col rounded-md md:flex-grow border lg:border-0 absolute md:static w-full h-full top-0 left-0 z-[100] md:z-[1] md:translate-x-[0] transition-transform duration-500 overflow-hidden ${
            activeTab === null ? "translate-x-[100%]" : "translate-x-[0]"
          }`}
        >
          <div className="px-6 h-14 text-primary font-bold bg-white drop-shadow-md">
            <div className="h-full flex items-center text-lg gap-4 py-4">
              <div className="md:hidden">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    searchParams.delete("tab");
                    setSearchParams(searchParams);
                  }}
                >
                  <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
                    <FaChevronLeft size={20} />
                  </Suspense>
                </div>
              </div>
              <div>{tabData.filter((tab) => tab.paramKey === activeTab)[0]?.name}</div>
            </div>
          </div>
          <div className="h-auto py-3 my-3 px-5 sm:px-9 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
