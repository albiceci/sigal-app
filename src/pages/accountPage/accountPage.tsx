import { ScrollRestoration, useSearchParams } from "react-router-dom";
import NavBar from "../../components/ui/navBar/navBar";
import { Suspense, useEffect, useState } from "react";
import { AccountContainer } from "../../components/containers/accountContainer";
import React from "react";
import { WindowDimensions } from "../../util/windowDimensions";
import { PageContainer } from "../../components/containers/pageContainer";
import { General } from "../../components/accountPage/general/general";

const FaUser = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaUser,
  }))
);
const FaCubes = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaCubes,
  }))
);
const BsCreditCard2FrontFill = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsCreditCard2FrontFill,
  }))
);
const IoMdSettings = React.lazy(() =>
  import("react-icons/io").then((module) => ({
    default: module.IoMdSettings,
  }))
);

const Policies = React.lazy(() =>
  import("../../components/accountPage/policies/policies").then((module) => ({
    default: module.Policies,
  }))
);
const Claims = React.lazy(() =>
  import("../../components/accountPage/claims/claims").then((module) => ({
    default: module.Claims,
  }))
);
const IoDocumentText = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoDocumentText,
  }))
);

export type tabType = {
  name: string;
  paramKey: string;
  icon: JSX.Element;
};

const tabData: tabType[] = [
  {
    name: "Profili im",
    paramKey: "general",
    icon: (
      <div className="mb-1">
        <Suspense fallback={<div style={{ height: "18px", width: "18px" }}></div>}>
          <FaUser size={18} />
        </Suspense>
      </div>
    ),
  },
  {
    name: "Sigurimet e mia",
    paramKey: "policies",
    icon: (
      <div className="">
        <Suspense fallback={<div style={{ height: "19px", width: "19px" }}></div>}>
          <FaCubes size={19} />
        </Suspense>
      </div>
    ),
  },
  {
    name: "Raportimet e mia",
    paramKey: "claims",
    icon: (
      <div className="">
        <Suspense fallback={<div style={{ height: "19px", width: "19px" }}></div>}>
          <IoDocumentText size={19} />
        </Suspense>
      </div>
    ),
  },
  // {
  //   name: "Payment",
  //   paramKey: "payment",
  //   icon: (
  //     <div className="">
  //       <Suspense fallback={<div style={{ height: "18px", width: "18px" }}></div>}>
  //         <BsCreditCard2FrontFill size={18} />
  //       </Suspense>
  //     </div>
  //   ),
  // },
  {
    name: "Cilësimet",
    paramKey: "settings",
    icon: (
      <div className="">
        <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
          <IoMdSettings size={20} />
        </Suspense>
      </div>
    ),
  },
];

function renderSwitch(param: string | null) {
  switch (param) {
    case null:
      return <></>;
    case "policies":
      return (
        <Suspense fallback={<div style={{ height: "100%", width: "100%" }}></div>}>
          <Policies />
        </Suspense>
      );
    case "claims":
      return (
        <Suspense fallback={<div style={{ height: "100%", width: "100%" }}></div>}>
          <Claims />
        </Suspense>
      );
    case "general":
      return (
        <Suspense fallback={<div style={{ height: "100%", width: "100%" }}></div>}>
          <General />
        </Suspense>
      );
    case "bundle":
      return <></>;
  }
}

export default function Account() {
  const [accountTab, setAccountTab] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  var windowDimensions = WindowDimensions();

  useEffect(() => {
    var tabParam = searchParams.get("tab");
    if (!tabData.filter((tab) => tab.paramKey === tabParam).length && windowDimensions.width > 768)
      setSearchParams({ tab: "general" });
    else setAccountTab(tabParam);
  }, [searchParams]);

  return (
    <PageContainer>
      <div className="relative overflow-x-hidden">
        <ScrollRestoration />
        <NavBar
          buyButton={{
            isVisible: true,
            isActive: true,
            link: "/buy",
          }}
          logo={{
            isMovable: false,
          }}
          activeKey={"login"}
        />
        <AccountContainer tabData={tabData} activeTab={accountTab}>
          {renderSwitch(accountTab)}
        </AccountContainer>
      </div>
    </PageContainer>
  );
}
