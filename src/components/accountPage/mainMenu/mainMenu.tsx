import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { tabType } from "../../../pages/accountPage/accountPage";
import { useServer } from "../../../util/useServer";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { getErrorMessage } from "../../../helper/getErrorMessage";

const FaChevronRight = React.lazy(() =>
  import("react-icons/fa6").then((module) => ({
    default: module.FaChevronRight,
  }))
);

const FaChevronLeft = React.lazy(() =>
  import("react-icons/fa6").then((module) => ({
    default: module.FaChevronLeft,
  }))
);

const cookies = new Cookies();

export const MainMenu = ({ tabData, activeTab }: { tabData: tabType[]; activeTab: string | null }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
  });

  const [, setSearchParams] = useSearchParams();
  const customFetch = useServer();
  const alerter = useAlerter();

  const onTabChange = (tabParam: string) => {
    setSearchParams({ tab: tabParam });
  };

  const getUserInfo = async () => {
    const jsonData = await customFetch("/user/getInfo", {
      method: "GET",
      headers: {},
      body: undefined,
    });

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      setUserInfo((prev) => {
        return {
          name: jsonData.data.name,
          surname: jsonData.data.surname,
          email: jsonData.data.email,
          phoneNumber: jsonData.data.phoneNumber,
        };
      });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="h-full bg-white w-full lg:bg-primary rounded-md border lg:border-0 relative">
      {alerter.render}
      <div className="absolute w-fit h-[145px] z-[1] lg:hidden rounded-t-md overflow-hidden">
        <img src={require("./../../../assets/free/account/background1.jpg")} className="" alt="" />
      </div>
      <div className="p-3 py-7 z-[5] h-full relative">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold text-lg">Hi {userInfo.name}!</div>
              <div className="flex gap-2">
                <div>
                  <img
                    src={require("./../../../assets/freepik/account/accountUserPic.png")}
                    className="h-16 w-16 min-w-16 min-h-16"
                    alt=""
                  />
                </div>
                <div className="text-presetgray lg:text-white">
                  <div className="font-semibold">
                    {userInfo.name} {userInfo.surname}
                  </div>
                  <div className="text-sm font-medium">{userInfo.email}</div>
                  <div className="text-sm font-medium">
                    {userInfo.phoneNumber ? userInfo.phoneNumber : " No phone number found."}
                  </div>
                </div>
              </div>
              <hr className="bg-primary h-[2px] lg:bg-white lg:h-[1px]" />
            </div>
            <div>
              {tabData.map((tab) => {
                return (
                  <div
                    className={`py-1`}
                    onClick={() => {
                      onTabChange(tab.paramKey);
                    }}
                  >
                    <div
                      className={`flex items-center justify-between px-3 py-1 rounded-3xl ${
                        activeTab === tab.paramKey
                          ? "lg:bg-white lg:text-primary bg-primary text-white"
                          : " cursor-pointer transition-all duration-300 lg:text-white text-primary hover:bg-primary lg:hover:bg-gray-50 lg:hover:text-primary hover:text-white"
                      }`}
                    >
                      <div className="flex gap-3  items-center justify-center">
                        {tab.icon}
                        <span
                          className={`font-medium p-0 m-0 text-sm ${
                            activeTab === tab.paramKey ? "text-current" : "text-presetgray lg:text-current"
                          }`}
                        >
                          {tab.name}
                        </span>
                      </div>
                      {activeTab === tab.paramKey ? (
                        <div className="">
                          <Suspense fallback={<div style={{ height: "15px", width: "15px" }}></div>}>
                            <FaChevronLeft size={15} />
                          </Suspense>
                        </div>
                      ) : (
                        <div className="">
                          <Suspense fallback={<div style={{ height: "15px", width: "15px" }}></div>}>
                            <FaChevronRight size={15} />
                          </Suspense>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center py-2">
            <div>
              <button
                className="bg-primary text-white px-7 py-2 rounded-md font-semibold hover:bg-primarysub lg:bg-white lg:text-primary lg:hover:bg-gray-100"
                onClick={() => {
                  cookies.remove("sessionId");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
